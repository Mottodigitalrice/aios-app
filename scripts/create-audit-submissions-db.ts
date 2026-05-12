/**
 * One-off setup script: creates the "AIOS Audit Submissions" Notion database
 * under the AIOS project page via the MOTTO API Notion proxy.
 *
 * Run locally:
 *   MOTTO_API_KEY=... npx tsx scripts/create-audit-submissions-db.ts
 *
 * Property option sets are sourced from src/lib/audit-v2/constants.ts and
 * src/lib/audit-v2/goals.ts so this stays in lock-step with the form.
 */

import { GOALS } from "../src/lib/audit-v2/goals";
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
} from "../src/lib/audit-v2/constants";
import { REFERRERS } from "../src/lib/referrers";

const NOTION_PROXY = "https://vps.mottodigital.jp/proxy/notion/v1";
const AIOS_PROJECT_PAGE_ID = "1ede0cb5-63d9-8061-8571-df183897d8e2";

function selectOptions(names: string[]) {
  return { options: names.map((name) => ({ name })) };
}

async function main() {
  const apiKey = process.env.MOTTO_API_KEY;
  const sessionToken = process.env.MOTTO_SESSION_TOKEN;
  if (!apiKey && !sessionToken) {
    console.error(
      "Either MOTTO_API_KEY or MOTTO_SESSION_TOKEN env var required"
    );
    process.exit(1);
  }
  const authHeaders: Record<string, string> = apiKey
    ? { "X-API-Key": apiKey }
    : { "X-Session-Token": sessionToken as string };

  const properties: Record<string, unknown> = {
    Name: { title: {} },
    Email: { email: {} },
    Company: { rich_text: {} },
    Phone: { phone_number: {} },
    Website: { url: {} },
    Referrer: {
      select: selectOptions(Object.keys(REFERRERS)),
    },
    Locale: { select: selectOptions(["ja", "en"]) },
    Tier: { select: selectOptions(["quick", "full"]) },
    Status: {
      select: selectOptions(["NEW", "REVIEWED", "REPORT SENT", "CLOSED"]),
    },
    Industry: { select: selectOptions(INDUSTRIES.map((o) => o.ja)) },
    "Team size": { select: selectOptions(TEAM_SIZES.map((o) => o.ja)) },
    "Revenue band": { select: selectOptions(REVENUE_BANDS.map((o) => o.ja)) },
    Role: { select: selectOptions(ROLES.map((o) => o.ja)) },
    "Years in business": {
      select: selectOptions(YEARS_IN_BUSINESS.map((o) => o.ja)),
    },
    Location: { select: selectOptions(LOCATIONS.map((o) => o.ja)) },
    "AI experience": { select: selectOptions(AI_EXPERIENCE.map((o) => o.ja)) },
    "Top goal": { select: selectOptions(GOALS.map((g) => g.ja)) },
    "All goals": { multi_select: selectOptions(GOALS.map((g) => g.ja)) },
    "Top blockers": { rich_text: {} },
    Budget: { select: selectOptions(BUDGET_OPTIONS.map((o) => o.ja)) },
    Timeline: { select: selectOptions(TIMELINE_OPTIONS.map((o) => o.ja)) },
    "Decision maker": {
      select: selectOptions(DECISION_MAKER_OPTIONS.map((o) => o.ja)),
    },
    "ROI hrs/week": { number: { format: "number_with_commas" } },
    "ROI annual savings (¥)": { number: { format: "yen" } },
    "Robot task": { rich_text: {} },
    "Submitted at": { date: {} },
    "Convex ID": { rich_text: {} },
    "Inbox task": { rich_text: {} },
  };

  const body = {
    parent: { type: "page_id", page_id: AIOS_PROJECT_PAGE_ID },
    title: [{ type: "text", text: { content: "AIOS Audit Submissions" } }],
    properties,
  };

  const res = await fetch(`${NOTION_PROXY}/databases`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();
  if (!res.ok) {
    console.error("Failed to create database:", res.status, json);
    process.exit(1);
  }

  console.log(`✓ Created database: ${json.id}`);
  if (json.url) console.log(`  URL: ${json.url}`);
  console.log(`  Add to Vercel env: AUDIT_SUBMISSIONS_DB_ID=${json.id}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
