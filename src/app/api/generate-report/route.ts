import { NextRequest, NextResponse } from "next/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

/**
 * POST /api/generate-report
 *
 * Triggers AI report generation for an audit lead.
 * Protected by REPORT_API_KEY — intended for n8n webhooks and admin use.
 *
 * Body: { leadId: string }
 * Headers: Authorization: Bearer <REPORT_API_KEY>
 */
export async function POST(req: NextRequest) {
  // Auth check
  const authHeader = req.headers.get("authorization");
  const expectedKey = process.env.REPORT_API_KEY;

  if (!expectedKey) {
    return NextResponse.json(
      { error: "REPORT_API_KEY not configured" },
      { status: 500 }
    );
  }

  if (authHeader !== "Bearer " + expectedKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { leadId } = await req.json();

    if (!leadId) {
      return NextResponse.json(
        { error: "leadId is required" },
        { status: 400 }
      );
    }

    // Trigger the Convex action
    const result = await convex.action(
      api.functions.auditReports.generateReport,
      { leadId: leadId as Id<"auditLeads"> }
    );

    return NextResponse.json({
      success: true,
      reportId: result.reportId,
      score: result.score,
      reportUrl: "/report/" + String(result.reportId),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[generate-report]", message);

    return NextResponse.json(
      { error: message },
      { status: message.includes("already exists") ? 409 : 500 }
    );
  }
}
