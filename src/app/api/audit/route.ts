import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
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
import { isKnownReferrer, getReferrerDisplayName } from "@/lib/referrers";
import {
  appendNotesToTask,
  buildAuditRowProperties,
  createAuditSubmissionRow,
} from "@/lib/motto-api";

const WEBHOOK_TIMEOUT_MS = 10_000;
const N8N_WEBHOOK = "https://n8n.mottodigital.jp/webhook/free-audit-v2-intake";
const MOTTO_API = "https://vps.mottodigital.jp/tasks";
const AIOS_PROJECT_ID = "1ede0cb5-63d9-8061-8571-df183897d8e2";

let _convex: ConvexHttpClient | null = null;
function getConvex(): ConvexHttpClient {
  if (!_convex) {
    const url = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!url) throw new Error("NEXT_PUBLIC_CONVEX_URL not configured");
    _convex = new ConvexHttpClient(url);
  }
  return _convex;
}

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
    const referrerSlug = isKnownReferrer(data.referrer) ? data.referrer : null;
    const referrerLabel = referrerSlug ? getReferrerDisplayName(referrerSlug) : null;
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

    const labels = {
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
    };

    const payload = {
      ...data,
      computed: {
        hoursPerWeek: roi.hoursPerWeek,
        annualSavings: roi.annualSavings,
        topProcesses: roi.topProcesses,
      },
      labels,
      status: "pending",
      createdAt: Date.now(),
    };

    // Build notes text once — used for both Notion body and audit trail
    const notesText = [
      ...(referrerSlug
        ? [`Referred by: ${referrerSlug} (${referrerLabel})`, ``]
        : []),
      `Name: ${c.name}`,
      `Email: ${c.email}`,
      `Company: ${c.company}`,
      `Phone: ${c.phone || "—"}`,
      ``,
      `Top goal: ${topGoalLabel}`,
      `All goals (ranked): ${goalsRanked.join(" → ")}`,
      `Top blockers: ${(data.topGoalBlockers ?? []).join(" / ")}`,
      ``,
      `Industry: ${labels.industry}`,
      `Team size: ${labels.teamSize}`,
      `Revenue: ${labels.revenue}`,
      `Role: ${labels.role}`,
      `Years: ${labels.yearsInBusiness}`,
      `Location: ${labels.location}`,
      `Website: ${data.company?.website || "—"}`,
      ``,
      `AI experience: ${labels.aiExperience}`,
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
      `Budget: ${labels.budget}`,
      `Timeline: ${labels.timeline}`,
      `Decision maker: ${labels.decisionMaker}`,
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
    ].join("\n");

    // -------------------------------------------------------------------------
    // Layer 2 — Convex is the canonical store. Insert FIRST and synchronously.
    // If this throws, return 500 so the user can retry (their data isn't gone).
    // -------------------------------------------------------------------------
    let convexId: string;
    try {
      convexId = await getConvex().mutation(
        api.functions.auditSubmissionsV2.insertSubmission,
        {
          email: String(c.email),
          name: String(c.name),
          company: String(c.company),
          phone: c.phone ? String(c.phone) : undefined,
          locale: data.locale ? String(data.locale) : undefined,
          tier: String(data.tier),
          referrer: referrerSlug ?? undefined,
          goalsSelected: data.goalsSelected ?? [],
          goalsRanked: data.goalsRanked ?? [],
          topGoalBlockers: data.topGoalBlockers ?? [],
          companyMeta: {
            industry: data.company?.industry,
            teamSize: data.company?.teamSize,
            revenue: data.company?.revenue,
            role: data.company?.role,
            yearsInBusiness: data.company?.yearsInBusiness,
            location: data.company?.location,
            website: data.company?.website,
          },
          aiExperience: data.aiExperience ? String(data.aiExperience) : undefined,
          aiTriedDidntStick: data.aiTriedDidntStick
            ? String(data.aiTriedDidntStick)
            : undefined,
          aiTriedReasons: data.aiTriedReasons ?? [],
          processGrid: data.processGrid ?? {},
          robotTask: data.robotTask ? String(data.robotTask) : "",
          qualification: {
            budget: data.qualification?.budget,
            timeline: data.qualification?.timeline,
            decisionMaker: data.qualification?.decisionMaker,
          },
          toolStack: data.toolStack ?? {},
          toolStackCategoryOther: data.toolStackCategoryOther ?? {},
          toolStackOther: data.toolStackOther ? String(data.toolStackOther) : "",
          computed: {
            hoursPerWeek: roi.hoursPerWeek,
            annualSavings: roi.annualSavings,
            topProcesses: roi.topProcesses,
          },
          rawPayload: data,
          submittedAt: Date.now(),
        }
      );
    } catch (e) {
      console.error("[audit] Convex insert failed:", e);
      return NextResponse.json(
        { error: "Could not save submission. Please try again." },
        { status: 500 }
      );
    }

    // Fire-and-forget n8n webhook (Slack only — workflow built separately)
    const webhookPromise = fetchWithTimeout(N8N_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }).catch(console.error);

    // MOTTO API task creation + page-body append (Layer 1 fix)
    const mottoApiKey = process.env.MOTTO_API_KEY;
    const auditDbId = process.env.AUDIT_SUBMISSIONS_DB_ID;
    const notionPromise = (async () => {
      if (!mottoApiKey) return;

      // Inbox-task write (existing behaviour) — produces taskId we cross-link
      // back into the structured row.
      const inboxWrite = (async (): Promise<{
        taskId?: string;
        ok: boolean;
        error?: string;
      }> => {
        try {
          const res = await fetchWithTimeout(MOTTO_API, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "X-API-Key": mottoApiKey,
            },
            body: JSON.stringify({
              name: `${referrerLabel ? `[${referrerLabel}] ` : ""}AIOS Audit: ${c.name} — ${c.company}`,
              projectId: AIOS_PROJECT_ID,
              status: "INBOX",
              notes: notesText,
            }),
          });
          if (!res.ok) return { ok: false, error: `POST /tasks HTTP ${res.status}` };
          const json = (await res.json().catch(() => ({}))) as { id?: string };
          const taskId = json.id;
          if (!taskId) return { ok: false, error: "POST /tasks response missing id" };
          const append = await appendNotesToTask(taskId, notesText, mottoApiKey);
          if (!append.ok) return { taskId, ok: false, error: append.error };
          return { taskId, ok: true };
        } catch (e) {
          return { ok: false, error: e instanceof Error ? e.message : String(e) };
        }
      })();

      // Structured-row write into the dedicated Audit Submissions DB. Skips
      // cleanly if the env var is unset so deployment can ship before the DB
      // is created.
      const rowWrite = (async (): Promise<{
        rowId?: string;
        ok: boolean;
        error?: string;
        skipped?: boolean;
      }> => {
        if (!auditDbId) return { ok: false, skipped: true };
        const properties = buildAuditRowProperties({
          contact: {
            name: String(c.name),
            email: String(c.email),
            company: String(c.company),
            phone: c.phone ? String(c.phone) : undefined,
          },
          website: data.company?.website,
          referrerSlug,
          locale: data.locale,
          tier: String(data.tier),
          labels: {
            industry: labels.industry,
            teamSize: labels.teamSize,
            revenue: labels.revenue,
            role: labels.role,
            yearsInBusiness: labels.yearsInBusiness,
            location: labels.location,
            aiExperience: labels.aiExperience,
            topGoal: labels.topGoal,
            goalsRanked: labels.goalsRanked,
            topGoalBlockers: labels.topGoalBlockers,
            budget: labels.budget,
            timeline: labels.timeline,
            decisionMaker: labels.decisionMaker,
          },
          roi: {
            hoursPerWeek: roi.hoursPerWeek,
            annualSavings: roi.annualSavings,
          },
          robotTask: data.robotTask,
          submittedAt: Date.now(),
          convexId: String(convexId),
        });
        const result = await createAuditSubmissionRow({
          databaseId: auditDbId,
          apiKey: mottoApiKey,
          properties,
        });
        return { rowId: result.id, ok: result.ok, error: result.error };
      })();

      const [inboxRes, rowRes] = await Promise.all([inboxWrite, rowWrite]);

      // Combine error reporting — surface either failure on the Convex row.
      const errors: string[] = [];
      if (!inboxRes.ok && inboxRes.error) errors.push(`inbox: ${inboxRes.error}`);
      if (!rowRes.ok && !rowRes.skipped && rowRes.error)
        errors.push(`row: ${rowRes.error}`);
      const notionError = errors.length ? errors.join(" | ") : undefined;
      const notionWriteOk = inboxRes.ok && (rowRes.ok || rowRes.skipped === true);

      if (notionError) console.error("[audit] Notion write:", notionError);

      try {
        await getConvex().mutation(
          api.functions.auditSubmissionsV2.updateNotionWriteResult,
          {
            id: convexId as never,
            notionTaskId: inboxRes.taskId,
            notionAuditRowId: rowRes.rowId,
            notionWriteOk,
            notionError,
          }
        );
      } catch (e) {
        console.error("[audit] Convex update post-Notion failed:", e);
      }
    })();

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
