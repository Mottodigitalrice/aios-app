"use client";

import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { AnimateInView, CountUp } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

export default function ProgramSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  return (
    <section
      id="program"
      style={{ backgroundColor: "var(--lp-bg-primary)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-5xl px-6">
        <AnimateInView className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/5">
            {t.program.badge}
          </Badge>
          <h2
            className={`font-bold tracking-tight ${headingFont}`}
            style={{ fontSize: "var(--text-h2)", color: "var(--lp-text-heading)" }}
          >
            {t.program.title}{" "}
            <span className="gradient-text">{t.program.titleHighlight}</span>
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg" style={{ color: "var(--lp-text-body)" }}>
            {t.program.subtitle}
          </p>
        </AnimateInView>

        <div className="space-y-6">
          {/* Month 1 */}
          <AnimateInView>
            <div
              className="rounded-xl p-8"
              style={{ backgroundColor: "var(--lp-bg-elevated)", border: "1px solid var(--lp-border-visible)" }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="flex size-10 items-center justify-center rounded-full bg-[#B8860B]/10 text-[#B8860B] font-bold text-sm">1</div>
                <div>
                  <h3 className={`text-xl font-semibold ${headingFont}`} style={{ color: "var(--lp-text-heading)" }}>{t.program.month1.title}</h3>
                  <p className="text-sm" style={{ color: "var(--lp-text-muted)" }}>{t.program.month1.subtitle}</p>
                </div>
              </div>
              <ul className="space-y-3">
                {t.program.month1.items.map((item: string) => (
                  <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--lp-text-heading)" }}>
                    <Check className="size-4 text-[#B8860B] mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimateInView>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Month 2 */}
            <AnimateInView delay={100}>
              <div className="rounded-xl p-8 h-full" style={{ backgroundColor: "var(--lp-bg-elevated)", border: "1px solid var(--lp-border-visible)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#B8860B]/10 text-[#B8860B] font-bold text-sm">2</div>
                  <div>
                    <h3 className={`text-xl font-semibold ${headingFont}`} style={{ color: "var(--lp-text-heading)" }}>{t.program.month2.title}</h3>
                    <p className="text-sm" style={{ color: "var(--lp-text-muted)" }}>{t.program.month2.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {t.program.month2.items.map((item: string) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--lp-text-heading)" }}>
                      <Check className="size-4 text-[#B8860B] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInView>

            {/* Month 3 */}
            <AnimateInView delay={200}>
              <div className="rounded-xl p-8 h-full" style={{ backgroundColor: "var(--lp-bg-elevated)", border: "1px solid var(--lp-border-visible)" }}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex size-10 items-center justify-center rounded-full bg-[#B8860B]/10 text-[#B8860B] font-bold text-sm">3</div>
                  <div>
                    <h3 className={`text-xl font-semibold ${headingFont}`} style={{ color: "var(--lp-text-heading)" }}>{t.program.month3.title}</h3>
                    <p className="text-sm" style={{ color: "var(--lp-text-muted)" }}>{t.program.month3.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {t.program.month3.items.map((item: string) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--lp-text-heading)" }}>
                      <Check className="size-4 text-[#B8860B] mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInView>

            {/* Months 4-6 */}
            <AnimateInView delay={300}>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600 font-bold text-sm">4-6</div>
                  <div>
                    <h3 className={`text-xl font-semibold ${headingFont}`} style={{ color: "var(--lp-text-heading)" }}>{t.program.month4.title}</h3>
                    <p className="text-sm text-emerald-600">{t.program.month4.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {t.program.month4.items.map((item: string) => (
                    <li key={item} className="flex items-start gap-3 text-sm" style={{ color: "var(--lp-text-heading)" }}>
                      <Check className="size-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInView>
          </div>
        </div>

        {/* By Month 6 */}
        <AnimateInView className="mt-8">
          <div
            className="rounded-xl p-8"
            style={{ backgroundColor: "var(--lp-bg-elevated)", border: "1px solid var(--lp-border-visible)" }}
          >
            <h3
              className={`text-xl font-semibold mb-6 text-center ${headingFont}`}
              style={{ color: "var(--lp-text-heading)" }}
            >{t.program.byMonth6.title}</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              {t.program.byMonth6.metrics.map((metric, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-bold gradient-text mb-2">
                    {i === 0 ? <CountUp end={10} /> : i === 1 ? <CountUp end={100} suffix="%" /> : metric.value}
                  </div>
                  <div className="text-sm font-medium" style={{ color: "var(--lp-text-heading)" }}>{metric.label}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--lp-text-muted)" }}>{metric.sublabel}</div>
                </div>
              ))}
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
