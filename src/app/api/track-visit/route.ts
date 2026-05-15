import { NextRequest, NextResponse } from "next/server";
import {
  isKnownReferrer,
  getReferrerDisplayName,
  REFERRAL_EVENTS_PROJECT_ID,
} from "@/lib/referrers";
import { appendNotesToTask, MOTTO_API_TASKS_URL } from "@/lib/motto-api";

const BOT_UA = /bot|crawl|spider|preview|facebook|linkedinbot|googlebot|bingbot|slurp|duckduckbot/i;

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
    const NOTION_TIMEOUT_MS = 5000;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), NOTION_TIMEOUT_MS);
    const notesText = [
      `Event: visit`,
      `Referrer: ${slug}`,
      `Locale: ${body.locale || "—"}`,
      `Path: ${body.path || "—"}`,
      `UA: ${ua.slice(0, 300)}`,
      `Timestamp: ${new Date().toISOString()}`,
    ].join("\n");
    try {
      const res = await fetch(MOTTO_API_TASKS_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({
          name: `[VISIT] ${displayName} — ${stamp}`,
          projectId: REFERRAL_EVENTS_PROJECT_ID,
          status: "INBOX",
          notes: notesText,
        }),
        signal: controller.signal,
      });
      if (res.ok) {
        const json = (await res.json().catch(() => ({}))) as { id?: string };
        if (json.id) {
          const append = await appendNotesToTask(json.id, notesText, apiKey);
          if (!append.ok) {
            console.error("track-visit body append failed:", append.error);
          }
        } else {
          console.error("track-visit POST /tasks response missing id");
        }
      } else {
        console.error(`track-visit POST /tasks HTTP ${res.status}`);
      }
    } catch (e) {
      console.error("track-visit notion write failed:", e);
    } finally {
      clearTimeout(timer);
    }
  }

  return new NextResponse(null, { status: 204 });
}
