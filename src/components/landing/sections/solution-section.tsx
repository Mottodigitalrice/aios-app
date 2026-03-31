"use client";

import { Badge } from "@/components/ui/badge";
import { AnimateInView } from "@/components/landing/animate-in-view";
import { AIOSPyramid } from "@/components/landing/aios-pyramid";
import type { SectionProps } from "./types";

export default function SolutionSection({ t, locale, hideHeader = false }: SectionProps & { hideHeader?: boolean }) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  return (
    <section
      id="stack"
      className="border-t border-[#E8E8ED]"
      style={{ backgroundColor: "var(--lp-bg-subtle)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {!hideHeader && (
        <AnimateInView className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/8">
            {t.stack.badge}
          </Badge>
          <h2
            className={`font-bold tracking-tight ${headingFont}`}
            style={{
              fontSize: "var(--text-h2)",
              color: "var(--lp-text-heading)",
              ...(locale === "ja" ? { overflowWrap: "break-word", wordBreak: "normal" } : {}),
            }}
          >
            {t.stack.title}{" "}
            <span className="gradient-text">{t.stack.titleHighlight}</span>
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-lg"
            style={{
              color: "var(--lp-text-body)",
              ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
            }}
          >
            {t.stack.subtitle}
          </p>
        </AnimateInView>
        )}

        {/* Bridge to pyramid */}
        {!hideHeader && (
        <AnimateInView className="text-center mb-8">
          <p className="text-sm" style={{ color: "var(--lp-text-muted)" }}>{t.stack.pyramidFraming}</p>
        </AnimateInView>
        )}

        {/* AIOS Pyramid Diagram */}
        <AIOSPyramid locale={locale} />
      </div>
    </section>
  );
}
