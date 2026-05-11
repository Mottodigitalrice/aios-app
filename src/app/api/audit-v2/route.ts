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

    // Fire-and-forget n8n webhook (handles Slack + Notion routing downstream)
    await fetchWithTimeout(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(console.error);

    return NextResponse.json({ success: true, message: "Audit submitted" });
  } catch (error) {
    console.error("Audit v2 API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
