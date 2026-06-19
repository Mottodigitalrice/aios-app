import { NextRequest, NextResponse } from "next/server";
import { chat, chatStream, ModelKey, MODELS } from "@/lib/openrouter";

// DEFENSE-IN-DEPTH ONLY: this endpoint is still UNAUTHENTICATED.
// The additions below (per-IP rate limit, model allowlist, input caps) are
// mitigations to reduce abuse/cost — they are NOT a substitute for AUTH.
// Proper auth (Clerk) is still required and is tracked separately.

// Per-IP in-memory rate limit: 20 requests / 60s.
// Note: in-memory only — resets per server instance / cold start. A real fix
// uses a shared store + auth; this is a best-effort abuse/cost cap.
const RATE_LIMIT_MAX = 20;
const RATE_LIMIT_WINDOW_MS = 60_000;
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > RATE_LIMIT_MAX;
}

// Input caps
const MAX_MESSAGES = 20;
const MAX_MESSAGES_JSON_CHARS = 20_000;

export async function POST(req: NextRequest) {
  try {
    // Per-IP rate limit (defense-in-depth — see note above; AUTH still required).
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (isRateLimited(ip)) {
      return new Response(JSON.stringify({ error: "rate limited" }), {
        status: 429,
      });
    }

    const { messages, model = "fast", stream = false } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Messages array required" },
        { status: 400 }
      );
    }

    // Validate model against the allowlist (default 'fast' is kept above).
    if (model && !(model in MODELS)) {
      return NextResponse.json({ error: "Invalid model" }, { status: 400 });
    }

    // Cap inputs: message count + total serialized size.
    if (messages.length === 0 || messages.length > MAX_MESSAGES) {
      return NextResponse.json(
        { error: "Invalid messages length" },
        { status: 400 }
      );
    }
    if (JSON.stringify(messages).length > MAX_MESSAGES_JSON_CHARS) {
      return NextResponse.json(
        { error: "Messages too large" },
        { status: 400 }
      );
    }

    if (stream) {
      // Return streaming response
      const streamResponse = await chatStream(messages, model as ModelKey);

      const encoder = new TextEncoder();
      const readableStream = new ReadableStream({
        async start(controller) {
          for await (const chunk of streamResponse) {
            const text = chunk.choices[0]?.delta?.content || "";
            controller.enqueue(encoder.encode(text));
          }
          controller.close();
        },
      });

      return new Response(readableStream, {
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    } else {
      // Return complete response
      const content = await chat(messages, model as ModelKey);
      return NextResponse.json({ content });
    }
  } catch (error) {
    console.error("AI API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
