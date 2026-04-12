"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import {
  Layers,
  Terminal,
  Monitor,
  Server,
  Cloud,
  ArrowRight,
  ArrowDown,
  RefreshCw,
  Zap,
  ChevronDown,
  ChevronRight,
  Code,
  Wrench,
  Sparkles,
  TrendingDown,
  RotateCcw,
  Bot,
  Cpu,
  MessageSquare,
  Workflow,
  AlertTriangle,
  DollarSign,
  Unlink,
  Mail,
  Linkedin,
  QrCode,
  Globe,
  Clock,
  UserPlus,
  Shield,
} from "lucide-react";
import Image from "next/image";

import { AIOSPyramid } from "@/components/landing/aios-pyramid";
import { BrainBodyDiagram } from "@/components/landing/brain-body-section";

// ── Slide definitions ──
// Each slide has a name and number of internal sub-steps
const SLIDES = [
  { name: "title", steps: 2, transition: "scale" as const },          // 0: title, 1: subtitle
  { name: "toolBanner", steps: 1, transition: "scale" as const },     // 1: tool logos + program description
  { name: "caseStudiesIntro", steps: 1, transition: "slide" as const },  // 2: intro heading
  { name: "caseRakuten", steps: 1, transition: "slide" as const },      // 3: Rakuten
  { name: "caseNri", steps: 1, transition: "slide" as const },          // 4: NRI
  { name: "caseClassmethod", steps: 1, transition: "slide" as const },  // 5: Classmethod
  { name: "casePanasonic", steps: 1, transition: "slide" as const },    // 6: Panasonic
  { name: "caseReadyfor", steps: 1, transition: "slide" as const },     // 7: READYFOR
  { name: "caseKnowledgework", steps: 1, transition: "slide" as const },// 8: Knowledge Work
  { name: "caseMotto", steps: 1, transition: "slide" as const },        // 9: MOTTO Digital
  { name: "automation", steps: 2, transition: "slide" as const },       // 10: heading, department grid
  { name: "problem", steps: 3, transition: "stagger" as const },        // 11: heading, cycle, insight
  { name: "era2024", steps: 3, transition: "slide" as const },          // 12: heading, details, takeaway
  { name: "era2025", steps: 3, transition: "slide" as const },          // 13: heading, limitations, takeaway
  { name: "brainbody", steps: 3, transition: "stagger" as const },      // 14: heading, diagram, insight
  { name: "cli", steps: 3, transition: "stagger" as const },            // 15: heading+logos, architecture, insight
  { name: "ownership", steps: 2, transition: "slide" as const },        // 16: heading, diagram
  { name: "selfimprove", steps: 3, transition: "slide" as const },      // 17: heading, before/after+loop, insight
  { name: "valueProps", steps: 2, transition: "stagger" as const },     // 18: heading, 5 cards
  { name: "program", steps: 2, transition: "slide" as const },          // 19: heading, months
  { name: "pricing", steps: 2, transition: "slide" as const },          // 20: heading, 3 tiers
  { name: "guarantee", steps: 1, transition: "scale" as const },        // 21: full guarantee
  { name: "closing", steps: 1, transition: "scale" as const },          // 22: full closing
];

const TOTAL_GLOBAL_STEPS = SLIDES.reduce((sum, s) => sum + s.steps, 0);

// ── Presenter Notes ──
const PRESENTER_NOTES: Record<number, { timing: string; en: string[]; jp: string[] }> = {
  0: {
    timing: "~2 min",
    en: [
      "Welcome everyone, thank you for your time today.",
      "I'm Lewis Rice from MOTTO Digital — we specialize in AI infrastructure for businesses.",
      "Today we'll talk about why most companies are stuck with AI, and what just changed in 2026.",
      "This presentation is about 15-20 minutes, then open Q&A.",
    ],
    jp: [
      "皆さま、本日はお時間をいただきありがとうございます。",
      "MOTTO Digitalのルイス・ライスです。企業向けAIインフラを専門としています。",
      "今日は、なぜ多くの企業がAIで行き詰まっているのか、2026年に何が変わったのかについてお話しします。",
      "プレゼンは約15〜20分、その後Q&Aの時間を設けます。",
    ],
  },
  1: {
    timing: "~1 min",
    en: [
      "We teach you how to use the most powerful AI tools available today.",
      "Claude Code from Anthropic, Codex from OpenAI, and open-source alternatives.",
      "This is a 6-month co-build program — not a course, not a demo.",
    ],
    jp: [
      "最先端のAIツールの活用方法をお教えします。",
      "AnthropicのClaude Code、OpenAIのCodex、オープンソースの選択肢。",
      "6ヶ月の共同構築プログラム。座学やデモではありません。",
    ],
  },
  2: {
    timing: "~30s",
    en: [
      "Before we dive into how this works, let me show you WHO is already using this technology.",
      "These are real Japanese companies — from 240,000-employee enterprises to solo founders.",
    ],
    jp: [
      "仕組みの説明に入る前に、この技術を誰がすでに使っているかをお見せします。",
      "日本の実際の企業です — 24万人のパナソニックから個人事業主まで。",
    ],
  },
  3: {
    timing: "~30s",
    en: [
      "Rakuten — 32,000 employees. Feature delivery cut from 24 days to 5.",
      "Finance team went from a full day on reports to one hour.",
    ],
    jp: [
      "楽天 — 従業員32,000名。機能リリースを24日から5日に短縮。",
      "財務レポートは丸1日から1時間に。",
    ],
  },
  4: {
    timing: "~30s",
    en: [
      "NRI — Japan's largest IT consulting firm. Built custom Japanese language tests.",
      "Document review time cut in half. Now an official Claude reseller.",
    ],
    jp: [
      "NRI — 日本最大のITコンサル企業。独自の日本語評価テストを構築。",
      "文書レビュー時間を半減。公式Claudeリセラーに。",
    ],
  },
  5: {
    timing: "~30s",
    en: [
      "Classmethod — Japan's top AWS partner. 24-hour task done in 60 minutes.",
      "10x productivity gains. Built an AI experience center for other companies.",
    ],
    jp: [
      "クラスメソッド — 日本トップのAWSパートナー。24時間の作業が60分で完了。",
      "10倍の生産性向上。他社向けAI体験センターを開設。",
    ],
  },
  6: {
    timing: "~30s",
    en: [
      "Panasonic — 240,000 employees. Built Claude into a consumer product for 1 billion customers.",
      "Targeting 30% of revenue from AI-driven business by 2030.",
    ],
    jp: [
      "パナソニック — 従業員24万名。10億人向け消費者プロダクトにClaudeを組み込み。",
      "2030年までにAI事業で売上の30%を目標。",
    ],
  },
  7: {
    timing: "~30s",
    en: [
      "READYFOR — 12-person team. Ran a rigorous 3-month evaluation.",
      "83% experienced real productivity gains. Honest results including challenges.",
    ],
    jp: [
      "READYFOR — 12名チーム。3ヶ月間の厳密な評価を実施。",
      "83%が生産性向上を実感。課題も含めた正直な結果を公開。",
    ],
  },
  8: {
    timing: "~30s",
    en: [
      "Knowledge Work — one person, 448 production deployments in a single month.",
      "7 parallel AI sessions. The human's only task: review and approve.",
    ],
    jp: [
      "ナレッジワーク — たった1人。1ヶ月で448回の本番デプロイ。",
      "7つの並行セッション。人間の仕事はレビューと承認だけ。",
    ],
  },
  9: {
    timing: "~30s",
    en: [
      "MOTTO Digital — that's us. One consultant, five clients, 24/7 operations, zero staff hired.",
      "Everything on this page was built with the same technology we teach you.",
    ],
    jp: [
      "MOTTO Digital — 私たちのストーリー。1名で5社、24時間365日稼働、追加採用ゼロ。",
      "このページの全ては、あなたにお教えする同じ技術で構築しました。",
    ],
  },
  10: {
    timing: "~2 min",
    en: [
      "So what can this actually do for YOUR business?",
      "Here are real tasks across 6 departments — with actual before and after times.",
      "Marketing: lead discovery goes from 10 hours a week to 30 minutes.",
      "Finance: expense categorization from 5 hours a month to 5 minutes.",
      "Add it up — over 115 hours per month recovered. That's almost a full-time employee.",
    ],
    jp: [
      "では、あなたのビジネスで具体的に何ができるのか？",
      "6つの部門にわたる実際のタスクと、ビフォー・アフターの時間です。",
      "マーケティング：リード発掘が週10時間から30分に。",
      "経理：経費仕分けが月5時間から5分に。",
      "合計すると月115時間以上の回収。ほぼフルタイム1人分です。",
    ],
  },
  11: {
    timing: "~3 min",
    en: [
      "Let's start with the problem everyone experiences.",
      "Show of hands — how many have tried AI tools and gone back to manual processes?",
      "This cycle is universal: try, get some results, hit a wall, give up.",
      "The key insight: it's not the AI models that are the problem — it's the environment they run in.",
      "Models keep improving, but they're trapped in chat windows.",
    ],
    jp: [
      "皆さんが経験している問題から始めましょう。",
      "AIツールを試して、手作業に戻った経験のある方は？",
      "このサイクルは普遍的です：試す→成果→壁→諦める。",
      "重要なのは、AIモデルが問題ではなく、動作環境が制限されていることです。",
    ],
  },
  12: {
    timing: "~2 min",
    en: [
      "2024 was the year chatbots went mainstream.",
      "Every company ran prompt training sessions.",
      "Power users built custom GPTs — but most employees couldn't use AI effectively.",
      "The fundamental limitation: AI could talk but couldn't take action.",
    ],
    jp: [
      "2024年はチャットボットが主流になった年です。",
      "すべての企業がプロンプト研修を実施しました。",
      "パワーユーザーはカスタムGPTを作れましたが、大多数は効果的に使えませんでした。",
      "根本的な制限：AIは話せるが行動できなかった。",
    ],
  },
  13: {
    timing: "~3 min",
    en: [
      "2025 brought real automation tools — n8n, Zapier AI, agent frameworks.",
      "But three major problems emerged:",
      "1. You need developers to build and maintain agents.",
      "2. Vendor lock-in — stop paying and everything disappears.",
      "3. Agent isolation — A, B, C, D can't talk to each other.",
      "Companies were renting AI adoption, not owning it.",
    ],
    jp: [
      "2025年は自動化ツールが本格化 — n8n、Zapier AI、エージェントフレームワーク。",
      "しかし3つの大きな問題が浮上：",
      "1. 構築・維持に開発者が必要。",
      "2. ベンダーロックイン — 支払いを止めると全て消える。",
      "3. エージェントの孤立 — 連携できない。",
    ],
  },
  14: {
    timing: "~2 min",
    en: [
      "This is the KEY concept slide — take time here.",
      "Until now, AI had a brain (the model) but no body (no way to act).",
      "The breakthrough: giving AI a body — terminal access, file system, APIs, servers.",
      "Brain + Body = an AI that can actually operate your business.",
      "This isn't a chatbot upgrade — it's a completely new category of technology.",
    ],
    jp: [
      "ここが最も重要なコンセプトです — 時間をかけてください。",
      "これまでAIには脳（モデル）はあったが、体（行動する手段）がなかった。",
      "ブレイクスルー：AIに体を与える — ターミナル、ファイル、API、サーバー。",
      "脳＋体＝ビジネス全体を運営できるAI。",
    ],
  },
  15: {
    timing: "~3 min",
    en: [
      "Here's what this looks like in practice.",
      "Claude Code, Codex, Antigravity, OpenClaw — all entering the command line.",
      "The AI agent sits at the top, connecting to your local machine, servers, and cloud.",
      "It can reach any software your business uses — Notion, Slack, CRM, accounting, POS, etc.",
      "Demo opportunity: show a real Claude Code session if time permits.",
    ],
    jp: [
      "実際にどう見えるかをお見せします。",
      "Claude Code、Codex、Antigravity、OpenClaw — すべてコマンドラインに入る。",
      "AIエージェントが頂点に位置し、PC、サーバー、クラウドに接続。",
      "あらゆるビジネスソフトウェアに到達可能。",
    ],
  },
  16: {
    timing: "~2 min",
    en: [
      "This is where we differentiate from everyone else.",
      "Everything is YOURS — skills, agents, data, servers, security, code.",
      "You can plug in any AI model — Claude, GPT, Gemini, even local LLMs.",
      "No vendor lock-in. Switch providers anytime without losing anything.",
      "This is the infrastructure play — you OWN the system.",
    ],
    jp: [
      "ここがわたしたちの差別化ポイントです。",
      "全てがあなたのもの — スキル、エージェント、データ、サーバー、コード。",
      "どのAIモデルでも接続可能。ベンダーロックインなし。",
      "インフラを所有するという戦略です。",
    ],
  },
  17: {
    timing: "~2 min",
    en: [
      "The long-term value proposition.",
      "Before: you needed expert teams to maintain AI systems. Expensive fixes, constant developer dependency.",
      "Now: the agent reads code, diagnoses issues, fixes and deploys — automatically.",
      "Problem → Detect → Fix → Stronger. Continuous improvement loop.",
      "The system gets better over time without additional investment.",
    ],
    jp: [
      "長期的な価値提案です。",
      "以前：AIシステムの維持に専門家チームが必要でした。",
      "今：エージェントがコードを読み、問題を診断し、修正・デプロイ。",
      "問題→検出→修正→強化。継続的改善ループ。",
    ],
  },
  18: {
    timing: "~2 min",
    en: [
      "These are the five key impacts of building an Agentic AI system.",
      "First: you own everything. No vendor lock-in.",
      "Second: the system improves itself over time.",
      "Third: it does real work — not just answers questions.",
      "Fourth: it connects all your tools into one system.",
      "Fifth: you get freedom to work ON your business.",
    ],
    jp: [
      "エージェンティックAIがもたらす5つの大きな変化です。",
      "1つ目：すべてあなたのもの。ベンダーロックインなし。",
      "2つ目：使うほどシステムが自ら進化。",
      "3つ目：質問に答えるだけでなく、本当に仕事をする。",
      "4つ目：すべてのツールを一つにつなぐ。",
      "5つ目：現場作業から経営に集中する時間を取り戻す。",
    ],
  },
  19: {
    timing: "~3 min",
    en: [
      "Here's how the 6-month program works.",
      "Month 1: We map your current systems and design your custom AI architecture.",
      "Month 2: We connect your tools and data into the system.",
      "Month 3: We build AI agents and deploy them in real business scenarios.",
      "Months 4-6: You use it daily, iterate, and prove it works.",
      "By month 6: 10 AI agents, 100% documented and owned, zero vendor dependency.",
    ],
    jp: [
      "6ヶ月プログラムの流れです。",
      "1ヶ月目：現在のシステムをマッピングし、カスタムAIアーキテクチャを設計。",
      "2ヶ月目：ツールとデータをシステムに接続。",
      "3ヶ月目：AIエージェントを構築し、実際のビジネスに展開。",
      "4〜6ヶ月目：日々の業務で活用し、改善を繰り返す。",
      "6ヶ月後：10のAIエージェント、100%ドキュメント化・所有、ベンダー依存ゼロ。",
    ],
  },
  20: {
    timing: "~2 min",
    en: [
      "Three ways to get started — choose what fits your situation.",
      "Group Cohort at 20,000 yen per month — learn alongside peers.",
      "One-on-One at 50,000 yen — most founders choose this — dedicated personal coaching.",
      "Company Build at 200,000 yen — for teams up to 10 people.",
      "All plans include the ownership guarantee.",
    ],
    jp: [
      "3つのプランからお選びいただけます。",
      "グループコホート：月2万円——仲間と一緒に学ぶ。",
      "マンツーマン：月5万円——多くの方がこちらを選択。専属のパーソナルコーチング。",
      "カンパニービルド：月20万円——最大10名のチームで。",
      "すべてのプランにオーナーシップ保証付き。",
    ],
  },
  21: {
    timing: "~1 min",
    en: [
      "This is our promise.",
      "Complete the 6-month program. If you can't independently run your AI system by the end, we continue free.",
      "No fine print. No hedging. We amplify your capabilities — we never replace your team.",
    ],
    jp: [
      "これが私たちの約束です。",
      "6ヶ月のプログラムを完走してください。自力で運用できなければ、できるまで無償でサポート。",
      "小さな文字なし。言い訳なし。能力を増幅する——チームを置き換えることは決してしません。",
    ],
  },
  22: {
    timing: "~1 min",
    en: [
      "The question isn't 'should we use AI' — everyone knows the answer.",
      "The question is 'do we have the infrastructure to run it?'",
      "Three ways to take the next step: Get your free AI audit, download this presentation, or book a call directly.",
      "Thank you for your time. Questions?",
    ],
    jp: [
      "問いは「AIを使うべきか？」ではありません。",
      "「AIを動かすインフラがあるか？」です。",
      "次のステップは3つ：まずは無料AI活用診断から、申し込み、または直接通話を予約。",
      "ご清聴ありがとうございました。ご質問はどうぞ。",
    ],
  },
};

