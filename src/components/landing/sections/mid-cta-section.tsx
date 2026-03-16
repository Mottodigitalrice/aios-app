"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

export default function MidCtaSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  return (
    <AnimateInView
      as="section"
      className="border-t border-zinc-800/50"
      style={{ backgroundColor: "var(--lp-bg-subtle)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <h2
          className={`font-bold tracking-tight mb-3 ${headingFont}`}
          style={{ fontSize: "var(--text-h2)", color: "var(--lp-text-heading)" }}
        >
          {t.midCta.title}
        </h2>
        <p className="mb-8 max-w-xl mx-auto" style={{ color: "var(--lp-text-body)" }}>
          {t.midCta.subtitle}
        </p>
        <div className="flex flex-col items-center">
          <Link href="/signup">
            <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 text-white gap-2 shadow-[0_0_20px_oklch(0.65_0.18_260/30%)]">
              {t.cta.title}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
          <span className="text-xs mt-1.5" style={{ color: "var(--lp-text-muted)" }}>{t.hero.ctaTime}</span>
        </div>
      </div>
    </AnimateInView>
  );
}
