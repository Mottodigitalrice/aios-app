"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

export default function BioSection({ t, locale }: SectionProps) {
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  return (
    <AnimateInView
      as="section"
      className="border-t border-zinc-800/50"
      style={{ backgroundColor: "var(--lp-bg-subtle)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
    >
      <div className="mx-auto max-w-3xl px-6">
        <div
          className="rounded-xl p-8 sm:p-10"
          style={{ backgroundColor: "var(--lp-bg-elevated)", border: "1px solid var(--lp-border-visible)" }}
        >
          <div className="flex flex-col sm:flex-row gap-6 items-start">
            <Image
              src="/lewis-rice.jpg"
              alt="Lewis Rice"
              width={80}
              height={80}
              className="rounded-full border border-indigo-500/20 object-cover shrink-0"
            />
            <div>
              <h3 className={`text-xl font-semibold mb-1 ${headingFont}`} style={{ color: "var(--lp-text-heading)" }}>{t.bio.name}</h3>
              <p className="text-sm mb-4" style={{ color: "var(--lp-text-muted)" }}>{t.bio.title}</p>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--lp-text-body)" }}>
                {t.bio.bio1}
              </p>
              <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--lp-text-body)" }}>
                {t.bio.bio2}
              </p>
              <div className="flex flex-wrap gap-2">
                {t.bio.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs" style={{ borderColor: "var(--lp-border-visible)", color: "var(--lp-text-body)" }}>
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimateInView>
  );
}
