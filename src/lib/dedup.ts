/**
 * Simple in-memory request deduplication.
 * Tracks request IDs to prevent duplicate form submissions
 * from double-clicks or page refreshes.
 */

const MAX_SIZE = 1000;
const TTL_MS = 5 * 60 * 1000; // 5 minutes

const seen = new Map<string, number>(); // requestId -> timestamp

function cleanup() {
  const now = Date.now();
  seen.forEach((ts, id) => {
    if (now - ts > TTL_MS) {
      seen.delete(id);
    }
  });
}

/**
 * Check if a requestId has been seen before.
 * Returns true if this is a duplicate request.
 * Returns false (or null if no requestId header) if it should be processed normally.
 */
export function isDuplicateRequest(requestId: string | null): boolean | null {
  if (!requestId) return null; // No header — backwards compatible, process normally

  // Periodic cleanup when map gets large
  if (seen.size > MAX_SIZE) {
    cleanup();
  }

  if (seen.has(requestId)) {
    return true; // Duplicate
  }

  seen.set(requestId, Date.now());
  return false; // First time — process normally
}
