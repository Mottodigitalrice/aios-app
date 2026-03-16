"use client";

import { Check, X } from "lucide-react";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

export default function BeforeAfterSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  return (
    <section
      className="border-t border-[#E8E8ED]"
      style={{ backgroundColor: "var(--lp-bg-primary)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <AnimateInView className="text-center mb-12">
          <h2
            className={`font-bold tracking-tight ${headingFont}`}
            style={{ fontSize: "var(--text-h2)", color: "var(--lp-text-heading)" }}
          >
            {t.beforeAfter.title}{" "}
            <span className="gradient-text">{t.beforeAfter.titleHighlight}</span>
          </h2>
        </AnimateInView>
        <div className="grid md:grid-cols-2 gap-6">
          {/* WITHOUT */}
          <AnimateInView delay={100}>
            <div className="rounded-xl border border-red-500/20 bg-red-500/[0.03] p-6 sm:p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="size-2 rounded-full bg-red-400" />
                <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">{t.beforeAfter.withoutLabel}</span>
              </div>
              <ul className="space-y-4">
                {t.beforeAfter.without.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--lp-text-body)" }}>
                    <X className="size-4 text-red-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateInView>

          {/* WITH */}
          <AnimateInView delay={200}>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 sm:p-8 h-full">
              <div className="flex items-center gap-2 mb-6">
                <div className="size-2 rounded-full bg-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">{t.beforeAfter.withLabel}</span>
              </div>
              <ul className="space-y-4">
                {t.beforeAfter.with.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--lp-text-heading)" }}>
                    <Check className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateInView>
        </div>
      </div>
    </section>
  );
}
