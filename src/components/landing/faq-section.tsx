"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// ---------------------------------------------------------------------------
// Category definitions
// ---------------------------------------------------------------------------

type Category = "Getting Started" | "Ownership & Technical" | "Commercial" | "After the Program";

const categories: Category[] = [
  "Getting Started",
  "Ownership & Technical",
  "Commercial",
  "After the Program",
];

const categoryLabels: Record<string, Record<Category, string>> = {
  en: {
    "Getting Started": "Getting Started",
    "Ownership & Technical": "Ownership & Technical",
    "Commercial": "Commercial",
    "After the Program": "After the Program",
  },
  ja: {
    "Getting Started": "はじめに",
    "Ownership & Technical": "所有権・技術面",
    "Commercial": "費用・契約",
    "After the Program": "プログラム終了後",
  },
};

// ---------------------------------------------------------------------------
// FAQ content — EN
// ---------------------------------------------------------------------------

interface FAQItem {
  question: string;
  answer: string;
  category: Category;
}

const faqsEN: FAQItem[] = [
  {
    question: "My team isn't technical at all. Can we still do this?",
    answer:
      "Yes — this is specifically designed for non-technical teams. Every system we build gets documented in plain language, with video walkthroughs your team can reference. We train your people to use and maintain the system, not to become developers. If your team can use LINE and Excel, they can operate an AIOS.",
    category: "Getting Started",
  },
  {
    question: "What if AI doesn't work for our specific business?",
    answer:
      "That's exactly what the free audit is for. Before we take any money, we analyze your business, your tools, and your workflows. If AI isn't going to deliver real value for you, I'll tell you that clearly — and you keep the audit report either way. I don't take on engagements I don't believe in.",
    category: "Getting Started",
  },
  {
    question: "What if we want to start with just one department?",
    answer:
      "Completely fine. Most engagements start with the highest-impact area — often operations or sales — and expand from there. AIOS is designed to grow incrementally. You don't need to transform the whole company at once.",
    category: "Getting Started",
  },
  {
    question: "Can I see this in action before committing?",
    answer:
      "The free AI Audit is the right first step. You'll see how I think, how I analyze a business, and whether my approach fits your situation. That 30-minute call is the demo.",
    category: "Getting Started",
  },
  {
    question: "How is this different from hiring an AI consultant?",
    answer:
      "Most consultants deliver a strategy document and leave. We build a working system with you — and train your team to run it independently. By the end, you don't need us. That's the whole point. The Ownership Guarantee makes it contractual.",
    category: "Ownership & Technical",
  },
  {
    question: "What do we actually own at the end?",
    answer:
      "Everything. Your data stays in your systems. Your agents run on your infrastructure. Your workflows run on your automation platform (n8n, self-hosted). Your documentation lives wherever you store files. You could end the engagement tomorrow and everything keeps running.",
    category: "Ownership & Technical",
  },
  {
    question: "Will this work with the tools we already use?",
    answer:
      "Yes. We start from where you are — Kintone, freee, Chatwork, Google Workspace, LINE, whatever your team uses. We don't ask you to replace your stack. We connect it.",
    category: "Ownership & Technical",
  },
  {
    question:
      "We've been burned by IT projects that went over budget and over time. How is this different?",
    answer:
      "Fixed scope, fixed price, fixed timeline. ¥200,000/month × 6 months. No scope creep because we work together weekly — if something needs to change, we talk about it openly. The Ownership Guarantee means I'm personally committed to delivery.",
    category: "Commercial",
  },
  {
    question:
      "¥1,200,000 is a significant investment. How do I justify it internally?",
    answer:
      "Think about what the problem costs. If one senior team member spends 3 hours a day on tasks that should be automated, that's 15+ hours a week of high-salary time on repetitive work. Over 6 months, that easily exceeds what you invest in AIOS — before accounting for errors, delays, or missed opportunities. AIOS pays for itself when it works. And the free audit will tell you honestly whether it will.",
    category: "Commercial",
  },
  {
    question: "What happens after the 6 months?",
    answer:
      "You own a fully documented, running AI operating system. Your team can operate and extend it independently. If you want ongoing strategic guidance, we offer an AI Koumon (Advisor) service starting at ¥50,000/month — but there's no pressure and no automatic renewal.",
    category: "After the Program",
  },
];

// ---------------------------------------------------------------------------
// FAQ content — JP
// ---------------------------------------------------------------------------

