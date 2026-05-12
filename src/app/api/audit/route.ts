import { NextRequest, NextResponse } from "next/server";
import { isDuplicateRequest } from "@/lib/dedup";
import { computeRoi } from "@/lib/audit-v2/roi-calculator";
import { GOAL_BY_ID } from "@/lib/audit-v2/goals";
import {
  AI_EXPERIENCE,
  BUDGET_OPTIONS,
  DECISION_MAKER_OPTIONS,
  INDUSTRIES,
  LOCATIONS,
  REVENUE_BANDS,
  ROLES,
  TEAM_SIZES,
  TIMELINE_OPTIONS,
  YEARS_IN_BUSINESS,
} from "@/lib/audit-v2/constants";

const WEBHOOK_TIMEOUT_MS = 10_000;
const N8N_WEBHOOK = "https://n8n.mottodigital.jp/webhook/free-audit-v2-intake";
const MOTTO_API = "https://vps.mottodigital.jp/tasks";
const AIOS_PROJECT_ID = "1ede0cb5-63d9-8061-8571-df183897d8e2";

function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    new Promise<never>((_, reject) =>
      setTimeout(
        () => reject(new Error(`Timeout after ${WEBHOOK_TIMEOUT_MS}ms: ${url}`)),
        WEBHOOK_TIMEOUT_MS
      )
    ),
  ]);
}

function lookupLabel<T extends { id: string; ja: string; en: string }>(
  list: readonly T[],
  id: string
): string {
  return list.find((o) => o.id === id)?.ja || id || "—";
}

export async function POST(req: NextRequest) {
  try {
    const dedup = isDuplicateRequest(req.headers.get("x-request-id"));
    if (dedup === true) {
      return NextResponse.json({ success: true, duplicate: true });
    }

    let data;
    try {
      data = await req.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON in request body" },
        { status: 400 }
      );
    }

    // Validation — bare-minimum required fields
    const c = data.contact ?? {};
    const required = { name: c.name, email: c.email, company: c.company, tier: data.tier };
    const missing = Object.entries(required)
      .filter(([, v]) => !v)
      .map(([k]) => k);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // Compute derived ROI for the payload (idempotent — server is the source of truth)
    const roi = computeRoi(data.processGrid ?? {}, data.company?.industry || "");

    // Resolve human-readable JA labels for downstream consumers (Slack/Notion/CSV)
    const goalsRanked: string[] = (data.goalsRanked ?? []).map((id: string) =>
      GOAL_BY_ID[id as keyof typeof GOAL_BY_ID]?.ja || id
    );
    const topGoalLabel = goalsRanked[0] || "—";

    const payload = {
      ...data,
      computed: {
        hoursPerWeek: roi.hoursPerWeek,
        annualSavings: roi.annualSavings,
        topProcesses: roi.topProcesses,
      },
      labels: {
        goalsRanked,
        topGoal: topGoalLabel,
        topGoalBlockers: data.topGoalBlockers ?? [],
        industry: lookupLabel(INDUSTRIES, data.company?.industry),
        teamSize: lookupLabel(TEAM_SIZES, data.company?.teamSize),
        revenue: lookupLabel(REVENUE_BANDS, data.company?.revenue),
        role: lookupLabel(ROLES, data.company?.role),
        yearsInBusiness: lookupLabel(YEARS_IN_BUSINESS, data.company?.yearsInBusiness),
        location: lookupLabel(LOCATIONS, data.company?.location),
        aiExperience: lookupLabel(AI_EXPERIENCE, data.aiExperience),
        budget: lookupLabel(BUDGET_OPTIONS, data.qualification?.budget),
        timeline: lookupLabel(TIMELINE_OPTIONS, data.qualification?.timeline),
        decisionMaker: lookupLabel(DECISION_MAKER_OPTIONS, data.qualification?.decisionMaker),
      },
      status: "pending",
      createdAt: Date.now(),
    };

    // Fire-and-forget n8n webhook (Slack only — workflow built separately)
    const webhookPromise = fetchWithTimeout(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(console.error);

    // Fire-and-forget MOTTO API task creation (primary Notion write)
    const mottoApiKey = process.env.MOTTO_API_KEY;
    const notionPromise = mottoApiKey
      ? fetchWithTimeout(MOTTO_API, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": mottoApiKey,
          },
          body: JSON.stringify({
            name: `AIOS Audit: ${c.name} — ${c.company}`,
            projectId: AIOS_PROJECT_ID,
            status: "INBOX",
            notes: [
              `Name: ${c.name}`,
              `Email: ${c.email}`,
              `Company: ${c.company}`,
              `Phone: ${c.phone || "—"}`,
              ``,
              `Top goal: ${topGoalLabel}`,
              `All goals (ranked): ${goalsRanked.join(" → ")}`,
              `Top blockers: ${(data.topGoalBlockers ?? []).join(" / ")}`,
              ``,
              `Industry: ${payload.labels.industry}`,
              `Team size: ${payload.labels.teamSize}`,
              `Revenue: ${payload.labels.revenue}`,
              `Role: ${payload.labels.role}`,
              `Years: ${payload.labels.yearsInBusiness}`,
              `Location: ${payload.labels.location}`,
              `Website: ${data.company?.website || "—"}`,
              ``,
              `AI experience: ${payload.labels.aiExperience}`,
              `Tried-but-stuck: ${data.aiTriedDidntStick || "—"} ${
                (data.aiTriedReasons ?? []).length ? `(${(data.aiTriedReasons ?? []).join(", ")})` : ""
              }`,
              ``,
              `ROI: ${roi.hoursPerWeek.toFixed(1)} hrs/week, ¥${roi.annualSavings.toLocaleString()}/year`,
              `Top processes: ${roi.topProcesses
                .map((p) => `${p.processId} (${p.hoursSaved.toFixed(1)}h)`)
                .join(", ")}`,
              ``,
              `Robot task: ${data.robotTask || "—"}`,
              ``,
              `Budget: ${payload.labels.budget}`,
              `Timeline: ${payload.labels.timeline}`,
              `Decision maker: ${payload.labels.decisionMaker}`,
              ``,
              `Tools: ${Object.entries(data.toolStack ?? {})
                .map(([cat, tools]) => {
                  const arr = tools as string[];
                  const named = arr.filter((t) => t !== "__none__" && t !== "__other__");
                  const isNone = arr.includes("__none__");
                  const otherText = (data.toolStackCategoryOther ?? {})[cat] || "";
                  const parts: string[] = [];
                  if (isNone) parts.push("none");
                  if (named.length) parts.push(named.join("/"));
                  if (otherText) parts.push(`Other: ${otherText}`);
                  return `${cat}: ${parts.join(", ") || "—"}`;
                })
                .join(" | ")}`,
              `Other tools (uncategorized): ${data.toolStackOther || "—"}`,
              ``,
              `Locale: ${data.locale}`,
            ].join("\n"),
          }),
        }).catch(console.error)
      : Promise.resolve();

    await Promise.allSettled([webhookPromise, notionPromise]);

    return NextResponse.json({ success: true, message: "Audit submitted" });
  } catch (error) {
    console.error("Audit v2 API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
