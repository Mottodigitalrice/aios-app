"use client";

import { useState, useEffect, useMemo } from "react";
import { Brain, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimateInView } from "@/components/landing/animate-in-view";
import { useInView } from "@/hooks/use-in-view";
import { budouxWrap } from "@/lib/budoux-transform";

const content = {
  en: {
    badge: "The Paradigm Shift",
    heading: "Giving AI a Body",
    headingJa: "AIに「体」を与える",
    brainLabel: "BRAIN ONLY",
    brainTitle: "AI Model",
    brainSub: "Claude, GPT, Gemini",
    brainCapability: "Can think. Can't act.",
    brainCapabilityJa: "考えられる。行動できない。",
    harnessLabel: "BRAIN + HARNESS",
    harnessTitle: "Agentic AI",
    harnessSub: "Terminal, files, APIs, servers",
    harnessCapability: "Can think AND act.",
    harnessCapabilityJa: "考えて、行動できる。",
    result: "An AI that can operate your entire business",
    resultJa: "ビジネス全体を運営できるAI",
  },
  ja: {
    badge: "発想の転換",
    heading: "AIに「体」を与える",
    headingJa: "Giving AI a Body",
    brainLabel: "BRAIN ONLY",
    brainTitle: "AIモデル",
    brainSub: "Claude, GPT, Gemini",
    brainCapability: "考えられる。行動できない。",
    brainCapabilityJa: "Can think. Can't act.",
    harnessLabel: "BRAIN + HARNESS",
    harnessTitle: "エージェンティックAI",
    harnessSub: "ターミナル、ファイル、API、サーバー",
    harnessCapability: "考えて、行動できる。",
    harnessCapabilityJa: "Can think AND act.",
    result: "ビジネス全体を運営できるAI",
    resultJa: "An AI that can operate your entire business",
  },
} as const;

/* 3D-depth style helpers (V2 from canvas) */
const brainSoloStyle = {
  background: "linear-gradient(160deg, rgba(99,102,241,0.06), rgba(99,102,241,0.14))",
  border: "2px solid rgba(99,102,241,0.3)",
  boxShadow: "0 12px 40px rgba(99,102,241,0.12), 0 0 0 1px rgba(99,102,241,0.05), inset 0 -6px 20px rgba(99,102,241,0.06)",
};

const harnessOuterStyle = {
  background: "linear-gradient(160deg, rgba(16,185,129,0.04), rgba(16,185,129,0.1))",
  border: "2.5px dashed rgba(16,185,129,0.35)",
  boxShadow: "0 16px 48px rgba(16,185,129,0.1), 0 0 0 1px rgba(16,185,129,0.04), inset 0 2px 24px rgba(255,255,255,0.15)",
};

const harnessInnerStyle = {
  background: "linear-gradient(160deg, rgba(99,102,241,0.08), rgba(99,102,241,0.18))",
  border: "2px solid rgba(99,102,241,0.35)",
  boxShadow: "0 6px 24px rgba(99,102,241,0.15), inset 0 -4px 12px rgba(99,102,241,0.08)",
};

const resultStyle = {
  background: "linear-gradient(135deg, rgba(16,185,129,0.04), rgba(16,185,129,0.1))",
  border: "2px solid rgba(16,185,129,0.25)",
  boxShadow: "0 6px 24px rgba(16,185,129,0.08)",
};

/**
 * BrainBodyDiagram — LEFT: brain alone, arrow, RIGHT: brain inside harness.
 * 3D depth style with gradients and shadows.
 * Shared between LP section and presentation.
 */
