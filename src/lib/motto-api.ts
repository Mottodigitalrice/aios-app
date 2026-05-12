// Helpers for talking to the MOTTO API / Notion proxy from Next.js route handlers.
//
// The MOTTO API's POST /tasks endpoint silently drops the `notes` field — it never
// makes it onto the created Notion page. This module patches around that bug at
// the call site by appending the notes string as page-body paragraph blocks via
// the same proxy used everywhere else.

const NOTION_PROXY_BASE = "https://vps.mottodigital.jp/proxy/notion/v1";
const APPEND_TIMEOUT_MS = 5_000;
const NOTION_RICH_TEXT_LIMIT = 1_900; // Notion hard limit is 2000; leave headroom

type Block = {
  object: "block";
  type: "paragraph";
  paragraph: {
    rich_text: Array<{ type: "text"; text: { content: string } }>;
  };
};

function lineToBlock(line: string): Block {
  // Notion rejects rich_text strings >2000 chars. Truncate defensively.
  const content =
    line.length > NOTION_RICH_TEXT_LIMIT
      ? line.slice(0, NOTION_RICH_TEXT_LIMIT)
      : line;
  return {
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: content
        ? [{ type: "text", text: { content } }]
        : [],
    },
  };
}

export async function appendNotesToTask(
  taskId: string,
  notesText: string,
  apiKey: string
): Promise<{ ok: boolean; error?: string }> {
  if (!taskId || !notesText) {
    return { ok: false, error: "missing taskId or notesText" };
  }

  const children = notesText.split("\n").map(lineToBlock);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), APPEND_TIMEOUT_MS);
  try {
    const res = await fetch(
      `${NOTION_PROXY_BASE}/blocks/${taskId}/children`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({ children }),
        signal: controller.signal,
      }
    );
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, error: `HTTP ${res.status}: ${body.slice(0, 300)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  } finally {
    clearTimeout(timer);
  }
}

// -----------------------------------------------------------------------------
// Audit Submissions DB — typed property builder + dedicated create helper.
// Dual-writes alongside the Tasks DB inbox entry so each submission lands in a
// queryable structured store as well as the triage queue.
// -----------------------------------------------------------------------------

const TITLE_LIMIT = 1_900;

type NotionRichText = { type: "text"; text: { content: string } };

type NotionProperty =
  | { title: NotionRichText[] }
  | { rich_text: NotionRichText[] }
  | { email: string | null }
  | { phone_number: string | null }
  | { url: string | null }
  | { number: number | null }
  | { date: { start: string } | null }
  | { select: { name: string } | null }
  | { multi_select: Array<{ name: string }> };

export type NotionProperties = Record<string, NotionProperty>;

function richText(content: string): NotionRichText[] {
  if (!content) return [];
  const trimmed =
    content.length > NOTION_RICH_TEXT_LIMIT
      ? content.slice(0, NOTION_RICH_TEXT_LIMIT)
      : content;
  return [{ type: "text", text: { content: trimmed } }];
}

function titleText(content: string): NotionRichText[] {
  const trimmed = content.length > TITLE_LIMIT ? content.slice(0, TITLE_LIMIT) : content;
  return [{ type: "text", text: { content: trimmed } }];
}

function select(name: string | undefined | null): NotionProperty {
  if (!name || name === "—") return { select: null };
  return { select: { name } };
}

function multiSelect(names: string[]): NotionProperty {
  return { multi_select: names.filter(Boolean).map((name) => ({ name })) };
}

export interface AuditRowInput {
  contact: { name: string; email: string; company: string; phone?: string };
  website?: string;
  referrerSlug?: string | null;
  locale?: string;
  tier: string;
  labels: {
    industry: string;
    teamSize: string;
    revenue: string;
    role: string;
    yearsInBusiness: string;
    location: string;
    aiExperience: string;
    topGoal: string;
    goalsRanked: string[];
    topGoalBlockers: string[];
    budget: string;
    timeline: string;
    decisionMaker: string;
  };
  roi: { hoursPerWeek: number; annualSavings: number };
  robotTask?: string;
  submittedAt: number;
  convexId: string;
  inboxTaskId?: string;
}

export function buildAuditRowProperties(input: AuditRowInput): NotionProperties {
  const { contact, labels, roi } = input;
  return {
    Name: { title: titleText(`${contact.name} — ${contact.company}`) },
    Email: { email: contact.email || null },
    Company: { rich_text: richText(contact.company) },
    Phone: { phone_number: contact.phone || null },
    Website: { url: input.website || null },
    Referrer: select(input.referrerSlug ?? undefined),
    Locale: select(input.locale),
    Tier: select(input.tier),
    Status: { select: { name: "NEW" } },
    Industry: select(labels.industry),
    "Team size": select(labels.teamSize),
    "Revenue band": select(labels.revenue),
    Role: select(labels.role),
    "Years in business": select(labels.yearsInBusiness),
    Location: select(labels.location),
    "AI experience": select(labels.aiExperience),
    "Top goal": select(labels.topGoal),
    "All goals": multiSelect(labels.goalsRanked),
    "Top blockers": { rich_text: richText(labels.topGoalBlockers.join(" / ")) },
    Budget: select(labels.budget),
    Timeline: select(labels.timeline),
    "Decision maker": select(labels.decisionMaker),
    "ROI hrs/week": { number: Number(roi.hoursPerWeek.toFixed(1)) },
    "ROI annual savings (¥)": { number: Math.round(roi.annualSavings) },
    "Robot task": { rich_text: richText(input.robotTask || "") },
    "Submitted at": {
      date: { start: new Date(input.submittedAt).toISOString() },
    },
    "Convex ID": { rich_text: richText(input.convexId) },
    "Inbox task": { rich_text: richText(input.inboxTaskId || "") },
  };
}

export async function createAuditSubmissionRow(args: {
  databaseId: string;
  apiKey: string;
  properties: NotionProperties;
}): Promise<{ ok: boolean; id?: string; error?: string }> {
  const { databaseId, apiKey, properties } = args;
  if (!databaseId) return { ok: false, error: "missing databaseId" };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), APPEND_TIMEOUT_MS);
  try {
    const res = await fetch(`${NOTION_PROXY_BASE}/pages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties,
      }),
      signal: controller.signal,
    });
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, error: `HTTP ${res.status}: ${body.slice(0, 300)}` };
    }
    const json = (await res.json().catch(() => ({}))) as { id?: string };
    return { ok: true, id: json.id };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  } finally {
    clearTimeout(timer);
  }
}
