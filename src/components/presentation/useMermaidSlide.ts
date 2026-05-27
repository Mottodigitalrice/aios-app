"use client";

import { useEffect } from "react";

/**
 * Renders Mermaid diagrams for the current slide.
 *
 * Looks for elements matching `.mermaid[data-mermaid-slide="${slideIndex}"]:not([data-processed="true"])`
 * and renders them when the active slide is within `[minSlide, maxSlide]`.
 *
 * Extracted from the AIOS ks-brand deck (slides 23/24/25 security diagrams).
 */
export function useMermaidSlide(
  slideIndex: number,
  minSlide: number,
  maxSlide: number,
) {
  useEffect(() => {
    if (slideIndex < minSlide || slideIndex > maxSlide) return;
    let cancelled = false;
    (async () => {
      try {
        const mermaid = (await import("mermaid")).default;
        if (cancelled) return;
        mermaid.initialize({
          startOnLoad: false,
          theme: "base",
          themeVariables: {
            primaryColor: "#FBF6E7",
            primaryBorderColor: "#B8860B",
            primaryTextColor: "#1D1D1F",
            lineColor: "#B8860B",
            fontFamily: '"Hiragino Mincho ProN", "Yu Mincho", "Noto Serif JP", serif',
            // Wave 4 polish (CPO sign-off): bumped from 14px → 17px so Mermaid
            // node labels read cleanly at projector-room distance and on the PDF
            // page. Slide 13 (Spec 10) is the visual benchmark; this brings
            // slides 4-12 to parity.
            fontSize: "17px",
          },
          flowchart: { useMaxWidth: true, htmlLabels: true, curve: "basis" },
          securityLevel: "loose",
        });
        const nodes = document.querySelectorAll<HTMLElement>(
          `.mermaid[data-mermaid-slide="${slideIndex}"]:not([data-processed="true"])`,
        );
        if (nodes.length) {
          await mermaid.run({ nodes: Array.from(nodes) });
        }
      } catch (e) {
        // mermaid load / render failed — surface in console, deck still works
        console.warn("[mermaid]", e);
      }
    })();
    return () => { cancelled = true; };
  }, [slideIndex, minSlide, maxSlide]);
}
