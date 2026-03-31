"use client";

import { Badge } from "@/components/ui/badge";
import { Terminal, Monitor, Server, Cloud, ArrowDown } from "lucide-react";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

export function AgenticTimeline({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";
  const { timeline } = t.agenticTerminal;

  return (
    <>
      {/* 3-Era Timeline */}
      <AnimateInView delay={100}>
        <div className="mb-16">
          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block">
            <div className="grid grid-cols-3 gap-6 relative">
              {/* Connecting line */}
              <div
                className="absolute top-[2.25rem] left-[16.67%] right-[16.67%] h-px"
                style={{ backgroundColor: "var(--lp-border-visible)" }}
              />
              {timeline.map((era, i) => (
                <div key={era.year} className="flex flex-col items-center text-center relative z-10">
                  {/* Year circle */}
                  <div
                    className={`flex items-center justify-center w-[4.5rem] h-[4.5rem] rounded-full border-2 mb-4 ${
                      era.status === "current"
                        ? "border-emerald-500/40 bg-emerald-500/[0.06]"
                        : "bg-white"
                    }`}
                    style={era.status !== "current" ? { borderColor: "var(--lp-border-visible)", backgroundColor: "var(--lp-bg-elevated)" } : {}}
                  >
                    <span
                      className={`text-lg font-bold ${era.status === "current" ? "text-emerald-600" : ""}`}
                      style={era.status !== "current" ? { color: "var(--lp-text-muted)" } : {}}
                    >
                      {era.year}
                    </span>
                  </div>
                  <h3
                    className={`text-base font-semibold mb-2 ${era.status === "current" ? "text-emerald-600" : ""}`}
                    style={era.status !== "current" ? { color: "var(--lp-text-heading)" } : {}}
                  >
                    {era.label}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--lp-text-body)",
                      ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                    }}
                  >
                    {era.description}
                  </p>
                  {era.status === "current" && (
                    <Badge className="mt-3 bg-emerald-500/10 text-emerald-600 border-emerald-500/20" variant="outline">
                      ← {locale === "ja" ? "今ここ" : "We are here"}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden space-y-6">
            {timeline.map((era, i) => (
              <div key={era.year} className="flex gap-4">
                {/* Timeline track */}
                <div className="flex flex-col items-center">
                  <div
                    className={`flex items-center justify-center w-12 h-12 rounded-full border-2 shrink-0 ${
                      era.status === "current"
                        ? "border-emerald-500/40 bg-emerald-500/[0.06]"
                        : ""
                    }`}
                    style={era.status !== "current" ? { borderColor: "var(--lp-border-visible)", backgroundColor: "var(--lp-bg-elevated)" } : {}}
                  >
                    <span
                      className={`text-sm font-bold ${era.status === "current" ? "text-emerald-600" : ""}`}
                      style={era.status !== "current" ? { color: "var(--lp-text-muted)" } : {}}
                    >
                      {era.year}
                    </span>
                  </div>
                  {i < timeline.length - 1 && (
                    <div className="w-px flex-1 min-h-[1.5rem]" style={{ backgroundColor: "var(--lp-border-visible)" }} />
                  )}
                </div>
                {/* Content */}
                <div className="pb-2">
                  <h3
                    className={`text-base font-semibold mb-1 ${era.status === "current" ? "text-emerald-600" : ""}`}
                    style={era.status !== "current" ? { color: "var(--lp-text-heading)" } : {}}
                  >
                    {era.label}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{
                      color: "var(--lp-text-body)",
                      ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                    }}
                  >
                    {era.description}
                  </p>
                  {era.status === "current" && (
                    <Badge className="mt-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/20" variant="outline">
                      ← {locale === "ja" ? "今ここ" : "We are here"}
                    </Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
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
    </>
  );
}

export function AgenticArchitecture({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";
  const { architecture } = t.agenticTerminal;

  const layerIcons = [
    <Monitor key="monitor" className="size-5 text-blue-500" />,
    <Server key="server" className="size-5 text-violet-500" />,
    <Cloud key="cloud" className="size-5 text-amber-500" />,
  ];

  const layerColors = [
    { border: "border-blue-500/20", bg: "bg-blue-500/[0.04]", text: "text-blue-600" },
    { border: "border-violet-500/20", bg: "bg-violet-500/[0.04]", text: "text-violet-600" },
    { border: "border-amber-500/20", bg: "bg-amber-500/[0.04]", text: "text-amber-600" },
  ];

  return (
    <>
      {/* CLI Architecture Diagram */}
      <AnimateInView delay={200}>
        <div
          className="rounded-xl p-6 sm:p-8 mb-12"
          style={{ backgroundColor: "var(--lp-bg-elevated)", border: "1px solid var(--lp-border-visible)" }}
        >
          {/* AI Agent box at top */}
          <div className="flex justify-center mb-4">
            <div className="px-8 py-3 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/[0.04] text-center">
              <Terminal className="size-6 text-emerald-600 mx-auto mb-1.5" />
              <p className="font-bold text-emerald-600 text-base">{architecture.agentLabel}</p>
              <p className="text-xs mt-1" style={{ color: "var(--lp-text-muted)" }}>{architecture.agentSub}</p>
            </div>
          </div>

          {/* Connector lines */}
          <div className="flex justify-center mb-4">
            <div className="flex items-end gap-8 sm:gap-24">
              <div className="w-px h-6 bg-gradient-to-b from-emerald-500/30 to-blue-500/30" />
              <div className="w-px h-6 bg-gradient-to-b from-emerald-500/30 to-violet-500/30" />
              <div className="w-px h-6 bg-gradient-to-b from-emerald-500/30 to-amber-500/30" />
            </div>
          </div>

          {/* Infrastructure layer */}
          <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-4">
            {architecture.layers.map((layer, i) => (
              <div
                key={layer.label}
                className={`p-3 rounded-xl border ${layerColors[i].border} ${layerColors[i].bg} text-center`}
              >
                <div className="flex justify-center mb-1.5">{layerIcons[i]}</div>
                <p className={`font-semibold text-sm ${layerColors[i].text}`}>{layer.label}</p>
                <p className="text-xs" style={{ color: "var(--lp-text-muted)" }}>{layer.sublabel}</p>
              </div>
            ))}
          </div>

          {/* Arrow down */}
          <div className="flex justify-center mb-3">
            <ArrowDown className="size-4" style={{ color: "var(--lp-text-muted)" }} />
          </div>

          {/* Software integrations */}
          <div
            className="p-4 rounded-xl text-center"
            style={{ border: "1px solid var(--lp-border-visible)", backgroundColor: "var(--lp-bg-primary)" }}
          >
            <p className="text-sm mb-2" style={{ color: "var(--lp-text-body)" }}>
              {architecture.softwareLabel} / {architecture.softwareLabelJa}
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-xs">
              {architecture.integrations.map((s) => (
                <span
                  key={s}
                  className="px-2.5 py-1 rounded-lg"
                  style={{
                    backgroundColor: "var(--lp-bg-elevated)",
                    border: "1px solid var(--lp-border-visible)",
                    color: "var(--lp-text-muted)",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
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
    </>
  );
}

export default function AgenticTerminalSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";
  const { timeline, architecture } = t.agenticTerminal;

  const layerIcons = [
    <Monitor key="monitor" className="size-5 text-blue-500" />,
    <Server key="server" className="size-5 text-violet-500" />,
    <Cloud key="cloud" className="size-5 text-amber-500" />,
  ];

  const layerColors = [
    { border: "border-blue-500/20", bg: "bg-blue-500/[0.04]", text: "text-blue-600" },
    { border: "border-violet-500/20", bg: "bg-violet-500/[0.04]", text: "text-violet-600" },
    { border: "border-amber-500/20", bg: "bg-amber-500/[0.04]", text: "text-amber-600" },
  ];

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
              ...(locale === "ja" ? { overflowWrap: "break-word", wordBreak: "normal" } : {}),
            }}
          >
            {t.agenticTerminal.title}{" "}
            <span className="gradient-text">{t.agenticTerminal.titleHighlight}</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg" style={{ color: "var(--lp-text-body)" }}>
            {t.agenticTerminal.subtitle}
          </p>
        </AnimateInView>

        {/* 3-Era Timeline */}
        <AnimateInView delay={100}>
          <div className="mb-16">
            {/* Desktop: horizontal timeline */}
            <div className="hidden md:block">
              <div className="grid grid-cols-3 gap-6 relative">
                {/* Connecting line */}
                <div
                  className="absolute top-[2.25rem] left-[16.67%] right-[16.67%] h-px"
                  style={{ backgroundColor: "var(--lp-border-visible)" }}
                />
                {timeline.map((era, i) => (
                  <div key={era.year} className="flex flex-col items-center text-center relative z-10">
                    {/* Year circle */}
                    <div
                      className={`flex items-center justify-center w-[4.5rem] h-[4.5rem] rounded-full border-2 mb-4 ${
                        era.status === "current"
                          ? "border-emerald-500/40 bg-emerald-500/[0.06]"
                          : "bg-white"
                      }`}
                      style={era.status !== "current" ? { borderColor: "var(--lp-border-visible)", backgroundColor: "var(--lp-bg-elevated)" } : {}}
                    >
                      <span
                        className={`text-lg font-bold ${era.status === "current" ? "text-emerald-600" : ""}`}
                        style={era.status !== "current" ? { color: "var(--lp-text-muted)" } : {}}
                      >
                        {era.year}
                      </span>
                    </div>
                    <h3
                      className={`text-base font-semibold mb-2 ${era.status === "current" ? "text-emerald-600" : ""}`}
                      style={era.status !== "current" ? { color: "var(--lp-text-heading)" } : {}}
                    >
                      {era.label}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "var(--lp-text-body)",
                        ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                      }}
                    >
                      {era.description}
                    </p>
                    {era.status === "current" && (
                      <Badge className="mt-3 bg-emerald-500/10 text-emerald-600 border-emerald-500/20" variant="outline">
                        ← {locale === "ja" ? "今ここ" : "We are here"}
                      </Badge>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile: vertical timeline */}
            <div className="md:hidden space-y-6">
              {timeline.map((era, i) => (
                <div key={era.year} className="flex gap-4">
                  {/* Timeline track */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`flex items-center justify-center w-12 h-12 rounded-full border-2 shrink-0 ${
                        era.status === "current"
                          ? "border-emerald-500/40 bg-emerald-500/[0.06]"
                          : ""
                      }`}
                      style={era.status !== "current" ? { borderColor: "var(--lp-border-visible)", backgroundColor: "var(--lp-bg-elevated)" } : {}}
                    >
                      <span
                        className={`text-sm font-bold ${era.status === "current" ? "text-emerald-600" : ""}`}
                        style={era.status !== "current" ? { color: "var(--lp-text-muted)" } : {}}
                      >
                        {era.year}
                      </span>
                    </div>
                    {i < timeline.length - 1 && (
                      <div className="w-px flex-1 min-h-[1.5rem]" style={{ backgroundColor: "var(--lp-border-visible)" }} />
                    )}
                  </div>
                  {/* Content */}
                  <div className="pb-2">
                    <h3
                      className={`text-base font-semibold mb-1 ${era.status === "current" ? "text-emerald-600" : ""}`}
                      style={era.status !== "current" ? { color: "var(--lp-text-heading)" } : {}}
                    >
                      {era.label}
                    </h3>
                    <p
                      className="text-sm leading-relaxed"
                      style={{
                        color: "var(--lp-text-body)",
                        ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                      }}
                    >
                      {era.description}
                    </p>
                    {era.status === "current" && (
                      <Badge className="mt-2 bg-emerald-500/10 text-emerald-600 border-emerald-500/20" variant="outline">
                        ← {locale === "ja" ? "今ここ" : "We are here"}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </AnimateInView>

        {/* CLI Architecture Diagram */}
        <AnimateInView delay={200}>
          <div
            className="rounded-xl p-6 sm:p-8 mb-12"
            style={{ backgroundColor: "var(--lp-bg-elevated)", border: "1px solid var(--lp-border-visible)" }}
          >
            {/* AI Agent box at top */}
            <div className="flex justify-center mb-4">
              <div className="px-8 py-3 rounded-xl border-2 border-emerald-500/30 bg-emerald-500/[0.04] text-center">
                <Terminal className="size-6 text-emerald-600 mx-auto mb-1.5" />
                <p className="font-bold text-emerald-600 text-base">{architecture.agentLabel}</p>
                <p className="text-xs mt-1" style={{ color: "var(--lp-text-muted)" }}>{architecture.agentSub}</p>
              </div>
            </div>

            {/* Connector lines */}
            <div className="flex justify-center mb-4">
              <div className="flex items-end gap-8 sm:gap-24">
                <div className="w-px h-6 bg-gradient-to-b from-emerald-500/30 to-blue-500/30" />
                <div className="w-px h-6 bg-gradient-to-b from-emerald-500/30 to-violet-500/30" />
                <div className="w-px h-6 bg-gradient-to-b from-emerald-500/30 to-amber-500/30" />
              </div>
            </div>

            {/* Infrastructure layer */}
            <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-4">
              {architecture.layers.map((layer, i) => (
                <div
                  key={layer.label}
                  className={`p-3 rounded-xl border ${layerColors[i].border} ${layerColors[i].bg} text-center`}
                >
                  <div className="flex justify-center mb-1.5">{layerIcons[i]}</div>
                  <p className={`font-semibold text-sm ${layerColors[i].text}`}>{layer.label}</p>
                  <p className="text-xs" style={{ color: "var(--lp-text-muted)" }}>{layer.sublabel}</p>
                </div>
              ))}
            </div>

            {/* Arrow down */}
            <div className="flex justify-center mb-3">
              <ArrowDown className="size-4" style={{ color: "var(--lp-text-muted)" }} />
            </div>

            {/* Software integrations */}
            <div
              className="p-4 rounded-xl text-center"
              style={{ border: "1px solid var(--lp-border-visible)", backgroundColor: "var(--lp-bg-primary)" }}
            >
              <p className="text-sm mb-2" style={{ color: "var(--lp-text-body)" }}>
                {architecture.softwareLabel} / {architecture.softwareLabelJa}
              </p>
              <div className="flex flex-wrap justify-center gap-2 text-xs">
                {architecture.integrations.map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg"
                    style={{
                      backgroundColor: "var(--lp-bg-elevated)",
                      border: "1px solid var(--lp-border-visible)",
                      color: "var(--lp-text-muted)",
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
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
