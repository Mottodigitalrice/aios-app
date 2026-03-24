"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { AIOSPyramid } from "@/components/landing/aios-pyramid";
import type { SectionProps } from "./types";

export default function HeroSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const toolLogos = (t.hero as Record<string, unknown>).toolLogos as Array<{ name: string; logo: string }> | undefined;

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
      style={{ background: "radial-gradient(ellipse at 30% 0%, rgba(184, 134, 11, 0.04) 0%, transparent 50%), var(--lp-bg-primary)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div className={`grid lg:grid-cols-2 gap-12 items-center ${locale === "ja" ? "lg:grid-cols-[1.15fr_0.85fr]" : ""}`}>
          {/* Left: Text content */}
          <div className="text-center lg:text-left">
            <div className="animate-fade-in-up">
              <Badge variant="outline" className="mb-4 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/8">
                {t.hero.badge}
              </Badge>
            </div>
            {/* Tool logo strip — immediately communicate what this is built on */}
            {toolLogos && toolLogos.length > 0 && (
              <div className="animate-fade-in-up mb-6 flex items-center justify-center lg:justify-start gap-5">
                <span className="text-xs font-medium uppercase tracking-wider" style={{ color: "var(--lp-text-muted)" }}>
                  {t.hero.builtWith}
                </span>
                {toolLogos.map((tool) => (
                  <div key={tool.name} className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity">
                    <Image
                      src={`${basePath}${tool.logo}`}
                      alt={tool.name}
                      width={20}
                      height={20}
                      className="shrink-0"
                    />
                    <span className="text-xs font-medium" style={{ color: "var(--lp-text-body)" }}>
                      {tool.name}
                    </span>
                  </div>
                ))}
              </div>
            )}
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
            </h1>
            <p
              className="animate-fade-in-up animation-delay-100 mt-3 text-xl lg:text-2xl font-semibold"
              style={{ color: "var(--lp-text-heading)" }}
            >
              {renderTitle(t.hero.titleSuffix)}
            </p>
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
            <p
              className="animate-fade-in-up animation-delay-200 mt-2 text-sm"
              style={{ color: "var(--lp-text-muted)" }}
            >
              {t.hero.agenticExplainer}
            </p>

            {/* Social proof bar — moved up per CPO/CMO review */}
            <div
              role="group"
              aria-label="Key metrics"
              className="animate-fade-in-up animation-delay-200 mt-8 flex items-center justify-center lg:justify-start gap-0"
            >
              {[
                { value: t.hero.socialProof.metric1Value, label: t.hero.socialProof.metric1Label },
                { value: t.hero.socialProof.metric2Value, label: t.hero.socialProof.metric2Label },
                { value: t.hero.socialProof.metric3Value, label: t.hero.socialProof.metric3Label },
              ].map((metric, i) => (
                <div key={i} className="flex items-center">
                  {i > 0 && (
                    <div
                      className="w-px h-8 mx-4 sm:mx-5"
                      style={{ backgroundColor: "var(--lp-border)" }}
                    />
                  )}
                  <div className="text-center">
                    <p
                      className="text-2xl sm:text-3xl font-bold leading-none font-[family-name:var(--font-dm-sans)]"
                      style={{ color: "var(--lp-text-heading)" }}
                    >
                      {metric.value}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{ color: "var(--lp-text-muted)" }}
                    >
                      {metric.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <p
              className="animate-fade-in-up animation-delay-200 mt-2 text-sm font-medium"
              style={{ color: "var(--lp-text-body)" }}
            >
              {t.hero.socialProof.context}
            </p>

            {/* CTAs */}
            <div className="animate-fade-in-up animation-delay-300 mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link href="/signup" className="w-full sm:w-auto">
                <Button size="lg" aria-label={t.hero.cta} className="bg-[#1D1D1F] hover:bg-[#2D2D2F] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 text-white text-base gap-2 rounded-full px-10 py-4 w-full sm:w-auto">
                  {t.hero.cta}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </Link>
              <Link href="/audit" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" aria-label={t.hero.ctaSecondary} className="border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/10 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 gap-2 rounded-full px-8 py-3.5 w-full sm:w-auto">
                  {t.hero.ctaSecondary}
                </Button>
              </Link>
            </div>
            <p className="animate-fade-in-up animation-delay-300 mt-2 text-xs text-center lg:text-left" style={{ color: "var(--lp-text-muted)" }}>
              {t.hero.ctaTime}
            </p>

            {/* Guarantee hint */}
            <div className="animate-fade-in-up animation-delay-300 mt-4 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-4 py-2 justify-center lg:justify-start">
              <ShieldCheck className="size-4 text-emerald-600 shrink-0" />
              <p className="text-sm text-emerald-700">
                {t.hero.guaranteeHint}
              </p>
            </div>
          </div>

          {/* Right: Hero visual — AIOS Pyramid (compact) */}
          <div className="animate-fade-in-up animation-delay-300 self-center">
            <AIOSPyramid locale={locale} compact />
          </div>
        </div>
      </div>
    </section>
  );
}
