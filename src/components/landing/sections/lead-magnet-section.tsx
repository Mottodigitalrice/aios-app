"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

export default function LeadMagnetSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  return (
    <AnimateInView
      as="section"
      style={{ backgroundColor: "#F5F5F7", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-2xl px-6">
        <div className="rounded-2xl border border-[#B8860B]/15 bg-white p-8 sm:p-12 text-center">
          <div className="w-12 h-1 bg-[#B8860B]/30 rounded-full mx-auto mb-4" />
          <h2
            className={`font-bold tracking-tight mb-4 ${headingFont}`}
            style={{ fontSize: "var(--text-h2)", color: "var(--lp-text-heading)" }}
          >
            {t.leadMagnet.title}
          </h2>
          <p className="text-lg mb-2" style={{ color: "var(--lp-text-body)" }}>
            {t.leadMagnet.subtitle}
          </p>
          <p className="text-sm mb-8" style={{ color: "var(--lp-text-muted)" }}>
            {t.leadMagnet.detail}
          </p>
          <Link href="/audit">
            <Button size="lg" className="bg-[#B8860B] hover:bg-[#A0750A] text-white gap-2">
              {t.leadMagnet.cta}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </AnimateInView>
  );
}
