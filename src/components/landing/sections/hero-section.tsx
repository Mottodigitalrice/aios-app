"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { AIOSPyramid } from "@/components/landing/aios-pyramid";
import type { SectionProps } from "./types";

export default function HeroSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  // Render title with explicit line breaks for JP
  const renderTitle = (text: string) => {
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
      className="relative pt-36 pb-24 sm:pt-44 sm:pb-32 overflow-hidden"
      style={{ backgroundColor: "var(--lp-bg-primary)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${locale === "ja" ? "lg:grid-cols-[1.15fr_0.85fr]" : ""}`}>
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-up">
              <Badge variant="outline" className="mb-6 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/8">
                {t.hero.badge}
              </Badge>
            </div>
            <h1
              className={`animate-fade-in-up animation-delay-100 font-bold tracking-tight leading-[1.1] ${headingFont}`}
              style={{
                fontSize: locale === "ja" ? "clamp(1.75rem, 4vw, 3.25rem)" : "var(--text-display)",
                color: "var(--lp-text-heading)",
                ...(locale === "ja" ? { lineHeight: "1.3" } : {}),
              }}
            >
              {renderTitle(t.hero.title)}{t.hero.title ? " " : ""}
              <span className="gradient-text">{renderTitle(t.hero.titleHighlight)}</span>
              {" "}{renderTitle(t.hero.titleSuffix)}
            </h1>
            <p
              className="animate-fade-in-up animation-delay-200 mt-6 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              style={{
                fontSize: "var(--text-body)",
                color: "var(--lp-text-body)",
                ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
              }}
            >
              {t.hero.subtitle}
            </p>

            {/* Pricing callout */}
            <p className="animate-fade-in-up animation-delay-200 mt-3">
              <span className="inline-block text-lg font-bold" style={{ color: "#B8860B" }}>
                {t.hero.pricingCallout}
              </span>
            </p>

            <div className="animate-fade-in-up animation-delay-300 mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" className="bg-[#1D1D1F] hover:bg-[#2D2D2F] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 text-white gap-2 rounded-full px-8 py-3.5 w-full sm:w-auto">
                  {t.hero.cta}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/audit" className="w-full sm:w-auto">
                <Button size="lg" className="bg-[#B8860B] hover:bg-[#A0750A] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 text-white gap-2 rounded-full px-8 py-3.5 w-full sm:w-auto">
                  {t.hero.ctaSecondary}
                </Button>
              </Link>
            </div>
            <p className="animate-fade-in-up animation-delay-300 mt-2 text-xs text-center lg:text-left" style={{ color: "var(--lp-text-muted)" }}>
              {t.hero.ctaSecondarySubtitle}
            </p>
            <p className="animate-fade-in-up animation-delay-300 mt-1 text-xs text-center lg:text-left" style={{ color: "var(--lp-text-muted)" }}>
              {t.hero.ctaTime}
            </p>

            {/* Guarantee hint */}
            <div className="animate-fade-in-up animation-delay-300 mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 justify-center lg:justify-start">
              <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
              <p className="text-sm text-emerald-700">
                {t.hero.guaranteeHint}
              </p>
            </div>

            <p className="animate-fade-in-up animation-delay-300 mt-4 text-sm" style={{ color: "var(--lp-text-muted)" }}>
              {t.hero.stats}
            </p>
          </div>

          {/* Right: Hero visual — AIOS Pyramid (compact) */}
          <div className="animate-fade-in-up animation-delay-300">
            <AIOSPyramid locale={locale} compact />
          </div>
        </div>
      </div>
    </section>
  );
}
