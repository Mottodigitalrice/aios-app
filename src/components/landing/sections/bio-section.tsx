"use client";

import { Badge } from "@/components/ui/badge";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

export default function BioSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  return (
    <section
      className="border-t border-[#E8E8ED]"
      style={{ backgroundColor: "var(--lp-bg-subtle)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-4xl px-6">
        {/* Section header */}
        <AnimateInView className="text-center mb-12">
          <h2
            className={`font-bold tracking-tight ${headingFont}`}
            style={{ fontSize: "var(--text-h2)", color: "var(--lp-text-heading)" }}
          >
            {t.bio.sectionTitle || "Who\u2019s behind this"}
          </h2>
        </AnimateInView>

        {/* Editorial layout */}
        <AnimateInView delay={100}>
          <div
            className="rounded-2xl p-8 sm:p-12"
            style={{ backgroundColor: "var(--lp-bg-elevated)", border: "1px solid var(--lp-border-visible)" }}
          >
            {/* Top: Photo + name/title */}
            <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8">
              <img
                src={`${basePath}/lewis-rice.jpg`}
                alt="Lewis Rice"
                width={120}
                height={120}
                className="rounded-2xl border border-[#E8E8ED] object-cover shrink-0"
                style={{ width: 120, height: 120 }}
              />
              <div className="text-center sm:text-left">
                <h3 className={`text-2xl font-semibold mb-1 ${headingFont}`} style={{ color: "var(--lp-text-heading)" }}>
                  {t.bio.name}
                </h3>
                <p className="text-sm mb-4" style={{ color: "var(--lp-text-muted)" }}>
                  {t.bio.title}
                </p>
                <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                  {t.bio.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs" style={{ borderColor: "var(--lp-border-visible)", color: "var(--lp-text-body)" }}>
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Narrative paragraphs */}
            <div className="space-y-5">
              <p
                className="leading-relaxed"
                style={{
                  color: "var(--lp-text-body)",
                  ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                }}
              >
                {t.bio.bio1}
              </p>
              <p
                className="leading-relaxed"
                style={{
                  color: "var(--lp-text-body)",
                  ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                }}
              >
                {t.bio.bio2}
              </p>
              {t.bio.bio3 && (
                <p
                  className="leading-relaxed"
                  style={{
                    color: "var(--lp-text-body)",
                    ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                  }}
                >
                  {t.bio.bio3}
                </p>
              )}
              {t.bio.bio4 && (
                <p
                  className="leading-relaxed"
                  style={{
                    color: "var(--lp-text-body)",
                    ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
                  }}
                >
                  {t.bio.bio4}
                </p>
              )}
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
