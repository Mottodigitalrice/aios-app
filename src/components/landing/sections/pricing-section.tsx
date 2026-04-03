"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, ArrowRight, Users, User, Building2 } from "lucide-react";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

export default function PricingSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  const tiers = [
    {
      key: "cohort" as const,
      icon: Users,
      tier: t.pricing.cohort,
      href: "/signup?type=cohort",
      highlighted: false,
    },
    {
      key: "oneOnOne" as const,
      icon: User,
      tier: t.pricing.oneOnOne,
      href: "/signup?type=individual",
      highlighted: true,
    },
    {
      key: "company" as const,
      icon: Building2,
      tier: t.pricing.company,
      href: "/signup?type=company",
      highlighted: false,
    },
  ];

  return (
    <section
      id="pricing"
      className="border-t border-[#E8E8ED]"
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
              ...(locale === "ja" ? { overflowWrap: "break-word" } : {}),
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

        {/* Three pricing columns */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {tiers.map(({ key, icon: Icon, tier, href, highlighted }, i) => (
            <AnimateInView key={key} delay={100 * (i + 1)}>
              <div
                className={`rounded-xl p-8 sm:p-10 flex flex-col h-full transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_30px_rgba(184,134,11,0.15)] relative ${
                  highlighted ? "border-2 border-[#B8860B]/30 lg:scale-[1.03] z-10" : ""
                }`}
                style={{
                  backgroundColor: "var(--lp-bg-elevated)",
                  ...(highlighted
                    ? { background: "linear-gradient(180deg, rgba(184, 134, 11, 0.04) 0%, transparent 100%)" }
                    : { border: "1px solid var(--lp-border-visible)" }),
                }}
              >
                {highlighted && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center">
                    <Badge className="bg-[#B8860B] text-white border-0 text-xs px-4 py-1.5">
                      {t.pricing.recommended}
                    </Badge>
                    <span className="text-[10px] mt-1 text-[#B8860B]/70 whitespace-nowrap">{t.pricing.recommendedSubtext}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 mb-2">
                  <Icon className="size-4 text-[#B8860B]" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#B8860B]">{tier.label}</span>
                </div>

                <h3 className={`text-2xl font-bold mb-3 ${headingFont}`} style={{ color: "var(--lp-text-heading)" }}>{tier.title}</h3>

                <div className="flex items-baseline gap-1 mb-1">
                  <span className={`${highlighted ? "text-5xl" : "text-4xl"} font-bold`} style={{ color: "var(--lp-text-heading)" }}>{tier.price}</span>
                  <span style={{ color: "var(--lp-text-muted)" }}>{tier.pricePer}</span>
                </div>
                <p className="text-sm mb-6" style={{ color: "var(--lp-text-muted)" }}>{tier.commitment}</p>

                {/* Best For */}
                <div className="mb-6 rounded-lg p-4" style={{ backgroundColor: "var(--lp-bg-subtle)" }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--lp-text-muted)" }}>
                    {locale === "ja" ? "こんな方に最適" : "Best for"}
                  </p>
                  <ul className="space-y-1.5">
                    {tier.bestFor.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs" style={{ color: "var(--lp-text-body)" }}>
                        <ArrowRight className="size-3 text-[#B8860B] mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6 flex-1">
                  {tier.features.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--lp-text-heading)" }}>
                      <Check className="size-4 text-[#B8860B] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <p className="text-xs text-emerald-400/70 mb-6">{tier.guarantee}</p>

                <Link href={href} className="w-full mt-auto">
                  <Button
                    variant={highlighted ? "default" : "outline"}
                    className={`w-full rounded-full hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 ${
                      highlighted
                        ? "bg-[#B8860B] hover:bg-[#A0750A] text-white shadow-[0_4px_16px_rgba(184,134,11,0.3)]"
                        : "border-[#1D1D1F]/30 text-[#1D1D1F] hover:bg-[#1D1D1F]/10"
                    }`}
                  >
                    {tier.cta}
                  </Button>
                </Link>
              </div>
            </AnimateInView>
          ))}
        </div>

        {/* Capacity note */}
        <AnimateInView className="mt-12 max-w-3xl mx-auto">
          <div className="rounded-xl p-8" style={{ backgroundColor: "var(--lp-bg-elevated)", border: "1px solid var(--lp-border-visible)" }}>
            <h3 className={`text-lg font-bold mb-3 ${headingFont}`} style={{ color: "var(--lp-text-heading)" }}>
              {t.pricing.capacity.title}
            </h3>
            <p className="text-sm mb-6" style={{ color: "var(--lp-text-body)", ...(locale === "ja" ? { lineHeight: "1.9" } : {}) }}>
              {t.pricing.capacity.subtitle}
            </p>

            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {/* Company slots */}
              <div className="rounded-lg p-4 text-center" style={{ backgroundColor: "var(--lp-bg-subtle)" }}>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--lp-text-heading)" }}>{t.pricing.capacity.company.title}</p>
                <div className="flex justify-center gap-1.5 mb-2">
                  {Array.from({ length: t.pricing.capacity.company.total }).map((_, i) => (
                    <div
                      key={i}
                      className={`size-3 rounded-full ${i < t.pricing.capacity.company.filled ? "bg-[#B8860B]" : "bg-[#E8E8ED]"}`}
                    />
                  ))}
                </div>
                <p className="text-xs" style={{ color: "var(--lp-text-muted)" }}>{t.pricing.capacity.company.label}</p>
              </div>

              {/* One-on-One slots */}
              <div className="rounded-lg p-4 text-center" style={{ backgroundColor: "var(--lp-bg-subtle)" }}>
                <p className="text-sm font-semibold mb-1" style={{ color: "var(--lp-text-heading)" }}>{t.pricing.capacity.oneOnOne.title}</p>
                <div className="flex justify-center gap-1.5 mb-2">
                  {Array.from({ length: t.pricing.capacity.oneOnOne.total }).map((_, i) => (
                    <div
                      key={i}
                      className={`size-3 rounded-full ${i < t.pricing.capacity.oneOnOne.filled ? "bg-[#B8860B]" : "bg-[#E8E8ED]"}`}
                    />
                  ))}
                </div>
                <p className="text-xs" style={{ color: "var(--lp-text-muted)" }}>{t.pricing.capacity.oneOnOne.label}</p>
              </div>

              {/* Cohort — split into EN + JP tracks */}
              <div className="rounded-lg p-4 text-center" style={{ backgroundColor: "var(--lp-bg-subtle)" }}>
                <p className="text-sm font-semibold mb-3" style={{ color: "var(--lp-text-heading)" }}>{t.pricing.capacity.cohortHeading}</p>

                {/* English track */}
                <p className="text-xs font-medium mb-1" style={{ color: "var(--lp-text-body)" }}>{t.pricing.capacity.cohortEN.title}</p>
                <div className="flex justify-center gap-1.5 mb-1">
                  {Array.from({ length: t.pricing.capacity.cohortEN.total }).map((_, i) => (
                    <div
                      key={`en-${i}`}
                      className={`size-3 rounded-full ${i < t.pricing.capacity.cohortEN.filled ? "bg-[#B8860B]" : "bg-[#E8E8ED]"}`}
                    />
                  ))}
                </div>
                <p className="text-xs mb-3" style={{ color: "var(--lp-text-muted)" }}>{t.pricing.capacity.cohortEN.label}</p>

                {/* Japanese track */}
                <p className="text-xs font-medium mb-1" style={{ color: "var(--lp-text-body)" }}>{t.pricing.capacity.cohortJP.title}</p>
                <div className="flex justify-center gap-1.5 mb-1">
                  {Array.from({ length: t.pricing.capacity.cohortJP.total }).map((_, i) => (
                    <div
                      key={`jp-${i}`}
                      className={`size-3 rounded-full ${i < t.pricing.capacity.cohortJP.filled ? "bg-[#B8860B]" : "bg-[#E8E8ED]"}`}
                    />
                  ))}
                </div>
                <p className="text-xs" style={{ color: "var(--lp-text-muted)" }}>{t.pricing.capacity.cohortJP.label}</p>
              </div>
            </div>
          </div>
        </AnimateInView>

        {/* Launch note */}
        <AnimateInView className="mt-6 text-center">
          <p className="text-sm" style={{ color: "var(--lp-text-muted)" }}>
            {t.pricing.launchNote}
          </p>
        </AnimateInView>
      </div>
    </section>
  );
}