const faqsJA: FAQItem[] = [
  {
    question: "私のチームは技術的な知識がほとんどありません。それでも大丈夫ですか？",
    answer:
      "はい、このプログラムは技術的な知識を持たないチームのために設計されています。構築するすべてのシステムには、平易な言葉で書かれたドキュメントと動画マニュアルが付属します。開発者になっていただく必要はありません。LINEやExcelが使えるなら、AIOSを運用できます。",
    category: "Getting Started",
  },
  {
    question: "AIが私たちの業種・業態に合わない場合はどうなりますか？",
    answer:
      "それを確認するのが、無料のAI活用診断です。費用をいただく前に、あなたのビジネス、ツール、業務フローを分析します。AIが実際の価値をもたらせないと判断した場合は、正直にお伝えします——診断レポートはどちらにせよお持ち帰りいただけます。確信の持てないプロジェクトは引き受けません。",
    category: "Getting Started",
  },
  {
    question: "まずは一部門だけから始めることはできますか？",
    answer:
      "まったく問題ありません。多くのプロジェクトは、影響が最も大きい領域——多くの場合、オペレーションや営業——から始まり、そこから拡大します。AIOSは段階的に成長するよう設計されています。会社全体を一度に変革する必要はありません。",
    category: "Getting Started",
  },
  {
    question: "決める前に実際の動きを見ることはできますか？",
    answer:
      "無料のAI活用診断が最初のステップです。私がどのように考え、ビジネスを分析し、アプローチが合うかどうかを確認できます。その30分の通話が、実質的なデモになります。",
    category: "Getting Started",
  },
  {
    question: "AIコンサルタントを雇うことと、何が違うのですか？",
    answer:
      "多くのコンサルタントは戦略資料を渡して終わりです。私たちはあなたと一緒に動くシステムを構築し、あなたのチームがそれを独立して運用できるようにトレーニングします。プロジェクトが終わるころには、私たちは不要になっています。それが目標です。オーナーシップ保証がそれを契約上で保証します。",
    category: "Ownership & Technical",
  },
  {
    question: "最終的に、私たちは何を「所有」することになりますか？",
    answer:
      "すべてです。データはあなたのシステムに残ります。エージェントはあなたのインフラで動きます。ワークフローはあなたの自動化プラットフォーム（n8n、自己ホスト）で動きます。ドキュメントはあなたのファイルストレージに保存されます。明日プロジェクトを終了しても、すべてがそのまま動き続けます。",
    category: "Ownership & Technical",
  },
  {
    question: "今使っているツールと連携できますか？",
    answer:
      "はい。Kintone、freee、Chatwork、Google Workspace、LINE——現在お使いのツールからスタートします。ツールスタックを入れ替える必要はありません。つなぐことが私たちの仕事です。",
    category: "Ownership & Technical",
  },
  {
    question:
      "ITプロジェクトで予算超過・納期遅延を経験してきました。何が違うのですか？",
    answer:
      "固定スコープ、固定価格、固定期間です。月額¥200,000×6ヶ月。毎週一緒に作業しているため、スコープクリープが起きにくく、変更が必要な場合はオープンに話し合います。オーナーシップ保証は、私自身が納品に責任を持っていることを意味します。",
    category: "Commercial",
  },
  {
    question: "¥1,200,000は大きな投資です。社内でどう説明すればよいですか？",
    answer:
      "問題のコストを考えてみてください。シニアスタッフが一日3時間を自動化すべき作業に費やしているなら、週15時間以上の高給人材の時間が繰り返し作業に消えています。6ヶ月で、AIOS投資額を容易に超える人件費になります——ミス、遅延、機会損失は別として。AIOSは機能すれば元が取れます。無料のAI活用診断が、その可能性を正直に教えてくれます。",
    category: "Commercial",
  },
  {
    question: "6ヶ月後はどうなりますか？",
    answer:
      "完全にドキュメント化され、稼働中のAIオペレーティングシステムを所有することになります。チームが自力で運用・拡張できます。継続的な戦略支援を希望する場合は、月額¥50,000からのAI顧問サービスがあります——ただし、プレッシャーはなく、自動更新もありません。",
    category: "After the Program",
  },
];

// ---------------------------------------------------------------------------
// Bilingual section labels
// ---------------------------------------------------------------------------

const sectionLabels = {
  en: {
    badge: "Common Questions",
    title: "Frequently asked questions.",
    subtitle: "10 questions answered — click any to expand",
    ctaText: "Still have questions?",
    ctaButton: "Book a free call",
  },
  ja: {
    badge: "よくある質問",
    title: "よくある質問",
    subtitle: "10の質問に答えます — クリックで展開",
    ctaText: "まだ質問がありますか？",
    ctaButton: "無料通話を予約する",
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
  const catLabels = categoryLabels[locale];

  // Group FAQs by category (preserving category order)
  const grouped = categories
    .map((cat) => ({
      category: cat,
      label: catLabels[cat],
      items: faqs.filter((faq) => faq.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  // Precompute starting index for each group (avoids mutable variable during render)
  const groupOffsets = grouped.reduce<number[]>((acc, group, i) => {
    acc.push(i === 0 ? 0 : acc[i - 1] + grouped[i - 1].items.length);
    return acc;
  }, []);

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
    <section className="py-20 sm:py-28 border-t border-zinc-800/50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: faqSchema }}
      />
      <div className="mx-auto max-w-3xl px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-block mb-4 px-3 py-1 rounded-full border border-zinc-700 text-zinc-400 bg-zinc-800/50 text-xs font-medium">
            {labels.badge}
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {labels.title}
          </h2>
          <p className="mt-3 text-zinc-500 text-sm">{labels.subtitle}</p>
        </div>

        {/* Grouped FAQ accordion */}
        <div className="space-y-8">
          {grouped.map((group, groupIdx) => (
              <div key={group.category}>
                {/* Category label */}
                <p className="text-xs text-zinc-500 uppercase tracking-wider mb-3 pl-1">
                  {group.label}
                </p>

                <div className="space-y-3">
                  {group.items.map((faq, i) => {
                    const idx = groupOffsets[groupIdx] + i;
                    const isOpen = openIndex === idx;

                    return (
                      <div
                        key={faq.question}
                        className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenIndex(isOpen ? null : idx)}
                          aria-expanded={isOpen}
                          className="w-full flex items-center gap-3 p-5 text-left hover:bg-zinc-800/30 transition-colors"
                        >
                          <div className="flex-1 min-w-0">
                            <span className="text-sm font-semibold text-zinc-200 block pr-2">
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
                              <p className="text-sm text-zinc-400 leading-relaxed">
                                {faq.answer}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
          ))}
        </div>

        {/* CTA at bottom of FAQ */}
        <div className="mt-10 text-center rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6">
          <p className="text-zinc-400 mb-4">{labels.ctaText}</p>
          <Link href="/audit">
            <Button
              variant="outline"
              className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200 gap-2"
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
