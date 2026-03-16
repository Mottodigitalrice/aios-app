"use client";

import { useState, useEffect } from "react";
import { Brain, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimateInView } from "@/components/landing/animate-in-view";
import { useInView } from "@/hooks/use-in-view";

const content = {
  en: {
    badge: "The Paradigm Shift",
    heading: "Giving AI a Body",
    headingJa: "AIに「体」を与える",
    brainLabel: "BRAIN",
    brainTitle: "AI Model",
    brainSub: "Claude, GPT, Gemini",
    brainCapability: "Can think. Can't act.",
    brainCapabilityJa: "考えられる。行動できない。",
    bodyLabel: "BODY",
    bodyTitle: "Agentic Harness",
    bodySub: "Terminal, files, APIs, servers",
    bodyCapability: "Can think AND act.",
    bodyCapabilityJa: "考えて、行動できる。",
    result: "An AI that can operate your entire business",
    resultJa: "ビジネス全体を運営できるAI",
  },
  ja: {
    badge: "発想の転換",
    heading: "AIに「体」を与える",
    headingJa: "Giving AI a Body",
    brainLabel: "BRAIN",
    brainTitle: "AIモデル",
    brainSub: "Claude, GPT, Gemini",
    brainCapability: "考えられる。行動できない。",
    brainCapabilityJa: "Can think. Can't act.",
    bodyLabel: "BODY",
    bodyTitle: "エージェンティック・ハーネス",
    bodySub: "ターミナル、ファイル、API、サーバー",
    bodyCapability: "考えて、行動できる。",
    bodyCapabilityJa: "Can think AND act.",
    result: "ビジネス全体を運営できるAI",
    resultJa: "An AI that can operate your entire business",
  },
} as const;

/**
 * BrainBodyDiagram — the pure visual (brain + body + equals + result).
 * Extracted so both the LP section and the presentation can share it.
 * When `compact` is true, sizes are slightly reduced for slide contexts.
 */
