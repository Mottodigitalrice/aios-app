"use client";

import { Brain } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimateInView } from "@/components/landing/animate-in-view";

const content = {
  en: {
    badge: "03 — 2026: THE BREAKTHROUGH",
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
    badge: "03 — 2026: ブレイクスルー",
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

export function BrainBodySection({ locale }: { locale: "en" | "ja" }) {
  const t = content[locale];

  return (
    <section className="py-16 sm:py-24 border-t border-zinc-800/50">
      <div className="mx-auto max-w-4xl px-6">
        {/* Header */}
        <AnimateInView className="text-center mb-12 sm:mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-indigo-500/30 text-indigo-300 bg-indigo-500/10"
          >
            {t.badge}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {t.heading}
          </h2>
          <p className="mt-2 text-lg text-zinc-500">
            {t.headingJa}
          </p>
        </AnimateInView>

        {/* Brain + Body Diagram */}
        <AnimateInView delay={200}>
          <div className="flex flex-col items-center gap-8">
            {/* Top row: Brain + Body side by side */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10 w-full">
              {/* BRAIN — circle with purple/indigo border */}
              <div className="flex flex-col items-center gap-4 flex-1 max-w-[280px]">
                <div className="size-28 sm:size-32 rounded-full border-2 border-indigo-500/60 bg-indigo-500/5 flex items-center justify-center">
                  <Brain className="size-12 sm:size-14 text-indigo-400" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400 mb-2">
                    {t.brainLabel}
                  </div>
                  <div className="text-lg font-semibold text-zinc-100">
                    {t.brainTitle}
                  </div>
                  <div className="text-sm text-zinc-500 mt-1">
                    {t.brainSub}
                  </div>
                  <div className="text-sm font-medium text-emerald-400 mt-2">
                    {t.brainCapability}
                  </div>
                  <div className="text-xs text-zinc-600 mt-0.5">
                    {t.brainCapabilityJa}
                  </div>
                </div>
              </div>

              {/* Plus sign */}
              <div className="text-3xl sm:text-4xl font-bold text-zinc-600 select-none">
                +
              </div>

              {/* BODY — square with emerald dashed border */}
              <div className="flex flex-col items-center gap-4 flex-1 max-w-[280px]">
                <div className="size-28 sm:size-32 rounded-xl border-2 border-dashed border-emerald-500/60 bg-emerald-500/5 flex items-center justify-center">
                  <Brain className="size-12 sm:size-14 text-emerald-400" />
                </div>
                <div className="text-center">
                  <div className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2">
                    {t.bodyLabel}
                  </div>
                  <div className="text-lg font-semibold text-zinc-100">
                    {t.bodyTitle}
                  </div>
                  <div className="text-sm text-zinc-500 mt-1">
                    {t.bodySub}
                  </div>
                  <div className="text-sm font-medium text-emerald-400 mt-2">
                    {t.bodyCapability}
                  </div>
                  <div className="text-xs text-zinc-600 mt-0.5">
                    {t.bodyCapabilityJa}
                  </div>
                </div>
              </div>
            </div>

            {/* Equals divider */}
            <div className="flex items-center gap-4 w-full max-w-md">
              <div className="flex-1 h-px bg-zinc-700" />
              <div className="text-2xl font-bold text-zinc-500 select-none">=</div>
              <div className="flex-1 h-px bg-zinc-700" />
            </div>

            {/* Result box */}
            <AnimateInView delay={400}>
              <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 px-8 py-6 text-center max-w-lg">
                <p className="text-lg sm:text-xl font-semibold text-emerald-300">
                  {t.result}
                </p>
                <p className="text-sm text-zinc-500 mt-1">
                  {t.resultJa}
                </p>
              </div>
            </AnimateInView>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
