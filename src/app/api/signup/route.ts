import { NextRequest, NextResponse } from "next/server";
import { isDuplicateRequest } from "@/lib/dedup";

const WEBHOOK_TIMEOUT_MS = 10_000;

function fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
  return Promise.race([
    fetch(url, options),
    new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error(`Timeout after ${WEBHOOK_TIMEOUT_MS}ms: ${url}`)), WEBHOOK_TIMEOUT_MS)
    ),
  ]);
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
    const notionPromise = mottoApiKey
      ? fetchWithTimeout("https://vps.mottodigital.jp/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": mottoApiKey,
          },
          body: JSON.stringify({
            name: `AIOS Signup: ${data.name} (${data.signupType})`,
            projectId: "1ede0cb5-63d9-8061-8571-df183897d8e2",
            status: "INBOX",
            notes: `Track: ${data.track}\nLanguage: ${data.languageTrack || data.locale || "ja"}\nSignup Type: ${data.signupType}\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "N/A"}\nRole: ${data.role || "N/A"}\nGoals: ${data.goals}\nPain Points: ${data.painPoints || "N/A"}\nTeam Size: ${data.teamSize || "N/A"}\nStart Preference: ${data.startPreference}\nReferral: ${data.referralSource}\nNotes: ${data.notes || "N/A"}\n---\nAvailability: ${availabilitySummary}\nPayment: ${paymentSummary}\nComms: ${commsSummary}`,
          }),
        }).catch(console.error)
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
    await Promise.allSettled([webhookPromise, notionPromise, emailPromise]);

    return NextResponse.json({ success: true, message: "Signup received" });
  } catch (error) {
    console.error("Signup API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
