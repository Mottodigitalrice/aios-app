"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { segmentJapanese } from "@/lib/budoux-transform";
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
  { name: "caseKnowledgework", steps: 1, transition: "slide" as const },// 7: Knowledge Work
  { name: "automationFront", steps: 1, transition: "slide" as const },   // 8: front office
  { name: "automationBack", steps: 1, transition: "slide" as const },   // 9: back office
  { name: "problem", steps: 3, transition: "stagger" as const },        // 10: heading, cycle, insight
  { name: "era2024", steps: 3, transition: "slide" as const },          // 11: heading, details, takeaway
  { name: "era2025", steps: 3, transition: "slide" as const },          // 12: heading, limitations, takeaway
  { name: "brainbody", steps: 3, transition: "stagger" as const },      // 13: heading, diagram, insight
  { name: "cli", steps: 3, transition: "stagger" as const },            // 14: heading+logos, architecture, insight
  { name: "ownership", steps: 2, transition: "slide" as const },        // 15: heading, diagram
  { name: "selfimprove", steps: 3, transition: "slide" as const },      // 16: heading, before/after+loop, insight
  { name: "valueProps", steps: 2, transition: "stagger" as const },     // 17: heading, 5 cards
  { name: "program", steps: 2, transition: "slide" as const },          // 18: heading, months
  { name: "pricing", steps: 2, transition: "slide" as const },          // 19: heading, 3 tiers
  { name: "guarantee", steps: 1, transition: "scale" as const },        // 20: full guarantee
  { name: "closing", steps: 1, transition: "scale" as const },          // 21: full closing
];

const TOTAL_GLOBAL_STEPS = SLIDES.reduce((sum, s) => sum + s.steps, 0);

