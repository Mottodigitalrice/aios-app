"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// FAQ content — EN (reduced to 6 essential questions)
// ---------------------------------------------------------------------------

interface FAQItem {
  question: string;
  answer: string;
}

const faqsEN: FAQItem[] = [
  {
    question: "My team isn't technical at all. Can we still do this?",
    answer:
      "Yes \u2014 this is specifically designed for non-technical teams. Every system we build gets documented in plain language, with video walkthroughs your team can reference. We train your people to use and maintain the system, not to become developers. If your team can use LINE and Excel, they can operate an AIOS.",
  },
  {
    question: "What if AI doesn't work for our specific business?",
    answer:
      "That's exactly what the free audit is for. Before we take any money, we analyze your business, your tools, and your workflows. If AI isn't going to deliver real value for you, I'll tell you that clearly \u2014 and you keep the audit report either way. I don't take on engagements I don't believe in.",
  },
  {
    question: "How is this different from hiring a consultant?",
    answer:
      "Most consultants deliver a strategy document and leave. We build a working system with you \u2014 and train your team to run it independently. By the end, you don't need us. That's the whole point. The Ownership Guarantee makes it contractual.",
  },
  {
    question: "\u00A51,200,000 is a significant investment. How do I justify it?",
    answer:
      "Think about what the problem costs. If one senior team member spends 3 hours a day on tasks that should be automated, that's 15+ hours a week of high-salary time on repetitive work. Over 6 months, that easily exceeds what you invest in AIOS \u2014 before accounting for errors, delays, or missed opportunities. AIOS pays for itself when it works. And the free audit will tell you honestly whether it will.",
  },
  {
    question: "Will this work with the tools we already use?",
    answer:
      "Yes. We start from where you are \u2014 kintone, freee, Chatwork, Google Workspace, LINE, whatever your team uses. We don't ask you to replace your stack. We connect it.",
  },
  {
    question: "Can I see this in action before committing?",
    answer:
      "The free AI Audit is the right first step. You'll see how I think, how I analyze a business, and whether my approach fits your situation. That 30-minute call is the demo.",
  },
];

// ---------------------------------------------------------------------------
// FAQ content — JP (reduced to 6 essential questions)
// ---------------------------------------------------------------------------

