"use client";

import { Badge } from "@/components/ui/badge";
import { Terminal, MessageSquare, ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

export default function AgenticTerminalSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  return (
    <section
      style={{ backgroundColor: "var(--lp-bg-primary)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <AnimateInView className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/5">
            {t.agenticTerminal.badge}
          </Badge>
          <h2
            className={`font-bold tracking-tight ${headingFont}`}
            style={{
              fontSize: "var(--text-h2)",
              color: "var(--lp-text-heading)",
              ...(locale === "ja" ? { wordBreak: "keep-all" } : {}),
            }}
          >
            {t.agenticTerminal.title}{" "}
            <span className="gradient-text">{t.agenticTerminal.titleHighlight}</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg" style={{ color: "var(--lp-text-body)" }}>
            {t.agenticTerminal.subtitle}
          </p>
        </AnimateInView>

        {/* Era comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Chatbot Era */}
          <AnimateInView delay={100}>
            <div
              className="rounded-xl p-8 h-full"
              style={{ backgroundColor: "var(--lp-bg-elevated)", border: "1px solid var(--lp-border-visible)" }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-100 border border-zinc-200">
                  <MessageSquare className="size-5 text-zinc-400" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  {t.agenticTerminal.chatbotEra.label}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--lp-text-body)",
                  ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                }}
              >
                {t.agenticTerminal.chatbotEra.description}
              </p>
            </div>
          </AnimateInView>

          {/* Agentic Era */}
          <AnimateInView delay={200}>
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-8 h-full">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                  <Terminal className="size-5 text-emerald-600" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                  {t.agenticTerminal.agenticEra.label}
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{
                  color: "var(--lp-text-heading)",
                  ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                }}
              >
                {t.agenticTerminal.agenticEra.description}
              </p>
            </div>
          </AnimateInView>
        </div>

        {/* Arrow between eras on mobile */}
        <AnimateInView delay={250} className="flex justify-center mb-8 md:hidden">
          <ArrowRight className="size-5 rotate-90" style={{ color: "var(--lp-text-muted)" }} />
        </AnimateInView>

        {/* Tools strip */}
        <AnimateInView delay={300}>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 mb-10">
            {t.agenticTerminal.tools.map((tool) => (
              <div key={tool.name} className="text-center">
                <p className="text-sm font-semibold" style={{ color: "var(--lp-text-heading)" }}>{tool.name}</p>
                <p className="text-xs" style={{ color: "var(--lp-text-muted)" }}>{tool.maker}</p>
              </div>
            ))}
          </div>
        </AnimateInView>

        {/* Closing */}
        <AnimateInView delay={400} className="text-center">
          <p
            className={`text-lg sm:text-xl font-semibold max-w-3xl mx-auto ${headingFont}`}
            style={{ color: "var(--lp-text-heading)" }}
          >
            {t.agenticTerminal.closing}
          </p>
        </AnimateInView>
      </div>
    </section>
  );
}
