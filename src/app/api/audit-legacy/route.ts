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
    const webhookPromise = fetchWithTimeout(
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
      ? fetchWithTimeout("https://vps.mottodigital.jp/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": mottoApiKey,
          },
          body: JSON.stringify({
            name: `AIOS Audit: ${data.name} (${data.perspective})`,
            projectId: "1ede0cb5-63d9-8061-8571-df183897d8e2",
            status: "INBOX",
            notes: [
              `Name: ${data.name}`,
              `Email: ${data.email}`,
              `Perspective: ${data.perspective}`,
              `Role: ${data.role || "N/A"}`,
              `Company: ${data.company || "N/A"}`,
              `Industry: ${data.industry || "N/A"}`,
              `Employees: ${data.employees || "N/A"}`,
              `Revenue Range: ${data.revenueRange || "N/A"}`,
              `Team Composition: ${data.teamComposition || "N/A"}`,
              `Department Name: ${data.departmentName || "N/A"}`,
              `Department Size: ${data.departmentSize || "N/A"}`,
              `Department Function: ${data.departmentFunction || "N/A"}`,
              `Typical Day: ${data.typicalDay || "N/A"}`,
              `Data Maturity: ${data.dataMaturity || "N/A"}`,
              `Data Confidence: ${data.dataConfidence ?? "N/A"}`,
              `Data Location: ${dataLocation || "N/A"}`,
              `Data Restructuring Openness: ${data.dataRestructuringOpenness || "N/A"}`,
              `Process Documentation: ${data.processDocumentation || "N/A"}`,
              `Tool Autonomy: ${data.toolAutonomy || "N/A"}`,
              `Tools: ${tools || "N/A"}`,
              `Challenges: ${challenge || "N/A"}${data.challengeOther ? ` (Other: ${data.challengeOther})` : ""}`,
              `Bottlenecks: ${bottlenecks || "N/A"}`,
              `Repetitive Hours/Week: ${data.repetitiveHoursPerWeek || "N/A"}`,
              `Robot Task: ${data.robotTask || "N/A"}`,
              `Onboarding Process: ${data.onboardingProcess || "N/A"}`,
              `Cross-Dept Dependency: ${data.crossDeptDependency || "N/A"}`,
              `AI Experience: ${data.aiExperience || "N/A"}`,
              `6-Month Vision: ${sixMonthVision || "N/A"}${data.sixMonthVisionOther ? ` (Other: ${data.sixMonthVisionOther})` : ""}`,
              `AI Budget: ${data.aiBudget || "N/A"}`,
              `AI Tried Before: ${data.aiTriedBefore || "N/A"}`,
              `AI Timeline: ${data.aiTimeline || "N/A"}`,
              `Decision Maker: ${data.decisionMaker || "N/A"}`,
              `Source: ${data.source || "N/A"}`,
              `Preferred Time: ${data.preferredTime || "N/A"}`,
              `Website: ${data.website || "N/A"}`,
            ].join("\n"),
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
