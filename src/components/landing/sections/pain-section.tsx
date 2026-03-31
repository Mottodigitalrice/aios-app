"use client";

import { Badge } from "@/components/ui/badge";
import { User, Sparkles, Unplug } from "lucide-react";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

export default function PainSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  const icons = [
    <User key="user" className="size-5 text-red-500" />,
    <Sparkles key="sparkles" className="size-5 text-red-500" />,
    <Unplug key="unplug" className="size-5 text-red-500" />,
  ];

  return (
    <section
      className="border-t border-[#E8E8ED]"
      style={{ backgroundColor: "var(--lp-bg-elevated)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <AnimateInView className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-red-500/20 text-red-600 bg-red-500/5">
            {t.problems.badge}
          </Badge>
          <h2
            className={`font-bold tracking-tight ${headingFont}`}
            style={{
              fontSize: "var(--text-h2)",
              color: "var(--lp-text-heading)",
              ...(locale === "ja" ? { overflowWrap: "break-word", wordBreak: "normal" } : {}),
            }}
          >
            {t.problems.title}{" "}
            <span style={{ color: "var(--lp-text-muted)" }}>{t.problems.titleMuted}</span>
          </h2>
          {t.problems.subtitle && (
            <p className="max-w-2xl mx-auto mt-4" style={{ color: "var(--lp-text-body)" }}>
              {t.problems.subtitle}
            </p>
          )}
        </AnimateInView>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {t.problems.items.map((content, i) => (
            <AnimateInView key={content.title} delay={i * 80}>
              <div
                className="rounded-2xl p-8 sm:p-10 h-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--lp-border-visible)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-red-500/5 border border-red-500/10">
                    {icons[i]}
                  </div>
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: "var(--lp-text-heading)" }}
                  >{content.title}</h3>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "var(--lp-text-body)",
                    ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                  }}
                >{content.description}</p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
