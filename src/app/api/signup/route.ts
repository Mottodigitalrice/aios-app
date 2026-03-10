import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
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
    const required = { track: data.track, name: data.name, email: data.email, goals: data.goals, startPreference: data.startPreference, referralSource: data.referralSource };
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

    // Forward to n8n webhook (fire and forget)
    const webhookPromise = fetch(
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
      ? fetch("https://vps.mottodigital.jp/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-API-Key": mottoApiKey,
          },
          body: JSON.stringify({
            name: `AIOS Signup: ${data.name} (${data.track}${data.plan ? ` - ${data.plan}` : ""})`,
            projectId: "1ede0cb5-63d9-8061-8571-df183897d8e2",
            status: "INBOX",
            notes: `Track: ${data.track}\nPlan: ${data.plan || "N/A"}\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company || "N/A"}\nRole: ${data.role || "N/A"}\nGoals: ${data.goals}\nPain Points: ${data.painPoints || "N/A"}\nTeam Size: ${data.teamSize || "N/A"}\nStart Preference: ${data.startPreference}\nReferral: ${data.referralSource}\nNotes: ${data.notes || "N/A"}`,
          }),
        }).catch(console.error)
      : Promise.resolve();

    // Wait for both (but don't fail if webhooks fail)
    await Promise.allSettled([webhookPromise, notionPromise]);

    return NextResponse.json({ success: true, message: "Signup received" });
  } catch (error) {
    console.error("Signup API error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
