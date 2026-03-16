"use client";

import { Badge } from "@/components/ui/badge";
import { AnimateInView, CountUp } from "@/components/landing/animate-in-view";
import { AgentOrgChart } from "@/components/landing/agent-org-chart";
import { METRICS } from "@/lib/constants";
import type { SectionProps } from "./types";

export default function ProofSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  return (
    <section
      id="proof"
      className="border-t border-[#E8E8ED]"
      style={{ backgroundColor: "var(--lp-bg-primary)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <AnimateInView className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-emerald-500/20 text-emerald-700 bg-emerald-500/5">
            {t.caseStudy.badge}
          </Badge>
          <h2
            className={`font-bold tracking-tight ${headingFont}`}
            style={{
              fontSize: "var(--text-h2)",
              color: "var(--lp-text-heading)",
              ...(locale === "ja" ? { wordBreak: "keep-all" } : {}),
            }}
          >
            {t.caseStudy.title}{" "}
            <span className="gradient-text">{t.caseStudy.titleHighlight}</span>
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-lg"
            style={{
              color: "var(--lp-text-body)",
              ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
            }}
          >
            {t.caseStudy.subtitle}
          </p>
        </AnimateInView>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          {[METRICS.activeProjects, METRICS.tasksInProgress, METRICS.pipelineDeals].map((value, i) => {
            const metric = t.caseStudy.metrics[i];
            return (
              <AnimateInView key={metric.label} delay={i * 100}>
                <div
                  className="rounded-2xl p-5 text-center"
                  style={{
                    backgroundColor: "var(--lp-bg-elevated)",
                    border: "1px solid var(--lp-border-visible)",
                  }}
                >
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                    <CountUp end={value} />
                  </div>
                  <div className="text-sm font-medium" style={{ color: "var(--lp-text-heading)" }}>{metric.label}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--lp-text-muted)" }}>{metric.sublabel}</div>
                </div>
              </AnimateInView>
            );
          })}
        </div>

        {/* Agent Org Chart */}
        <AgentOrgChart locale={locale} />

        {/* Founder reflection / Lewis quote */}
        <AnimateInView className="mt-10">
          <div
            className="max-w-2xl mx-auto rounded-2xl p-8 border-l-4 border-[#B8860B]/40"
            style={{ backgroundColor: "var(--lp-bg-elevated)" }}
          >
            <p
              className="text-base leading-relaxed italic"
              style={{
                color: "var(--lp-text-body)",
                ...(locale === "ja" ? { lineHeight: "1.9", fontStyle: "normal" } : {}),
              }}
            >
              &ldquo;{t.caseStudy.testimonial}&rdquo;
            </p>
            <p className="mt-4 text-sm font-medium" style={{ color: "var(--lp-text-heading)" }}>
              {t.caseStudy.testimonialAuthor}
            </p>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
