"use client";

import { Badge } from "@/components/ui/badge";
import { Flame, Bot, Link2, Shield, Sparkles } from "lucide-react";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

const icons = [
  <Shield key="shield" className="size-5" style={{ color: "#B8860B" }} />,
  <Sparkles key="sparkles" className="size-5" style={{ color: "#B8860B" }} />,
  <Bot key="bot" className="size-5" style={{ color: "#B8860B" }} />,
  <Link2 key="link" className="size-5" style={{ color: "#B8860B" }} />,
  <Flame key="flame" className="size-5" style={{ color: "#B8860B" }} />,
];

export default function ValuePropsSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  return (
    <section
      style={{ backgroundColor: "var(--lp-bg-elevated)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <AnimateInView className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/5">
            {t.valueProps.badge}
          </Badge>
          <h2
            className={`font-bold tracking-tight ${headingFont}`}
            style={{
              fontSize: "var(--text-h2)",
              color: "var(--lp-text-heading)",
              ...(locale === "ja" ? { overflowWrap: "break-word", wordBreak: "normal" } : {}),
            }}
          >
            {t.valueProps.title}{t.valueProps.titleHighlight ? <>{" "}<span className="gradient-text">{t.valueProps.titleHighlight}</span></> : null}
          </h2>
        </AnimateInView>

        {/* VP1: Hero treatment — full width */}
        <AnimateInView className="mb-6">
          <div
            className="rounded-2xl p-8 sm:p-10 transition-all duration-200 hover:-translate-y-0.5"
            style={{
              backgroundColor: "white",
              border: "1px solid var(--lp-border-visible)",
            }}
          >
            <div className="flex items-start gap-4">
              <div className="flex size-11 items-center justify-center rounded-xl bg-[#B8860B]/8 border border-[#B8860B]/15 shrink-0 mt-1">
                {icons[0]}
              </div>
              <div>
                <h3
                  className={`text-lg sm:text-xl font-semibold mb-2 ${headingFont}`}
                  style={{ color: "var(--lp-text-heading)" }}
                >
                  {t.valueProps.items[0].title}
                </h3>
                <p
                  className="text-base leading-relaxed max-w-2xl"
                  style={{
                    color: "var(--lp-text-body)",
                    ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                  }}
                >
                  {t.valueProps.items[0].description}
                </p>
              </div>
            </div>
          </div>
        </AnimateInView>

        {/* VP2-VP5: 2x2 grid */}
        <div className="grid sm:grid-cols-2 gap-6">
          {t.valueProps.items.slice(1).map((item, i) => (
            <AnimateInView key={item.title} delay={(i + 1) * 80}>
              <div
                className="rounded-2xl p-8 h-full transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--lp-border-visible)",
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-[#B8860B]/8 border border-[#B8860B]/10">
                    {icons[i + 1]}
                  </div>
                  <h3
                    className="text-sm font-semibold"
                    style={{ color: "var(--lp-text-heading)" }}
                  >
                    {item.title}
                  </h3>
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "var(--lp-text-body)",
                    ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                  }}
                >
                  {item.description}
                </p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
