import { NextRequest, NextResponse } from "next/server";
import { isDuplicateRequest } from "@/lib/dedup";
import {
  appendNotesToTask,
  AIOS_PROJECT_ID,
  MOTTO_API_TASKS_URL,
} from "@/lib/motto-api";

const WEBHOOK_TIMEOUT_MS = 10_000;

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

export async function POST(req: NextRequest) {
  try {
    const dedup = isDuplicateRequest(req.headers.get("x-request-id"));
    if (dedup === true) {
      return NextResponse.json({ success: true, duplicate: true });
    }

    let data: {
      firstName: string;
      lastName: string;
      email: string;
      company: string;
      date: string;
      referralSources: string[];
      referralOther: string;
      locale: string;
    };

    try {
      data = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON in request body" }, { status: 400 });
    }

    const required = { email: data.email, firstName: data.firstName, date: data.date };
    const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    const fullName = `${data.firstName} ${data.lastName}`.trim();
    const referral = [
      ...data.referralSources,
      ...(data.referralOther ? [`Other: ${data.referralOther}`] : []),
    ].join(", ") || "N/A";

    const payload = {
      firstName: data.firstName,
      lastName: data.lastName,
      name: fullName,
      email: data.email,
      company: data.company || "N/A",
      date: data.date,
      referral,
      source: "Webinar Registration",
      locale: data.locale || "ja",
      createdAt: Date.now(),
    };

    // Forward to n8n webinar webhook
    const webhookPromise = fetchWithTimeout(
      "https://n8n.mottodigital.jp/webhook/webinar-registration",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    ).catch(console.error);

    // Create MOTTO API task (lands in same Audit Leads project, tagged as Webinar)
    //
    // Page-body append patch: the MOTTO API server silently drops the `notes`
    // field on POST /tasks (see 2026-05-12 work-log P0 fix). Capture the task
    // id and PATCH the same text as paragraph blocks via the Notion proxy so
    // the registrant details actually land on the Notion page body.
    const mottoApiKey = process.env.MOTTO_API_KEY;
    const notesText = [
      `Source: Webinar Registration`,
      `Name: ${fullName}`,
      `Email: ${data.email}`,
      `Company: ${data.company || "N/A"}`,
      `Session: ${data.date}`,
      `How they heard: ${referral}`,
      `Locale: ${data.locale || "ja"}`,
    ].join("\n");

    const notionPromise = mottoApiKey
      ? fetchWithTimeout(MOTTO_API_TASKS_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": mottoApiKey,
          },
          body: JSON.stringify({
            name: `AIOS Webinar: ${fullName} — ${data.date}`,
            projectId: AIOS_PROJECT_ID,
            status: "INBOX",
            notes: notesText,
          }),
        })
          .then(async (response) => {
            if (!response.ok) {
              throw new Error(`Webinar task creation failed: ${response.status}`);
            }
            const json = (await response.json().catch(() => ({}))) as { id?: string };
            if (json.id) {
              const append = await appendNotesToTask(json.id, notesText, mottoApiKey);
              if (!append.ok) {
                console.error("webinar notes append failed:", append.error);
              }
            }
            return json;
          })
          .catch(console.error)
      : Promise.resolve();

    // Forward to Cloud n8n for confirmation email (fire and forget)
    const emailPromise = fetchWithTimeout(
      "https://mottodigitalpro.app.n8n.cloud/webhook/webinar-confirmation-email",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    ).catch(console.error);

    // Schedule reminder emails (24h + 1h before session) via Cloud n8n
    const reminderPromise = fetchWithTimeout(
      "https://mottodigitalpro.app.n8n.cloud/webhook/webinar-reminder-sequence",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    ).catch(console.error);

    await Promise.allSettled([webhookPromise, notionPromise, emailPromise, reminderPromise]);

    return NextResponse.json({ success: true, message: "Registration submitted" });
  } catch (error) {
    console.error("Webinar API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
