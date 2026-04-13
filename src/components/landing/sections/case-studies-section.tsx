"use client";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

export default function CaseStudiesSection({ t, locale }: SectionProps) {
  const headingFont =
    locale === "ja"
      ? "font-[family-name:var(--font-shippori-mincho)]"
      : "font-[family-name:var(--font-dm-sans)]";

  const cs = (t as any).caseStudies;
  if (!cs) return null;

  return (
    <section
      id="case-studies"
      style={{
        backgroundColor: "var(--lp-bg-primary)",
        paddingTop: "var(--lp-section-gap)",
        paddingBottom: "var(--lp-section-gap)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <AnimateInView className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/8"
          >
            {cs.badge}
          </Badge>
          <h2
            className={`font-bold tracking-tight ${headingFont}`}
            style={{ fontSize: "var(--text-h2)", color: "var(--lp-text-heading)" }}
          >
            {cs.title}{" "}
            <span className="gradient-text">{cs.titleHighlight}</span>
          </h2>
          <p
            className="mt-4 max-w-2xl mx-auto text-lg"
            style={{
              color: "var(--lp-text-body)",
              ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
            }}
          >
            {cs.subtitle}
          </p>
        </AnimateInView>

        {/* Tabs */}
        <Tabs defaultValue="rakuten" className="w-full">
          <div className="overflow-x-auto -mx-6 px-6 mb-8">
            <TabsList
              className="inline-flex w-auto gap-1.5 p-1.5 rounded-xl"
              style={{ backgroundColor: "var(--lp-bg-elevated)" }}
            >
              {cs.tabs.map((tab: any) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="rounded-lg px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-all data-[state=active]:bg-[#1D1D1F] data-[state=active]:text-white data-[state=active]:shadow-sm data-[state=inactive]:text-[#86868B] data-[state=inactive]:hover:text-[#1D1D1F]"
                  style={{ fontFamily: locale === "ja" ? "var(--font-noto-sans-jp, 'Noto Sans JP', system-ui)" : "var(--font-dm-sans, 'DM Sans', system-ui)" }}
                >
                  {tab.logo && <img src={tab.logo} alt="" className="h-4 w-auto opacity-70 data-[state=active]:opacity-100" />}
                  {tab.name}
                  <span className="ml-1.5 text-xs font-normal opacity-60">
                    {tab.size}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {cs.tabs.map((tab: any) => (
            <TabsContent key={tab.id} value={tab.id} className="outline-none">
              <AnimateInView>
                {/* Header + Metrics */}
                <div className="grid sm:grid-cols-2 gap-8 mb-8 items-start">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      {tab.logo && <img src={tab.logo} alt={tab.name} className="h-7 w-auto" />}
                      <div>
                        <p className="text-base font-bold" style={{ color: "var(--lp-text-heading)" }}>{tab.name}</p>
                        <p className="text-xs font-medium" style={{ color: "var(--lp-accent)" }}>{tab.size}</p>
                      </div>
                    </div>
                    <h3
                      className={`text-xl sm:text-2xl font-bold mb-3 ${headingFont}`}
                      style={{
                        color: "var(--lp-text-heading)",
                        lineHeight: locale === "ja" ? "1.5" : "1.25",
                      }}
                    >
                      {tab.headline}
                    </h3>
                    <p
                      className="text-sm mb-4"
                      style={{
                        color: "var(--lp-text-body)",
                        lineHeight: locale === "ja" ? "1.9" : "1.7",
                      }}
                    >
                      {tab.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {tab.tags.map((tag: string, i: number) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs border-[#E8E8ED] text-[#86868B] bg-[#F5F5F7]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-2 gap-3">
                    {tab.metrics.map((m: any, i: number) => (
                      <div
                        key={i}
                        className="rounded-2xl p-4 sm:p-5 transition-all hover:-translate-y-0.5"
                        style={{
                          backgroundColor: "var(--lp-bg-elevated)",
                          border: "1px solid transparent",
                        }}
                      >
                        <div
                          className="text-xl sm:text-2xl font-bold mb-0.5 font-[family-name:var(--font-dm-sans)]"
                          style={{ color: "var(--lp-text-heading)", letterSpacing: "-0.03em" }}
                        >
                          {m.value}
                        </div>
                        <div
                          className="text-xs font-medium"
                          style={{
                            color: "var(--lp-text-muted)",
                            ...(locale === "ja" ? { lineHeight: "1.6" } : {}),
                          }}
                        >
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quote */}
                <div
                  className="rounded-2xl p-6 sm:p-7 mb-6"
                  style={{
                    background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))",
                    borderLeft: "3px solid var(--lp-accent)",
                  }}
                >
                  <blockquote
                    className="text-sm sm:text-base mb-3"
                    style={{
                      color: "var(--lp-text-heading)",
                      fontStyle: locale === "ja" ? "normal" : "italic",
                      lineHeight: locale === "ja" ? "1.9" : "1.7",
                    }}
                  >
                    {tab.quote}
                  </blockquote>
                  <cite
                    className="text-xs font-medium not-italic"
                    style={{ color: "var(--lp-text-muted)" }}
                  >
                    {tab.quoteAuthor}
                  </cite>
                </div>

                {/* Story Grid */}
                <div className={`grid ${tab.stories.length > 2 ? "sm:grid-cols-2" : "sm:grid-cols-2"} gap-4 mb-4`}>
                  {tab.stories.map((story: any, i: number) => (
                    <div
                      key={i}
                      className={`rounded-2xl p-6 ${
                        tab.stories.length === 3 && i === 2 ? "sm:col-span-2" : ""
                      }`}
                      style={{
                        backgroundColor: "var(--lp-bg-subtle)",
                        border: "1px solid var(--lp-border)",
                      }}
                    >
                      <h4
                        className={`text-sm font-semibold mb-2 ${headingFont}`}
                        style={{ color: "var(--lp-text-heading)" }}
                      >
                        {story.title}
                      </h4>
                      <p
                        className="text-xs"
                        style={{
                          color: "var(--lp-text-body)",
                          lineHeight: locale === "ja" ? "1.85" : "1.7",
                        }}
                      >
                        {story.content}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Source */}
                <div
                  className="text-[11px] pt-3"
                  style={{
                    color: "var(--lp-text-muted)",
                    borderTop: "1px solid var(--lp-border)",
                  }}
                >
                  Source:{" "}
                  {tab.sourceUrl ? (
                    <a
                      href={tab.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                      style={{ color: "var(--lp-accent)" }}
                    >
                      {tab.source}
                    </a>
                  ) : (
                    <span>{tab.source}</span>
                  )}
                </div>
              </AnimateInView>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