function getSlideAndStep(globalStep: number) {
  let remaining = globalStep;
  for (let i = 0; i < SLIDES.length; i++) {
    if (remaining < SLIDES[i].steps) {
      return { slideIndex: i, localStep: remaining };
    }
    remaining -= SLIDES[i].steps;
  }
  return { slideIndex: SLIDES.length - 1, localStep: SLIDES[SLIDES.length - 1].steps - 1 };
}

export default function PresentationPage() {
  const [globalStep, setGlobalStep] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const prevGlobalStepRef = useRef(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");

  const advance = useCallback(() => {
    setGlobalStep((s) => {
      const next = Math.min(s + 1, TOTAL_GLOBAL_STEPS - 1);
      if (next > s) setDirection("forward");
      return next;
    });
  }, []);

  const goBack = useCallback(() => {
    setGlobalStep((s) => {
      const prev = Math.max(s - 1, 0);
      if (prev < s) setDirection("backward");
      return prev;
    });
  }, []);

  // Track previous globalStep for slide change detection
  useEffect(() => {
    prevGlobalStepRef.current = globalStep;
  }, [globalStep]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "Enter") {
        e.preventDefault();
        advance();
      } else if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        goBack();
      } else if (e.key === "n" || e.key === "N") {
        e.preventDefault();
        setShowNotes((v) => !v);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [advance, goBack]);

  // Touch swipe support for mobile navigation
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStartRef.current) return;
      const dx = e.changedTouches[0].clientX - touchStartRef.current.x;
      const dy = e.changedTouches[0].clientY - touchStartRef.current.y;
      const absDx = Math.abs(dx);
      const absDy = Math.abs(dy);
      // Only register horizontal swipes (min 50px, more horizontal than vertical)
      if (absDx > 50 && absDx > absDy * 1.5) {
        if (dx < 0) advance();  // swipe left = forward
        else goBack();          // swipe right = back
        e.preventDefault();
      }
      touchStartRef.current = null;
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: false });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [advance, goBack]);

  const { slideIndex, localStep } = getSlideAndStep(globalStep);
  const currentNotes = PRESENTER_NOTES[slideIndex];

  return (
    <div
      role="application"
      aria-label="MOTTO Digital presentation — use arrow keys or click to navigate"
      className="h-screen overflow-hidden bg-white text-[#1D1D1F] cursor-pointer select-none relative"
      onClick={advance}
      onContextMenu={(e) => { e.preventDefault(); goBack(); }}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-[#E8E8ED]">
        <div
          className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4A843] transition-all duration-500 ease-out"
          style={{ width: `${((globalStep + 1) / TOTAL_GLOBAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="fixed top-0.5 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E8E8ED]">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-2.5">
          <div className="flex items-center gap-2 text-sm font-bold tracking-tight text-[#6E6E73]">
            <Layers className="size-4 text-[#B8860B]" />
            MOTTO Digital
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/presentation/print"
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-[10px] text-[#86868B] hover:text-[#B8860B] transition-colors px-2 py-1 rounded border border-[#E8E8ED] hover:border-[#B8860B]/30"
            >
              PDF
            </a>
            <span className="text-xs text-[#86868B] font-mono">
              {globalStep + 1} / {TOTAL_GLOBAL_STEPS}
            </span>
          </div>
        </div>
      </div>

      {/* Navigation hint — desktop */}
      <div className="hidden sm:block fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#F5F5F7] backdrop-blur-sm rounded-full px-4 py-1.5 text-[11px] text-[#86868B] border border-[#E8E8ED] transition-opacity duration-300"
        style={{ opacity: globalStep === 0 ? 1 : 0, bottom: showNotes ? "36vh" : "1rem" }}
      >
        Click · Space · Arrow Keys &nbsp;|&nbsp; Right-click to go back &nbsp;|&nbsp; N = Notes
      </div>
      {/* Navigation hint — mobile */}
      <div className="sm:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#F5F5F7] backdrop-blur-sm rounded-full px-4 py-1.5 text-[11px] text-[#86868B] border border-[#E8E8ED] transition-opacity duration-300"
        style={{ opacity: globalStep === 0 ? 1 : 0, bottom: showNotes ? "36vh" : "1rem" }}
      >
        Tap to advance &nbsp;|&nbsp; Swipe right to go back
      </div>

      {/* ── Slide container ── */}
      <div className="relative h-full pt-12">

        {/* ===== SLIDE 0: TITLE ===== */}
        <SlideWrapper active={slideIndex === 0} transition="scale" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8 radial-glow relative">
            <div className="pres-orbs" />
            <div className="pres-orbs-extra" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/8 text-[#B8860B] text-sm">
                MOTTO Digital — AI Infrastructure
              </div>
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-center leading-tight">
                AIの<span className="gradient-text">発想の転換</span>
              </h1>
              <p className="text-2xl sm:text-3xl text-[#86868B] mt-4 text-center font-light">
                The AI Paradigm Shift
              </p>

              <FadeIn show={localStep >= 1}>
                <div className="mt-10 text-center max-w-2xl">
                  <p className="text-xl text-[#6E6E73] leading-relaxed">
                    なぜ多くの企業が行き詰まっているのか、<br />そして何が変わったのか
                  </p>
                  <p className="text-base text-[#86868B] mt-1">
                    Why most businesses are stuck — and what just changed
                  </p>
                </div>
              </FadeIn>

              {localStep < 1 && (
                <div className="absolute -bottom-32 text-[#86868B] text-center">
                  <p className="text-sm mb-1">Click anywhere to begin</p>
                  <p className="text-xs text-[#86868B]">クリックして開始</p>
                  <ChevronDown className="mx-auto mt-2 size-4 animate-bounce" />
                </div>
              )}
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 1: TOOL BANNER ===== */}
        <SlideWrapper active={slideIndex === 1} transition="scale" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8">
            <div className="flex flex-col items-center max-w-3xl">
              <p className="text-2xl sm:text-3xl font-semibold text-[#1D1D1F] text-center leading-relaxed mb-10" style={{ lineHeight: "1.8" }}>
                エージェンティックAIを最大限に活用するための<br />
                基盤を、6ヶ月かけて一緒に構築するプログラム
              </p>
              <p className="text-base text-[#86868B] mb-8 text-center">
                A 6-month co-build program to help you set up and learn how to utilize Agentic AI
              </p>
              <div className="flex items-end justify-center gap-12 sm:gap-20">
                {[
                  { name: "Claude Code", company: "Anthropic", logo: "/logos/claude-code-icon.png", size: 48 },
                  { name: "Codex", company: "OpenAI", logo: "/logos/openai.svg", size: 48 },
                  { name: "OpenClaw", company: "Open Source", logo: "/logos/openclaw.png", size: 48 },
                ].map((tool) => (
                  <div key={tool.name} className="flex flex-col items-center gap-3">
                    <div className="size-16 rounded-2xl border-2 border-[#E8E8ED] bg-[#F5F5F7] flex items-center justify-center">
                      <Image src={tool.logo} alt={tool.name} width={tool.size} height={tool.size} className="object-contain" />
                    </div>
                    <span className="text-sm font-semibold text-[#1D1D1F]">{tool.name}</span>
                    <span className="text-xs text-[#86868B]">{tool.company}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 2: CASE STUDIES INTRO ===== */}
        <SlideWrapper active={slideIndex === 2} transition="slide" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8">
            <div className="flex flex-col items-center">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/8 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
                実証済み導入事例 / Verified Case Studies
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-center">
                すでに<span className="gradient-text">日本企業</span>が活用中
              </h2>
              <p className="text-lg text-[#86868B] mt-3 text-center">
                The same AI technology — already transforming Japanese business
              </p>
              <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                {[
                  { name: "楽天", sub: "32,000名" },
                  { name: "NRI", sub: "6,500名" },
                  { name: "Classmethod", sub: "AWS #1" },
                  { name: "Panasonic", sub: "240,000名" },
                  { name: "READYFOR", sub: "12名" },
                  { name: "ナレッジワーク", sub: "1名" },
                  { name: "MOTTO", sub: "Us" },
                ].map((c) => (
                  <div key={c.name} className="px-4 py-2 rounded-xl border border-[#B8860B]/15 bg-[#B8860B]/3 text-center">
                    <p className="text-sm font-semibold text-[#1D1D1F]">{c.name}</p>
                    <p className="text-[10px] text-[#86868B]">{c.sub}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 3: RAKUTEN ===== */}
        <SlideWrapper active={slideIndex === 3} transition="slide" direction={direction}>
          <section className="h-full flex flex-col justify-center px-12 pt-14 pb-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto grid sm:grid-cols-[1fr_auto] gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-2">楽天グループ — 従業員32,000名 <span className="normal-case tracking-normal font-normal text-[#86868B]">Rakuten Group — 32,000 Employees</span></p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mb-2 leading-snug">24日かかっていた作業が5日に。財務チームに余裕が生まれた。</h3>
                <p className="text-sm text-[#86868B] mb-3">From 24 days to 5. A finance team that got their afternoons back.</p>
                <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">日本最大のECコングロマリットは、開発・運用プロセス全体を再設計した。<br/><span className="text-[#86868B]">Japan&apos;s largest e-commerce conglomerate redesigned their entire process around AI.</span></p>
                <div className="rounded-lg p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                  <p className="text-sm text-[#1D1D1F] leading-relaxed">「以前は丸1日かかっていた作業が、今では1時間で完了します。」</p>
                  <p className="text-xs text-[#86868B] mt-1 italic">&ldquo;What once took a day, we can now accomplish in an hour.&rdquo;</p>
                  <p className="text-xs text-[#86868B] mt-1.5">— 加地 雄介氏 / Yusuke Kaji, GM of AI, Rakuten</p>
                </div>
                <div className="text-sm space-y-2">
                  <div><span className="text-[#B8860B] font-semibold">財務チームの変化:</span> <span className="text-[#6E6E73]">丸1日のスプレッドシート調整がClaudeで自動化。問題を自動検出し、レポートを生成。</span></div>
                  <div><span className="text-[#B8860B] font-semibold">エンジニアリング:</span> <span className="text-[#6E6E73]">リリース24日→5日。24同時セッション。7時間の自律コーディング。</span></div>
                  <div><span className="text-[#B8860B] font-semibold">全部門展開:</span> <span className="text-[#6E6E73]">1週間でProduct・Sales・Marketing・Financeに展開。</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 h-fit shrink-0 w-56">
                {[{ v: "79%", l: "市場投入短縮", le: "Faster to market" },{ v: "97%", l: "エラー削減", le: "Fewer errors" },{ v: "1hr", l: "財務レポート", le: "Was a full day" },{ v: "1wk", l: "部門展開", le: "Deploy to any dept" }].map((m,i) => (
                  <div key={i} className="rounded-xl p-4 text-center bg-[#F5F5F7] border border-[#E8E8ED]">
                    <div className="text-2xl font-bold gradient-text">{m.v}</div>
                    <div className="text-xs text-[#86868B]">{m.l}</div>
                    <div className="text-[10px] text-[#86868B]/60">{m.le}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 4: NRI ===== */}
        <SlideWrapper active={slideIndex === 4} transition="slide" direction={direction}>
          <section className="h-full flex flex-col justify-center px-12 pt-14 pb-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto grid sm:grid-cols-[1fr_auto] gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-2">野村総合研究所 — 従業員6,500名 <span className="normal-case tracking-normal font-normal text-[#86868B]">Nomura Research Institute — 6,500 Employees</span></p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mb-2 leading-snug">専門家が数時間かけていた複雑な日本語文書のレビュー時間を半減。</h3>
                <p className="text-sm text-[#86868B] mb-3">Complex Japanese documents that took experts hours — cut in half.</p>
                <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">日本最大のITコンサル企業が、実際の日本語ビジネス文書で全AIモデルを評価。1つのモデルが圧倒的に勝ち、同社はそれに賭けた。<br/><span className="text-[#86868B]">Japan&apos;s largest IT consulting firm tested every AI on real Japanese business documents. One model won decisively.</span></p>
                <div className="rounded-lg p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                  <p className="text-sm text-[#1D1D1F] leading-relaxed">「生成AIは定型業務を自動化し、既存ワーカーの生産性を高め、24時間365日の顧客対応を実現できる — 日本の労働力不足を直接補完するものだ。」</p>
                  <p className="text-xs text-[#86868B] mt-1 italic">&ldquo;Generative AI can automate routine tasks and provide 24/7 capabilities — directly supplementing Japan&apos;s workforce needs.&rdquo;</p>
                  <p className="text-xs text-[#86868B] mt-1.5">— 稲葉 孝彦氏 / Takahiko Inaba, Head of AI — NRI</p>
                </div>
                <div className="text-sm space-y-2">
                  <div><span className="text-[#B8860B] font-semibold">日本語特化テスト:</span> <span className="text-[#6E6E73]">契約書・技術仕様書・規制関連書類など実際の日本語業務文書で独自の評価テストを構築。Claudeが全競合を上回った。</span></div>
                  <div><span className="text-[#B8860B] font-semibold">労働力不足への解決策:</span> <span className="text-[#6E6E73]">人を置き換えるのではなく、一人ひとりにより大きなチームの能力を与える。</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 h-fit shrink-0 w-56">
                {[{ v: "50%", l: "レビュー短縮", le: "Faster review" },{ v: "#1 JP", l: "公認リセラー", le: "JP Reseller #1" },{ v: "独自JP", l: "日本語テスト", le: "Real JP tests" },{ v: "全部門", l: "導入済み", le: "All departments" }].map((m,i) => (
                  <div key={i} className="rounded-xl p-4 text-center bg-[#F5F5F7] border border-[#E8E8ED]">
                    <div className="text-2xl font-bold gradient-text">{m.v}</div>
                    <div className="text-xs text-[#86868B]">{m.l}</div>
                    <div className="text-[10px] text-[#86868B]/60">{m.le}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 5: CLASSMETHOD ===== */}
        <SlideWrapper active={slideIndex === 5} transition="slide" direction={direction}>
          <section className="h-full flex flex-col justify-center px-12 pt-14 pb-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto grid sm:grid-cols-[1fr_auto] gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-2">クラスメソッド — 日本トップのAWSパートナー <span className="normal-case tracking-normal font-normal text-[#86868B]">Classmethod — Japan&apos;s Top AWS Partner</span></p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mb-2 leading-snug">24時間の作業が60分で完了。そして全チームの働き方を変えた。</h3>
                <p className="text-sm text-[#86868B] mb-3">A 24-hour task finished in 60 minutes. Then they changed how every team works.</p>
                <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">最大10倍の生産性向上、コードレビュー80%短縮、特定管理業務96%削減。確信を得た同社は、他社向け体験センターまで開設した。<br/><span className="text-[#86868B]">Up to 10x productivity gains, 80% faster code reviews, 96% reduction on admin tasks.</span></p>
                <div className="rounded-lg p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                  <p className="text-sm text-[#1D1D1F] leading-relaxed">「生成されたコードの品質は、他のプロダクトと比べて明らかに優れていた。24時間かかっていたGoogle Apps Scriptの作業が1時間で完了した。」</p>
                  <p className="text-xs text-[#86868B] mt-1 italic">&ldquo;The generated code quality was significantly superior. A 24-hour GAS task completed in 1 hour.&rdquo;</p>
                  <p className="text-xs text-[#86868B] mt-1.5">— クラスメソッド エンジニアリングチーム / Classmethod Engineering Team</p>
                </div>
                <div className="text-sm space-y-2">
                  <div><span className="text-[#B8860B] font-semibold">数字で見る成果:</span> <span className="text-[#6E6E73]">GAS：24h→1h（96%削減）。月間デプロイ：108→165 PR（50%増）。コードレビュー：80%短縮。</span></div>
                  <div><span className="text-[#B8860B] font-semibold">他社支援:</span> <span className="text-[#6E6E73]">「AIDD Boostチーム」を発足し他社のAI駆動開発を支援。AI体験センターを開設。</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 h-fit shrink-0 w-56">
                {[{ v: "10x", l: "生産性向上", le: "Productivity" },{ v: "96%", l: "管理業務削減", le: "Admin reduction" },{ v: "80%", l: "レビュー短縮", le: "Faster reviews" },{ v: "99%", l: "AI生成率", le: "AI-generated" }].map((m,i) => (
                  <div key={i} className="rounded-xl p-4 text-center bg-[#F5F5F7] border border-[#E8E8ED]">
                    <div className="text-2xl font-bold gradient-text">{m.v}</div>
                    <div className="text-xs text-[#86868B]">{m.l}</div>
                    <div className="text-[10px] text-[#86868B]/60">{m.le}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 6: PANASONIC ===== */}
        <SlideWrapper active={slideIndex === 6} transition="slide" direction={direction}>
          <section className="h-full flex flex-col justify-center px-12 pt-14 pb-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto grid sm:grid-cols-[1fr_auto] gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-2">パナソニックホールディングス — 従業員240,000名 <span className="normal-case tracking-normal font-normal text-[#86868B]">Panasonic Holdings — 240,000 Employees</span></p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mb-2 leading-snug">製造業の巨人からAI駆動企業へ — 2030年までに売上の30%を目標に。</h3>
                <p className="text-sm text-[#86868B] mb-3">From manufacturing giant to AI-powered business — targeting 30% of revenue by 2030.</p>
                <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">AIを社内利用するだけでなく、10億人の顧客に向けた消費者製品にClaudeを組み込み、4部門に戦略的アセットとして導入。<br/><span className="text-[#86868B]">Built Claude into a consumer product for 1 billion customers and deployed across 4 departments.</span></p>
                <div className="rounded-lg p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                  <p className="text-sm text-[#1D1D1F] leading-relaxed">「AI駆動のハードウェア・ソフトウェア・ソリューション事業は、2030年までにパナソニックの総売上の30%に達する。」</p>
                  <p className="text-xs text-[#86868B] mt-1 italic">&ldquo;AI-driven businesses will reach 30% of Panasonic&apos;s total revenue by 2030.&rdquo;</p>
                  <p className="text-xs text-[#86868B] mt-1.5">— Panasonic Go — CES 2025 Keynote</p>
                </div>
                <div className="text-sm space-y-2">
                  <div><span className="text-[#B8860B] font-semibold">消費者プロダクト「Umi」:</span> <span className="text-[#6E6E73]">Claude搭載のウェルネスアプリ。音声チャット、目標設定。Calm、Blue Apronと提携。世界10億人向け。</span></div>
                  <div><span className="text-[#B8860B] font-semibold">社内トランスフォーメーション:</span> <span className="text-[#6E6E73]">24万人にClaudeを「戦略的アセット」として導入。全チームが持つべきケイパビリティ。</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 h-fit shrink-0 w-56">
                {[{ v: "30%", l: "AI売上目標", le: "AI revenue target" },{ v: "10億人", l: "顧客ターゲット", le: "Global customers" },{ v: "4部門", l: "戦略活用", le: "Strategic depts" },{ v: "CES'25", l: "基調講演", le: "CES keynote" }].map((m,i) => (
                  <div key={i} className="rounded-xl p-4 text-center bg-[#F5F5F7] border border-[#E8E8ED]">
                    <div className="text-2xl font-bold gradient-text">{m.v}</div>
                    <div className="text-xs text-[#86868B]">{m.l}</div>
                    <div className="text-[10px] text-[#86868B]/60">{m.le}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 7: READYFOR ===== */}
        <SlideWrapper active={slideIndex === 7} transition="slide" direction={direction}>
          <section className="h-full flex flex-col justify-center px-12 pt-14 pb-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto grid sm:grid-cols-[1fr_auto] gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-2">READYFOR — 日本最大のクラウドファンディング・12名チーム <span className="normal-case tracking-normal font-normal text-[#86868B]">READYFOR — Japan&apos;s Largest Crowdfunding, 12-Person Team</span></p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mb-2 leading-snug">12名のチームが3ヶ月間、すべてを計測した。その結果がこれだ。</h3>
                <p className="text-sm text-[#86868B] mb-3">A 12-person team measured everything for 3 months. Here&apos;s what they found.</p>
                <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">AIをただ導入してうまくいくことを願ったわけではない。3ヶ月間の厳密な評価を実施し、うまくいかなかった点も含め正直な結果を公開した。<br/><span className="text-[#86868B]">Ran a rigorous 3-month evaluation and published honest results — including what didn&apos;t work.</span></p>
                <div className="rounded-lg p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                  <p className="text-sm text-[#1D1D1F] leading-relaxed">「チームの83%が実際に生産性の向上を実感した。しかし同時に、複数の作業を同時並行で管理する場合、時間の短縮が必ずしも負担の軽減につながるわけではないことも学んだ。」</p>
                  <p className="text-xs text-[#86868B] mt-1 italic">&ldquo;83% experienced real productivity gains. But time shortcuts don&apos;t equal reduced strain.&rdquo;</p>
                  <p className="text-xs text-[#86868B] mt-1.5">— READYFOR エンジニアリングチーム / READYFOR Engineering Team</p>
                </div>
                <div className="text-sm space-y-2">
                  <div><span className="text-[#B8860B] font-semibold">正直な成果と課題:</span> <span className="text-[#6E6E73]">83%が生産性向上。66%が毎日1〜2時間節約。一方、満足度は3.8/5、42%が疲労増加を実感。AI活用には丁寧な設計が必要。</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 h-fit shrink-0 w-56">
                {[{ v: "83%", l: "生産性向上", le: "Productivity gains" },{ v: "1-2h", l: "毎日の短縮", le: "Saved daily" },{ v: "67%", l: "毎日利用", le: "Daily adoption" },{ v: "3ヶ月", l: "評価期間", le: "Evaluation period" }].map((m,i) => (
                  <div key={i} className="rounded-xl p-4 text-center bg-[#F5F5F7] border border-[#E8E8ED]">
                    <div className="text-2xl font-bold gradient-text">{m.v}</div>
                    <div className="text-xs text-[#86868B]">{m.l}</div>
                    <div className="text-[10px] text-[#86868B]/60">{m.le}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 8: KNOWLEDGE WORK ===== */}
        <SlideWrapper active={slideIndex === 8} transition="slide" direction={direction}>
          <section className="h-full flex flex-col justify-center px-12 pt-14 pb-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto grid sm:grid-cols-[1fr_auto] gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-2">ナレッジワーク — B2B SaaS、データ基盤1名体制 <span className="normal-case tracking-normal font-normal text-[#86868B]">Knowledge Work — B2B SaaS, 1-Person Data Team</span></p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mb-2 leading-snug">たった1人。1ヶ月で448回の本番デプロイ。誤植ではない。</h3>
                <p className="text-sm text-[#86868B] mb-3">One person. 448 production deployments in a single month. Not a typo.</p>
                <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">データ基盤エンジニア1名が、7つのAIセッションを同時並行で実行。人間に残された手作業はレビューと承認だけだ。<br/><span className="text-[#86868B]">One engineer, 7 parallel AI sessions. Only remaining manual task: review and approve.</span></p>
                <div className="rounded-lg p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                  <p className="text-sm text-[#1D1D1F] leading-relaxed">「人間に残された手作業はPRレビューだけ。計画、実装、検証、デプロイ — それ以外はすべてAIが担う。」</p>
                  <p className="text-xs text-[#86868B] mt-1 italic">&ldquo;The human&apos;s only task is PR review. Everything else — planning, implementation, deployment — is AI.&rdquo;</p>
                  <p className="text-xs text-[#86868B] mt-1.5">— ナレッジワーク エンジニアリング / Knowledge Work Engineering — Claude Code Meetup Japan</p>
                </div>
                <div className="text-sm space-y-2">
                  <div><span className="text-[#B8860B] font-semibold">この事例が重要な理由:</span> <span className="text-[#6E6E73]">人を置き換える話ではない。適切なシステムがあれば1人が何を成し遂げられるかという話。448回のデプロイ — 残業はわずか10〜30時間。</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 h-fit shrink-0 w-56">
                {[{ v: "448", l: "月間マージ", le: "Monthly merges" },{ v: "7", l: "並行セッション", le: "Parallel sessions" },{ v: "1人", l: "チーム人数", le: "Team size" },{ v: "10-30h", l: "残業時間", le: "Overtime only" }].map((m,i) => (
                  <div key={i} className="rounded-xl p-4 text-center bg-[#F5F5F7] border border-[#E8E8ED]">
                    <div className="text-2xl font-bold gradient-text">{m.v}</div>
                    <div className="text-xs text-[#86868B]">{m.l}</div>
                    <div className="text-[10px] text-[#86868B]/60">{m.le}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 9: MOTTO DIGITAL ===== */}
        <SlideWrapper active={slideIndex === 9} transition="slide" direction={direction}>
          <section className="h-full flex flex-col justify-center px-12 pt-14 pb-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto grid sm:grid-cols-[1fr_auto] gap-8">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-[#B8860B] mb-2">MOTTO Digital — AIコンサルティング、1名経営 <span className="normal-case tracking-normal font-normal text-[#86868B]">MOTTO Digital — AI Consulting, 1 Person</span></p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mb-2 leading-snug">コンサルタント1名。クライアント5社。24時間365日稼働。追加採用ゼロ。</h3>
                <p className="text-sm text-[#86868B] mb-3">One consultant. Five clients. 24/7 operations. Zero staff hired.</p>
                <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">これは私たちのストーリー。MOTTO Digitalは1人で運営するAIコンサルティング会社。このページのすべて？あなたに教える同じ技術で構築した。<br/><span className="text-[#86868B]">Our story. Everything on this page was built with the same technology we teach you.</span></p>
                <div className="rounded-lg p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.06), rgba(184,134,11,0.02))", border: "1px solid rgba(184,134,11,0.15)" }}>
                  <p className="text-[10px] font-bold text-[#B8860B] mb-2">トランスフォーメーション</p>
                  <div className="grid grid-cols-[1fr_auto_1fr] gap-2 text-[11px]">
                    <div>
                      <p className="font-bold text-[#86868B] text-[10px] mb-1">2024年 — 導入前 <span className="font-normal">2024 — Before</span></p>
                      <p className="text-[#6E6E73]">収益源1つ / 最大3社 / 8h/日</p>
                      <p className="text-[10px] text-[#86868B]">1 revenue stream / max 3 clients / 8h/day</p>
                    </div>
                    <div className="self-center text-[#B8860B]">→</div>
                    <div>
                      <p className="font-bold text-[#B8860B] text-[10px] mb-1">2026年 — AIOS導入後 <span className="font-normal">2026 — After AIOS</span></p>
                      <p className="text-[#6E6E73]">4収益源 / 5社+ / 24/7稼働</p>
                      <p className="text-[10px] text-[#86868B]">4 revenue streams / 5+ clients / 24/7 ops</p>
                    </div>
                  </div>
                </div>
                <div className="text-sm space-y-2">
                  <div><span className="text-[#B8860B] font-semibold">AIチームの日常:</span> <span className="text-[#6E6E73]">リード発掘・選別（自動）、デモサイト構築（自動）、経理処理、バイリンガルコンテンツ制作、全プロジェクトのタスク追跡。<strong> 次にこのページに載るのは、あなたの事例かもしれない。</strong></span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 h-fit shrink-0 w-56">
                {[{ v: "5社", l: "同時管理", le: "Simultaneous" },{ v: "190h", l: "月間自動化", le: "Monthly automated" },{ v: "8-12x", l: "コスト効率", le: "Cost efficiency" },{ v: "24/7", l: "稼働", le: "Non-stop" }].map((m,i) => (
                  <div key={i} className={`rounded-xl p-3 text-center border ${i === 3 ? "border-[#B8860B]/20 bg-[#B8860B]/5" : "bg-[#F5F5F7] border-[#E8E8ED]"}`}>
                    <div className="text-2xl font-bold gradient-text">{m.v}</div>
                    <div className="text-xs text-[#86868B]">{m.l}</div>
                    <div className="text-[10px] text-[#86868B]/60">{m.le}</div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 10: AUTOMATION — WHAT CAN YOU AUTOMATE ===== */}
        <SlideWrapper active={slideIndex === 10} transition="slide" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto">
            <div className="flex flex-col items-center w-full max-w-5xl">
              <div className="shrink-0 pb-4 text-center">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/8 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
                  実際の自動化 / Real Automation
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold text-center">
                  <span className="gradient-text">あなたの業務</span>で何を自動化できるか？
                </h2>
                <p className="text-lg text-[#86868B] mt-2 text-center">
                  What could you automate? Real tasks, real time savings.
                </p>
              </div>

              <FadeIn show={localStep >= 1}>
                <div onClick={(e) => e.stopPropagation()} onContextMenu={(e) => e.stopPropagation()}>
                <div className="mt-4 w-full grid grid-cols-2 sm:grid-cols-3 gap-3 pb-4">
                  {[
                    { dept: "マーケティング", deptEn: "Marketing", color: "border-blue-200 bg-blue-50", items: [
                      { task: "リード発掘", taskEn: "Lead Discovery", before: "10h/週", after: "30分" },
                      { task: "コールドアウトリーチ", taskEn: "Cold Outreach", before: "8h/週", after: "自動" },
                      { task: "競合分析", taskEn: "Competitive Analysis", before: "1日", after: "15分" },
                    ], total: "~30h/週" },
                    { dept: "経理・財務", deptEn: "Finance", color: "border-emerald-200 bg-emerald-50", items: [
                      { task: "経費仕分け", taskEn: "Expense Sorting", before: "5h/月", after: "5分" },
                      { task: "財務レポート", taskEn: "Financial Reports", before: "4h/週", after: "自動" },
                      { task: "請求書照合", taskEn: "Invoice Matching", before: "3h/月", after: "10分" },
                    ], total: "~25h/月" },
                    { dept: "オペレーション", deptEn: "Operations", color: "border-purple-200 bg-purple-50", items: [
                      { task: "メール管理", taskEn: "Email Management", before: "2h/日", after: "15分" },
                      { task: "議事録・タスク", taskEn: "Meeting Notes", before: "30分/会議", after: "自動" },
                      { task: "進捗管理", taskEn: "Project Tracking", before: "5h/週", after: "リアルタイム" },
                    ], total: "~25h/週" },
                    { dept: "営業", deptEn: "Sales", color: "border-orange-200 bg-orange-50", items: [
                      { task: "提案書作成", taskEn: "Proposals", before: "各4h", after: "20分" },
                      { task: "リード選別", taskEn: "Lead Qualification", before: "6h/週", after: "自動" },
                      { task: "CRM入力", taskEn: "CRM Entry", before: "1h/日", after: "自動" },
                    ], total: "~20h/週" },
                    { dept: "クライアント対応", deptEn: "Client Delivery", color: "border-pink-200 bg-pink-50", items: [
                      { task: "サイト構築", taskEn: "Website Build", before: "2週間", after: "1日" },
                      { task: "レポート作成", taskEn: "Client Reports", before: "各3h", after: "15分" },
                      { task: "技術文書", taskEn: "Tech Docs", before: "1日", after: "2時間" },
                    ], total: "~60h" },
                    { dept: "管理・翻訳", deptEn: "Admin & Docs", color: "border-teal-200 bg-teal-50", items: [
                      { task: "契約書レビュー", taskEn: "Contract Review", before: "各2h", after: "10分" },
                      { task: "日英翻訳", taskEn: "JP/EN Translation", before: "1h/件", after: "2分" },
                      { task: "データ入力", taskEn: "Data Entry", before: "5h/週", after: "30分" },
                    ], total: "~15h/週" },
                  ].map((dept, di) => (
                    <div key={di} className={`rounded-xl p-4 border ${dept.color}`}>
                      <div className="text-xs font-bold text-[#1D1D1F] mb-0.5">{dept.dept} <span className="font-normal text-[#86868B]">{dept.deptEn}</span></div>
                      {dept.items.map((item, ii) => (
                        <div key={ii} className="flex items-center justify-between text-[11px] mb-1.5">
                          <span className="text-[#6E6E73]">{item.task} <span className="text-[#86868B]">{item.taskEn}</span></span>
                          <span className="shrink-0 ml-2">
                            <span className="text-[#86868B] line-through opacity-60">{item.before}</span>
                            <span className="text-[#86868B] mx-1">→</span>
                            <span className="text-[#B8860B] font-bold">{item.after}</span>
                          </span>
                        </div>
                      ))}
                      <div className="mt-2 pt-2 border-t border-current/10 flex justify-between text-[11px]">
                        <span className="text-[#86868B]">回収時間 / Time recovered</span>
                        <span className="text-[#B8860B] font-bold">{dept.total}</span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="w-full rounded-xl bg-[#1D1D1F] p-4 sm:p-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-white/70">
                      すべて合計すると、月間で取り戻せる時間は
                    </p>
                    <p className="text-xs text-white/40 mt-0.5">
                      Add it up. Real workflows automated by AIOS users.
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-bold text-[#D4A843]">115+時間</div>
                    <div className="text-[10px] text-white/40">per month, per business</div>
                  </div>
                </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 11: THE AI ADOPTION TRAP ===== */}
        <SlideWrapper active={slideIndex === 11} transition="stagger" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto">
            <div className="flex flex-col items-center w-full">
              <div className="shrink-0 pb-4 text-center">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-red-200 bg-red-50 text-red-600 text-xs font-medium uppercase tracking-wider">
                  01 — 問題 / The Problem
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-center">
                  AI導入の罠
                </h2>
                <p className="text-lg text-[#86868B] mt-2 text-center">
                  The AI Adoption Trap
                </p>
              </div>

              {/* Cycle Diagram — Clean linear flow with return arrow */}
              <FadeIn show={localStep >= 1}>
                <div className="mt-8 w-full max-w-2xl mx-auto">
                  {/* Linear 4-step flow */}
                  <div className="flex items-center justify-center gap-1 sm:gap-3">
                    <CycleNode icon={<Sparkles className="size-4 sm:size-5" />} label="AIツールを試す" sublabel="Try AI Tools" num="1" />
                    <ChevronRight className="size-4 sm:size-5 text-red-600/50 shrink-0" />
                    <CycleNode icon={<Zap className="size-4 sm:size-5" />} label="ある程度の成果" sublabel="Some Results" num="2" />
                    <ChevronRight className="size-4 sm:size-5 text-red-600/50 shrink-0" />
                    <CycleNode icon={<TrendingDown className="size-4 sm:size-5" />} label="拡張できない" sublabel="Can't Scale" num="3" />
                    <ChevronRight className="size-4 sm:size-5 text-red-600/50 shrink-0" />
                    <CycleNode icon={<RotateCcw className="size-4 sm:size-5 text-red-600" />} label="手作業に戻る" sublabel="Give Up" num="4" highlight />
                  </div>
                  {/* Return arrow showing the loop */}
                  <div className="flex items-center justify-center mt-3 gap-2">
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-200 bg-red-50">
                      <RotateCcw className="size-3.5 text-red-600/60 animate-[spin_8s_linear_infinite]" />
                      <span className="text-xs font-semibold text-red-600/70 uppercase tracking-wider">繰り返す</span>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Key Insight */}
              <FadeIn show={localStep >= 2}>
                <div className="mt-6 max-w-2xl pb-8">
                  <div className="p-5 rounded-xl border border-red-200 bg-red-50">
                    <p className="text-lg sm:text-xl text-[#1D1D1F] text-center leading-relaxed">
                      モデルは進化し続ける — <span className="text-red-600 font-semibold">しかし環境は制限されたまま</span>
                    </p>
                    <p className="text-base text-[#86868B] text-center mt-2">
                      Models keep getting better — but the environment stays limited
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 12: 2024 — THE ERA OF CHATBOTS ===== */}
        <SlideWrapper active={slideIndex === 12} transition="slide" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto">
            <div className="shrink-0 pb-4 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium uppercase tracking-wider">
                02 — タイムライン
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-center">
                <span className="text-blue-600">2024</span> — チャットボットの時代
              </h2>
              <p className="text-lg text-[#86868B] mt-2 text-center">
                The Era of Chatbots
              </p>
            </div>

            <FadeIn show={localStep >= 1}>
              <div className="mt-6 w-full max-w-3xl">
                {/* What happened */}
                <div className="p-6 rounded-xl border border-blue-200 bg-blue-50 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="size-6 text-blue-600" />
                    <h3 className="text-lg font-semibold text-blue-600">ChatGPT・Claude・Geminiが主流に</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-[#6E6E73]">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 mt-0.5 shrink-0">&#9656;</span>
                      <span>企業はAIを使うべきだと知っていた — プロンプト研修が至る所で<br />
                      <span className="text-xs text-[#86868B]">Companies knew they should use AI — training courses on prompting everywhere</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 mt-0.5 shrink-0">&#9656;</span>
                      <span>スキルの高い人はカスタムGPTを作れた — ある程度の改善<br />
                      <span className="text-xs text-[#86868B]">High-skill users could build custom GPTs and projects — some improvement</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-600 mt-0.5 shrink-0">&#9656;</span>
                      <span>大多数の社員は効果的に使えなかった<br />
                      <span className="text-xs text-[#86868B]">Most employees still couldn&apos;t use it effectively</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-[#86868B] mt-0.5 shrink-0">&#9656;</span>
                      <span className="text-[#6E6E73]">全社員へのセキュアなアクセスなし — まだ投資の準備ができていない<br />
                      <span className="text-xs text-[#86868B]">No secure access for all staff — not ready to invest yet</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn show={localStep >= 2}>
              <div className="max-w-2xl pb-8">
                <div className="p-5 rounded-xl border border-blue-200 bg-blue-50 text-center">
                  <p className="text-lg text-[#1D1D1F]">
                    AIは<span className="text-blue-600 font-semibold">「話す」</span>ことができた — しかし<span className="text-[#86868B]">「行動」</span>はできなかった
                  </p>
                  <p className="text-sm text-[#86868B] mt-2">
                    AI could talk — but it couldn&apos;t do anything
                  </p>
                </div>
              </div>
            </FadeIn>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 13: 2025 — AI AUTOMATIONS & AGENTS ===== */}
        <SlideWrapper active={slideIndex === 13} transition="slide" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto">
            <div className="shrink-0 pb-4 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/5 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
                02 — タイムライン
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-center">
                <span className="text-[#B8860B]">2025</span> — 自動化とAIエージェント
              </h2>
              <p className="text-lg text-[#86868B] mt-2 text-center">
                Automations &amp; Agents
              </p>
            </div>

            <FadeIn show={localStep >= 1}>
              <div className="mt-6 w-full max-w-3xl">
                {/* What happened */}
                <div className="p-6 rounded-xl border border-[#B8860B]/20 bg-[#B8860B]/5 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Workflow className="size-6 text-[#B8860B]" />
                    <h3 className="text-lg font-semibold text-[#B8860B]">AIが実用的な仕事を始めた</h3>
                    <span className="text-sm text-[#86868B]">— しかし大きな制限あり</span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border border-[#B8860B]/10 bg-[#F5F5F7]">
                      <AlertTriangle className="size-5 text-[#B8860B] mb-2" />
                      <p className="font-semibold text-sm mb-1">高度な専門知識が必要</p>
                      <p className="text-xs text-[#86868B]">High Expertise Required</p>
                      <p className="text-xs text-[#6E6E73] mt-2">エージェント構築には開発者が必要 — 多くのチームには手が届かない</p>
                    </div>
                    <div className="p-4 rounded-lg border border-[#B8860B]/10 bg-[#F5F5F7]">
                      <DollarSign className="size-5 text-[#B8860B] mb-2" />
                      <p className="font-semibold text-sm mb-1">ベンダーロックイン</p>
                      <p className="text-xs text-[#86868B]">Vendor Lock-In</p>
                      <p className="text-xs text-[#6E6E73] mt-2">サブスクを止めたら、すべてのエージェントが消える</p>
                    </div>
                    <div className="p-4 rounded-lg border border-[#B8860B]/10 bg-[#F5F5F7]">
                      <Unlink className="size-5 text-[#B8860B] mb-2" />
                      <p className="font-semibold text-sm mb-1">エージェントの孤立</p>
                      <p className="text-xs text-[#86868B]">Agent Isolation</p>
                      <p className="text-xs text-[#6E6E73] mt-2">エージェントA・B・C・D — 孤立。連携なし、共有コンテキストなし</p>
                    </div>
                  </div>

                  {/* Isolated agents visual */}
                  <div className="mt-5 flex items-center justify-center gap-3 sm:gap-4">
                    {["A", "B", "C", "D"].map((letter) => (
                      <div key={letter} className="flex flex-col items-center">
                        <div className="size-12 sm:size-14 rounded-xl border-2 border-dashed border-[#B8860B]/20 bg-[#F5F5F7] flex items-center justify-center">
                          <Bot className="size-5 sm:size-6 text-[#B8860B]/50" />
                        </div>
                        <p className="text-[10px] text-[#86868B] mt-1">Agent {letter}</p>
                      </div>
                    ))}
                    <div className="hidden sm:flex flex-col items-center mx-2">
                      <Unlink className="size-5 text-red-600/50" />
                      <p className="text-[10px] text-red-600/50 mt-1">孤立</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn show={localStep >= 2}>
              <div className="max-w-2xl pb-8">
                <div className="p-5 rounded-xl border border-[#B8860B]/20 bg-[#B8860B]/5 text-center">
                  <p className="text-lg text-[#1D1D1F]">
                    企業はAI導入を<span className="text-[#B8860B] font-semibold">「レンタル」</span>していた — <span className="text-[#86868B]">「所有」</span>していなかった
                  </p>
                  <p className="text-sm text-[#86868B] mt-2">
                    Companies were renting AI adoption, not owning it
                  </p>
                  <p className="text-xs text-[#86868B] mt-3">
                    支払いを止めたら、振り出しに戻る
                  </p>
                </div>
              </div>
            </FadeIn>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 14: BRAIN + BODY ===== */}
        <SlideWrapper active={slideIndex === 14} transition="stagger" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-12">
            <div className="flex flex-col items-center w-full max-w-4xl">
              <div className="shrink-0 text-center mb-4">
                <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full border border-[#1B7D5A]/20 bg-[#1B7D5A]/10 text-[#1B7D5A] text-xs font-medium uppercase tracking-wider">
                  03 — 2026年: ブレイクスルー
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-center">
                  AIに<span className="text-[#1B7D5A]">「体」</span>を与える
                </h2>
                <p className="text-sm text-[#86868B] mt-1 text-center">
                  Giving AI a Body
                </p>
              </div>

              {/* Custom Brain+Body diagram — built for presentation sizing */}
              <FadeIn show={localStep >= 1}>
                <div className="flex items-center justify-center gap-6 sm:gap-10">
                  {/* Brain Only */}
                  <div className="flex flex-col items-center text-center w-48">
                    <div className="size-24 rounded-full bg-indigo-50 border-2 border-indigo-100 flex items-center justify-center mb-3">
                      <svg className="size-10 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" /><path d="M10 17v2a2 2 0 0 0 4 0v-2" /><path d="M12 2v3M8 5l1.5 2M16 5l-1.5 2" /></svg>
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-indigo-400 mb-1">Brain Only</p>
                    <p className="text-sm font-bold text-[#1D1D1F]">AIモデル</p>
                    <p className="text-xs text-[#86868B]">Claude, GPT, Gemini</p>
                    <p className="text-xs text-[#6E6E73] mt-2">考えられる。行動できない。</p>
                    <p className="text-[10px] text-[#86868B]">Can think. Can&apos;t act.</p>
                  </div>

                  <ArrowRight className="size-6 text-[#86868B] shrink-0" />

                  {/* Brain + Harness */}
                  <div className="flex flex-col items-center text-center w-48">
                    <div className="size-24 rounded-2xl bg-[#1B7D5A]/5 border-2 border-dashed border-[#1B7D5A]/30 flex items-center justify-center mb-3">
                      <svg className="size-10 text-[#1B7D5A]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2a7 7 0 0 0-7 7c0 2.38 1.19 4.47 3 5.74V17a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-2.26c1.81-1.27 3-3.36 3-5.74a7 7 0 0 0-7-7z" /><path d="M10 17v2a2 2 0 0 0 4 0v-2" /><path d="M12 2v3M8 5l1.5 2M16 5l-1.5 2" /></svg>
                    </div>
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-[#1B7D5A] mb-1">Brain + Harness</p>
                    <p className="text-sm font-bold text-[#1D1D1F]">エージェンティックAI</p>
                    <p className="text-xs text-[#86868B]">ターミナル、ファイル、API、サーバー</p>
                    <p className="text-xs text-[#1B7D5A] font-semibold mt-2">考えて、行動できる。</p>
                    <p className="text-[10px] text-[#86868B]">Can think AND act.</p>
                  </div>
                </div>

                <div className="flex justify-center my-4">
                  <div className="flex items-center gap-3">
                    <div className="w-24 h-px bg-[#E8E8ED]" />
                    <span className="text-[#86868B] text-lg">=</span>
                    <div className="w-24 h-px bg-[#E8E8ED]" />
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-[#1B7D5A]/20 bg-[#1B7D5A]/5 text-center max-w-lg mx-auto">
                  <p className="text-base font-semibold text-[#1B7D5A]">ビジネス全体を運営できるAI</p>
                  <p className="text-xs text-[#86868B] mt-1">An AI that can operate your entire business</p>
                </div>
              </FadeIn>

              <FadeIn show={localStep >= 2}>
                <div className="mt-4 max-w-lg mx-auto">
                  <div className="p-3 rounded-xl border border-[#1B7D5A]/20 bg-[#1B7D5A]/5 text-center">
                    <p className="text-sm text-[#1D1D1F]">
                      チャットボットの進化ではない — <span className="text-[#1B7D5A] font-semibold">全く新しいカテゴリー</span>
                    </p>
                    <p className="text-[11px] text-[#86868B] mt-0.5">
                      This isn&apos;t a chatbot upgrade — it&apos;s a completely new category
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 15: AI ENTERS THE COMMAND LINE ===== */}
        <SlideWrapper active={slideIndex === 15} transition="stagger" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8">
            <div className="flex flex-col items-center w-full">
              <div className="shrink-0 text-center">
                <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full border border-[#1B7D5A]/20 bg-[#1B7D5A]/10 text-[#1B7D5A] text-xs font-medium uppercase tracking-wider">
                  03 — 2026年: ブレイクスルー
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-center">
                  AIが<span className="text-[#1B7D5A]">コマンドライン</span>に入る
                </h2>
                <p className="text-sm text-[#86868B] mt-1 text-center">
                  AI Enters the Command Line
                </p>

                {/* Agent logos */}
                <div className="mt-3 flex items-center justify-center gap-3 sm:gap-4">
                  {[
                    { name: "Claude Code", company: "Anthropic", color: "text-orange-600", border: "border-orange-300", bg: "bg-orange-50" },
                    { name: "Codex", company: "OpenAI", color: "text-[#1B7D5A]", border: "border-[#1B7D5A]/20", bg: "bg-[#1B7D5A]/5" },
                    { name: "Antigravity", company: "Google", color: "text-blue-600", border: "border-blue-200", bg: "bg-blue-50" },
                    { name: "OpenClaw", company: "Open Source", color: "text-purple-600", border: "border-purple-200", bg: "bg-purple-50" },
                  ].map((agent) => (
                    <div key={agent.name} className={`px-2 py-1.5 rounded-lg border ${agent.border} ${agent.bg} text-center`}>
                      <Terminal className={`size-3.5 mx-auto mb-0.5 ${agent.color}`} />
                      <p className={`text-[10px] font-semibold ${agent.color}`}>{agent.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture diagram */}
              <FadeIn show={localStep >= 1}>
                <div className="mt-4 w-full max-w-3xl">
                  <div className="flex justify-center mb-2">
                    <div className="px-6 py-2 rounded-xl border-2 border-[#1B7D5A]/30 bg-[#1B7D5A]/5 text-center">
                      <Terminal className="size-5 text-[#1B7D5A] mx-auto mb-1" />
                      <p className="font-bold text-[#1B7D5A] text-sm">AIエージェント (CLI)</p>
                      <p className="text-[10px] text-[#86868B]">脳 + 体 = 完全な自律性</p>
                    </div>
                  </div>
                  <div className="flex justify-center mb-2">
                    <div className="flex items-end gap-16 sm:gap-20">
                      <div className="w-px h-4 bg-gradient-to-b from-[#1B7D5A]/40 to-blue-400/40" />
                      <div className="w-px h-4 bg-gradient-to-b from-[#1B7D5A]/40 to-purple-400/40" />
                      <div className="w-px h-4 bg-gradient-to-b from-[#1B7D5A]/40 to-[#B8860B]/40" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-2">
                    <div className="p-2 rounded-xl border border-blue-200 bg-blue-50 text-center">
                      <Monitor className="size-4 text-blue-600 mx-auto mb-1" />
                      <p className="font-semibold text-xs text-blue-600">ローカルPC</p>
                    </div>
                    <div className="p-2 rounded-xl border border-purple-200 bg-purple-50 text-center">
                      <Server className="size-4 text-purple-600 mx-auto mb-1" />
                      <p className="font-semibold text-xs text-purple-600">ローカルサーバー</p>
                    </div>
                    <div className="p-2 rounded-xl border border-[#B8860B]/20 bg-[#B8860B]/5 text-center">
                      <Cloud className="size-4 text-[#B8860B] mx-auto mb-1" />
                      <p className="font-semibold text-xs text-[#B8860B]">クラウドサーバー</p>
                    </div>
                  </div>
                  <div className="flex justify-center mb-1"><ArrowDown className="size-3 text-[#86868B]" /></div>
                  <div className="p-3 rounded-xl border border-[#E8E8ED] bg-[#F5F5F7] text-center">
                    <p className="text-xs text-[#6E6E73] mb-1.5">あらゆるソフトウェアに接続</p>
                    <div className="flex flex-wrap justify-center gap-1.5 text-[10px] text-[#86868B]">
                      {["Notion", "Slack", "CRM", "Email", "Database", "ERP", "POS", "LINE", "会計ソフト", "EC"].map((s) => (
                        <span key={s} className="px-2 py-0.5 rounded-md bg-[#E8E8ED] border border-[#E8E8ED]">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Key Insight */}
              <FadeIn show={localStep >= 2}>
                <div className="mt-3 max-w-2xl">
                  <div className="p-3 rounded-xl border border-[#1B7D5A]/20 bg-[#1B7D5A]/5">
                    <p className="text-base text-[#1D1D1F] text-center">
                      人間がコンピュータでできるあらゆる操作 — <span className="text-[#1B7D5A] font-semibold">AIも実行可能に</span>
                    </p>
                    <p className="text-xs text-[#86868B] text-center mt-1">
                      Any action a human can do on a computer — AI can now do too
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 16: OWNERSHIP ===== */}
        <SlideWrapper active={slideIndex === 16} transition="slide" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-6">
            <div className="flex flex-col items-center w-full">
              <div className="inline-flex items-center gap-2 mb-2 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/8 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
                04 — オーナーシップ
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-center">
                すべてがあなたの<span className="gradient-text">もの</span>
              </h2>
              <p className="text-sm text-[#86868B] mt-1 text-center">
                You Own Everything
              </p>

              <FadeIn show={localStep >= 1}>
                <div className="mt-2 w-full max-w-3xl origin-top" style={{ transform: "scale(0.85)" }}>
                  <AIOSPyramid locale="ja" compact />
                </div>
              </FadeIn>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 17: SELF-IMPROVING ===== */}
        <SlideWrapper active={slideIndex === 17} transition="slide" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto">
            <div className="shrink-0 pb-4 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/5 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
                05 — 自己改善
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-center">
                システムは<span className="text-[#B8860B]">自己改善する</span>
              </h2>
              <p className="text-lg text-[#86868B] mt-2 text-center">
                The System Improves Itself
              </p>
            </div>

            <FadeIn show={localStep >= 1}>
              <div className="mt-8 w-full max-w-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="p-5 rounded-xl border border-[#E8E8ED] bg-[#F5F5F7]">
                    <p className="font-semibold text-[#6E6E73] mb-3 text-sm uppercase tracking-wider">これまで</p>
                    <ul className="space-y-2 text-sm text-[#6E6E73]">
                      <li>&bull; 維持に専門家チームが必要<br /><span className="text-xs text-[#86868B]">Expert team needed to maintain</span></li>
                      <li>&bull; 壊れる → 高額な修正<br /><span className="text-xs text-[#86868B]">Something breaks &rarr; expensive fix</span></li>
                      <li>&bull; 更新には開発者が必要<br /><span className="text-xs text-[#86868B]">Updates require developers</span></li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-xl border border-[#B8860B]/20 bg-[#B8860B]/5">
                    <p className="font-semibold text-[#B8860B] mb-3 text-sm uppercase tracking-wider">これから</p>
                    <ul className="space-y-2 text-sm text-[#1D1D1F]">
                      <li className="flex items-start gap-2"><span className="text-[#B8860B] mt-0.5">&#10003;</span><span>エージェントがコードを読む<br /><span className="text-xs text-[#86868B]">Agent reads the code</span></span></li>
                      <li className="flex items-start gap-2"><span className="text-[#B8860B] mt-0.5">&#10003;</span><span>問題を自動診断<br /><span className="text-xs text-[#86868B]">Agent diagnoses issues</span></span></li>
                      <li className="flex items-start gap-2"><span className="text-[#B8860B] mt-0.5">&#10003;</span><span>修正してデプロイ<br /><span className="text-xs text-[#86868B]">Agent fixes &amp; deploys</span></span></li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                  <LoopStep icon={<Wrench className="size-5" />} label="問題発生" sublabel="Problem" />
                  <ArrowRight className="size-4 text-[#B8860B]/50 shrink-0" />
                  <LoopStep icon={<Cpu className="size-5" />} label="検出" sublabel="Detect" />
                  <ArrowRight className="size-4 text-[#B8860B]/50 shrink-0" />
                  <LoopStep icon={<Code className="size-5" />} label="修正" sublabel="Fix" />
                  <ArrowRight className="size-4 text-[#B8860B]/50 shrink-0" />
                  <LoopStep icon={<Zap className="size-5" />} label="強化" sublabel="Stronger" highlight />
                </div>
                <div className="flex justify-center mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-[#B8860B]/40">
                    <RefreshCw className="size-3" />
                    継続的改善ループ
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Key Insight */}
            <FadeIn show={localStep >= 2}>
              <div className="mt-4 max-w-2xl pb-8">
                <div className="p-5 rounded-xl border border-[#B8860B]/20 bg-[#B8860B]/5">
                  <p className="text-lg sm:text-xl text-[#1D1D1F] text-center leading-relaxed">
                    もう専門家チームは不要 — <span className="text-[#B8860B] font-semibold">システムが自分自身をメンテナンスする</span>
                  </p>
                  <p className="text-base text-[#86868B] text-center mt-2">
                    You don&apos;t need a team of experts anymore — the system maintains itself
                  </p>
                </div>
              </div>
            </FadeIn>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 18: VALUE PROPS ===== */}
        <SlideWrapper active={slideIndex === 18} transition="stagger" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto">
            <div className="shrink-0 pb-4 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/5 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
                05 — 何が変わるか
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-center">
                エージェンティックAIがもたらす<br /><span className="gradient-text">5つの大きな変化</span>
              </h2>
              <p className="text-lg text-[#86868B] mt-2 text-center">
                Five Big Impacts of Agentic AI
              </p>
            </div>

            <FadeIn show={localStep >= 1}>
              <div className="mt-6 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { icon: <Layers className="size-5" />, title: "すべてあなたのもの", sub: "You own everything", desc: "オープンソースから最先端モデルまで——選ぶのはあなた。ベンダーロックインなし。" },
                  { icon: <RefreshCw className="size-5" />, title: "自ら進化するAIシステム", sub: "Self-improving AI", desc: "使うたびに学び、運用手順を自ら更新。毎回もっと賢くなる。" },
                  { icon: <Zap className="size-5" />, title: "本当に仕事をするAI", sub: "AI that does real work", desc: "人がPCでできることなら、AIも学んでできるようになる。" },
                  { icon: <Workflow className="size-5" />, title: "すべてがつながる一つのシステム", sub: "One connected system", desc: "20個のサブスクを一つに統合。" },
                  { icon: <Sparkles className="size-5" />, title: "現場作業から経営へ", sub: "Freedom to lead", desc: "繰り返し業務をAIに任せ、成長に集中。" },
                ].map((item, i) => (
                  <div key={i} className={`p-4 rounded-xl border border-[#B8860B]/15 bg-[#B8860B]/3 ${i === 4 ? "sm:col-span-2 sm:max-w-md sm:mx-auto" : ""}`}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="text-[#B8860B]">{item.icon}</div>
                      <div>
                        <p className="font-semibold text-sm text-[#1D1D1F]">{item.title}</p>
                        <p className="text-xs text-[#86868B]">{item.sub}</p>
                      </div>
                    </div>
                    <p className="text-xs text-[#6E6E73] leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 19: PROGRAM ===== */}
        <SlideWrapper active={slideIndex === 19} transition="slide" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto">
            <div className="shrink-0 pb-4 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#1B7D5A]/20 bg-[#1B7D5A]/10 text-[#1B7D5A] text-xs font-medium uppercase tracking-wider">
                06 — 6ヶ月プログラム
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-center">
                明確な計画。本物のシステム。
              </h2>
              <p className="text-sm text-[#86868B] mt-1 text-center">
                Built with you in 6 months.
              </p>
              <p className="text-lg text-[#86868B] mt-2 text-center">
                6ヶ月で一緒に構築します。
              </p>
            </div>

            <FadeIn show={localStep >= 1}>
              <div className="mt-4 w-full max-w-4xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                  {[
                    { month: "1ヶ月目", title: "調査・計画", color: "border-blue-200 bg-blue-50", textColor: "text-blue-600", items: ["業務フローをマッピング", "インパクトの高い機会を特定", "カスタムAIOSアーキテクチャを設計"] },
                    { month: "2ヶ月目", title: "接続", color: "border-purple-200 bg-purple-50", textColor: "text-purple-600", items: ["SaaS・GitHub・VPSに接続", "データとツールを統合", "AIにツールの使い方を教える"] },
                    { month: "3ヶ月目", title: "構築", color: "border-[#B8860B]/20 bg-[#B8860B]/5", textColor: "text-[#B8860B]", items: ["AIエージェントを構築", "実際のビジネスに展開", "チームへのトレーニング"] },
                  ].map((m, i) => (
                    <div key={i} className={`p-4 rounded-xl border ${m.color}`}>
                      <div className={`text-xs font-medium uppercase tracking-wider ${m.textColor} mb-1`}>{m.month}</div>
                      <p className={`font-semibold text-sm ${m.textColor} mb-3`}>{m.title}</p>
                      <ul className="space-y-1.5">
                        {m.items.map((item, j) => (
                          <li key={j} className="flex items-start gap-2 text-xs text-[#6E6E73]">
                            <span className={`mt-0.5 shrink-0 ${m.textColor}`}>&#10003;</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="p-4 rounded-xl border border-[#1B7D5A]/20 bg-[#1B7D5A]/5">
                  <div className="text-xs font-medium uppercase tracking-wider text-[#1B7D5A] mb-1">4〜6ヶ月目</div>
                  <p className="font-semibold text-sm text-[#1B7D5A] mb-3">運用・改善・サポート</p>
                  <div className="flex flex-wrap gap-4 text-xs text-[#6E6E73]">
                    <span>&#10003; 日々の業務で活用し実証</span>
                    <span>&#10003; ユースケースに特化したシステム構築</span>
                    <span>&#10003; 実際の利用に基づいて改善</span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  {[
                    { value: "10", label: "AIエージェント", sub: "業務ワークフローを実行" },
                    { value: "100%", label: "ドキュメント化・所有", sub: "チームが運用・拡張" },
                    { value: "ゼロ", label: "ベンダー依存", sub: "ツールを変えてもデータはそのまま" },
                  ].map((m, i) => (
                    <div key={i} className="p-3 rounded-xl border border-[#1B7D5A]/10 bg-[#1B7D5A]/3">
                      <p className="text-2xl font-bold text-[#1B7D5A]">{m.value}</p>
                      <p className="text-xs font-semibold text-[#1D1D1F] mt-1">{m.label}</p>
                      <p className="text-[10px] text-[#86868B]">{m.sub}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 20: PRICING ===== */}
        <SlideWrapper active={slideIndex === 20} transition="slide" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto">
            <div className="shrink-0 pb-4 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/5 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
                07 — 料金プラン
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-center">
                AIオペレーティングシステムを構築する<br /><span className="gradient-text">3つの方法</span>
              </h2>
              <p className="text-sm text-[#86868B] mt-1 text-center">
                Three ways to build your AI operating system
              </p>
              <p className="text-base text-[#86868B] mt-2 text-center max-w-2xl mx-auto">
                個人でも企業でも、ゴールは同じです。<br />6ヶ月後に、あなたが所有するAIが本番稼働していること。
              </p>
            </div>

            <FadeIn show={localStep >= 1}>
              <div className="mt-4 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    label: "グループ学習",
                    title: "グループコホート",
                    price: "¥20,000",
                    per: "/月",
                    commitment: "6ヶ月 · 次回：2026年5月",
                    features: ["週2回×60分のグループセッション", "Slackで随時質問可能", "専用GitHubリポジトリ", "オーナーシップ保証"],
                    cta: "次のコホートに参加",
                    recommended: false,
                    border: "border-[#E8E8ED]",
                    bg: "bg-white",
                  },
                  {
                    label: "パーソナルコーチング",
                    title: "マンツーマン",
                    price: "¥50,000",
                    per: "/月",
                    commitment: "6ヶ月 · いつでも開始可能",
                    features: ["週1回の専属セッション", "あなたのビジネスに完全カスタマイズ", "Lewisへの直接Slackアクセス", "オーナーシップ保証"],
                    cta: "今すぐ席を確保する",
                    recommended: true,
                    border: "border-[#B8860B]/40",
                    bg: "bg-[#B8860B]/3",
                  },
                  {
                    label: "チームトレーニング",
                    title: "カンパニービルド",
                    price: "¥200,000",
                    per: "/月",
                    commitment: "6ヶ月 · いつでも開始可能",
                    features: ["最大10名まで参加可能", "御社ニーズに合わせたプログラム", "全24回の伴走型セッション", "オーナーシップ保証"],
                    cta: "チームの席を確保する",
                    recommended: false,
                    border: "border-[#E8E8ED]",
                    bg: "bg-white",
                  },
                ].map((plan, i) => (
                  <div key={i} className={`p-5 rounded-2xl border-2 ${plan.border} ${plan.bg} relative ${plan.recommended ? "sm:scale-[1.03] z-10" : ""}`}>
                    {plan.recommended && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#B8860B] text-white text-[10px] font-bold uppercase tracking-wider">
                        おすすめ
                      </div>
                    )}
                    <p className="text-[10px] uppercase tracking-wider text-[#86868B] font-medium">{plan.label}</p>
                    <p className="text-lg font-bold text-[#1D1D1F] mt-1">{plan.title}</p>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className={`text-3xl font-bold ${plan.recommended ? "text-[#B8860B]" : "text-[#1D1D1F]"}`}>{plan.price}</span>
                      <span className="text-sm text-[#86868B]">{plan.per}</span>
                    </div>
                    <p className="text-[10px] text-[#86868B] mt-1">{plan.commitment}</p>
                    <ul className="mt-4 space-y-2">
                      {plan.features.map((f, j) => (
                        <li key={j} className="flex items-start gap-2 text-xs text-[#6E6E73]">
                          <span className="text-[#B8860B] mt-0.5 shrink-0">&#10003;</span>
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <p className="text-xs text-[#86868B] mt-4 text-center">先着5社限定の導入価格です。</p>
            </FadeIn>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 21: GUARANTEE ===== */}
        <SlideWrapper active={slideIndex === 21} transition="scale" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8 relative">
            <div className="relative z-10 flex flex-col items-center max-w-3xl">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 text-xs font-medium uppercase tracking-wider">
                08 — 保証
              </div>
              <Shield className="size-16 text-emerald-500 mb-6" />
              <h2 className="text-3xl sm:text-5xl font-bold text-center leading-tight">
                オーナーシップ<span className="text-emerald-500">保証</span>
              </h2>
              <p className="text-sm text-[#86868B] mt-2 text-center">
                The Ownership Guarantee
              </p>
              <div className="mt-8 p-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-center max-w-2xl">
                <p className="text-lg sm:text-xl text-[#1D1D1F] leading-relaxed font-medium">
                  6ヶ月後にエージェンティックAIを運用できなければ、<br />
                  <span className="text-emerald-600 font-bold">できるまで無償でサポート。</span>
                </p>
                <p className="text-sm text-[#6E6E73] mt-4 leading-relaxed">
                  言い訳なし。小さな文字なし。6ヶ月のプログラムを完走してください。<br />
                  自力で運用できない場合、できるようになるまで無償でサポートを続けます。
                </p>
                <p className="text-sm text-emerald-600 mt-4 font-medium">
                  私たちはあなたの能力を増幅します——チームを置き換えることは決してありません。
                </p>
              </div>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 22: CLOSING ===== */}
        <SlideWrapper active={slideIndex === 22} transition="scale" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8">
            <div className="flex flex-col items-center max-w-4xl w-full">
              <h2 className="text-3xl sm:text-4xl font-bold text-center leading-relaxed max-w-3xl">
                問いは<span className="text-[#86868B]">「AIを使うべきか？」</span>ではなく<br />
                <span className="gradient-text">「AIを動かすインフラがあるか？」</span>
              </h2>
              <p className="text-base text-[#86868B] text-center mt-4">
                The question isn&apos;t &ldquo;should we use AI?&rdquo; — It&apos;s &ldquo;do we have the infrastructure to run it?&rdquo;
              </p>

              {/* CTA Cards */}
              <div className="mt-10 w-full max-w-2xl grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Get Your Agentic AI Audit */}
                <a
                  href="/audit"
                  onClick={(e) => e.stopPropagation()}
                  className="block pres-cta-glow rounded-2xl border-2 border-[#B8860B]/30 bg-gradient-to-br from-[#B8860B]/5 via-[#B8860B]/3 to-[#D4A843]/5 p-6 text-center transition-all duration-300 hover:border-[#B8860B]/50 hover:scale-[1.02] group"
                >
                  <Sparkles className="size-7 text-[#B8860B] mx-auto mb-3" />
                  <p className="text-lg font-bold text-[#1D1D1F] group-hover:text-[#B8860B] transition-colors">
                    無料AI活用診断
                  </p>
                  <p className="text-sm text-[#86868B] mt-1">
                    Get Your Agentic AI Audit
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1D1D1F] text-white font-semibold text-sm group-hover:bg-[#B8860B] transition-colors">
                    <ArrowRight className="size-4" />
                    今すぐ始める
                  </div>
                </a>

                {/* Sign Up Now */}
                <a
                  href="/signup?track=cohort"
                  onClick={(e) => e.stopPropagation()}
                  className="block rounded-2xl border-2 border-[#1B7D5A]/20 bg-[#1B7D5A]/5 p-6 text-center transition-all duration-300 hover:border-[#1B7D5A]/40 hover:scale-[1.02] group"
                >
                  <UserPlus className="size-7 text-[#1B7D5A] mx-auto mb-3" />
                  <p className="text-lg font-bold text-[#1D1D1F] group-hover:text-[#1B7D5A] transition-colors">
                    席を確保する
                  </p>
                  <p className="text-sm text-[#86868B] mt-1">
                    Sign Up Now
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B7D5A] text-white font-semibold text-sm group-hover:bg-[#1B7D5A]/80 transition-colors">
                    <ArrowRight className="size-4" />
                    申し込む
                  </div>
                </a>
              </div>

              {/* Contact info */}
              <div className="mt-8 flex flex-col items-center gap-3">
                <div className="flex items-center gap-2 text-sm text-[#1D1D1F]">
                  <Layers className="size-4 text-[#B8860B]" />
                  <span className="font-semibold">MOTTO Digital</span>
                  <span className="text-[#E8E8ED] mx-1">&middot;</span>
                  <span className="text-[#6E6E73]">Lewis Rice</span>
                </div>
                <div className="flex items-center gap-4 text-sm text-[#6E6E73]">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4 text-[#B8860B]/70" />
                    <span>aios@mottodigital.jp</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Linkedin className="size-4 text-[#B8860B]/70" />
                    <span>linkedin.com/in/lewisrice</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="size-4 text-[#B8860B]/70" />
                    <span>aios.mottodigital.jp</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </SlideWrapper>
      </div>

      {/* ── Mobile nav arrows (always visible on mobile after first step) ── */}
      <div
        className="sm:hidden fixed bottom-4 right-4 z-50 flex gap-2 transition-opacity duration-300"
        style={{ opacity: globalStep > 0 ? 1 : 0, bottom: showNotes ? "36vh" : "1rem" }}
      >
        <button
          onClick={(e) => { e.stopPropagation(); goBack(); }}
          disabled={globalStep === 0}
          className="size-9 rounded-full bg-white/70 backdrop-blur-sm border border-[#E8E8ED] flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] disabled:opacity-30 transition-all"
          aria-label="Previous"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button
          onClick={(e) => { e.stopPropagation(); advance(); }}
          disabled={globalStep === TOTAL_GLOBAL_STEPS - 1}
          className="size-9 rounded-full bg-white/70 backdrop-blur-sm border border-[#E8E8ED] flex items-center justify-center text-[#86868B] hover:text-[#1D1D1F] disabled:opacity-30 transition-all"
          aria-label="Next"
        >
          <svg className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
        </button>
      </div>

      {/* ── Presenter Notes Panel ── */}
      <div className={`pres-notes-panel ${showNotes ? "pres-notes-visible" : "pres-notes-hidden"}`} onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-[#6E6E73] uppercase tracking-wider">
                Presenter Notes
              </h3>
              {currentNotes && (
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B8860B]/8 border border-[#B8860B]/20">
                  <Clock className="size-3 text-[#B8860B]" />
                  <span className="text-xs text-[#B8860B] font-medium">{currentNotes.timing}</span>
                </div>
              )}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setShowNotes(false); }}
              className="text-xs text-[#86868B] hover:text-[#1D1D1F] px-2 py-1 rounded border border-[#E8E8ED] hover:border-[#6E6E73] transition-colors"
            >
              Close (N)
            </button>
          </div>
          {currentNotes && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-[#86868B] uppercase tracking-wider mb-2 font-semibold">English</p>
                <ul className="space-y-1.5">
                  {currentNotes.en.map((note, i) => (
                    <li key={i} className="text-sm text-[#6E6E73] leading-relaxed flex gap-2">
                      <span className="text-[#B8860B]/50 shrink-0">&bull;</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] text-[#86868B] uppercase tracking-wider mb-2 font-semibold">日本語</p>
                <ul className="space-y-1.5">
                  {currentNotes.jp.map((note, i) => (
                    <li key={i} className="text-sm text-[#6E6E73] leading-relaxed flex gap-2">
                      <span className="text-[#B8860B]/50 shrink-0">&bull;</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============ Slide Wrapper with Transitions ============ */

function SlideWrapper({
  active,
  children,
  transition,
  direction,
}: {
  active: boolean;
  children: React.ReactNode;
  transition: "scale" | "slide" | "stagger";
  direction: "forward" | "backward";
}) {
  const [shouldRender, setShouldRender] = useState(active);
  const [animClass, setAnimClass] = useState("");
  const prevActive = useRef(active);

  // Ensure shouldRender stays true while active
  if (active && !shouldRender) {
    setShouldRender(true);
  }

  useEffect(() => {
    if (active && !prevActive.current) {
      // Enter animation
      requestAnimationFrame(() => {
        if (transition === "scale") {
          setAnimClass("pres-enter-scale");
        } else if (transition === "stagger") {
          setAnimClass("pres-enter-stagger");
        } else {
          setAnimClass(direction === "forward" ? "pres-enter-right" : "pres-enter-left");
        }
      });
    } else if (!active && prevActive.current) {
      // Exit animation — use rAF to avoid synchronous setState in effect
      requestAnimationFrame(() => {
        if (transition === "scale") {
          setAnimClass("pres-exit-scale");
        } else {
          setAnimClass(direction === "forward" ? "pres-exit-right" : "pres-exit-left");
        }
      });
      const timer = setTimeout(() => {
        setShouldRender(false);
        setAnimClass("");
      }, 450);
      prevActive.current = active;
      return () => clearTimeout(timer);
    }
    prevActive.current = active;
  }, [active, transition, direction]);

  if (!shouldRender && !active) return null;

  return (
    <div
      className={`absolute inset-0 bg-white ${active ? "pointer-events-auto z-10" : "pointer-events-none z-0"} ${animClass}`}
    >
      {children}
    </div>
  );
}

/* ============ Fade In Wrapper ============ */

function FadeIn({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 h-0 overflow-hidden"
      }`}
    >
      {children}
    </div>
  );
}

/* ============ Helper Components ============ */

function CycleNode({
  icon, label, sublabel, highlight, num,
}: {
  icon: React.ReactNode; label: string; sublabel: string; highlight?: boolean; num?: string;
}) {
  return (
    <div className={`p-2 sm:p-3 rounded-xl border text-center w-[72px] sm:w-[120px] relative ${
      highlight ? "border-red-200 bg-red-50 shadow-lg shadow-red-100" : "border-[#E8E8ED] bg-[#F5F5F7]"
    }`}>
      {num && (
        <div className={`absolute -top-2 -right-2 size-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
          highlight ? "bg-red-500 text-white" : "bg-[#E8E8ED] text-[#6E6E73]"
        }`}>{num}</div>
      )}
      <div className={`flex justify-center mb-1 ${highlight ? "text-red-600" : "text-[#6E6E73]"}`}>{icon}</div>
      <p className={`font-semibold text-[10px] sm:text-xs leading-tight ${highlight ? "text-red-600" : ""}`}>{label}</p>
      <p className="text-[9px] sm:text-[10px] text-[#86868B] mt-0.5">{sublabel}</p>
    </div>
  );
}

function LoopStep({
  icon, label, sublabel, highlight,
}: {
  icon: React.ReactNode; label: string; sublabel: string; highlight?: boolean;
}) {
  return (
    <div className={`flex flex-col items-center p-3 rounded-xl border min-w-[70px] sm:min-w-[85px] ${
      highlight ? "border-[#B8860B]/20 bg-[#B8860B]/5" : "border-[#E8E8ED] bg-[#F5F5F7]"
    }`}>
      <div className={highlight ? "text-[#B8860B]" : "text-[#6E6E73]"}>{icon}</div>
      <p className={`text-xs font-semibold mt-1 ${highlight ? "text-[#B8860B]" : ""}`}>{label}</p>
      <p className="text-[10px] text-[#86868B]">{sublabel}</p>
    </div>
  );
}
