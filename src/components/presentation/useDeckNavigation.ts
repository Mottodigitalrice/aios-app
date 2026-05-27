"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Keyboard + mouse + touch navigation for slide decks.
 *
 * Keyboard:
 *   - ArrowRight / Space / Enter → advance
 *   - ArrowLeft / Backspace → goBack
 *   - N → toggle presenter notes
 *
 * Touch:
 *   - Swipe left → advance
 *   - Swipe right → goBack
 *
 * The page-level click/right-click handlers stay on the root container
 * (so they can be wired alongside other root-level handlers); this hook
 * exposes `advance` and `goBack` for that wiring.
 *
 * Extracted from the AIOS ks-brand deck.
 */
export function useDeckNavigation(totalSteps: number) {
  const [globalStep, setGlobalStep] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const prevGlobalStepRef = useRef(0);

  const advance = useCallback(() => {
    setGlobalStep((s) => {
      const next = Math.min(s + 1, totalSteps - 1);
      if (next > s) setDirection("forward");
      return next;
    });
  }, [totalSteps]);

  const goBack = useCallback(() => {
    setGlobalStep((s) => {
      const prev = Math.max(s - 1, 0);
      if (prev < s) setDirection("backward");
      return prev;
    });
  }, []);

  // Track previous globalStep for slide change detection
  useEffect(() => {
    prevGlobalStepRef.current = globalStep;
  }, [globalStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        advance();
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        goBack();
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setShowNotes((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [advance, goBack]);

  // Touch swipe support for mobile navigation
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      // Only register horizontal swipes (min 50px, more horizontal than vertical)
      if (absDx > 50 && absDx > absDy * 1.5) {
        if (dx < 0) advance();  // swipe left = forward
        else goBack();          // swipe right = back
        e.preventDefault();
      }
      touchStartRef.current = null;
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [advance, goBack]);

  return {
    globalStep,
    setGlobalStep,
    direction,
    advance,
    goBack,
    showNotes,
    setShowNotes,
  };
}