const faqsJA: FAQItem[] = [
  {
    question: "\u79C1\u306E\u30C1\u30FC\u30E0\u306F\u6280\u8853\u7684\u306A\u77E5\u8B58\u304C\u307B\u3068\u3093\u3069\u3042\u308A\u307E\u305B\u3093\u3002\u305D\u308C\u3067\u3082\u5927\u4E08\u592B\u3067\u3059\u304B\uFF1F",
    answer:
      "\u306F\u3044\u3001\u3053\u306E\u30D7\u30ED\u30B0\u30E9\u30E0\u306F\u6280\u8853\u7684\u306A\u77E5\u8B58\u3092\u6301\u305F\u306A\u3044\u30C1\u30FC\u30E0\u306E\u305F\u3081\u306B\u8A2D\u8A08\u3055\u308C\u3066\u3044\u307E\u3059\u3002\u69CB\u7BC9\u3059\u308B\u3059\u3079\u3066\u306E\u30B7\u30B9\u30C6\u30E0\u306B\u306F\u3001\u5E73\u6613\u306A\u8A00\u8449\u3067\u66F8\u304B\u308C\u305F\u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u3068\u52D5\u753B\u30DE\u30CB\u30E5\u30A2\u30EB\u304C\u4ED8\u5C5E\u3057\u307E\u3059\u3002\u958B\u767A\u8005\u306B\u306A\u3063\u3066\u3044\u305F\u3060\u304F\u5FC5\u8981\u306F\u3042\u308A\u307E\u305B\u3093\u3002LINE\u3084Excel\u304C\u4F7F\u3048\u308B\u306A\u3089\u3001AIOS\u3092\u904B\u7528\u3067\u304D\u307E\u3059\u3002",
  },
  {
    question: "AI\u304C\u79C1\u305F\u3061\u306E\u696D\u7A2E\u30FB\u696D\u614B\u306B\u5408\u308F\u306A\u3044\u5834\u5408\u306F\u3069\u3046\u306A\u308A\u307E\u3059\u304B\uFF1F",
    answer:
      "\u305D\u308C\u3092\u78BA\u8A8D\u3059\u308B\u306E\u304C\u3001\u7121\u6599\u306EAI\u6D3B\u7528\u8A3A\u65AD\u3067\u3059\u3002\u8CBB\u7528\u3092\u3044\u305F\u3060\u304F\u524D\u306B\u3001\u3042\u306A\u305F\u306E\u30D3\u30B8\u30CD\u30B9\u3001\u30C4\u30FC\u30EB\u3001\u696D\u52D9\u30D5\u30ED\u30FC\u3092\u5206\u6790\u3057\u307E\u3059\u3002AI\u304C\u5B9F\u969B\u306E\u4FA1\u5024\u3092\u3082\u305F\u3089\u305B\u306A\u3044\u3068\u5224\u65AD\u3057\u305F\u5834\u5408\u306F\u3001\u6B63\u76F4\u306B\u304A\u4F1D\u3048\u3057\u307E\u3059\u3002\u8A3A\u65AD\u30EC\u30DD\u30FC\u30C8\u306F\u3069\u3061\u3089\u306B\u305B\u3088\u304A\u6301\u3061\u5E30\u308A\u3044\u305F\u3060\u3051\u307E\u3059\u3002\u78BA\u4FE1\u306E\u6301\u3066\u306A\u3044\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u306F\u5F15\u304D\u53D7\u3051\u307E\u305B\u3093\u3002",
  },
  {
    question: "AI\u30B3\u30F3\u30B5\u30EB\u30BF\u30F3\u30C8\u3092\u96C7\u3046\u3053\u3068\u3068\u3001\u4F55\u304C\u9055\u3046\u306E\u3067\u3059\u304B\uFF1F",
    answer:
      "\u591A\u304F\u306E\u30B3\u30F3\u30B5\u30EB\u30BF\u30F3\u30C8\u306F\u6226\u7565\u8CC7\u6599\u3092\u6E21\u3057\u3066\u7D42\u308F\u308A\u3067\u3059\u3002\u79C1\u305F\u3061\u306F\u3042\u306A\u305F\u3068\u4E00\u7DD2\u306B\u52D5\u304F\u30B7\u30B9\u30C6\u30E0\u3092\u69CB\u7BC9\u3057\u307E\u3059\u3002\u305D\u3057\u3066\u30C1\u30FC\u30E0\u304C\u72EC\u7ACB\u3057\u3066\u904B\u7528\u3067\u304D\u308B\u3088\u3046\u306B\u30C8\u30EC\u30FC\u30CB\u30F3\u30B0\u3057\u307E\u3059\u3002\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u304C\u7D42\u308F\u308B\u3053\u308D\u306B\u306F\u3001\u79C1\u305F\u3061\u306F\u4E0D\u8981\u306B\u306A\u3063\u3066\u3044\u307E\u3059\u3002\u305D\u308C\u304C\u76EE\u6A19\u3067\u3059\u3002\u30AA\u30FC\u30CA\u30FC\u30B7\u30C3\u30D7\u4FDD\u8A3C\u304C\u305D\u308C\u3092\u5951\u7D04\u4E0A\u3067\u4FDD\u8A3C\u3057\u307E\u3059\u3002",
  },
  {
    question: "\u00A51,200,000\u306F\u5927\u304D\u306A\u6295\u8CC7\u3067\u3059\u3002\u793E\u5185\u3067\u3069\u3046\u8AAC\u660E\u3059\u308C\u3070\u3088\u3044\u3067\u3059\u304B\uFF1F",
    answer:
      "\u554F\u984C\u306E\u30B3\u30B9\u30C8\u3092\u8003\u3048\u3066\u307F\u3066\u304F\u3060\u3055\u3044\u3002\u30B7\u30CB\u30A2\u30B9\u30BF\u30C3\u30D5\u304C\u4E00\u65E53\u6642\u9593\u3092\u81EA\u52D5\u5316\u3059\u3079\u304D\u4F5C\u696D\u306B\u8CBB\u3084\u3057\u3066\u3044\u308B\u306A\u3089\u3001\u905115\u6642\u9593\u4EE5\u4E0A\u306E\u9AD8\u7D66\u4EBA\u6750\u306E\u6642\u9593\u304C\u7E70\u308A\u8FD4\u3057\u4F5C\u696D\u306B\u6D88\u3048\u3066\u3044\u307E\u3059\u30026\u30F6\u6708\u3067\u3001AIOS\u6295\u8CC7\u984D\u3092\u5BB9\u6613\u306B\u8D85\u3048\u308B\u4EBA\u4EF6\u8CBB\u306B\u306A\u308A\u307E\u3059\u3002\u7121\u6599\u306EAI\u6D3B\u7528\u8A3A\u65AD\u304C\u3001\u305D\u306E\u53EF\u80FD\u6027\u3092\u6B63\u76F4\u306B\u6559\u3048\u3066\u304F\u308C\u307E\u3059\u3002",
  },
  {
    question: "\u4ECA\u4F7F\u3063\u3066\u3044\u308B\u30C4\u30FC\u30EB\u3068\u9023\u643A\u3067\u304D\u307E\u3059\u304B\uFF1F",
    answer:
      "\u306F\u3044\u3002kintone\u3001freee\u3001Chatwork\u3001Google Workspace\u3001LINE\u2014\u2014\u73FE\u5728\u304A\u4F7F\u3044\u306E\u30C4\u30FC\u30EB\u304B\u3089\u30B9\u30BF\u30FC\u30C8\u3057\u307E\u3059\u3002\u30C4\u30FC\u30EB\u30B9\u30BF\u30C3\u30AF\u3092\u5165\u308C\u66FF\u3048\u308B\u5FC5\u8981\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u3064\u306A\u3050\u3053\u3068\u304C\u79C1\u305F\u3061\u306E\u4ED5\u4E8B\u3067\u3059\u3002",
  },
  {
    question: "\u6C7A\u3081\u308B\u524D\u306B\u5B9F\u969B\u306E\u52D5\u304D\u3092\u898B\u308B\u3053\u3068\u306F\u3067\u304D\u307E\u3059\u304B\uFF1F",
    answer:
      "\u7121\u6599\u306EAI\u6D3B\u7528\u8A3A\u65AD\u304C\u6700\u521D\u306E\u30B9\u30C6\u30C3\u30D7\u3067\u3059\u3002\u79C1\u304C\u3069\u306E\u3088\u3046\u306B\u8003\u3048\u3001\u30D3\u30B8\u30CD\u30B9\u3092\u5206\u6790\u3057\u3001\u30A2\u30D7\u30ED\u30FC\u30C1\u304C\u5408\u3046\u304B\u3069\u3046\u304B\u3092\u78BA\u8A8D\u3067\u304D\u307E\u3059\u3002\u305D\u306E30\u5206\u306E\u901A\u8A71\u304C\u3001\u5B9F\u8CEA\u7684\u306A\u30C7\u30E2\u306B\u306A\u308A\u307E\u3059\u3002",
  },
];

