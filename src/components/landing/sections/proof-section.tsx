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
      style={{ backgroundColor: "#1D1D1F", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <AnimateInView className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-emerald-400/30 text-emerald-400 bg-emerald-400/10">
            {t.caseStudy.badge}
          </Badge>
          <h2
            className={`font-bold tracking-tight text-white ${headingFont}`}
            style={{
              fontSize: "var(--text-h2)",
              ...(locale === "ja" ? { wordBreak: "keep-all" } : {}),
            }}
          >
            {t.caseStudy.title}{" "}
            <span className="gradient-text">{t.caseStudy.titleHighlight}</span>
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-lg text-gray-400"
            style={{
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
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                    <CountUp end={value} />
                  </div>
                  <div className="text-sm font-medium text-white">{metric.label}</div>
                  <div className="text-xs mt-1 text-gray-500">{metric.sublabel}</div>
                </div>
              </AnimateInView>
            );
          })}
        </div>

        {/* Agent Org Chart */}
        <AgentOrgChart locale={locale} dark />

        {/* Founder reflection — first-person statement */}
        <AnimateInView className="mt-10">
          <div
            className="max-w-2xl mx-auto rounded-2xl p-8"
            style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px solid rgba(255, 255, 255, 0.1)" }}
          >
            <p className="text-sm font-semibold mb-3 text-white">
              {t.caseStudy.testimonialAuthor}
            </p>
            <p
              className="text-base leading-relaxed text-gray-300"
              style={{
                ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
              }}
            >
              {t.caseStudy.testimonial}
            </p>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
