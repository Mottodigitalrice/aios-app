"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

export default function PricingSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  return (
    <section
      id="pricing"
      className="border-t border-zinc-800/50"
      style={{ backgroundColor: "var(--lp-bg-subtle)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <AnimateInView className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/8">
            {t.pricing.badge}
          </Badge>
          <h2
            className={`font-bold tracking-tight ${headingFont}`}
            style={{
              fontSize: "var(--text-h2)",
              color: "var(--lp-text-heading)",
              ...(locale === "ja" ? { wordBreak: "keep-all" } : {}),
            }}
          >
            {t.pricing.title}
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-lg"
            style={{
              color: "var(--lp-text-body)",
              ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
            }}
          >
            {t.pricing.subtitle}
          </p>
        </AnimateInView>

        {/* ROI comparison */}
        <AnimateInView className="mb-10">
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <div className="rounded-xl border border-red-500/20 bg-red-500/[0.03] p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">{t.pricing.roiComparison.traditional.label}</p>
              <p className="text-2xl font-bold" style={{ color: "var(--lp-text-heading)" }}>{t.pricing.roiComparison.traditional.price}</p>
              <p className="text-sm mt-1" style={{ color: "var(--lp-text-muted)" }}>{t.pricing.roiComparison.traditional.detail}</p>
            </div>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5 text-center">
              <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">{t.pricing.roiComparison.aios.label}</p>
              <p className="text-2xl font-bold" style={{ color: "var(--lp-text-heading)" }}>{t.pricing.roiComparison.aios.price}</p>
              <p className="text-sm mt-1" style={{ color: "var(--lp-text-muted)" }}>{t.pricing.roiComparison.aios.detail}</p>
            </div>
          </div>
        </AnimateInView>

        {/* Two pricing columns */}
        <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {/* Left: Group Cohort */}
          <AnimateInView delay={100}>
            <div
              className="rounded-xl p-8 sm:p-10 flex flex-col h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_oklch(0.65_0.18_260/15%)]"
              style={{ backgroundColor: "var(--lp-bg-elevated)", border: "1px solid var(--lp-border-visible)" }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">{t.pricing.cohort.label}</span>
              <h3 className={`text-2xl font-bold mb-3 ${headingFont}`} style={{ color: "var(--lp-text-heading)" }}>{t.pricing.cohort.title}</h3>
              <div className="flex items-baseline gap-1 mb-1">
                <span className="text-4xl font-bold" style={{ color: "var(--lp-text-heading)" }}>{t.pricing.cohort.price}</span>
                <span style={{ color: "var(--lp-text-muted)" }}>{t.pricing.cohort.pricePer}</span>
              </div>
              <p className="text-sm mb-6" style={{ color: "var(--lp-text-muted)" }}>{t.pricing.cohort.commitment}</p>
              <ul className="space-y-3 mb-6 flex-1">
                {t.pricing.cohort.features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--lp-text-heading)" }}>
                    <Check className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs mb-2" style={{ color: "var(--lp-text-muted)" }}>{t.pricing.cohort.bestFor}</p>
              <p className="text-xs text-emerald-400/70 mb-6">{t.pricing.cohort.guarantee}</p>
              <Link href="/signup?track=cohort" className="w-full">
                <Button className="w-full bg-[#1D1D1F] hover:bg-[#2D2D2F] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 text-white rounded-full">
                  {t.pricing.cohort.cta}
                </Button>
              </Link>
            </div>
          </AnimateInView>

          {/* Right: Corporate Build */}
          <AnimateInView delay={200}>
            <div
              className="rounded-xl border-2 border-indigo-500/30 p-8 sm:p-10 flex flex-col h-full relative transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_oklch(0.65_0.18_260/15%)]"
              style={{ backgroundColor: "var(--lp-bg-elevated)" }}
            >
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">{t.pricing.corporate.label}</span>
              <h3 className={`text-2xl font-bold mb-3 ${headingFont}`} style={{ color: "var(--lp-text-heading)" }}>{t.pricing.corporate.title}</h3>

              <div className="flex items-baseline gap-1 mb-0.5">
                <span className="text-4xl font-bold" style={{ color: "var(--lp-text-heading)" }}>{t.pricing.corporate.monthlyPrice}</span>
                <span style={{ color: "var(--lp-text-muted)" }}>{t.pricing.corporate.monthlyPer}</span>
              </div>
              <p className="text-sm mb-3" style={{ color: "var(--lp-text-muted)" }}>{t.pricing.corporate.monthlyTotal}</p>

              <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] p-3 mb-6 flex items-center justify-between">
                <div>
                  <span className="text-lg font-bold" style={{ color: "var(--lp-text-heading)" }}>{t.pricing.corporate.payInFull}</span>
                  <span className="ml-2 text-sm text-emerald-400">{t.pricing.corporate.payInFullSave}</span>
                </div>
                <Badge className="bg-indigo-600 text-white border-0 shrink-0">{t.pricing.corporate.bestValue}</Badge>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {t.pricing.corporate.features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--lp-text-heading)" }}>
                    <Check className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs mb-2" style={{ color: "var(--lp-text-muted)" }}>{t.pricing.corporate.bestFor}</p>
              <p className="text-xs text-emerald-400/70 mb-6">{t.pricing.corporate.guarantee}</p>
              <div className="space-y-3">
                <Link href="/signup?track=corporate&plan=monthly" className="w-full block">
                  <Button variant="outline" className="w-full border-[#D1D1D6] hover:bg-[#F5F5F7] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 rounded-full" style={{ color: "var(--lp-text-heading)" }}>
                    {t.pricing.corporate.monthlyCta}
                  </Button>
                </Link>
                <Link href="/signup?track=corporate&plan=full" className="w-full block">
                  <Button className="w-full bg-[#1D1D1F] hover:bg-[#2D2D2F] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 text-white rounded-full">
                    {t.pricing.corporate.payInFullCta}
                  </Button>
                </Link>
              </div>
            </div>
          </AnimateInView>
        </div>

        {/* Simple capacity line */}
        <AnimateInView className="mt-8 text-center">
          <p className="text-sm" style={{ color: "var(--lp-text-muted)" }}>
            {t.pricing.launchNote}
          </p>
        </AnimateInView>
      </div>
    </section>
  );
}