export function BrainBodyDiagram({
  locale,
  compact = false,
}: {
  locale: "en" | "ja";
  compact?: boolean;
}) {
  const t = content[locale];

  const shapeSize = compact
    ? "size-24 sm:size-28"
    : "size-28 sm:size-32";
  const iconSize = compact
    ? "size-10 sm:size-12"
    : "size-12 sm:size-14";

  return (
    <div className="flex flex-col items-center gap-8">
      {/* Top row: Brain + Body side by side */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 w-full">
        {/* BRAIN — circle with purple/indigo border */}
        <div className="flex flex-col items-center gap-4 flex-1 max-w-[280px]">
          <div className={`${shapeSize} rounded-full border-2 border-indigo-500/40 bg-indigo-500/5 flex items-center justify-center`}>
            <Brain className={`${iconSize} text-indigo-500`} />
          </div>
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-2">
              {t.brainLabel}
            </div>
            <div className="text-lg font-semibold" style={{ color: "var(--lp-text-heading)" }}>
              {t.brainTitle}
            </div>
            <div className="text-sm mt-1" style={{ color: "var(--lp-text-muted)" }}>
              {t.brainSub}
            </div>
            <div className="text-sm font-medium text-emerald-600 mt-2">
              {t.brainCapability}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "var(--lp-text-muted)" }}>
              {t.brainCapabilityJa}
            </div>
          </div>
        </div>

        {/* Plus sign */}
        <div className="text-3xl sm:text-4xl font-bold select-none" style={{ color: "var(--lp-text-muted)" }}>
          +
        </div>

        {/* BODY — square with emerald dashed border */}
        <div className="flex flex-col items-center gap-4 flex-1 max-w-[280px]">
          <div className={`${shapeSize} rounded-xl border-2 border-dashed border-emerald-500/40 bg-emerald-500/5 flex items-center justify-center`}>
            <Zap className={`${iconSize} text-emerald-500`} />
          </div>
          <div className="text-center">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 mb-2">
              {t.bodyLabel}
            </div>
            <div className="text-lg font-semibold" style={{ color: "var(--lp-text-heading)" }}>
              {t.bodyTitle}
            </div>
            <div className="text-sm mt-1" style={{ color: "var(--lp-text-muted)" }}>
              {t.bodySub}
            </div>
            <div className="text-sm font-medium text-emerald-600 mt-2">
              {t.bodyCapability}
            </div>
            <div className="text-xs mt-0.5" style={{ color: "var(--lp-text-muted)" }}>
              {t.bodyCapabilityJa}
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
      <div className="rounded-xl border-2 border-emerald-500/20 bg-emerald-500/5 px-8 py-6 text-center max-w-lg">
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
 * BrainBodySection — the full landing-page section with header, scroll
 * animations, and outer wrapper. Uses BrainBodyDiagram internally.
 * Light Apple theme with sequential animation: brain appears → body slides in.
 */
export function BrainBodySection({ locale }: { locale: "en" | "ja" }) {
  const t = content[locale];
  const [sectionRef, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [showBody, setShowBody] = useState(false);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setShowBody(true), 600);
      return () => clearTimeout(timer);
    }
  }, [isInView]);

  return (
    <section
      className="border-t border-[#E8E8ED]"
      style={{ backgroundColor: "var(--lp-bg-primary)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-4xl px-6" ref={sectionRef}>
        {/* Header */}
        <AnimateInView className="text-center mb-12 sm:mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/5"
          >
            {t.badge}
          </Badge>
          <h2
            className="text-3xl sm:text-4xl font-bold tracking-tight"
            style={{ color: "var(--lp-text-heading)" }}
          >
            {t.heading}
          </h2>
          <p className="mt-2 text-lg" style={{ color: "var(--lp-text-muted)" }}>
            {t.headingJa}
          </p>
        </AnimateInView>

        {/* Brain + Body Diagram with sequential animation */}
        <AnimateInView delay={200}>
          <div className="flex flex-col items-center gap-8">
            {/* Top row: Brain + Body */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 w-full">
              {/* BRAIN — always visible once in view */}
              <div
                className="flex flex-col items-center gap-4 flex-1 max-w-[280px] transition-all duration-500"
                style={{
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(20px)",
                }}
              >
                <div className="size-28 sm:size-32 rounded-full border-2 border-indigo-500/40 bg-indigo-500/5 flex items-center justify-center">
                  <Brain className="size-12 sm:size-14 text-indigo-500" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500 mb-2">
                    {t.brainLabel}
                  </div>
                  <div className="text-lg font-semibold" style={{ color: "var(--lp-text-heading)" }}>
                    {t.brainTitle}
                  </div>
                  <div className="text-sm mt-1" style={{ color: "var(--lp-text-muted)" }}>
                    {t.brainSub}
                  </div>
                  <div className="text-sm font-medium text-emerald-600 mt-2">
                    {t.brainCapability}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--lp-text-muted)" }}>
                    {t.brainCapabilityJa}
                  </div>
                </div>
              </div>

              {/* Plus sign — appears with body */}
              <div
                className="text-3xl sm:text-4xl font-bold select-none transition-all duration-500"
                style={{
                  color: "var(--lp-text-muted)",
                  opacity: showBody ? 1 : 0,
                  transform: showBody ? "scale(1)" : "scale(0.5)",
                }}
              >
                +
              </div>

              {/* BODY — slides in after delay */}
              <div
                className="flex flex-col items-center gap-4 flex-1 max-w-[280px] transition-all duration-700 ease-out"
                style={{
                  opacity: showBody ? 1 : 0,
                  transform: showBody ? "translateX(0)" : "translateX(40px)",
                }}
              >
                <div className="size-28 sm:size-32 rounded-xl border-2 border-dashed border-emerald-500/40 bg-emerald-500/5 flex items-center justify-center">
                  <Zap className="size-12 sm:size-14 text-emerald-500" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-500 mb-2">
                    {t.bodyLabel}
                  </div>
                  <div className="text-lg font-semibold" style={{ color: "var(--lp-text-heading)" }}>
                    {t.bodyTitle}
                  </div>
                  <div className="text-sm mt-1" style={{ color: "var(--lp-text-muted)" }}>
                    {t.bodySub}
                  </div>
                  <div className="text-sm font-medium text-emerald-600 mt-2">
                    {t.bodyCapability}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--lp-text-muted)" }}>
                    {t.bodyCapabilityJa}
                  </div>
                </div>
              </div>
            </div>

            {/* Equals divider — appears with body */}
            <div
              className="flex items-center gap-4 w-full max-w-md transition-all duration-500"
              style={{
                opacity: showBody ? 1 : 0,
                transform: showBody ? "translateY(0)" : "translateY(10px)",
                transitionDelay: "200ms",
              }}
            >
              <div className="flex-1 h-px" style={{ backgroundColor: "var(--lp-border-visible)" }} />
              <div className="text-2xl font-bold select-none" style={{ color: "var(--lp-text-muted)" }}>=</div>
              <div className="flex-1 h-px" style={{ backgroundColor: "var(--lp-border-visible)" }} />
            </div>

            {/* Result box — appears last */}
            <div
              className="rounded-xl border-2 border-emerald-500/20 bg-emerald-500/5 px-8 py-6 text-center max-w-lg transition-all duration-500"
              style={{
                opacity: showBody ? 1 : 0,
                transform: showBody ? "translateY(0)" : "translateY(10px)",
                transitionDelay: "400ms",
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
