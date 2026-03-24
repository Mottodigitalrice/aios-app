"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

const tools = [
  { name: "Claude Code", logo: "/logos/claude-code-icon.png" },
  { name: "Codex", logo: "/logos/openai.svg" },
  { name: "OpenClaw", logo: "/logos/openclaw.png" },
];

export default function ToolBannerSection({ t, locale }: SectionProps) {
  const headingFont =
    locale === "ja"
      ? "font-[family-name:var(--font-shippori-mincho)]"
      : "font-[family-name:var(--font-dm-sans)]";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

  const bannerText =
    locale === "ja"
      ? "エージェンティックAIを最大限に活用するための基盤を、6ヶ月かけて一緒に構築するプログラム"
      : "A 6-month co-build program to help you set up and learn how to utilize Agentic AI";

  return (
    <AnimateInView as="section">
      <div
        className="py-8 sm:py-10"
        style={{ backgroundColor: "#F9F9FB", borderTop: "1px solid var(--lp-border)", borderBottom: "1px solid var(--lp-border)" }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p
            className={`text-base sm:text-lg font-medium leading-relaxed mb-6 ${headingFont}`}
            style={{ color: "var(--lp-text-heading)", ...(locale === "ja" ? { lineHeight: "1.9" } : {}) }}
          >
            {bannerText}
          </p>
          <div className="flex items-center justify-center gap-8 sm:gap-12">
            {tools.map((tool) => (
              <div key={tool.name} className="flex flex-col items-center gap-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 relative flex items-center justify-center">
                  <Image
                    src={`${basePath}${tool.logo}`}
                    alt={tool.name}
                    width={56}
                    height={56}
                    className="object-contain"
                  />
                </div>
                <span
                  className="text-xs sm:text-sm font-medium"
                  style={{ color: "var(--lp-text-body)" }}
                >
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimateInView>
  );
}