// ---------------------------------------------------------------------------
// Bilingual section labels
// ---------------------------------------------------------------------------

const sectionLabels = {
  en: {
    badge: "Common Questions",
    title: "Frequently asked questions.",
    subtitle: "Click any question to expand",
    ctaText: "Still have questions?",
    ctaButton: "Book a free call",
  },
  ja: {
    badge: "\u3088\u304F\u3042\u308B\u8CEA\u554F",
    title: "\u3088\u304F\u3042\u308B\u8CEA\u554F",
    subtitle: "\u6C17\u306B\u306A\u308B\u8CEA\u554F\u3092\u30AF\u30EA\u30C3\u30AF\u3057\u3066\u304F\u3060\u3055\u3044",
    ctaText: "\u307B\u304B\u306B\u3082\u6C17\u306B\u306A\u308B\u3053\u3068\u304C\u3042\u308C\u3070",
    ctaButton: "\u6C17\u8EFD\u306B\u76F8\u8AC7\u3057\u3066\u307F\u307E\u305B\u3093\u304B",
  },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface FAQSectionProps {
  locale?: "en" | "ja";
}

export function FAQSection({ locale = "en" }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = locale === "ja" ? faqsJA : faqsEN;
  const labels = sectionLabels[locale];
  const headingFont = locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]";

  // FAQ structured data for Google rich snippets (always EN for SEO)
  const faqSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqsEN.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  });

  return (
    <section className="border-t border-[#E8E8ED]" style={{ paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block mb-4 px-3 py-1 rounded-full border border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/5 text-xs font-medium">
            {labels.badge}
          </span>
          <h2 className={`text-3xl sm:text-4xl font-bold tracking-tight ${headingFont}`} style={{ color: "var(--lp-text-heading)", ...(locale === "ja" ? { wordBreak: "keep-all" as const } : {}) }}>
            {labels.title}
          </h2>
          <p className="mt-3 text-zinc-500 text-sm">{labels.subtitle}</p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div
                key={faq.question}
                className="rounded-xl border border-[#E8E8ED] bg-white overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-3 p-5 min-h-[44px] text-left hover:bg-zinc-100 transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold block pr-2" style={{ color: "var(--lp-text-heading)" }}>
                      {faq.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`size-5 text-zinc-500 shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{
                    gridTemplateRows: isOpen ? "1fr" : "0fr",
                  }}
                >
                  <div className="overflow-hidden">
                    <div className="px-5 pb-5">
                      <p className="text-sm leading-relaxed" style={{ color: "var(--lp-text-body)", ...(locale === "ja" ? { lineHeight: "1.9" } : {}) }}>
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA at bottom of FAQ */}
        <div className="mt-10 text-center rounded-xl border border-[#E8E8ED] bg-white p-6">
          <p className="mb-4" style={{ color: "var(--lp-text-body)" }}>{labels.ctaText}</p>
          <Link href="/audit">
            <Button
              variant="outline"
              className="border-[#1D1D1F] text-[#1D1D1F] hover:bg-[#F5F5F7] gap-2"
            >
              {labels.ctaButton}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