// ── Presenter Notes ──
const PRESENTER_NOTES: Record<number, { timing: string; en: string[]; jp: string[] }> = {
  0: {
    timing: "~2 min",
    en: [
      "Welcome everyone, thank you for your time today.",
      "I'm Lewis Rice from Mottodigital — we specialize in AI infrastructure for businesses.",
      "Today we'll talk about why most companies are stuck with AI, and what just changed in 2026.",
      "This presentation is about 15-20 minutes, then open Q&A.",
    ],
    jp: [
      "皆さま、本日はお時間をいただきありがとうございます。",
      "Mottodigitalのルイス・ライスです。企業向けAIインフラを専門としています。",
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
      "Knowledge Work — one person, 448 production deployments in a single month.",
      "7 parallel AI sessions. The human's only task: review and approve.",
    ],
    jp: [
      "ナレッジワーク — たった1人。1ヶ月で448回の本番デプロイ。",
      "7つの並行セッション。人間の仕事はレビューと承認だけ。",
    ],
  },
  8: {
    timing: "~2 min",
    en: [
      "Front office — the revenue-facing workflows.",
      "Marketing: LINE inquiries auto-captured, Maps leads extracted, weekly GA4 reports generated.",
      "Sales: quote drafts from email, meeting recordings to proposals, stalled deals get follow-up.",
      "Client Delivery: kickoff docs auto-created, meeting notes to tasks, support inquiries matched to FAQ.",
    ],
    jp: [
      "フロントオフィス — 売上に直結する業務フローです。",
      "マーケティング：LINE問い合わせの自動取込、Maps見込み客抽出、GA4週次レポート。",
      "営業：見積書の下書き、商談録画から提案書、停滞案件のフォローアップ。",
      "クライアント対応：キックオフ資料の自動作成、議事録からタスク化、問い合わせのFAQ照合。",
    ],
  },
  9: {
    timing: "~2 min",
    en: [
      "Back office — the internal workflows that eat time every day.",
      "Operations: booking changes re-slotted, inbound triaged by urgency, inventory alerts.",
      "Finance: receipt photos to freee entries, invoice matching with variance alerts, cash flow forecasts.",
      "Admin: contracts auto-populated, meeting recordings to minutes, bilingual docs with terminology checks.",
    ],
    jp: [
      "バックオフィス — 毎日時間を奪う社内業務です。",
      "オペレーション：予約変更の再提示、受信の内容判定と振り分け、在庫アラート。",
      "経理：領収書画像からfreee登録、請求書突合と差異アラート、キャッシュ予測。",
      "管理：契約書の自動差し込み、録音から議事録、日英翻訳と用語チェック。",
    ],
  },
  10: {
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
  11: {
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
  12: {
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
  13: {
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
  14: {
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
  15: {
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
  16: {
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
  17: {
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
  18: {
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
  19: {
    timing: "~2 min",
    en: [
      "Three ways to get started — choose what fits your situation.",
      "Group Cohort at 20,000 yen per month — two 60-minute sessions per week, learn alongside peers.",
      "One-on-One at 50,000 yen — most founders choose this — dedicated 90-minute weekly session plus 120 hours of direct dev work per month.",
      "Company Build at 200,000 yen — dedicated 90-minute weekly session, 120 hours dev work, up to 10 people in the course.",
      "All plans include the ownership guarantee.",
    ],
    jp: [
      "3つのプランからお選びいただけます。",
      "グループコホート：月2万円——週2回×60分、仲間と一緒に学ぶ。",
      "マンツーマン：月5万円——週1回×90分の専属セッション＋月120時間の直接開発。",
      "カンパニービルド：月20万円——週1回×90分の専属セッション、月120時間の開発、最大10名参加可能。",
      "すべてのプランにオーナーシップ保証付き。",
    ],
  },
  20: {
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
  21: {
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
      aria-label="Mottodigital presentation — use arrow keys or click to navigate"
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
            Mottodigital
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
                Mottodigital — AI Infrastructure
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
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                {[
                  { name: "楽天", sub: "32,000名", logo: "/logos/rakuten.svg", h: "h-5" },
                  { name: "NRI", sub: "6,500名", logo: "/logos/nri.png", h: "h-5" },
                  { name: "Classmethod", sub: "AWS #1", logo: "/logos/classmethod.svg", h: "h-4" },
                  { name: "Panasonic", sub: "240,000名", logo: "/logos/panasonic.svg", h: "h-4" },
                  { name: "ナレッジワーク", sub: "1名", logo: "/logos/knowledgework.png", h: "h-5" },
                ].map((c) => (
                  <div key={c.name} className="px-5 py-3 rounded-xl border border-[#B8860B]/15 bg-white/80 flex flex-col items-center gap-1.5 min-w-[120px]">
                    <img src={c.logo} alt={c.name} className={`${c.h} w-auto opacity-80`} />
                    <p className="text-[10px] text-[#86868B] font-medium">{c.sub}</p>
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
                <div className="flex items-center gap-3 mb-3">
                  <img src="/logos/rakuten.svg" alt="Rakuten" className="h-8 w-auto" />
                  <div>
                    <p className="text-lg font-bold text-[#1D1D1F] leading-tight">楽天グループ <span className="text-[#86868B] font-normal text-sm">Rakuten Group</span></p>
                    <p className="text-xs text-[#B8860B] font-medium">従業員32,000名 — 32,000 Employees</p>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mb-2 leading-snug">{segmentJapanese("24日かかっていた作業が5日に。財務チームに余裕が生まれた。")}</h3>
                <p className="text-sm text-[#86868B] mb-3">From 24 days to 5. A finance team that got their afternoons back.</p>
                <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">日本最大のECコングロマリットは、開発・運用プロセス全体を再設計した。<br/><span className="text-[#86868B]">Japan&apos;s largest e-commerce conglomerate redesigned their entire process around AI.</span></p>
                <div className="rounded-lg p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                  <p className="text-sm text-[#1D1D1F] leading-relaxed">{segmentJapanese("「以前は丸1日かかっていた作業が、今では1時間で完了します。」")}</p>
                  <p className="text-xs text-[#86868B] mt-1 italic">&ldquo;What once took a day, we can now accomplish in an hour.&rdquo;</p>
                  <p className="text-xs text-[#86868B] mt-1.5">— 加地 雄介氏 / Yusuke Kaji, GM of AI, Rakuten</p>
                </div>
                <div className="text-sm space-y-2">
                  <div><span className="text-[#B8860B] font-semibold">財務チームの変化:</span> <span className="text-[#6E6E73]">丸1日のスプレッドシート調整がClaudeで自動化。問題を自動検出し、レポートを生成。</span></div>
                  <div><span className="text-[#B8860B] font-semibold">エンジニアリング:</span> <span className="text-[#6E6E73]">リリース24日→5日。24同時セッション。7時間の自律コーディング。</span></div>
                  <div><span className="text-[#B8860B] font-semibold">全部門展開:</span> <span className="text-[#6E6E73]">1週間でProduct・Sales・Marketing・Financeに展開。</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5 h-fit shrink-0 w-64">
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
                <div className="flex items-center gap-3 mb-3">
                  <img src="/logos/nri.png" alt="NRI" className="h-7 w-auto" />
                  <div>
                    <p className="text-lg font-bold text-[#1D1D1F] leading-tight">野村総合研究所 <span className="text-[#86868B] font-normal text-sm">Nomura Research Institute</span></p>
                    <p className="text-xs text-[#B8860B] font-medium">従業員6,500名 — 6,500 Employees</p>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mb-2 leading-snug">{segmentJapanese("専門家が数時間かけていた複雑な日本語文書のレビュー時間を半減。")}</h3>
                <p className="text-sm text-[#86868B] mb-3">Complex Japanese documents that took experts hours — cut in half.</p>
                <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">日本最大のITコンサル企業が、実際の日本語ビジネス文書で全AIモデルを評価。1つのモデルが圧倒的に勝ち、同社はそれに賭けた。<br/><span className="text-[#86868B]">Japan&apos;s largest IT consulting firm tested every AI on real Japanese business documents. One model won decisively.</span></p>
                <div className="rounded-lg p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                  <p className="text-sm text-[#1D1D1F] leading-relaxed">{segmentJapanese("「生成AIは定型業務を自動化し、既存ワーカーの生産性を高め、24時間365日の顧客対応を実現できる — 日本の労働力不足を直接補完するものだ。」")}</p>
                  <p className="text-xs text-[#86868B] mt-1 italic">&ldquo;Generative AI can automate routine tasks and provide 24/7 capabilities — directly supplementing Japan&apos;s workforce needs.&rdquo;</p>
                  <p className="text-xs text-[#86868B] mt-1.5">— 稲葉 孝彦氏 / Takahiko Inaba, Head of AI — NRI</p>
                </div>
                <div className="text-sm space-y-2">
                  <div><span className="text-[#B8860B] font-semibold">日本語特化テスト:</span> <span className="text-[#6E6E73]">契約書・技術仕様書・規制関連書類など実際の日本語業務文書で独自の評価テストを構築。Claudeが全競合を上回った。</span></div>
                  <div><span className="text-[#B8860B] font-semibold">労働力不足への解決策:</span> <span className="text-[#6E6E73]">人を置き換えるのではなく、一人ひとりにより大きなチームの能力を与える。</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5 h-fit shrink-0 w-64">
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
                <div className="flex items-center gap-3 mb-3">
                  <img src="/logos/classmethod.svg" alt="Classmethod" className="h-6 w-auto" />
                  <div>
                    <p className="text-lg font-bold text-[#1D1D1F] leading-tight">クラスメソッド <span className="text-[#86868B] font-normal text-sm">Classmethod</span></p>
                    <p className="text-xs text-[#B8860B] font-medium">日本トップのAWSパートナー — Japan&apos;s Top AWS Partner</p>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mb-2 leading-snug">{segmentJapanese("24時間の作業が60分で完了。そして全チームの働き方を変えた。")}</h3>
                <p className="text-sm text-[#86868B] mb-3">A 24-hour task finished in 60 minutes. Then they changed how every team works.</p>
                <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">最大10倍の生産性向上、コードレビュー80%短縮、特定管理業務96%削減。確信を得た同社は、他社向け体験センターまで開設した。<br/><span className="text-[#86868B]">Up to 10x productivity gains, 80% faster code reviews, 96% reduction on admin tasks.</span></p>
                <div className="rounded-lg p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                  <p className="text-sm text-[#1D1D1F] leading-relaxed">{segmentJapanese("「生成されたコードの品質は、他のプロダクトと比べて明らかに優れていた。24時間かかっていたGoogle Apps Scriptの作業が1時間で完了した。」")}</p>
                  <p className="text-xs text-[#86868B] mt-1 italic">&ldquo;The generated code quality was significantly superior. A 24-hour GAS task completed in 1 hour.&rdquo;</p>
                  <p className="text-xs text-[#86868B] mt-1.5">— クラスメソッド エンジニアリングチーム / Classmethod Engineering Team</p>
                </div>
                <div className="text-sm space-y-2">
                  <div><span className="text-[#B8860B] font-semibold">数字で見る成果:</span> <span className="text-[#6E6E73]">GAS：24h→1h（96%削減）。月間デプロイ：108→165 PR（50%増）。コードレビュー：80%短縮。</span></div>
                  <div><span className="text-[#B8860B] font-semibold">他社支援:</span> <span className="text-[#6E6E73]">「AIDD Boostチーム」を発足し他社のAI駆動開発を支援。AI体験センターを開設。</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5 h-fit shrink-0 w-64">
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
                <div className="flex items-center gap-3 mb-3">
                  <img src="/logos/panasonic.svg" alt="Panasonic" className="h-6 w-auto" />
                  <div>
                    <p className="text-lg font-bold text-[#1D1D1F] leading-tight">パナソニック <span className="text-[#86868B] font-normal text-sm">Panasonic Holdings</span></p>
                    <p className="text-xs text-[#B8860B] font-medium">従業員240,000名 — 240,000 Employees</p>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mb-2 leading-snug">{segmentJapanese("製造業の巨人からAI駆動企業へ — 2030年までに売上の30%を目標に。")}</h3>
                <p className="text-sm text-[#86868B] mb-3">From manufacturing giant to AI-powered business — targeting 30% of revenue by 2030.</p>
                <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">AIを社内利用するだけでなく、10億人の顧客に向けた消費者製品にClaudeを組み込み、4部門に戦略的アセットとして導入。<br/><span className="text-[#86868B]">Built Claude into a consumer product for 1 billion customers and deployed across 4 departments.</span></p>
                <div className="rounded-lg p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                  <p className="text-sm text-[#1D1D1F] leading-relaxed">{segmentJapanese("「AI駆動のハードウェア・ソフトウェア・ソリューション事業は、2030年までにパナソニックの総売上の30%に達する。」")}</p>
                  <p className="text-xs text-[#86868B] mt-1 italic">&ldquo;AI-driven businesses will reach 30% of Panasonic&apos;s total revenue by 2030.&rdquo;</p>
                  <p className="text-xs text-[#86868B] mt-1.5">— Panasonic Go — CES 2025 Keynote</p>
                </div>
                <div className="text-sm space-y-2">
                  <div><span className="text-[#B8860B] font-semibold">消費者プロダクト「Umi」:</span> <span className="text-[#6E6E73]">Claude搭載のウェルネスアプリ。音声チャット、目標設定。Calm、Blue Apronと提携。世界10億人向け。</span></div>
                  <div><span className="text-[#B8860B] font-semibold">社内トランスフォーメーション:</span> <span className="text-[#6E6E73]">24万人にClaudeを「戦略的アセット」として導入。全チームが持つべきケイパビリティ。</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5 h-fit shrink-0 w-64">
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

        {/* ===== SLIDE 7: KNOWLEDGE WORK ===== */}
        <SlideWrapper active={slideIndex === 7} transition="slide" direction={direction}>
          <section className="h-full flex flex-col justify-center px-12 pt-14 pb-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto grid sm:grid-cols-[1fr_auto] gap-8">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <img src="/logos/knowledgework.png" alt="Knowledge Work" className="h-7 w-auto" />
                  <div>
                    <p className="text-lg font-bold text-[#1D1D1F] leading-tight">ナレッジワーク <span className="text-[#86868B] font-normal text-sm">Knowledge Work</span></p>
                    <p className="text-xs text-[#B8860B] font-medium">B2B SaaS — データ基盤1名体制 / 1-Person Data Team</p>
                  </div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] mb-2 leading-snug">{segmentJapanese("たった1人。1ヶ月で448回の本番デプロイ。誤植ではない。")}</h3>
                <p className="text-sm text-[#86868B] mb-3">One person. 448 production deployments in a single month. Not a typo.</p>
                <p className="text-sm text-[#6E6E73] leading-relaxed mb-4">データ基盤エンジニア1名が、7つのAIセッションを同時並行で実行。人間に残された手作業はレビューと承認だけだ。<br/><span className="text-[#86868B]">One engineer, 7 parallel AI sessions. Only remaining manual task: review and approve.</span></p>
                <div className="rounded-lg p-4 mb-4" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                  <p className="text-sm text-[#1D1D1F] leading-relaxed">{segmentJapanese("「人間に残された手作業はPRレビューだけ。計画、実装、検証、デプロイ — それ以外はすべてAIが担う。」")}</p>
                  <p className="text-xs text-[#86868B] mt-1 italic">&ldquo;The human&apos;s only task is PR review. Everything else — planning, implementation, deployment — is AI.&rdquo;</p>
                  <p className="text-xs text-[#86868B] mt-1.5">— ナレッジワーク エンジニアリング / Knowledge Work Engineering — Claude Code Meetup Japan</p>
                </div>
                <div className="text-sm space-y-2">
                  <div><span className="text-[#B8860B] font-semibold">この事例が重要な理由:</span> <span className="text-[#6E6E73]">人を置き換える話ではない。適切なシステムがあれば1人が何を成し遂げられるかという話。448回のデプロイ — 残業はわずか10〜30時間。</span></div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3.5 h-fit shrink-0 w-64">
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

        {/* ===== SLIDE 8: FRONT OFFICE AUTOMATION ===== */}
        <SlideWrapper active={slideIndex === 8} transition="slide" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto">
            <div className="flex flex-col items-center w-full max-w-5xl">
              <div className="shrink-0 pb-3 text-center">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/8 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
                  実際の自動化 / Real Automation
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-center">
                  {segmentJapanese("フロントオフィスで自動化できる業務")}
                </h2>
                <p className="text-sm text-[#86868B] mt-1.5 text-center">
                  {segmentJapanese("集客・営業・顧客対応で、毎週くり返される実務。")}
                </p>
                <p className="text-xs text-[#86868B]/60 mt-0.5">Recurring revenue and customer workflows in Japanese SMBs.</p>
              </div>

              <div className="mt-3 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { dept: "マーケティング", deptEn: "Marketing", savings: "~30h/週", workflows: [
                    "LINE・Instagram問い合わせ → リード登録 → 一次返信",
                    "Google Maps・業界リスト → 見込み客抽出 → CRM登録",
                    "LPフォーム流入 → 内容判定 → セグメント分け",
                    "GA4・広告データ → 週次レポート → 改善提案",
                    "口コミ・レビュー検知 → 返信案作成 → 再来店施策",
                  ], tools: "LINE公式, Instagram, GA4, Google Sheets, kintone", outcome: "反応の早い初回対応と、集客業務の手作業削減" },
                  { dept: "営業", deptEn: "Sales", savings: "~20h/週", workflows: [
                    "見積依頼メール → 見積書下書き → 送付前レビュー",
                    "商談録画・議事録 → 提案書ドラフト → 次回アクション作成",
                    "名刺・フォーム流入 → CRM入力 → 追客リマインド",
                    "停滞案件 → フォローアップ文案 → 面談日程打診",
                    "受注確定 → 社内引き継ぎ → 請求準備",
                  ], tools: "Gmail, Google Docs, HubSpot, Salesforce, kintone, freee", outcome: "提案初稿を早く出し、追客漏れを防ぐ" },
                  { dept: "クライアント対応", deptEn: "Client Delivery", savings: "~15h/週", workflows: [
                    "受注後 → キックオフ資料作成 → タスク発行",
                    "定例会議 → 議事録 → 宿題・期限登録",
                    "月次データ収集 → レポート下書き → 顧客共有準備",
                    "サポート問い合わせ → FAQ照合 → 返信案作成",
                    "現場メモ・音声・写真 → 作業報告書 → 管理者共有",
                  ], tools: "Notion, Google Drive, Chatwork, Slack, Zendesk, kintone", outcome: "立ち上がりを早くし、報告と対応を標準化" },
                ].map((dept, di) => (
                  <div key={di} className="rounded-xl p-5 bg-[#F5F5F7] border border-[#E8E8ED]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-bold text-[#1D1D1F]">{dept.dept} <span className="font-normal text-[#86868B] text-xs">{dept.deptEn}</span></div>
                      <span className="text-xs font-bold gradient-text">{dept.savings}</span>
                    </div>
                    <ul className="space-y-1.5 mb-3">
                      {dept.workflows.map((wf, wi) => (
                        <li key={wi} className="flex items-start gap-2 text-[11px] text-[#6E6E73] leading-relaxed">
                          <span className="text-[#B8860B] mt-px shrink-0">&#x2022;</span>
                          <span>{wf}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 border-t border-[#E8E8ED]">
                      <p className="text-[10px] text-[#86868B]">{dept.tools}</p>
                      <p className="text-[11px] text-[#B8860B] font-medium mt-1">{dept.outcome}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 w-full rounded-xl bg-[#1D1D1F] p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">フロントオフィスだけで回収できる時間</p>
                  <p className="text-xs text-white/40 mt-0.5">Front office time recovered per week</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#D4A843]">65+時間/週</div>
                </div>
              </div>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 9: BACK OFFICE AUTOMATION ===== */}
        <SlideWrapper active={slideIndex === 9} transition="slide" direction={direction}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto">
            <div className="flex flex-col items-center w-full max-w-5xl">
              <div className="shrink-0 pb-3 text-center">
                <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/8 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
                  実際の自動化 / Real Automation
                </div>
                <h2 className="text-2xl sm:text-4xl font-bold text-center">
                  {segmentJapanese("バックオフィスで自動化できる業務")}
                </h2>
                <p className="text-sm text-[#86868B] mt-1.5 text-center">
                  {segmentJapanese("社内運用・経理・文書管理で、毎日発生する定型業務。")}
                </p>
                <p className="text-xs text-[#86868B]/60 mt-0.5">Daily internal workflows across operations, finance, and admin.</p>
              </div>

              <div className="mt-3 w-full grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { dept: "オペレーション", deptEn: "Operations", savings: "~25h/週", workflows: [
                    "予約変更 → 空き枠再提示 → リマインド送信",
                    "LINE・メール・Chatwork受信 → 内容判定 → 担当振り分け",
                    "電話メモ・フォーム流入 → 緊急度判定 → 案件化",
                    "シフト・勤怠異常 → 修正依頼 → 管理者通知",
                    "在庫・備品不足 → 補充アラート → 発注準備",
                  ], tools: "LINE, Chatwork, STORES予約, AirReserve, Google Calendar, Excel", outcome: "調整の往復を減らし、対応速度を上げる" },
                  { dept: "経理・財務", deptEn: "Finance", savings: "~25h/月", workflows: [
                    "領収書画像 → 経費分類 → freee下書き登録",
                    "請求書発行 → 入金確認 → 督促メッセージ作成",
                    "発注書・納品書・請求書 → 突合 → 差異アラート",
                    "月次締め前 → 未提出資料催促 → 会計用パック作成",
                    "支払予定一覧 → キャッシュ予測 → オーナー共有",
                  ], tools: "freee, Money Forward, 銀行明細CSV, Google Drive, Excel", outcome: "月末集中作業を減らし、未回収と入力漏れを防ぐ" },
                  { dept: "管理・文書", deptEn: "Admin & Docs", savings: "~15h/週", workflows: [
                    "契約書テンプレート → 顧客情報差し込み → 電子契約送付準備",
                    "会議録音 → 議事録 → タスク・期限登録",
                    "日英資料 → 翻訳 → 用語統一チェック",
                    "散在するSOP → 標準フォーマット化 → ナレッジ登録",
                    "入社書類 → 不足書類催促 → 人事ファイル整理",
                  ], tools: "Google Docs, Notion, freeeサイン, Dropbox Sign, SmartHR", outcome: "文書作成と定型管理を速くし、属人化を減らす" },
                ].map((dept, di) => (
                  <div key={di} className="rounded-xl p-5 bg-[#F5F5F7] border border-[#E8E8ED]">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-sm font-bold text-[#1D1D1F]">{dept.dept} <span className="font-normal text-[#86868B] text-xs">{dept.deptEn}</span></div>
                      <span className="text-xs font-bold gradient-text">{dept.savings}</span>
                    </div>
                    <ul className="space-y-1.5 mb-3">
                      {dept.workflows.map((wf, wi) => (
                        <li key={wi} className="flex items-start gap-2 text-[11px] text-[#6E6E73] leading-relaxed">
                          <span className="text-[#B8860B] mt-px shrink-0">&#x2022;</span>
                          <span>{wf}</span>
                        </li>
                      ))}
                    </ul>
                    <div className="pt-2 border-t border-[#E8E8ED]">
                      <p className="text-[10px] text-[#86868B]">{dept.tools}</p>
                      <p className="text-[11px] text-[#B8860B] font-medium mt-1">{dept.outcome}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-3 w-full rounded-xl bg-[#1D1D1F] p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-white/70">フロント＋バック合計で月間回収時間</p>
                  <p className="text-xs text-white/40 mt-0.5">Total time recovered across all 6 departments</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-[#D4A843]">115+時間/月</div>
                </div>
              </div>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 10: THE AI ADOPTION TRAP ===== */}
        <SlideWrapper active={slideIndex === 10} transition="stagger" direction={direction}>
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

        {/* ===== SLIDE 11: 2024 — THE ERA OF CHATBOTS ===== */}
        <SlideWrapper active={slideIndex === 11} transition="slide" direction={direction}>
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

        {/* ===== SLIDE 12: 2025 — AI AUTOMATIONS & AGENTS ===== */}
        <SlideWrapper active={slideIndex === 12} transition="slide" direction={direction}>
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

        {/* ===== SLIDE 13: BRAIN + BODY ===== */}
        <SlideWrapper active={slideIndex === 13} transition="stagger" direction={direction}>
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

        {/* ===== SLIDE 14: AI ENTERS THE COMMAND LINE ===== */}
        <SlideWrapper active={slideIndex === 14} transition="stagger" direction={direction}>
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

        {/* ===== SLIDE 15: OWNERSHIP ===== */}
        <SlideWrapper active={slideIndex === 15} transition="slide" direction={direction}>
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

        {/* ===== SLIDE 16: SELF-IMPROVING ===== */}
        <SlideWrapper active={slideIndex === 16} transition="slide" direction={direction}>
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

        {/* ===== SLIDE 17: VALUE PROPS ===== */}
        <SlideWrapper active={slideIndex === 17} transition="stagger" direction={direction}>
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

        {/* ===== SLIDE 18: PROGRAM ===== */}
        <SlideWrapper active={slideIndex === 18} transition="slide" direction={direction}>
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

        {/* ===== SLIDE 19: PRICING ===== */}
        <SlideWrapper active={slideIndex === 19} transition="slide" direction={direction}>
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
                    per: "/月（税抜）",
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
                    per: "/月（税抜）",
                    commitment: "6ヶ月 · いつでも開始可能",
                    features: ["週1回×90分の専属セッション", "月120時間の直接開発・セットアップ", "あなたのビジネスに完全カスタマイズ", "オーナーシップ保証"],
                    cta: "今すぐ席を確保する",
                    recommended: true,
                    border: "border-[#B8860B]/40",
                    bg: "bg-[#B8860B]/3",
                  },
                  {
                    label: "チームトレーニング",
                    title: "カンパニービルド",
                    price: "¥200,000",
                    per: "/月（税抜）",
                    commitment: "6ヶ月 · いつでも開始可能",
                    features: ["週1回×90分の専属セッション", "月120時間の直接開発・セットアップ", "最大10名までコース参加可能", "オーナーシップ保証"],
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

        {/* ===== SLIDE 20: GUARANTEE ===== */}
        <SlideWrapper active={slideIndex === 20} transition="scale" direction={direction}>
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

        {/* ===== SLIDE 21: CLOSING ===== */}
        <SlideWrapper active={slideIndex === 21} transition="scale" direction={direction}>
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
                  <span className="font-semibold">Mottodigital</span>
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
