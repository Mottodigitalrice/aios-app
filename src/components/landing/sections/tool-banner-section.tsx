"use client";

import Image from "next/image";
import { AnimateInView } from "@/components/landing/animate-in-view";
import type { SectionProps } from "./types";

const tools = [
  { name: "Claude Code", logo: "/logos/claude-code-icon.png", size: 44 },
  { name: "Codex", logo: "/logos/openai.svg", size: 36 },
  { name: "OpenClaw", logo: "/logos/openclaw.png", size: 44 },
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
        className="py-10 sm:py-14"
        style={{ backgroundColor: "#F9F9FB", borderTop: "1px solid var(--lp-border)", borderBottom: "1px solid var(--lp-border)" }}
      >
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p
            className={`text-lg sm:text-xl font-semibold leading-relaxed mb-8 ${headingFont}`}
            style={{ color: "var(--lp-text-heading)", ...(locale === "ja" ? { lineHeight: "1.9" } : {}) }}
          >
            {bannerText}
          </p>
          <div className="flex items-end justify-center gap-10 sm:gap-16">
            {tools.map((tool) => (
              <div key={tool.name} className="flex flex-col items-center gap-3">
                <div className="w-14 h-14 flex items-center justify-center">
                  <Image
                    src={`${basePath}${tool.logo}`}
                    alt={tool.name}
                    width={tool.size}
                    height={tool.size}
                    className="object-contain"
                  />
                </div>
                <span
                  className="text-sm font-semibold"
                  style={{ color: "var(--lp-text-heading)" }}
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
