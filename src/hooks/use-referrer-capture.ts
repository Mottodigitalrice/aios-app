"use client";

import { useEffect, useState } from "react";
import { isKnownReferrer, REFERRER_STORAGE } from "@/lib/referrers";

export function useReferrerCapture(): string | null {
  const [referrer, setReferrer] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    const urlRef = params.get("ref");

    let active: string | null = null;

    if (isKnownReferrer(urlRef)) {
      active = urlRef;
      try {
        localStorage.setItem(REFERRER_STORAGE.slugKey, active);
        localStorage.setItem(
          REFERRER_STORAGE.expiresKey,
          String(Date.now() + REFERRER_STORAGE.ttlMs)
        );
      } catch {
        // private mode / quota: still attribute this session via state
      }
    } else {
      try {
        const stored = localStorage.getItem(REFERRER_STORAGE.slugKey);
        const expires = Number(
          localStorage.getItem(REFERRER_STORAGE.expiresKey) || 0
        );
        if (stored && isKnownReferrer(stored) && expires > Date.now()) {
          active = stored;
        } else if (stored) {
          localStorage.removeItem(REFERRER_STORAGE.slugKey);
          localStorage.removeItem(REFERRER_STORAGE.expiresKey);
        }
      } catch {
        // private mode: no fallback available
      }
    }

    setReferrer(active);

    if (active) {
      let alreadyFired = false;
      try {
        alreadyFired = !!sessionStorage.getItem(REFERRER_STORAGE.sessionFiredKey);
      } catch {
        // ignore
      }

      if (!alreadyFired) {
        try {
          sessionStorage.setItem(REFERRER_STORAGE.sessionFiredKey, "1");
        } catch {
          // ignore
        }
        fetch("/api/track-visit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            referrer: active,
            locale: document.documentElement.lang || undefined,
            path: window.location.pathname,
          }),
          keepalive: true,
        }).catch(() => {
          // silent
        });
      }
    }
  }, []);

  return referrer;
}
