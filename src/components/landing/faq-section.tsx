"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ChevronDown,
  HelpCircle,
  Clock,
  Globe,
  Users,
  Shield,
  Wrench,
  DollarSign,
  BarChart3,
  FileText,
  ArrowRight,
  Rocket,
  Building2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categories = ["All", "Getting Started", "Fit", "Program", "Results", "Security"] as const;
type Category = (typeof categories)[number];

const faqs = [
  {
    question: "How much does the free audit actually cost?",
    answer:
      "Nothing. Zero. The audit is 100% free with no strings attached. Lewis personally reviews your answers, prepares a custom AI readiness report, and walks you through it on a video call. You keep the full report regardless of whether you decide to work with us.",
    icon: DollarSign,
    category: "Getting Started" as Category,
  },
  {
    question: "What size company is this for?",
    answer:
      "AIOS is designed for SMBs with 10 to 500 employees. Whether you're a 15-person startup trying to punch above your weight, or a 200-person company drowning in disconnected tools, the system scales to your needs. The sweet spot is companies large enough to feel the pain of fragmented operations but agile enough to implement change.",
    icon: Users,
    category: "Fit" as Category,
  },
  {
    question: "Do I need technical skills to use the system?",
    answer:
      'No. The system is designed for executives, not engineers. You interact with it in plain language \u2014 "what\'s overdue?", "mark it done", "move to tomorrow." Your team gets trained on everything during the program, and full documentation means anyone can maintain it.',
    icon: Wrench,
    category: "Getting Started" as Category,
  },
  {
    question: "Do you work with companies outside Japan?",
    answer:
      "Yes. While we're based in Tokyo and many of our clients are Japan-based, we work with companies globally. Lewis operates in both English and Japanese, and the system itself is language-agnostic. We've built implementations that handle bilingual operations seamlessly.",
    icon: Globe,
    category: "Fit" as Category,
  },
  {
    question: "What's the ROI timeline?",
    answer:
      "Most clients see measurable results within 60 days. Your first automation goes live in Week 1, so you'll start saving time immediately. By Month 2, you typically have 3+ workflows automated, saving 10-20 hours per week. By Month 6, the system is usually paying for itself through operational efficiency alone.",
    icon: BarChart3,
    category: "Results" as Category,
  },
  {
    question: "What happens after the 6 months?",
    answer:
      "You own everything. The system runs on your infrastructure, your accounts, your servers. It keeps working whether we continue together or not. Plus you get 90 days of post-handoff support (6 months if you pay in full) for any questions or issues.",
    icon: Clock,
    category: "Program" as Category,
  },
  {
    question: "How is this different from hiring an AI consultancy?",
    answer:
      "Most consultancies deliver a strategy deck or a proof-of-concept, then leave. We build a complete, working system alongside your team \u2014 and teach them to run it. By month 6, you don't need us. That's the point.",
    icon: HelpCircle,
    category: "Program" as Category,
  },
  {
    question: "Can I see a sample audit report?",
    answer:
      "Yes \u2014 we can share anonymized examples from previous audits during your free consultation call. Each audit is custom-built based on your specific tools, team, and challenges, so no two reports look the same. Book a call and Lewis will walk you through what to expect.",
    icon: FileText,
    category: "Getting Started" as Category,
  },
  {
    question: "What if AI models change? Won't this become outdated?",
    answer:
      "The architecture is model-agnostic by design. When a better model comes out (and they will), you swap it in \u2014 your data, agents, and workflows stay intact. That's the whole point of owning the infrastructure layer.",
    icon: Wrench,
    category: "Program" as Category,
  },
  {
    question: "Is our company data safe?",
    answer:
      "Yes. Your data stays on infrastructure you control. We don't store your business data on our systems. Every implementation includes a security audit and protocol documentation. You decide what the AI can access and what it can't.",
    icon: Shield,
    category: "Security" as Category,
  },
  {
    question: "What industries does this work for?",
    answer:
      "Any industry with operational complexity. We've designed systems for consulting firms, real estate companies, social welfare organizations, and tech startups. The AIOS architecture adapts to your workflows \u2014 if your business runs on processes and data, it works.",
    icon: Building2,
    category: "Fit" as Category,
  },
  {
    question: "How fast can we get started?",
    answer:
      "After the free audit call, onboarding typically starts within 1\u20132 weeks. Your first live automation deploys in Week 1 of the program. By the end of Month 1, you'll have a full architecture plan and multiple systems connected.",
    icon: Rocket,
    category: "Getting Started" as Category,
  },
  {
    question: "What does 'you own everything' actually mean?",
    answer:
      "It means every piece of the system \u2014 the code, the data, the automations, the agent configurations \u2014 runs on YOUR accounts and YOUR servers. If we part ways tomorrow, nothing breaks. There's no proprietary platform to keep paying for. You have full source access and documentation to maintain it independently.",
    icon: Shield,
    category: "Results" as Category,
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredFaqs =
    activeCategory === "All"
      ? faqs
      : faqs.filter((faq) => faq.category === activeCategory);

  return (
    <section className="py-20 sm:py-28 border-t border-zinc-800/50">
      <div className="mx-auto max-w-3xl px-6">
        <div className="text-center mb-10">
          <Badge
            variant="outline"
            className="mb-4 border-zinc-700 text-zinc-400 bg-zinc-800/50"
          >
            Common Questions
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-zinc-500 text-sm">
            {faqs.length} questions answered — click any to expand
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((cat) => {
            const count =
              cat === "All"
                ? faqs.length
                : faqs.filter((f) => f.category === cat).length;
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setOpenIndex(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/30"
                    : "bg-zinc-800/50 text-zinc-500 border border-zinc-800/50 hover:text-zinc-300 hover:border-zinc-700/50"
                }`}
              >
                {cat}
                <span className="ml-1.5 text-[10px] opacity-60">{count}</span>
              </button>
            );
          })}
        </div>

        <div className="space-y-3">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const Icon = faq.icon;
            return (
              <div
                key={faq.question}
                className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center gap-3 p-5 text-left hover:bg-zinc-800/30 transition-colors"
                >
                  <div className="flex size-8 items-center justify-center rounded-lg bg-zinc-800/50 border border-zinc-700/50 shrink-0">
                    <Icon className="size-4 text-indigo-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-semibold text-zinc-200 block pr-2">
                      {faq.question}
                    </span>
                    <span className="text-[10px] text-zinc-600 mt-0.5 block">
                      {faq.category}
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
                    <div className="px-5 pb-5 pl-16">
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

        {/* CTA at bottom of FAQ */}
        <div className="mt-10 text-center rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6">
          <p className="text-zinc-400 mb-4">
            Still have questions?
          </p>
          <Link href="/audit">
            <Button
              variant="outline"
              className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200 gap-2"
            >
              Book a free call
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
