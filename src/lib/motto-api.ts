// Helpers for talking to the MOTTO API / Notion proxy from Next.js route handlers.
//
// The MOTTO API's POST /tasks endpoint silently drops the `notes` field — it never
// makes it onto the created Notion page. This module patches around that bug at
// the call site by appending the notes string as page-body paragraph blocks via
// the same proxy used everywhere else.

const NOTION_PROXY_BASE = "https://vps.mottodigital.jp/proxy/notion/v1";
const APPEND_TIMEOUT_MS = 5_000;
const NOTION_RICH_TEXT_LIMIT = 1_900; // Notion hard limit is 2000; leave headroom

type Block = {
  object: "block";
  type: "paragraph";
  paragraph: {
    rich_text: Array<{ type: "text"; text: { content: string } }>;
  };
};

function lineToBlock(line: string): Block {
  // Notion rejects rich_text strings >2000 chars. Truncate defensively.
  const content =
    line.length > NOTION_RICH_TEXT_LIMIT
      ? line.slice(0, NOTION_RICH_TEXT_LIMIT)
      : line;
  return {
    object: "block",
    type: "paragraph",
    paragraph: {
      rich_text: content
        ? [{ type: "text", text: { content } }]
        : [],
    },
  };
}

export async function appendNotesToTask(
  taskId: string,
  notesText: string,
  apiKey: string
): Promise<{ ok: boolean; error?: string }> {
  if (!taskId || !notesText) {
    return { ok: false, error: "missing taskId or notesText" };
  }

  const children = notesText.split("\n").map(lineToBlock);

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), APPEND_TIMEOUT_MS);
  try {
    const res = await fetch(
      `${NOTION_PROXY_BASE}/blocks/${taskId}/children`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "X-API-Key": apiKey,
        },
        body: JSON.stringify({ children }),
        signal: controller.signal,
      }
    );
    if (!res.ok) {
      const body = await res.text().catch(() => "");
      return { ok: false, error: `HTTP ${res.status}: ${body.slice(0, 300)}` };
    }
    return { ok: true };
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) };
  } finally {
    clearTimeout(timer);
  }
}
