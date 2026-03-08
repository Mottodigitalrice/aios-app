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
  Database,
  Lock,
  RefreshCw,
  Zap,
  ChevronDown,
  Code,
  Wrench,
  Sparkles,
  TrendingDown,
  RotateCcw,
  FileCode,
  Bot,
  HardDrive,
  Cpu,
  Network,
  Brain,
  MessageSquare,
  Workflow,
  AlertTriangle,
  DollarSign,
  Unlink,
  ExternalLink,
  Mail,
  Linkedin,
  QrCode,
  Globe,
  Clock,
} from "lucide-react";

// ── Slide definitions ──
// Each slide has a name and number of internal sub-steps
const SLIDES = [
  { name: "title", steps: 2, transition: "scale" as const },          // 0: title, 1: subtitle
  { name: "problem", steps: 3, transition: "stagger" as const },      // 0: heading, 1: cycle, 2: insight
  { name: "era2024", steps: 3, transition: "slide" as const },        // 0: heading, 1: details, 2: takeaway
  { name: "era2025", steps: 3, transition: "slide" as const },        // 0: heading, 1: limitations, 2: takeaway
  { name: "brainbody", steps: 3, transition: "stagger" as const },    // 0: heading, 1: diagram, 2: insight
  { name: "cli", steps: 3, transition: "stagger" as const },          // 0: heading+logos, 1: architecture, 2: insight
  { name: "ownership", steps: 2, transition: "slide" as const },      // 0: heading, 1: diagram
  { name: "selfimprove", steps: 3, transition: "slide" as const },    // 0: heading, 1: before/after+loop, 2: insight
  { name: "closing", steps: 1, transition: "scale" as const },        // 0: full closing
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
  2: {
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
  3: {
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
  4: {
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
  5: {
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
  6: {
    timing: "~2 min",
    en: [
      "This is where we differentiate from everyone else.",
      "Everything is YOURS — skills, agents, data, servers, security, code.",
      "You can plug in any AI model — Claude, GPT, Gemini, even local LLMs.",
      "No vendor lock-in. Switch providers anytime without losing anything.",
      "This is the infrastructure play — you OWN the system.",
    ],
    jp: [
      "ここが我々の差別化ポイントです。",
      "全てがあなたのもの — スキル、エージェント、データ、サーバー、コード。",
      "どのAIモデルでも接続可能。ベンダーロックインなし。",
      "インフラを所有するという戦略です。",
    ],
  },
  7: {
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
  8: {
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
      "次のステップは3つ：無料AI監査を受ける、プレゼン資料をダウンロード、または直接通話を予約。",
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

  const { slideIndex, localStep } = getSlideAndStep(globalStep);
  const currentNotes = PRESENTER_NOTES[slideIndex];

  return (
    <div
      className="h-screen overflow-hidden bg-zinc-950 text-zinc-100 grid-pattern cursor-pointer select-none relative"
      onClick={advance}
      onContextMenu={(e) => { e.preventDefault(); goBack(); }}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-zinc-900">
        <div
          className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-all duration-500 ease-out"
          style={{ width: `${((globalStep + 1) / TOTAL_GLOBAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="fixed top-0.5 left-0 right-0 z-50 bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-2.5">
          <div className="flex items-center gap-2 text-sm font-bold tracking-tight text-zinc-400">
            <Layers className="size-4 text-indigo-400" />
            MOTTO Digital
          </div>
          <div className="text-xs text-zinc-600 font-mono">
            {globalStep + 1} / {TOTAL_GLOBAL_STEPS}
          </div>
        </div>
      </div>

      {/* Navigation hint */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-zinc-900/60 backdrop-blur-sm rounded-full px-4 py-1.5 text-[11px] text-zinc-600 border border-zinc-800/30 transition-opacity duration-300"
        style={{ opacity: globalStep === 0 ? 1 : 0, bottom: showNotes ? "36vh" : "1rem" }}
      >
        Click · Space · Arrow Keys &nbsp;|&nbsp; Right-click to go back &nbsp;|&nbsp; N = Notes
      </div>

      {/* ── Slide container ── */}
      <div className="relative h-full pt-12">

        {/* ===== SLIDE 0: TITLE ===== */}
        <SlideWrapper active={slideIndex === 0} transition="scale" direction={direction} slideIndex={0} currentSlide={slideIndex}>
          <section className="h-full flex flex-col items-center justify-center px-8 radial-glow relative">
            <div className="pres-orbs" />
            <div className="pres-orbs-extra" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-sm">
                MOTTO Digital — AI Infrastructure
              </div>
              <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-center leading-tight">
                The <span className="gradient-text">AI Paradigm Shift</span>
              </h1>
              <p className="text-2xl sm:text-3xl text-zinc-500 mt-4 text-center font-light">
                AIパラダイムシフト
              </p>

              <FadeIn show={localStep >= 1}>
                <div className="mt-10 text-center max-w-2xl">
                  <p className="text-xl text-zinc-300 leading-relaxed">
                    Why most businesses are stuck — and what just changed
                  </p>
                  <p className="text-lg text-zinc-500 mt-2">
                    なぜ多くの企業が行き詰まっているのか、そして何が変わったのか
                  </p>
                </div>
              </FadeIn>

              {localStep < 1 && (
                <div className="absolute -bottom-32 text-zinc-600 text-center">
                  <p className="text-sm mb-1">Click anywhere to begin</p>
                  <p className="text-xs text-zinc-700">クリックして開始</p>
                  <ChevronDown className="mx-auto mt-2 size-4 animate-bounce" />
                </div>
              )}
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 1: THE AI ADOPTION TRAP ===== */}
        <SlideWrapper active={slideIndex === 1} transition="stagger" direction={direction} slideIndex={1} currentSlide={slideIndex}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto relative">
            <div className="pres-problem-glow" />
            <div className="relative z-10 flex flex-col items-center w-full">
              <div className="shrink-0 pb-4 text-center">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-medium uppercase tracking-wider">
                  01 — The Problem / 問題
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-center">
                  The AI Adoption Trap
                </h2>
                <p className="text-lg text-zinc-500 mt-2 text-center">
                  AI導入の罠
                </p>
              </div>

              {/* Cycle Diagram — Pure CSS flow */}
              <FadeIn show={localStep >= 1}>
                <div className="mt-8 w-full max-w-3xl">
                  {/* Top row: [1] → [2] → [3] */}
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <CycleBox icon={<Sparkles className="size-5 sm:size-6" />} label="Try AI Tools" sublabel="AIツールを試す" num="1" />
                    <ArrowRight className="text-red-500/50 size-5 shrink-0" />
                    <CycleBox icon={<Zap className="size-5 sm:size-6" />} label="Some Results" sublabel="ある程度の成果" num="2" />
                    <ArrowRight className="text-red-500/50 size-5 shrink-0" />
                    <CycleBox icon={<Network className="size-5 sm:size-6" />} label="Hard to Scale" sublabel="拡張が困難" num="3" />
                  </div>

                  {/* Down connector */}
                  <div className="flex justify-center py-2.5">
                    <ArrowDown className="size-5 text-red-500/50" />
                  </div>

                  {/* Bottom row: [4] → [5 highlighted] */}
                  <div className="flex items-center justify-center gap-3 sm:gap-4">
                    <CycleBox icon={<TrendingDown className="size-5 sm:size-6" />} label="Effort > Reward" sublabel="労力 > 成果" num="4" />
                    <ArrowRight className="text-red-500/50 size-5 shrink-0" />
                    <CycleBox icon={<RotateCcw className="size-5 sm:size-6 text-red-400" />} label="Back to Manual" sublabel="手作業に戻る" highlight num="5" />
                  </div>

                  {/* Cycle repeat indicator */}
                  <div className="flex items-center justify-center gap-3 mt-5 px-8">
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
                    <div className="flex items-center gap-1.5 text-red-400/70">
                      <RotateCcw className="size-3.5" />
                      <span className="text-xs font-semibold tracking-wide uppercase">Cycle Repeats</span>
                      <span className="text-[10px] text-red-400/50">/ 繰り返し</span>
                    </div>
                    <div className="h-px flex-1 bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />
                  </div>
                </div>
              </FadeIn>

              {/* Key Insight */}
              <FadeIn show={localStep >= 2}>
                <div className="mt-6 max-w-2xl pb-8">
                  <div className="p-5 rounded-xl border border-red-500/20 bg-red-950/20">
                    <p className="text-lg sm:text-xl text-zinc-200 text-center leading-relaxed">
                      Models keep getting better — but the{" "}
                      <span className="text-red-400 font-semibold">environment stays limited</span>
                    </p>
                    <p className="text-base text-zinc-500 text-center mt-2">
                      モデルは進化し続ける — <span className="text-red-400">しかし環境は制限されたまま</span>
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 2: 2024 — THE ERA OF CHATBOTS ===== */}
        <SlideWrapper active={slideIndex === 2} transition="slide" direction={direction} slideIndex={2} currentSlide={slideIndex}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto">
            <div className="shrink-0 pb-4 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium uppercase tracking-wider">
                02 — The Timeline / タイムライン
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-center">
                <span className="text-blue-400">2024</span> — The Era of Chatbots
              </h2>
              <p className="text-lg text-zinc-500 mt-2 text-center">
                チャットボットの時代
              </p>
            </div>

            <FadeIn show={localStep >= 1}>
              <div className="mt-6 w-full max-w-3xl">
                {/* What happened */}
                <div className="p-6 rounded-xl border border-blue-500/20 bg-blue-950/10 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MessageSquare className="size-6 text-blue-400" />
                    <h3 className="text-lg font-semibold text-blue-300">ChatGPT, Claude &amp; Gemini go mainstream</h3>
                  </div>
                  <ul className="space-y-3 text-sm text-zinc-300">
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-0.5 shrink-0">&#9656;</span>
                      <span>Companies knew they <em>should</em> use AI — training courses on prompting everywhere<br />
                      <span className="text-xs text-zinc-500">企業はAIを使うべきだと知っていた — プロンプト研修が至る所で</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-0.5 shrink-0">&#9656;</span>
                      <span>High-skill users could build custom GPTs and projects — some improvement<br />
                      <span className="text-xs text-zinc-500">スキルの高い人はカスタムGPTを作れた — ある程度の改善</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-blue-400 mt-0.5 shrink-0">&#9656;</span>
                      <span>Most employees? Still couldn&apos;t use it effectively<br />
                      <span className="text-xs text-zinc-500">大多数の社員は効果的に使えなかった</span></span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-zinc-600 mt-0.5 shrink-0">&#9656;</span>
                      <span className="text-zinc-400">No secure access for all staff — not ready to invest yet<br />
                      <span className="text-xs text-zinc-600">全社員へのセキュアなアクセスなし — まだ投資の準備ができていない</span></span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn show={localStep >= 2}>
              <div className="max-w-2xl pb-8">
                <div className="p-5 rounded-xl border border-blue-500/20 bg-blue-950/20 text-center">
                  <p className="text-lg text-zinc-200">
                    AI could <span className="text-blue-400 font-semibold">talk</span> — but it couldn&apos;t <span className="text-zinc-500">do anything</span>
                  </p>
                  <p className="text-sm text-zinc-500 mt-2">
                    AIは「話す」ことができた — しかし「行動」はできなかった
                  </p>
                </div>
              </div>
            </FadeIn>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 3: 2025 — AI AUTOMATIONS & AGENTS ===== */}
        <SlideWrapper active={slideIndex === 3} transition="slide" direction={direction} slideIndex={3} currentSlide={slideIndex}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto">
            <div className="shrink-0 pb-4 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-medium uppercase tracking-wider">
                02 — The Timeline / タイムライン
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-center">
                <span className="text-amber-400">2025</span> — Automations &amp; Agents
              </h2>
              <p className="text-lg text-zinc-500 mt-2 text-center">
                自動化とAIエージェント
              </p>
            </div>

            <FadeIn show={localStep >= 1}>
              <div className="mt-6 w-full max-w-3xl">
                {/* What happened */}
                <div className="p-6 rounded-xl border border-amber-500/20 bg-amber-950/10 mb-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Workflow className="size-6 text-amber-400" />
                    <h3 className="text-lg font-semibold text-amber-300">AI started doing useful work</h3>
                    <span className="text-sm text-zinc-500">— but with big limitations</span>
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg border border-amber-500/10 bg-zinc-900/50">
                      <AlertTriangle className="size-5 text-amber-400 mb-2" />
                      <p className="font-semibold text-sm mb-1">High Expertise Required</p>
                      <p className="text-xs text-zinc-500">構築に高度な専門知識が必要</p>
                      <p className="text-xs text-zinc-400 mt-2">Building agents requires developers — not accessible to most teams</p>
                    </div>
                    <div className="p-4 rounded-lg border border-amber-500/10 bg-zinc-900/50">
                      <DollarSign className="size-5 text-amber-400 mb-2" />
                      <p className="font-semibold text-sm mb-1">Vendor Lock-In</p>
                      <p className="text-xs text-zinc-500">ベンダーロックイン</p>
                      <p className="text-xs text-zinc-400 mt-2">Stop paying the subscription &rarr; all your agent work disappears</p>
                    </div>
                    <div className="p-4 rounded-lg border border-amber-500/10 bg-zinc-900/50">
                      <Unlink className="size-5 text-amber-400 mb-2" />
                      <p className="font-semibold text-sm mb-1">Agent Isolation</p>
                      <p className="text-xs text-zinc-500">エージェントの孤立</p>
                      <p className="text-xs text-zinc-400 mt-2">Agent A, B, C, D — isolated. No collaboration, no shared context</p>
                    </div>
                  </div>

                  {/* Isolated agents visual */}
                  <div className="mt-5 flex items-center justify-center gap-3 sm:gap-4">
                    {["A", "B", "C", "D"].map((letter) => (
                      <div key={letter} className="flex flex-col items-center">
                        <div className="size-12 sm:size-14 rounded-xl border-2 border-dashed border-amber-500/20 bg-zinc-900/80 flex items-center justify-center">
                          <Bot className="size-5 sm:size-6 text-amber-400/50" />
                        </div>
                        <p className="text-[10px] text-zinc-500 mt-1">Agent {letter}</p>
                      </div>
                    ))}
                    <div className="hidden sm:flex flex-col items-center mx-2">
                      <Unlink className="size-5 text-red-400/50" />
                      <p className="text-[10px] text-red-400/50 mt-1">isolated</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            <FadeIn show={localStep >= 2}>
              <div className="max-w-2xl pb-8">
                <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-950/20 text-center">
                  <p className="text-lg text-zinc-200">
                    Companies were <span className="text-amber-400 font-semibold">renting</span> AI adoption, not <span className="text-zinc-500">owning</span> it
                  </p>
                  <p className="text-sm text-zinc-500 mt-2">
                    企業はAI導入を「レンタル」していた — 「所有」していなかった
                  </p>
                  <p className="text-xs text-zinc-600 mt-3">
                    Stop paying &rarr; back to square one / 支払いを止めたら、振り出しに戻る
                  </p>
                </div>
              </div>
            </FadeIn>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 4: BRAIN + BODY ===== */}
        <SlideWrapper active={slideIndex === 4} transition="stagger" direction={direction} slideIndex={4} currentSlide={slideIndex}>
          <section className="h-full flex flex-col items-center justify-center px-8 relative">
            <div className="pres-dots" />
            <div className="relative z-10 flex flex-col items-center">
              <div className="shrink-0 text-center mb-6">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-medium uppercase tracking-wider">
                  03 — 2026: The Breakthrough / ブレイクスルー
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-center">
                  Giving AI a <span className="text-emerald-400">Body</span>
                </h2>
                <p className="text-lg text-zinc-500 mt-2 text-center">
                  AIに「体」を与える
                </p>
              </div>

              <FadeIn show={localStep >= 1}>
                <div className="w-full max-w-3xl flex flex-col items-center">
                  {/* Brain + Body diagram */}
                  <div className="flex items-center gap-6 sm:gap-10">
                    {/* Brain (AI Model) — sphere */}
                    <div className="flex flex-col items-center">
                      <div className="size-28 sm:size-36 rounded-full border-2 border-violet-500/40 bg-violet-950/20 flex items-center justify-center relative">
                        <Brain className="size-12 sm:size-16 text-violet-400" />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-zinc-950 px-2">
                          <span className="text-[10px] text-violet-400 font-semibold uppercase tracking-wider">Brain</span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-violet-300">AI Model</p>
                      <p className="text-xs text-zinc-500">Claude, GPT, Gemini</p>
                      <p className="text-xs text-zinc-600 mt-1">Can think. Can&apos;t act.</p>
                      <p className="text-[10px] text-zinc-700">考えられる。行動できない。</p>
                    </div>

                    {/* Plus sign */}
                    <div className="text-3xl sm:text-4xl font-light text-zinc-600">+</div>

                    {/* Body (Agentic Harness) — cube with sphere inside */}
                    <div className="flex flex-col items-center">
                      <div className="size-28 sm:size-36 rounded-2xl border-2 border-emerald-500/40 bg-emerald-950/20 flex items-center justify-center relative">
                        {/* Inner sphere */}
                        <div className="size-16 sm:size-20 rounded-full border border-violet-500/30 bg-violet-950/10 flex items-center justify-center">
                          <Brain className="size-7 sm:size-9 text-violet-400/70" />
                        </div>
                        {/* Corner accents for "cube" feeling */}
                        <div className="absolute top-2 left-2 w-3 h-3 border-t-2 border-l-2 border-emerald-500/40 rounded-tl" />
                        <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-emerald-500/40 rounded-tr" />
                        <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-emerald-500/40 rounded-bl" />
                        <div className="absolute bottom-2 right-2 w-3 h-3 border-b-2 border-r-2 border-emerald-500/40 rounded-br" />
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-zinc-950 px-2">
                          <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider">Body</span>
                        </div>
                      </div>
                      <p className="mt-3 text-sm font-semibold text-emerald-300">Agentic Harness</p>
                      <p className="text-xs text-zinc-500">Terminal, files, APIs, servers</p>
                      <p className="text-xs text-emerald-400 mt-1">Can think AND act.</p>
                      <p className="text-[10px] text-zinc-600">考えて、行動できる。</p>
                    </div>
                  </div>

                  {/* Equals */}
                  <div className="mt-6 flex items-center gap-3">
                    <div className="h-px w-12 bg-zinc-700" />
                    <span className="text-lg text-zinc-500 font-light">=</span>
                    <div className="h-px w-12 bg-zinc-700" />
                  </div>

                  <div className="mt-4 px-6 py-3 rounded-xl border border-emerald-500/30 bg-emerald-950/20 text-center">
                    <p className="text-lg font-semibold text-emerald-300">An AI that can operate your entire business</p>
                    <p className="text-sm text-zinc-500 mt-1">ビジネス全体を運営できるAI</p>
                  </div>
                </div>
              </FadeIn>

              <FadeIn show={localStep >= 2}>
                <div className="mt-6 max-w-2xl">
                  <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-950/20 text-center">
                    <p className="text-lg text-zinc-200">
                      This isn&apos;t a chatbot upgrade — it&apos;s a <span className="text-emerald-400 font-semibold">completely new category</span>
                    </p>
                    <p className="text-sm text-zinc-500 mt-2">
                      チャットボットの進化ではない — <span className="text-emerald-400">全く新しいカテゴリー</span>
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 5: AI ENTERS THE COMMAND LINE ===== */}
        <SlideWrapper active={slideIndex === 5} transition="stagger" direction={direction} slideIndex={5} currentSlide={slideIndex}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto relative">
            <div className="pres-dots" />
            <div className="relative z-10 flex flex-col items-center w-full">
              <div className="shrink-0 pb-2 text-center">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-medium uppercase tracking-wider">
                  03 — 2026: The Breakthrough / ブレイクスルー
                </div>
                <h2 className="text-4xl sm:text-5xl font-bold text-center">
                  AI Enters the <span className="text-emerald-400">Command Line</span>
                </h2>
                <p className="text-lg text-zinc-500 mt-2 text-center">
                  AIがコマンドラインに入る
                </p>

                {/* Agent logos */}
                <div className="mt-4 flex items-center justify-center gap-3 sm:gap-5">
                  {[
                    { name: "Claude Code", company: "Anthropic", color: "text-orange-300", border: "border-orange-500/30", bg: "bg-orange-950/20" },
                    { name: "Codex", company: "OpenAI", color: "text-emerald-300", border: "border-emerald-500/30", bg: "bg-emerald-950/20" },
                    { name: "Antigravity", company: "Google", color: "text-blue-300", border: "border-blue-500/30", bg: "bg-blue-950/20" },
                    { name: "OpenClaw", company: "Open Source", color: "text-purple-300", border: "border-purple-500/30", bg: "bg-purple-950/20" },
                  ].map((agent) => (
                    <div key={agent.name} className={`px-3 py-2 rounded-lg border ${agent.border} ${agent.bg} text-center`}>
                      <Terminal className={`size-4 mx-auto mb-1 ${agent.color}`} />
                      <p className={`text-xs font-semibold ${agent.color}`}>{agent.name}</p>
                      <p className="text-[10px] text-zinc-600">{agent.company}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture diagram */}
              <FadeIn show={localStep >= 1}>
                <div className="mt-6 w-full max-w-4xl">
                  <div className="flex justify-center mb-3">
                    <div className="px-8 py-3 rounded-xl border-2 border-emerald-500/40 bg-emerald-950/30 text-center">
                      <Terminal className="size-7 text-emerald-400 mx-auto mb-1.5" />
                      <p className="font-bold text-emerald-300 text-lg">AI Agent (CLI)</p>
                      <p className="text-xs text-zinc-500 mt-1">Brain + Body = Full autonomy</p>
                    </div>
                  </div>
                  <div className="flex justify-center mb-3">
                    <div className="flex items-end gap-16 sm:gap-24">
                      <div className="w-px h-6 bg-gradient-to-b from-emerald-500/40 to-blue-500/40" />
                      <div className="w-px h-6 bg-gradient-to-b from-emerald-500/40 to-violet-500/40" />
                      <div className="w-px h-6 bg-gradient-to-b from-emerald-500/40 to-amber-500/40" />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 sm:gap-5 mb-3">
                    <div className="p-3 rounded-xl border border-blue-500/20 bg-blue-950/10 text-center">
                      <Monitor className="size-5 text-blue-400 mx-auto mb-1.5" />
                      <p className="font-semibold text-sm text-blue-300">Local Machine</p>
                      <p className="text-xs text-zinc-500">ローカルPC</p>
                    </div>
                    <div className="p-3 rounded-xl border border-violet-500/20 bg-violet-950/10 text-center">
                      <Server className="size-5 text-violet-400 mx-auto mb-1.5" />
                      <p className="font-semibold text-sm text-violet-300">Local Server</p>
                      <p className="text-xs text-zinc-500">ローカルサーバー</p>
                    </div>
                    <div className="p-3 rounded-xl border border-amber-500/20 bg-amber-950/10 text-center">
                      <Cloud className="size-5 text-amber-400 mx-auto mb-1.5" />
                      <p className="font-semibold text-sm text-amber-300">VPS / Cloud</p>
                      <p className="text-xs text-zinc-500">クラウドサーバー</p>
                    </div>
                  </div>
                  <div className="flex justify-center mb-2"><ArrowDown className="size-4 text-zinc-600" /></div>
                  <div className="p-4 rounded-xl border border-zinc-700 bg-zinc-900/50 text-center">
                    <p className="text-sm text-zinc-300 mb-2">Connected to any software / あらゆるソフトウェアに接続</p>
                    <div className="flex flex-wrap justify-center gap-2 text-xs text-zinc-500">
                      {["Notion", "Slack", "CRM", "Email", "Database", "ERP", "POS", "LINE", "会計ソフト", "EC"].map((s) => (
                        <span key={s} className="px-2.5 py-1 rounded-lg bg-zinc-800/50 border border-zinc-700/50">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Key Insight */}
              <FadeIn show={localStep >= 2}>
                <div className="mt-4 max-w-2xl pb-8">
                  <div className="p-5 rounded-xl border border-emerald-500/20 bg-emerald-950/20">
                    <p className="text-lg sm:text-xl text-zinc-200 text-center leading-relaxed">
                      Any action a human can do on a computer — <span className="text-emerald-400 font-semibold">AI can now do too</span>
                    </p>
                    <p className="text-base text-zinc-500 text-center mt-2">
                      人間がコンピュータでできるあらゆる操作 — <span className="text-emerald-400">AIも実行可能に</span>
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 6: OWNERSHIP ===== */}
        <SlideWrapper active={slideIndex === 6} transition="slide" direction={direction} slideIndex={6} currentSlide={slideIndex}>
          <section className="h-full flex flex-col items-center justify-center px-8 relative">
            <div className="pres-shield-pattern" />
            <div className="relative z-10 flex flex-col items-center w-full">
              <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium uppercase tracking-wider">
                04 — Ownership / オーナーシップ
              </div>
              <h2 className="text-4xl sm:text-6xl font-bold text-center">
                You Own <span className="gradient-text">Everything</span>
              </h2>
              <p className="text-xl text-zinc-500 mt-3 text-center">
                すべてがあなたのもの
              </p>

              <FadeIn show={localStep >= 1}>
                <div className="mt-10 w-full max-w-3xl">
                  <div className="p-8 rounded-2xl border-2 border-dashed border-indigo-500/30 bg-indigo-950/10 relative">
                    <div className="absolute -top-3 left-6 bg-zinc-950 px-3 text-sm font-semibold text-indigo-400 tracking-wider uppercase">
                      Your System / あなたのシステム
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4">
                      <OwnershipItem icon={<FileCode className="size-5" />} label="Your Skills" sublabel="スキル" />
                      <OwnershipItem icon={<Bot className="size-5" />} label="Your Agents" sublabel="エージェント" />
                      <OwnershipItem icon={<Database className="size-5" />} label="Your Data" sublabel="データ" />
                      <OwnershipItem icon={<HardDrive className="size-5" />} label="Your Server" sublabel="サーバー" />
                      <OwnershipItem icon={<Lock className="size-5" />} label="Your Security" sublabel="セキュリティ" />
                      <OwnershipItem icon={<Code className="size-5" />} label="Your Code" sublabel="コード" />
                    </div>
                    <div className="mt-6 p-4 rounded-xl border border-zinc-700 bg-zinc-900/50 text-center">
                      <p className="text-sm text-zinc-400 mb-3">Plug in any AI model / 好きなAIモデルを接続</p>
                      <div className="flex flex-wrap justify-center gap-3 text-xs">
                        {["Claude", "GPT", "Gemini", "Local LLMs"].map((m) => (
                          <span key={m} className="px-3 py-1.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-300">{m}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <p className="text-lg text-zinc-300">No vendor lock-in. Switch providers anytime.</p>
                    <p className="text-base text-zinc-500 mt-1">ベンダーロックインなし。いつでもプロバイダー変更可能。</p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 7: SELF-IMPROVING ===== */}
        <SlideWrapper active={slideIndex === 7} transition="slide" direction={direction} slideIndex={7} currentSlide={slideIndex}>
          <section className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto">
            <div className="shrink-0 pb-4 text-center">
              <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-medium uppercase tracking-wider">
                05 — Self-Improving / 自己改善
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold text-center">
                The System <span className="text-amber-400">Improves Itself</span>
              </h2>
              <p className="text-lg text-zinc-500 mt-2 text-center">
                システムは自己改善する
              </p>
            </div>

            <FadeIn show={localStep >= 1}>
              <div className="mt-8 w-full max-w-3xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  <div className="p-5 rounded-xl border border-zinc-700 bg-zinc-900/50">
                    <p className="font-semibold text-zinc-400 mb-3 text-sm uppercase tracking-wider">Before / これまで</p>
                    <ul className="space-y-2 text-sm text-zinc-400">
                      <li>&bull; Expert team needed to maintain<br /><span className="text-xs text-zinc-600">維持に専門家チームが必要</span></li>
                      <li>&bull; Something breaks &rarr; expensive fix<br /><span className="text-xs text-zinc-600">壊れる → 高額な修正</span></li>
                      <li>&bull; Updates require developers<br /><span className="text-xs text-zinc-600">更新には開発者が必要</span></li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-xl border border-amber-500/30 bg-amber-950/10">
                    <p className="font-semibold text-amber-300 mb-3 text-sm uppercase tracking-wider">Now / これから</p>
                    <ul className="space-y-2 text-sm text-zinc-300">
                      <li className="flex items-start gap-2"><span className="text-amber-400 mt-0.5">&#10003;</span><span>Agent reads the code<br /><span className="text-xs text-zinc-500">エージェントがコードを読む</span></span></li>
                      <li className="flex items-start gap-2"><span className="text-amber-400 mt-0.5">&#10003;</span><span>Agent diagnoses issues<br /><span className="text-xs text-zinc-500">問題を自動診断</span></span></li>
                      <li className="flex items-start gap-2"><span className="text-amber-400 mt-0.5">&#10003;</span><span>Agent fixes &amp; deploys<br /><span className="text-xs text-zinc-500">修正してデプロイ</span></span></li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                  <LoopStep icon={<Wrench className="size-5" />} label="Problem" sublabel="問題発生" />
                  <ArrowRight className="size-4 text-amber-500/50 shrink-0" />
                  <LoopStep icon={<Cpu className="size-5" />} label="Detect" sublabel="検出" />
                  <ArrowRight className="size-4 text-amber-500/50 shrink-0" />
                  <LoopStep icon={<Code className="size-5" />} label="Fix" sublabel="修正" />
                  <ArrowRight className="size-4 text-amber-500/50 shrink-0" />
                  <LoopStep icon={<Zap className="size-5" />} label="Stronger" sublabel="強化" highlight />
                </div>
                <div className="flex justify-center mt-3">
                  <div className="flex items-center gap-1.5 text-xs text-amber-500/40">
                    <RefreshCw className="size-3" />
                    continuous improvement loop / 継続的改善ループ
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Key Insight */}
            <FadeIn show={localStep >= 2}>
              <div className="mt-4 max-w-2xl pb-8">
                <div className="p-5 rounded-xl border border-amber-500/20 bg-amber-950/20">
                  <p className="text-lg sm:text-xl text-zinc-200 text-center leading-relaxed">
                    You don&apos;t need a team of experts anymore — <span className="text-amber-400 font-semibold">the system maintains itself</span>
                  </p>
                  <p className="text-base text-zinc-500 text-center mt-2">
                    もう専門家チームは不要 — <span className="text-amber-400">システムが自分自身をメンテナンスする</span>
                  </p>
                </div>
              </div>
            </FadeIn>
          </section>
        </SlideWrapper>

        {/* ===== SLIDE 8: CLOSING ===== */}
        <SlideWrapper active={slideIndex === 8} transition="scale" direction={direction} slideIndex={8} currentSlide={slideIndex}>
          <section className="h-full flex flex-col items-center justify-center px-8 relative">
            <div className="pres-closing-glow" />
            <div className="relative z-10 flex flex-col items-center max-w-4xl w-full">
              <h2 className="text-3xl sm:text-5xl font-bold text-center leading-tight max-w-3xl">
                The question isn&apos;t <span className="text-zinc-500">&ldquo;should we use AI?&rdquo;</span>
              </h2>
              <h2 className="text-3xl sm:text-5xl font-bold text-center leading-tight mt-4">
                It&apos;s <span className="gradient-text">&ldquo;do we have the infrastructure to run it?&rdquo;</span>
              </h2>
              <div className="mt-6">
                <p className="text-lg text-zinc-500 text-center">問いは「AIを使うべきか？」ではなく</p>
                <p className="text-lg text-indigo-400 text-center mt-1">「AIを動かすインフラがあるか？」</p>
              </div>

              {/* CTA Cards */}
              <div className="mt-10 w-full max-w-3xl grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Get Your Free AI Audit */}
                <a
                  href="/audit"
                  onClick={(e) => e.stopPropagation()}
                  className="block pres-cta-glow rounded-2xl border-2 border-indigo-500/40 bg-gradient-to-br from-indigo-950/40 via-indigo-900/20 to-violet-950/40 p-6 text-center transition-all duration-300 hover:border-indigo-400/60 hover:scale-[1.02] group"
                >
                  <Sparkles className="size-7 text-indigo-400 mx-auto mb-3" />
                  <p className="text-lg font-bold text-indigo-200 group-hover:text-indigo-100 transition-colors">
                    Get Your Free AI Audit
                  </p>
                  <p className="text-sm text-zinc-500 mt-1">
                    無料AI監査を受ける
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-600 text-white font-semibold text-sm group-hover:bg-indigo-500 transition-colors">
                    <ArrowRight className="size-4" />
                    Start Now
                  </div>
                </a>

                {/* Download This Presentation */}
                <a
                  href="/presentation"
                  onClick={(e) => e.stopPropagation()}
                  className="block rounded-2xl border-2 border-zinc-700/50 bg-zinc-900/30 p-6 text-center transition-all duration-300 hover:border-zinc-600/60 hover:scale-[1.02] group"
                >
                  <Monitor className="size-7 text-zinc-400 mx-auto mb-3 group-hover:text-zinc-300 transition-colors" />
                  <p className="text-lg font-bold text-zinc-300 group-hover:text-zinc-100 transition-colors">
                    Download Presentation
                  </p>
                  <p className="text-sm text-zinc-500 mt-1">
                    プレゼン資料をダウンロード
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full border border-zinc-700 text-zinc-300 font-semibold text-sm group-hover:border-zinc-600 transition-colors">
                    <ExternalLink className="size-4" />
                    View PDF
                  </div>
                </a>

                {/* Book a Call */}
                <a
                  href="https://tidycal.com/mottodigital/ai-audit"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="block rounded-2xl border-2 border-emerald-500/30 bg-emerald-950/10 p-6 text-center transition-all duration-300 hover:border-emerald-400/50 hover:scale-[1.02] group"
                >
                  <Clock className="size-7 text-emerald-400 mx-auto mb-3" />
                  <p className="text-lg font-bold text-emerald-200 group-hover:text-emerald-100 transition-colors">
                    Book a Call
                  </p>
                  <p className="text-sm text-zinc-500 mt-1">
                    通話を予約する
                  </p>
                  <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-600 text-white font-semibold text-sm group-hover:bg-emerald-500 transition-colors">
                    <ExternalLink className="size-4" />
                    Schedule Now
                  </div>
                </a>
              </div>

              {/* Contact + QR row */}
              <div className="mt-8 flex flex-col sm:flex-row items-center gap-6 sm:gap-10">
                {/* Contact info */}
                <div className="flex flex-col items-center sm:items-start gap-3">
                  <div className="flex items-center gap-2 text-sm text-zinc-300">
                    <Layers className="size-4 text-indigo-400" />
                    <span className="font-semibold">MOTTO Digital</span>
                    <span className="text-zinc-700 mx-1">&middot;</span>
                    <span className="text-zinc-400">Lewis Rice</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Mail className="size-4 text-indigo-400/70" />
                    <span>lewis@mottodigital.jp</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Linkedin className="size-4 text-indigo-400/70" />
                    <span>linkedin.com/in/lewisrice</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Globe className="size-4 text-indigo-400/70" />
                    <span>aios.mottodigital.jp</span>
                  </div>
                </div>

                {/* QR Code placeholder */}
                <div className="flex flex-col items-center">
                  <div className="size-28 rounded-xl border-2 border-indigo-500/30 bg-zinc-900/80 flex flex-col items-center justify-center gap-2">
                    <QrCode className="size-12 text-indigo-400/60" />
                    <p className="text-[10px] text-zinc-500 font-medium">QR CODE</p>
                  </div>
                  <p className="text-xs text-zinc-500 mt-2">Scan to book / スキャンして予約</p>
                </div>
              </div>
            </div>
          </section>
        </SlideWrapper>
      </div>

      {/* ── Presenter Notes Panel ── */}
      <div className={`pres-notes-panel ${showNotes ? "pres-notes-visible" : "pres-notes-hidden"}`} onClick={(e) => e.stopPropagation()}>
        <div className="mx-auto max-w-4xl px-6 py-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider">
                Presenter Notes
              </h3>
              {currentNotes && (
                <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                  <Clock className="size-3 text-indigo-400" />
                  <span className="text-xs text-indigo-300 font-medium">{currentNotes.timing}</span>
                </div>
              )}
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); setShowNotes(false); }}
              className="text-xs text-zinc-500 hover:text-zinc-300 px-2 py-1 rounded border border-zinc-800 hover:border-zinc-700 transition-colors"
            >
              Close (N)
            </button>
          </div>
          {currentNotes && (
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 font-semibold">English</p>
                <ul className="space-y-1.5">
                  {currentNotes.en.map((note, i) => (
                    <li key={i} className="text-sm text-zinc-300 leading-relaxed flex gap-2">
                      <span className="text-indigo-400/50 shrink-0">&bull;</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[10px] text-zinc-500 uppercase tracking-wider mb-2 font-semibold">日本語</p>
                <ul className="space-y-1.5">
                  {currentNotes.jp.map((note, i) => (
                    <li key={i} className="text-sm text-zinc-400 leading-relaxed flex gap-2">
                      <span className="text-indigo-400/50 shrink-0">&bull;</span>
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
  slideIndex,
  currentSlide,
}: {
  active: boolean;
  children: React.ReactNode;
  transition: "scale" | "slide" | "stagger";
  direction: "forward" | "backward";
  slideIndex: number;
  currentSlide: number;
}) {
  const [shouldRender, setShouldRender] = useState(active);
  const [animClass, setAnimClass] = useState("");

  useEffect(() => {
    if (active) {
      setShouldRender(true);
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
    } else if (shouldRender) {
      // Exit animation
      if (transition === "scale") {
        setAnimClass("pres-exit-scale");
      } else {
        setAnimClass(direction === "forward" ? "pres-exit-right" : "pres-exit-left");
      }
      const timer = setTimeout(() => {
        setShouldRender(false);
        setAnimClass("");
      }, 450);
      return () => clearTimeout(timer);
    }
  }, [active, transition, direction, shouldRender]);

  if (!shouldRender && !active) return null;

  return (
    <div
      className={`absolute inset-0 ${active ? "pointer-events-auto" : "pointer-events-none"} ${animClass}`}
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

function CycleBox({
  icon, label, sublabel, highlight, num,
}: {
  icon: React.ReactNode; label: string; sublabel: string; highlight?: boolean; num?: string;
}) {
  return (
    <div className={`p-3 sm:p-4 rounded-xl border text-center min-w-[90px] sm:min-w-[130px] relative ${
      highlight ? "border-red-500/30 bg-red-950/20" : "border-zinc-700 bg-zinc-900/50"
    }`}>
      {num && (
        <div className={`absolute -top-2 -left-2 size-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
          highlight ? "bg-red-500 text-white" : "bg-zinc-700 text-zinc-300"
        }`}>{num}</div>
      )}
      <div className={`flex justify-center mb-1.5 ${highlight ? "text-red-400" : "text-zinc-400"}`}>{icon}</div>
      <p className={`font-semibold text-xs sm:text-sm ${highlight ? "text-red-300" : ""}`}>{label}</p>
      <p className="text-[10px] sm:text-xs text-zinc-500">{sublabel}</p>
    </div>
  );
}

function OwnershipItem({ icon, label, sublabel }: { icon: React.ReactNode; label: string; sublabel: string }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-zinc-900/50 border border-zinc-800/50">
      <div className="text-indigo-400">{icon}</div>
      <div>
        <p className="text-sm font-medium">{label}</p>
        <p className="text-xs text-zinc-500">{sublabel}</p>
      </div>
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
      highlight ? "border-amber-500/30 bg-amber-950/20" : "border-zinc-700 bg-zinc-900/50"
    }`}>
      <div className={highlight ? "text-amber-400" : "text-zinc-400"}>{icon}</div>
      <p className={`text-xs font-semibold mt-1 ${highlight ? "text-amber-300" : ""}`}>{label}</p>
      <p className="text-[10px] text-zinc-500">{sublabel}</p>
    </div>
  );
}