export function BrainBodyDiagram({
  locale,
  compact = false,
}: {
  locale: "en" | "ja";
  compact?: boolean;
}) {
  const t = useMemo(() => locale === "ja" ? budouxWrap(content[locale]) : content[locale], [locale]) as typeof content["en"];

  const soloSize = compact ? "w-36 h-36 sm:w-40 sm:h-40" : "w-40 h-40 sm:w-44 sm:h-44";
  const outerSize = compact ? "w-48 h-48 sm:w-52 sm:h-52" : "w-52 h-52 sm:w-56 sm:h-56";
  const innerSize = compact ? "w-28 h-28 sm:w-32 sm:h-32" : "w-32 h-32 sm:w-36 sm:h-36";
  const iconLg = compact ? "size-12 sm:size-14" : "size-14 sm:size-16";
  const iconSm = compact ? "size-10 sm:size-11" : "size-11 sm:size-12";

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Side-by-side: Brain alone → Brain in Harness */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 w-full">
        {/* LEFT: Brain alone */}
        <div className="flex flex-col items-center gap-4 flex-1 max-w-[260px]">
          <div
            className={`${soloSize} rounded-full flex items-center justify-center`}
            style={brainSoloStyle}
          >
            <Brain className={`${iconLg} text-indigo-500`} />
          </div>
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-1">
              {t.brainLabel}
            </div>
            <div className="text-base font-semibold" style={{ color: "var(--lp-text-heading)" }}>
              {t.brainTitle}
            </div>
            <div className="text-sm mt-0.5" style={{ color: "var(--lp-text-muted)" }}>
              {t.brainSub}
            </div>
            <div className="text-sm font-medium mt-2" style={{ color: "var(--lp-text-body)" }}>
              {t.brainCapability}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "var(--lp-text-muted)" }}>
              {t.brainCapabilityJa}
            </div>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center shrink-0">
          <ArrowRight className="size-8 sm:size-10 rotate-90 sm:rotate-0" style={{ color: "var(--lp-text-muted)" }} />
        </div>

        {/* RIGHT: Brain inside Harness */}
        <div className="flex flex-col items-center gap-4 flex-1 max-w-[260px]">
          <div
            className={`${outerSize} rounded-2xl flex items-center justify-center`}
            style={harnessOuterStyle}
          >
            <div
              className={`${innerSize} rounded-full flex items-center justify-center`}
              style={harnessInnerStyle}
            >
              <Brain className={`${iconSm} text-indigo-500`} />
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-1">
              {t.harnessLabel}
            </div>
            <div className="text-base font-semibold" style={{ color: "var(--lp-text-heading)" }}>
              {t.harnessTitle}
            </div>
            <div className="text-sm mt-0.5" style={{ color: "var(--lp-text-muted)" }}>
              {t.harnessSub}
            </div>
            <div className="text-sm font-medium text-emerald-600 mt-2">
              {t.harnessCapability}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "var(--lp-text-muted)" }}>
              {t.harnessCapabilityJa}
            </div>
          </div>
        </div>
      </div>

      {/* Equals divider */}
      <div className="flex items-center gap-4 w-full max-w-md">
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--lp-border-visible)" }} />
        <div className="text-2xl font-bold select-none" style={{ color: "var(--lp-text-muted)" }}>=</div>
        <div className="flex-1 h-px" style={{ backgroundColor: "var(--lp-border-visible)" }} />
      </div>

      {/* Result box */}
      <div className="rounded-xl px-8 py-6 text-center max-w-lg" style={resultStyle}>
        <p className="text-lg sm:text-xl font-semibold text-emerald-700">
          {t.result}
        </p>
        <p className="text-sm mt-1" style={{ color: "var(--lp-text-muted)" }}>
          {t.resultJa}
        </p>
      </div>
    </div>
  );
}

/**
 * BrainBodySection — full landing-page section with scroll animations.
 * Brain solo appears first, then the harness side slides in.
 */
