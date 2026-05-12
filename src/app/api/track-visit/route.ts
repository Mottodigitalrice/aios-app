import { NextRequest, NextResponse } from "next/server";
import {
  isKnownReferrer,
  getReferrerDisplayName,
  REFERRAL_EVENTS_PROJECT_ID,
} from "@/lib/referrers";

const BOT_UA = /bot|crawl|spider|preview|facebook|linkedinbot|googlebot|bingbot|slurp|duckduckbot/i;
const MOTTO_API = "https://vps.mottodigital.jp/tasks";

export async function POST(req: NextRequest) {
  let body: { referrer?: string; locale?: string; path?: string } = {};
  try {
    body = await req.json();
  } catch {
    // tolerate empty body
  }

  const ua = req.headers.get("user-agent") || "";
  const isBot = BOT_UA.test(ua);
  const slug = body.referrer;
  const accepted = isKnownReferrer(slug) && !isBot;
  const rejectedReason = !isKnownReferrer(slug)
    ? "unknown-slug"
    : isBot
      ? "bot-ua"
      : null;

  console.log(
    JSON.stringify({
      event: "referral.visit",
      referrer: slug,
      accepted,
      rejectedReason,
      locale: body.locale,
      path: body.path,
      ua: ua.slice(0, 200),
      ts: new Date().toISOString(),
    })
  );

  if (!accepted) {
    return new NextResponse(null, { status: 204 });
  }

  const apiKey = process.env.MOTTO_API_KEY;
  if (apiKey && REFERRAL_EVENTS_PROJECT_ID) {
    const displayName = getReferrerDisplayName(slug);
    const stamp = new Date().toISOString().slice(0, 16).replace("T", " ");
    fetch(MOTTO_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-API-Key": apiKey,
      },
      body: JSON.stringify({
        name: `[VISIT] ${displayName} — ${stamp}`,
        projectId: REFERRAL_EVENTS_PROJECT_ID,
        status: "INBOX",
        notes: [
          `Event: visit`,
          `Referrer: ${slug}`,
          `Locale: ${body.locale || "—"}`,
          `Path: ${body.path || "—"}`,
          `UA: ${ua.slice(0, 300)}`,
          `Timestamp: ${new Date().toISOString()}`,
        ].join("\n"),
      }),
    }).catch((e) => console.error("track-visit notion write failed:", e));
  }

  return new NextResponse(null, { status: 204 });
}
