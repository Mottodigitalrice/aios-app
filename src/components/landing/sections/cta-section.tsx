"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, ShieldCheck, User, Calendar, FileText } from "lucide-react";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

export default function CtaSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  return (
    <AnimateInView
      as="section"
      className="border-t border-zinc-800/50"
      style={{ backgroundColor: "var(--lp-bg-elevated)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-3xl px-6 text-center" id="audit">
        <h2
          className={`font-bold tracking-tight mb-4 ${headingFont}`}
          style={{
            fontSize: "var(--text-h2)",
            color: "var(--lp-text-heading)",
            ...(locale === "ja" ? { wordBreak: "keep-all" } : {}),
          }}
        >
          {t.auditCta.title}{" "}
          <span className="gradient-text">{t.auditCta.titleHighlight}</span>
        </h2>
        <p
          className="text-lg max-w-xl mx-auto mb-10"
          style={{
            color: "var(--lp-text-body)",
            ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
          }}
        >
          {t.auditCta.subtitle}
        </p>
        <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10 text-left">
          {[
            <ShieldCheck key="shield" className="size-5 text-[#B8860B] shrink-0" />,
            <User key="user" className="size-5 text-[#B8860B] shrink-0" />,
            <Calendar key="cal" className="size-5 text-[#B8860B] shrink-0" />,
            <FileText key="file" className="size-5 text-[#B8860B] shrink-0" />,
          ].map((icon, i) => (
            <div key={i} className="flex items-center gap-3 text-sm" style={{ color: "var(--lp-text-heading)" }}>
              {icon}
              <span>{t.auditCta.benefits[i]}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex flex-col items-center">
            <Link href="/signup">
              <Button size="lg" className="bg-[#1D1D1F] hover:bg-[#2D2D2F] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 text-white gap-2 rounded-full px-8">
                {t.cta.title}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <span className="text-xs mt-1.5" style={{ color: "var(--lp-text-muted)" }}>{t.hero.ctaTime}</span>
          </div>
          <div className="flex flex-col items-center">
            <Link href="/audit">
              <Button size="lg" variant="outline" className="border-[#D1D1D6] text-[#1D1D1F] hover:bg-[#F5F5F7] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 gap-2 rounded-full px-8">
                {t.cta.titleSecondary}
              </Button>
            </Link>
            <span className="text-xs mt-1.5" style={{ color: "var(--lp-text-muted)" }}>{t.hero.ctaSecondaryTime}</span>
          </div>
        </div>
      </div>
    </AnimateInView>
  );
}
