"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

export default function GuaranteeSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  // Render headline with explicit line breaks for JP
  const renderText = (text: string) => {
    const parts = text.split("\n");
    if (parts.length === 1) return text;
    return parts.map((part, i) => (
      <span key={i}>
        {part}
        {i < parts.length - 1 && <br />}
      </span>
    ));
  };

  return (
    <section
      className="relative border-t border-[#E8E8ED] overflow-hidden"
      style={{
        backgroundColor: "var(--lp-bg-primary)",
        paddingTop: "calc(var(--lp-section-gap) * 1.2)",
        paddingBottom: "calc(var(--lp-section-gap) * 1.2)",
      }}
    >
      <div className="relative mx-auto max-w-4xl px-6">
        <AnimateInView>
          <div
            className="rounded-2xl border-2 border-emerald-500/30 p-10 sm:p-16 text-center relative overflow-hidden"
            style={{ backgroundColor: "var(--lp-bg-elevated)" }}
          >
            <div className="relative">
              <div className="mx-auto mb-8 flex size-20 items-center justify-center rounded-full bg-emerald-500/5 border-2 border-emerald-500/15">
                <ShieldCheck className="size-10 text-emerald-600" />
              </div>

              <h2
                className={`font-bold tracking-tight mb-6 uppercase ${headingFont}`}
                style={{ fontSize: "var(--text-h3)", color: "var(--lp-text-muted)" }}
              >
                {t.guarantee.title}
              </h2>

              {"headline" in t.guarantee && (
                <p
                  className={`font-bold tracking-tight mb-8 ${headingFont}`}
                  style={{
                    fontSize: "clamp(1.75rem, 4vw, 2.75rem)",
                    color: "var(--lp-text-heading)",
                    lineHeight: 1.25,
                    ...(locale === "ja" ? { wordBreak: "keep-all" as const, lineHeight: "1.5" } : {}),
                  }}
                >
                  {renderText((t.guarantee as { headline: string }).headline)}
                </p>
              )}

              <p
                className="leading-relaxed max-w-2xl mx-auto mb-8"
                style={{
                  color: "var(--lp-text-body)",
                  fontSize: "1.1rem",
                  ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                }}
              >
                {t.guarantee.description}
              </p>

              <div className="border-t border-emerald-500/15 pt-6 mt-6 space-y-2">
                <p className="text-sm" style={{ color: "var(--lp-text-body)" }}>
                  {t.guarantee.individualNote}
                </p>
                <p className="text-sm" style={{ color: "var(--lp-text-body)" }}>
                  {t.guarantee.companyNote}
                </p>
              </div>

              {/* Meet first + CTA */}
              <div className="mt-8 pt-6 border-t border-emerald-500/15">
                <p className="text-sm mb-5" style={{ color: "var(--lp-text-muted)" }}>
                  {t.guarantee.meetFirst}
                </p>
                <Link href="/audit">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 text-white gap-2 rounded-full px-8 py-3.5">
                    {t.hero.cta}
                    <ArrowRight className="size-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
