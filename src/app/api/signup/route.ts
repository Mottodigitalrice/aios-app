import { NextRequest, NextResponse } from "next/server";
import { isDuplicateRequest } from "@/lib/dedup";

const WEBHOOK_TIMEOUT_MS = 10_000;
const AIOS_PROJECT_ID = "1ede0cb5-63d9-8061-8571-df183897d8e2";
const AIOS_SIGNUPS_DATABASE_ID =
  process.env.AIOS_SIGNUPS_DATABASE_ID || "34be0cb5-63d9-817d-b5ad-f7bc77418e3e";

function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${WEBHOOK_TIMEOUT_MS}ms: ${url}`)), WEBHOOK_TIMEOUT_MS)
    ),
  ]);
}

function toRichText(content?: string) {
  if (!content) return [];

  const normalized = String(content).trim();
  if (!normalized) return [];

  const chunks = normalized.match(/[\s\S]{1,1900}/g) || [normalized];
  return chunks.map((chunk) => ({
    type: "text" as const,
    text: { content: chunk },
  }));
}

async function parseJsonSafely(response: Response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    // Dedup check — prevent double-clicks / page refreshes
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

    // Validate required fields
    const required = { track: data.track, signupType: data.signupType, name: data.name, email: data.email, goals: data.goals, startPreference: data.startPreference, referralSource: data.referralSource };
    const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const signup = {
      ...data,
      status: "pending",
      createdAt: Date.now(),
    };

    // Format cohort-specific fields for Notion notes
    const isCohort = data.signupType === "cohort";
    const availabilitySummary = isCohort && Array.isArray(data.availability)
      ? data.availability
          .filter((a: { commitment: string }) => a.commitment !== "no")
          .map((a: { slotId: string; commitment: string }) => `${a.slotId} (${a.commitment})`)
          .join(", ") || "— none marked —"
      : "N/A";
    const paymentSummary = isCohort && data.paymentPlan
      ? data.paymentPlan === "upfront"
        ? "Upfront ¥100,000"
        : "Monthly ¥20,000 × 6"
      : "N/A";
    const commsSummary = isCohort
      ? `LINE: ${data.lineAdded ? "added" : "NOT added"} | Slack: ${data.slackOptIn === true ? "opted in" : "declined"}`
      : "N/A";

    // Forward to n8n webhook (fire and forget)
    const webhookPromise = fetchWithTimeout(
      "https://n8n.mottodigital.jp/webhook/aios-signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      }
    ).catch(console.error);

    // Forward to MOTTO API for Notion (fire and forget)
    const mottoApiKey = process.env.MOTTO_API_KEY;
    const taskPromise = mottoApiKey
      ? fetchWithTimeout("https://vps.mottodigital.jp/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": mottoApiKey,
          },
          body: JSON.stringify({
            name: `AIOS Signup: ${data.name} (${data.signupType})`,
            projectId: AIOS_PROJECT_ID,
            status: "INBOX",
            notes: `Track: ${data.track}\nLanguage: ${data.languageTrack || data.locale || "ja"}\nSignup Type: ${data.signupType}\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "N/A"}\nRole: ${data.role || "N/A"}\nGoals: ${data.goals}\nPain Points: ${data.painPoints || "N/A"}\nTeam Size: ${data.teamSize || "N/A"}\nStart Preference: ${data.startPreference}\nReferral: ${data.referralSource}\nNotes: ${data.notes || "N/A"}\n---\nAvailability: ${availabilitySummary}\nPayment: ${paymentSummary}\nComms: ${commsSummary}`,
          }),
        })
          .then(async (response) => {
            if (!response.ok) {
              throw new Error(`Task creation failed: ${response.status}`);
            }
            return await parseJsonSafely(response);
          })
          .catch((error) => {
            console.error(error);
            return null;
          })
      : Promise.resolve();

    const signupRecordPromise = mottoApiKey
      ? taskPromise.then(async (task) => {
          const properties: Record<string, unknown> = {
            Name: {
              title: [{ type: "text", text: { content: data.name } }],
            },
            "Submitted At": {
              date: { start: new Date(signup.createdAt).toISOString() },
            },
            Email: { email: data.email },
            Track: { select: { name: data.track } },
            "Signup Type": { select: { name: data.signupType } },
            Status: { select: { name: signup.status } },
            Language: {
              select: { name: data.languageTrack || data.locale || "ja" },
            },
            Company: { rich_text: toRichText(data.company || "") },
            Role: { rich_text: toRichText(data.role || "") },
            Goals: { rich_text: toRichText(data.goals) },
            "Pain Points": { rich_text: toRichText(data.painPoints || "") },
            "Start Preference": {
              rich_text: toRichText(data.startPreference),
            },
            "Referral Source": {
              rich_text: toRichText(data.referralSource),
            },
            Notes: { rich_text: toRichText(data.notes || "") },
            Availability: { rich_text: toRichText(availabilitySummary) },
            "LINE Added": { checkbox: Boolean(data.lineAdded) },
            "Slack Opt-In": { checkbox: data.slackOptIn === true },
            Source: { select: { name: "website_signup" } },
          };

          if (typeof data.teamSize === "number") {
            properties["Team Size"] = { number: data.teamSize };
          }

          if (data.paymentPlan) {
            properties["Payment Plan"] = {
              select: { name: data.paymentPlan },
            };
          }

          if (task && typeof task.url === "string") {
            properties["Task URL"] = { url: task.url };
          }

          const response = await fetchWithTimeout(
            "https://vps.mottodigital.jp/proxy/notion/v1/pages",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "X-API-Key": mottoApiKey,
              },
              body: JSON.stringify({
                parent: { database_id: AIOS_SIGNUPS_DATABASE_ID },
                properties,
              }),
            }
          );

          if (!response.ok) {
            throw new Error(`Signup DB write failed: ${response.status}`);
          }

          return await parseJsonSafely(response);
        }).catch((error) => {
          console.error(error);
          return null;
        })
      : Promise.resolve();

    // Forward to Cloud n8n for confirmation email (fire and forget)
    const emailPromise = fetchWithTimeout(
      "https://mottodigitalpro.app.n8n.cloud/webhook/aios-signup-email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signup),
      }
    ).catch(console.error);

    // Wait for all (but don't fail if webhooks fail)
    await Promise.allSettled([
      webhookPromise,
      taskPromise,
      signupRecordPromise,
      emailPromise,
    ]);

    return NextResponse.json({ success: true, message: "Signup received" });
  } catch (error) {
    console.error("Signup API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