export function BrainBodySection({ locale, hideHeader = false }: { locale: "en" | "ja"; hideHeader?: boolean }) {
  const t = useMemo(() => locale === "ja" ? budouxWrap(content[locale]) : content[locale], [locale]) as typeof content["en"];
  const [sectionRef, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const [showHarness, setShowHarness] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
      const harnessTimer = setTimeout(() => setShowHarness(true), 600);
      const resultTimer = setTimeout(() => setShowResult(true), 1200);
      return () => {
        clearTimeout(harnessTimer);
        clearTimeout(resultTimer);
      };
    }
  }, [isInView, hasAnimated]);

  // After 3s, force everything visible as fallback (covers screenshot tools, fast scrollers)
  useEffect(() => {
    const fallback = setTimeout(() => {
      setHasAnimated(true);
      setShowHarness(true);
      setShowResult(true);
    }, 3000);
    return () => clearTimeout(fallback);
  }, []);

  return (
    <section
      className="border-t border-[#E8E8ED]"
      style={{ backgroundColor: "var(--lp-bg-primary)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-4xl px-6" ref={sectionRef}>
        {/* Header */}
        {!hideHeader && (
        <AnimateInView className="text-center mb-12 sm:mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/5"
          >
            {t.badge}
          </Badge>
          <h2
            className={`font-bold tracking-tight ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
            style={{ fontSize: "var(--text-h2)", color: "var(--lp-text-heading)" }}
          >
            {t.heading}
          </h2>
          <p className="mt-2 text-lg" style={{ color: "var(--lp-text-muted)" }}>
            {t.headingJa}
          </p>
        </AnimateInView>
        )}

        {/* Animated side-by-side */}
        <AnimateInView delay={200}>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 w-full">
              {/* LEFT: Brain alone — appears first */}
              <div
                className="flex flex-col items-center gap-4 flex-1 max-w-[260px] transition-all duration-500"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div
                  className="w-40 h-40 sm:w-44 sm:h-44 rounded-full flex items-center justify-center"
                  style={brainSoloStyle}
                >
                  <Brain className="size-14 sm:size-16 text-indigo-500" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-1">
                    {t.brainLabel}
                  </div>
                  <div className="text-base font-semibold" style={{ color: "var(--lp-text-heading)" }}>
                    {t.brainTitle}
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: "var(--lp-text-muted)" }}>
                    {t.brainSub}
                  </div>
                  <div className="text-sm font-medium mt-2" style={{ color: "var(--lp-text-body)" }}>
                    {t.brainCapability}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--lp-text-muted)" }}>
                    {t.brainCapabilityJa}
                  </div>
                </div>
              </div>

              {/* Arrow — appears with harness */}
              <div
                className="flex items-center justify-center shrink-0 transition-all duration-500"
                style={{
                  opacity: showHarness ? 1 : 0,
                  transform: showHarness ? "scale(1)" : "scale(0.5)",
                }}
              >
                <ArrowRight className="size-8 sm:size-10 rotate-90 sm:rotate-0" style={{ color: "var(--lp-text-muted)" }} />
              </div>

              {/* RIGHT: Brain inside Harness — slides in */}
              <div
                className="flex flex-col items-center gap-4 flex-1 max-w-[260px] transition-all duration-700 ease-out"
                style={{
                  opacity: showHarness ? 1 : 0,
                  transform: showHarness ? "translateX(0)" : "translateX(40px)",
                }}
              >
                <div
                  className="w-52 h-52 sm:w-56 sm:h-56 rounded-2xl flex items-center justify-center"
                  style={harnessOuterStyle}
                >
                  <div
                    className="w-32 h-32 sm:w-36 sm:h-36 rounded-full flex items-center justify-center"
                    style={harnessInnerStyle}
                  >
                    <Brain className="size-11 sm:size-12 text-indigo-500" />
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-600 mb-1">
                    {t.harnessLabel}
                  </div>
                  <div className="text-base font-semibold" style={{ color: "var(--lp-text-heading)" }}>
                    {t.harnessTitle}
                  </div>
                  <div className="text-sm mt-0.5" style={{ color: "var(--lp-text-muted)" }}>
                    {t.harnessSub}
                  </div>
                  <div className="text-sm font-medium text-emerald-600 mt-2">
                    {t.harnessCapability}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--lp-text-muted)" }}>
                    {t.harnessCapabilityJa}
                  </div>
                </div>
              </div>
            </div>

            {/* Equals divider */}
            <div
              className="flex items-center gap-4 w-full max-w-md transition-all duration-500"
              style={{
                opacity: showResult ? 1 : 0,
                transform: showResult ? "translateY(0)" : "translateY(10px)",
              }}
            >
              <div className="flex-1 h-px" style={{ backgroundColor: "var(--lp-border-visible)" }} />
              <div className="text-2xl font-bold select-none" style={{ color: "var(--lp-text-muted)" }}>=</div>
              <div className="flex-1 h-px" style={{ backgroundColor: "var(--lp-border-visible)" }} />
            </div>

            {/* Result box */}
            <div
              className="rounded-xl px-8 py-6 text-center max-w-lg transition-all duration-500"
              style={{
                ...resultStyle,
                opacity: showResult ? 1 : 0,
                transform: showResult ? "translateY(0)" : "translateY(10px)",
              }}
            >
              <p className="text-lg sm:text-xl font-semibold text-emerald-700">
                {t.result}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--lp-text-muted)" }}>
                {t.resultJa}
              </p>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
