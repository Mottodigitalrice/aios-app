import { NextRequest, NextResponse } from "next/server";
import { isDuplicateRequest } from "@/lib/dedup";

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
    const required = { email: data.email, name: data.name, perspective: data.perspective };
    const missing = Object.entries(required).filter(([, v]) => !v).map(([k]) => k);
    if (missing.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missing.join(", ")}` },
        { status: 400 }
      );
    }

    // Convert arrays to comma-separated strings for downstream consumers
    const tools = Array.isArray(data.tools) ? data.tools.join(", ") : (data.tools || "");
    const challenge = Array.isArray(data.challenge) ? data.challenge.join(", ") : (data.challenge || "");
    const bottlenecks = Array.isArray(data.bottlenecks) ? data.bottlenecks.join(", ") : (data.bottlenecks || "");
    const dataLocation = Array.isArray(data.dataLocation) ? data.dataLocation.join(", ") : (data.dataLocation || "");
    const sixMonthVision = Array.isArray(data.sixMonthVision) ? data.sixMonthVision.join(", ") : (data.sixMonthVision || "");

    const payload = {
      ...data,
      tools,
      challenge,
      bottlenecks,
      dataLocation,
      sixMonthVision,
      status: "pending",
      createdAt: Date.now(),
    };

    // Forward to n8n webhook (fire and forget)
    const webhookPromise = fetch(
      "https://n8n.mottodigital.jp/webhook/free-audit-intake",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    ).catch(console.error);

    // Forward to MOTTO API for Notion task creation (fire and forget)
    const mottoApiKey = process.env.MOTTO_API_KEY;
    const notionPromise = mottoApiKey
      ? fetch("https://vps.mottodigital.jp/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": mottoApiKey,
          },
          body: JSON.stringify({
            name: `AIOS Audit: ${data.name} (${data.perspective})`,
            projectId: "1ede0cb5-63d9-8061-8571-df183897d8e2",
            status: "INBOX",
            notes: `Name: ${data.name}\nEmail: ${data.email}\nPerspective: ${data.perspective}\nRole: ${data.role || "N/A"}\nCompany: ${data.company || "N/A"}\nEmployees: ${data.employees || "N/A"}\nWork Type: ${data.workType || "N/A"}\nUse Case: ${data.useCase || "N/A"}\nData Maturity: ${data.dataMaturity || "N/A"}\nData Confidence: ${data.dataConfidence ?? "N/A"}\nData Location: ${dataLocation || "N/A"}\nData Restructuring Openness: ${data.dataRestructuringOpenness || "N/A"}\nTools: ${tools || "N/A"}\nChallenges: ${challenge || "N/A"}${data.challengeOther ? ` (Other: ${data.challengeOther})` : ""}\nBottlenecks: ${bottlenecks || "N/A"}\nRepetitive Hours/Week: ${data.repetitiveHoursPerWeek || "N/A"}\nAI Experience: ${data.aiExperience || "N/A"}\n6-Month Vision: ${sixMonthVision || "N/A"}${data.sixMonthVisionOther ? ` (Other: ${data.sixMonthVisionOther})` : ""}\nAI Budget: ${data.aiBudget || "N/A"}\nAI Tried Before: ${data.aiTriedBefore || "N/A"}\nAI Timeline: ${data.aiTimeline || "N/A"}\nSource: ${data.source || "N/A"}\nPreferred Time: ${data.preferredTime || "N/A"}\nWebsite: ${data.website || "N/A"}`,
          }),
        }).catch(console.error)
      : Promise.resolve();

    // Wait for both (but don't fail if webhooks fail)
    await Promise.allSettled([webhookPromise, notionPromise]);

    return NextResponse.json({ success: true, message: "Audit submitted" });
  } catch (error) {
    console.error("Audit API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
