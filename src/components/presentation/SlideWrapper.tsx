"use client";

import { useEffect, useRef, useState } from "react";

/* ============ Slide Wrapper with Transitions ============ */

export function SlideWrapper({
  active,
  children,
  transition,
  direction,
}: {
  active: boolean;
  children: React.ReactNode;
  transition: "scale" | "slide" | "stagger";
  direction: "forward" | "backward";
}) {
  const [shouldRender, setShouldRender] = useState(active);
  const [animClass, setAnimClass] = useState("");
  const prevActive = useRef(active);

  // Ensure shouldRender stays true while active
  if (active && !shouldRender) {
    setShouldRender(true);
  }

  useEffect(() => {
    if (active && !prevActive.current) {
      // Enter animation
      requestAnimationFrame(() => {
        if (transition === "scale") {
          setAnimClass("pres-enter-scale");
        } else if (transition === "stagger") {
          setAnimClass("pres-enter-stagger");
        } else {
          setAnimClass(direction === "forward" ? "pres-enter-right" : "pres-enter-left");
        }
      });
    } else if (!active && prevActive.current) {
      // Exit animation — use rAF to avoid synchronous setState in effect
      requestAnimationFrame(() => {
        if (transition === "scale") {
          setAnimClass("pres-exit-scale");
        } else {
          setAnimClass(direction === "forward" ? "pres-exit-right" : "pres-exit-left");
        }
      });
      const timer = setTimeout(() => {
        setShouldRender(false);
        setAnimClass("");
      }, 450);
      prevActive.current = active;
      return () => clearTimeout(timer);
    }
    prevActive.current = active;
  }, [active, transition, direction]);

  if (!shouldRender && !active) return null;

  return (
    <div
      className={`absolute inset-0 bg-white ${active ? "pointer-events-auto z-10" : "pointer-events-none z-0"} ${animClass}`}
    >
      {children}
    </div>
  );
}
