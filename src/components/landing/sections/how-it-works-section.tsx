"use client";

import { Badge } from "@/components/ui/badge";
import { Search, Wrench, Trophy } from "lucide-react";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

const stepIcons = [
  <Search key="search" className="size-6 text-[#B8860B]" />,
  <Wrench key="wrench" className="size-6 text-amber-600" />,
  <Trophy key="trophy" className="size-6 text-emerald-600" />,
];

export default function HowItWorksSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  return (
    <section
      id="how-it-works"
      className="border-t border-[#E8E8ED]"
      style={{ backgroundColor: "var(--lp-bg-elevated)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <AnimateInView className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/8">
            {t.howItWorks.badge}
          </Badge>
          <h2
            className={`font-bold tracking-tight ${headingFont}`}
            style={{ fontSize: "var(--text-h2)", color: "var(--lp-text-heading)" }}
          >
            {t.howItWorks.title}{" "}
            <span className="gradient-text">{t.howItWorks.titleHighlight}</span>
          </h2>
        </AnimateInView>

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {t.howItWorks.steps.map((step, i) => (
            <AnimateInView key={step.num} delay={i * 80}>
              <div
                className="rounded-2xl p-8 sm:p-10 text-center h-full flex flex-col items-center transition-all duration-200 hover:-translate-y-0.5"
                style={{
                  backgroundColor: "white",
                  border: "1px solid var(--lp-border-visible)",
                }}
              >
                <div
                  className="flex size-14 items-center justify-center rounded-full mb-4"
                  style={{
                    backgroundColor: "var(--lp-bg-elevated)",
                    border: "1px solid var(--lp-border-visible)",
                  }}
                >
                  {stepIcons[i]}
                </div>
                <div className="text-3xl font-bold gradient-text mb-2">{step.num}</div>
                <h3
                  className={`text-lg font-semibold mb-3 ${headingFont}`}
                  style={{ color: "var(--lp-text-heading)" }}
                >{step.title}</h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{
                    color: "var(--lp-text-body)",
                    ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                  }}
                >{step.description}</p>
              </div>
            </AnimateInView>
          ))}
        </div>
      </div>
    </section>
  );
}
