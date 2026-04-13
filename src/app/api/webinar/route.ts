import { NextRequest, NextResponse } from "next/server";
import { isDuplicateRequest } from "@/lib/dedup";

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
    const mottoApiKey = process.env.MOTTO_API_KEY;
    const notionPromise = mottoApiKey
      ? fetchWithTimeout("https://vps.mottodigital.jp/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": mottoApiKey,
          },
          body: JSON.stringify({
            name: `AIOS Webinar: ${fullName} — ${data.date}`,
            projectId: "1ede0cb5-63d9-8061-8571-df183897d8e2",
            status: "INBOX",
            notes: [
              `Source: Webinar Registration`,
              `Name: ${fullName}`,
              `Email: ${data.email}`,
              `Company: ${data.company || "N/A"}`,
              `Session: ${data.date}`,
              `How they heard: ${referral}`,
              `Locale: ${data.locale || "ja"}`,
            ].join("\n"),
          }),
        }).catch(console.error)
      : Promise.resolve();

    await Promise.allSettled([webhookPromise, notionPromise]);

    return NextResponse.json({ success: true, message: "Registration submitted" });
  } catch (error) {
    console.error("Webinar API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
