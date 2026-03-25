"use client";

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
  Shield,
  UserPlus,
  ChevronRight,
} from "lucide-react";
import { AIOSPyramid } from "@/components/landing/aios-pyramid";
import { BrainBodyDiagram } from "@/components/landing/brain-body-section";

// Print version: renders all 13 slides as static pages for PDF generation
// No animations, no navigation, no FadeIn — everything visible

function Slide({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`w-[1280px] h-[720px] bg-white text-[#1D1D1F] flex flex-col items-center justify-center px-12 relative overflow-hidden shrink-0 ${className}`}
      style={{ pageBreakAfter: "always" }}
    >
      {children}
    </div>
  );
}

function CycleNode({ icon, label, sublabel, num, highlight }: { icon: React.ReactNode; label: string; sublabel: string; num: string; highlight?: boolean }) {
  return (
    <div className="flex flex-col items-center">
      <div className={`size-16 rounded-2xl border-2 flex items-center justify-center relative ${highlight ? "border-red-400 bg-red-50" : "border-[#E8E8ED] bg-[#F5F5F7]"}`}>
        <div className={highlight ? "text-red-600" : "text-[#6E6E73]"}>{icon}</div>
        <div className={`absolute -top-2 -right-2 size-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white ${highlight ? "bg-red-600" : "bg-[#86868B]"}`}>{num}</div>
      </div>
      <p className={`text-sm font-semibold mt-2 ${highlight ? "text-red-600" : "text-[#1D1D1F]"}`}>{label}</p>
      <p className="text-[10px] text-[#86868B]">{sublabel}</p>
    </div>
  );
}

function LoopStep({ icon, label, sublabel, highlight }: { icon: React.ReactNode; label: string; sublabel: string; highlight?: boolean }) {
  return (
    <div className={`flex flex-col items-center px-4 py-3 rounded-xl border ${highlight ? "border-[#B8860B]/30 bg-[#B8860B]/5" : "border-[#E8E8ED] bg-[#F5F5F7]"}`}>
      <div className={highlight ? "text-[#B8860B]" : "text-[#6E6E73]"}>{icon}</div>
      <p className={`text-xs font-semibold mt-1 ${highlight ? "text-[#B8860B]" : "text-[#1D1D1F]"}`}>{label}</p>
      <p className="text-[10px] text-[#86868B]">{sublabel}</p>
    </div>
  );
}

export default function PrintPresentation() {
  return (
    <div className="flex flex-col items-center bg-white" id="print-container">
      {/* SLIDE 1: TITLE */}
      <Slide>
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-8 px-4 py-1.5 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/8 text-[#B8860B] text-sm">
            MOTTO Digital — AI Infrastructure
          </div>
          <h1 className="text-7xl font-bold tracking-tight text-center leading-tight">
            The <span className="bg-gradient-to-r from-[#B8860B] via-[#D4A843] to-[#B8860B] bg-clip-text text-transparent">AI Paradigm Shift</span>
          </h1>
          <p className="text-3xl text-[#86868B] mt-4 text-center font-light">
            AIの発想の転換
          </p>
          <div className="mt-10 text-center max-w-2xl">
            <p className="text-xl text-[#6E6E73] leading-relaxed">
              なぜ多くの企業が行き詰まっているのか、そして何が変わったのか
            </p>
          </div>
        </div>
      </Slide>

      {/* SLIDE 2: THE AI ADOPTION TRAP */}
      <Slide>
        <div className="flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-red-200 bg-red-50 text-red-600 text-xs font-medium uppercase tracking-wider">
            01 — 問題
          </div>
          <h2 className="text-5xl font-bold text-center">AI導入の罠</h2>
          <p className="text-lg text-[#86868B] mt-2 text-center">The AI Adoption Trap</p>

          <div className="mt-8 w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3">
              <CycleNode icon={<Sparkles className="size-5" />} label="AIツールを試す" sublabel="Try AI Tools" num="1" />
              <ChevronRight className="size-5 text-red-600/50 shrink-0" />
              <CycleNode icon={<Zap className="size-5" />} label="ある程度の成果" sublabel="Some Results" num="2" />
              <ChevronRight className="size-5 text-red-600/50 shrink-0" />
              <CycleNode icon={<TrendingDown className="size-5" />} label="拡張できない" sublabel="Can't Scale" num="3" />
              <ChevronRight className="size-5 text-red-600/50 shrink-0" />
              <CycleNode icon={<RotateCcw className="size-5 text-red-600" />} label="手作業に戻る" sublabel="Give Up" num="4" highlight />
            </div>
            <div className="flex items-center justify-center mt-3 gap-2">
              <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-red-200 bg-red-50">
                <RotateCcw className="size-3.5 text-red-600/60" />
                <span className="text-xs font-semibold text-red-600/70 uppercase tracking-wider">繰り返す / Repeat</span>
              </div>
            </div>
          </div>

          <div className="mt-6 max-w-2xl">
            <div className="p-5 rounded-xl border border-red-200 bg-red-50">
              <p className="text-xl text-[#1D1D1F] text-center leading-relaxed">
                モデルは進化し続ける — <span className="text-red-600 font-semibold">しかし環境は制限されたまま</span>
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 3: 2024 CHATBOTS */}
      <Slide>
        <div className="flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-xs font-medium uppercase tracking-wider">
            02 — タイムライン
          </div>
          <h2 className="text-5xl font-bold text-center">
            <span className="text-blue-600">2024</span> — チャットボットの時代
          </h2>

          <div className="mt-6 w-full max-w-3xl">
            <div className="p-6 rounded-xl border border-blue-200 bg-blue-50 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <MessageSquare className="size-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-blue-600">ChatGPT、Claude、Geminiが主流に</h3>
              </div>
              <ul className="space-y-3 text-sm text-[#6E6E73]">
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-0.5 shrink-0">&#9656;</span>
                  <span>企業はAIを使うべきだと知っていた — プロンプト研修が至る所で</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-0.5 shrink-0">&#9656;</span>
                  <span>スキルの高い人はカスタムGPTを作れた — ある程度の改善</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-blue-600 mt-0.5 shrink-0">&#9656;</span>
                  <span>大多数の社員は効果的に使えなかった</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="max-w-2xl">
            <div className="p-5 rounded-xl border border-blue-200 bg-blue-50 text-center">
              <p className="text-lg text-[#1D1D1F]">
                AIは「<span className="text-blue-600 font-semibold">話す</span>」ことができた — しかし「行動」はできなかった
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 4: 2025 AUTOMATIONS */}
      <Slide>
        <div className="flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/5 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
            02 — タイムライン
          </div>
          <h2 className="text-5xl font-bold text-center">
            <span className="text-[#B8860B]">2025</span> — 自動化とAIエージェント
          </h2>

          <div className="mt-6 w-full max-w-3xl">
            <div className="p-6 rounded-xl border border-[#B8860B]/20 bg-[#B8860B]/5 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Workflow className="size-6 text-[#B8860B]" />
                <h3 className="text-lg font-semibold text-[#B8860B]">AIが実際の仕事を始めた</h3>
                <span className="text-sm text-[#86868B]">— しかし大きな制限付き</span>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="p-4 rounded-lg border border-[#B8860B]/10 bg-[#F5F5F7]">
                  <AlertTriangle className="size-5 text-[#B8860B] mb-2" />
                  <p className="font-semibold text-sm mb-1">高度な専門知識が必要</p>
                  <p className="text-xs text-[#6E6E73]">構築に開発者が必須</p>
                </div>
                <div className="p-4 rounded-lg border border-[#B8860B]/10 bg-[#F5F5F7]">
                  <DollarSign className="size-5 text-[#B8860B] mb-2" />
                  <p className="font-semibold text-sm mb-1">ベンダーロックイン</p>
                  <p className="text-xs text-[#6E6E73]">支払い停止で全て消える</p>
                </div>
                <div className="p-4 rounded-lg border border-[#B8860B]/10 bg-[#F5F5F7]">
                  <Unlink className="size-5 text-[#B8860B] mb-2" />
                  <p className="font-semibold text-sm mb-1">エージェントの孤立</p>
                  <p className="text-xs text-[#6E6E73]">連携できない</p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-2xl">
            <div className="p-5 rounded-xl border border-[#B8860B]/20 bg-[#B8860B]/5 text-center">
              <p className="text-lg text-[#1D1D1F]">
                企業はAI導入を「<span className="text-[#B8860B] font-semibold">レンタル</span>」していた — 「所有」していなかった
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 5: BRAIN + BODY */}
      <Slide>
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#1B7D5A]/20 bg-[#1B7D5A]/10 text-[#1B7D5A] text-xs font-medium uppercase tracking-wider">
            03 — 2026年: ブレイクスルー
          </div>
          <h2 className="text-5xl font-bold text-center">
            AIに「<span className="text-[#1B7D5A]">体</span>」を与える
          </h2>
          <p className="text-lg text-[#86868B] mt-2 text-center">Giving AI a Body</p>

          <div className="w-full max-w-3xl mt-6">
            <BrainBodyDiagram locale="ja" compact />
          </div>

          <div className="mt-6 max-w-2xl">
            <div className="p-5 rounded-xl border border-[#1B7D5A]/20 bg-[#1B7D5A]/5 text-center">
              <p className="text-lg text-[#1D1D1F]">
                チャットボットの進化ではない — <span className="text-[#1B7D5A] font-semibold">全く新しいカテゴリー</span>
              </p>
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 6: CLI ARCHITECTURE */}
      <Slide>
        <div className="flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#1B7D5A]/20 bg-[#1B7D5A]/10 text-[#1B7D5A] text-xs font-medium uppercase tracking-wider">
            03 — 2026年: ブレイクスルー
          </div>
          <h2 className="text-5xl font-bold text-center">
            AIが<span className="text-[#1B7D5A]">コマンドライン</span>に入る
          </h2>

          <div className="mt-4 flex items-center justify-center gap-5">
            {[
              { name: "Claude Code", color: "text-orange-600", border: "border-orange-300", bg: "bg-orange-50" },
              { name: "Codex", color: "text-[#1B7D5A]", border: "border-[#1B7D5A]/20", bg: "bg-[#1B7D5A]/5" },
              { name: "Antigravity", color: "text-blue-600", border: "border-blue-200", bg: "bg-blue-50" },
              { name: "OpenClaw", color: "text-purple-600", border: "border-purple-200", bg: "bg-purple-50" },
            ].map((agent) => (
              <div key={agent.name} className={`px-3 py-2 rounded-lg border ${agent.border} ${agent.bg} text-center`}>
                <Terminal className={`size-4 mx-auto mb-1 ${agent.color}`} />
                <p className={`text-xs font-semibold ${agent.color}`}>{agent.name}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 w-full max-w-4xl">
            <div className="flex justify-center mb-3">
              <div className="px-8 py-3 rounded-xl border-2 border-[#1B7D5A]/30 bg-[#1B7D5A]/5 text-center">
                <Terminal className="size-7 text-[#1B7D5A] mx-auto mb-1.5" />
                <p className="font-bold text-[#1B7D5A] text-lg">AIエージェント（CLI）</p>
                <p className="text-xs text-[#86868B] mt-1">脳＋体＝完全な自律性</p>
              </div>
            </div>
            <div className="flex justify-center mb-3">
              <div className="flex items-end gap-24">
                <div className="w-px h-6 bg-gradient-to-b from-[#1B7D5A]/40 to-blue-400/40" />
                <div className="w-px h-6 bg-gradient-to-b from-[#1B7D5A]/40 to-purple-400/40" />
                <div className="w-px h-6 bg-gradient-to-b from-[#1B7D5A]/40 to-[#B8860B]/40" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-5 mb-3">
              <div className="p-3 rounded-xl border border-blue-200 bg-blue-50 text-center">
                <Monitor className="size-5 text-blue-600 mx-auto mb-1.5" />
                <p className="font-semibold text-sm text-blue-600">ローカルPC</p>
              </div>
              <div className="p-3 rounded-xl border border-purple-200 bg-purple-50 text-center">
                <Server className="size-5 text-purple-600 mx-auto mb-1.5" />
                <p className="font-semibold text-sm text-purple-600">ローカルサーバー</p>
              </div>
              <div className="p-3 rounded-xl border border-[#B8860B]/20 bg-[#B8860B]/5 text-center">
                <Cloud className="size-5 text-[#B8860B] mx-auto mb-1.5" />
                <p className="font-semibold text-sm text-[#B8860B]">クラウドサーバー</p>
              </div>
            </div>
            <div className="flex justify-center mb-2"><ArrowDown className="size-4 text-[#86868B]" /></div>
            <div className="p-4 rounded-xl border border-[#E8E8ED] bg-[#F5F5F7] text-center">
              <p className="text-sm text-[#6E6E73] mb-2">あらゆるソフトウェアに接続</p>
              <div className="flex flex-wrap justify-center gap-2 text-xs text-[#86868B]">
                {["Notion", "Slack", "CRM", "Email", "Database", "ERP", "POS", "LINE", "会計ソフト", "EC"].map((s) => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-[#E8E8ED] border border-[#E8E8ED]">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 7: OWNERSHIP */}
      <Slide className="px-6">
        <div className="flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/8 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
            04 — オーナーシップ
          </div>
          <h2 className="text-5xl font-bold text-center">
            すべてが<span className="bg-gradient-to-r from-[#B8860B] via-[#D4A843] to-[#B8860B] bg-clip-text text-transparent">あなたのもの</span>
          </h2>

          <div className="mt-6 w-full max-w-4xl [&_h3]:!text-2xl [&_p]:!text-base">
            <AIOSPyramid locale="ja" compact />
          </div>
        </div>
      </Slide>

      {/* SLIDE 8: SELF-IMPROVING */}
      <Slide>
        <div className="flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/5 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
            05 — 自己改善
          </div>
          <h2 className="text-5xl font-bold text-center">
            システムは<span className="text-[#B8860B]">自己改善する</span>
          </h2>

          <div className="mt-8 w-full max-w-3xl">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="p-5 rounded-xl border border-[#E8E8ED] bg-[#F5F5F7]">
                <p className="font-semibold text-[#6E6E73] mb-3 text-sm uppercase tracking-wider">これまで</p>
                <ul className="space-y-2 text-sm text-[#6E6E73]">
                  <li>&bull; 維持に専門家チームが必要</li>
                  <li>&bull; 壊れる → 高額な修正</li>
                  <li>&bull; 更新には開発者が必要</li>
                </ul>
              </div>
              <div className="p-5 rounded-xl border border-[#B8860B]/20 bg-[#B8860B]/5">
                <p className="font-semibold text-[#B8860B] mb-3 text-sm uppercase tracking-wider">これから</p>
                <ul className="space-y-2 text-sm text-[#1D1D1F]">
                  <li className="flex items-start gap-2"><span className="text-[#B8860B] mt-0.5">&#10003;</span><span>エージェントがコードを読む</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#B8860B] mt-0.5">&#10003;</span><span>問題を自動診断</span></li>
                  <li className="flex items-start gap-2"><span className="text-[#B8860B] mt-0.5">&#10003;</span><span>修正してデプロイ</span></li>
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              <LoopStep icon={<Wrench className="size-5" />} label="問題発生" sublabel="Problem" />
              <ArrowRight className="size-4 text-[#B8860B]/50 shrink-0" />
              <LoopStep icon={<Cpu className="size-5" />} label="検出" sublabel="Detect" />
              <ArrowRight className="size-4 text-[#B8860B]/50 shrink-0" />
              <LoopStep icon={<Code className="size-5" />} label="修正" sublabel="Fix" />
              <ArrowRight className="size-4 text-[#B8860B]/50 shrink-0" />
              <LoopStep icon={<Zap className="size-5" />} label="強化" sublabel="Stronger" highlight />
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 9: VALUE PROPS */}
      <Slide>
        <div className="flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/5 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
            05 — 何が変わるか
          </div>
          <h2 className="text-5xl font-bold text-center">
            エージェンティックAIがもたらす<br /><span className="bg-gradient-to-r from-[#B8860B] via-[#D4A843] to-[#B8860B] bg-clip-text text-transparent">5つの大きな変化</span>
          </h2>

          <div className="mt-8 w-full max-w-4xl grid grid-cols-2 gap-4">
            {[
              { icon: <Layers className="size-5" />, title: "すべてあなたのもの", desc: "オープンソースから最先端モデルまで——選ぶのはあなた。ベンダーロックインなし。" },
              { icon: <RefreshCw className="size-5" />, title: "自ら進化するAIシステム", desc: "使うたびに学び、運用手順を自ら更新。毎回もっと賢くなる。" },
              { icon: <Zap className="size-5" />, title: "本当に仕事をするAI", desc: "人がPCでできることなら、AIも学んでできるようになる。" },
              { icon: <Workflow className="size-5" />, title: "すべてがつながる一つのシステム", desc: "20個のサブスクを一つに統合。" },
              { icon: <Sparkles className="size-5" />, title: "現場作業から経営へ", desc: "繰り返し業務をAIに任せ、成長に集中。" },
            ].map((item, i) => (
              <div key={i} className={`p-5 rounded-xl border border-[#B8860B]/15 bg-[#B8860B]/3 ${i === 4 ? "col-span-2 max-w-md mx-auto" : ""}`}>
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-[#B8860B]">{item.icon}</div>
                  <p className="font-semibold text-[#1D1D1F]">{item.title}</p>
                </div>
                <p className="text-sm text-[#6E6E73] leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* SLIDE 10: PROGRAM */}
      <Slide>
        <div className="flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#1B7D5A]/20 bg-[#1B7D5A]/10 text-[#1B7D5A] text-xs font-medium uppercase tracking-wider">
            06 — 6ヶ月プログラム
          </div>
          <h2 className="text-5xl font-bold text-center">明確な計画。本物のシステム。</h2>
          <p className="text-lg text-[#86868B] mt-2">6ヶ月で一緒に構築します。</p>

          <div className="mt-6 w-full max-w-4xl">
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[
                { month: "1ヶ月目", title: "調査・計画", color: "border-blue-200 bg-blue-50", textColor: "text-blue-600", items: ["業務フローをマッピング", "インパクトの高い機会を特定", "カスタムAIOSアーキテクチャを設計"] },
                { month: "2ヶ月目", title: "接続", color: "border-purple-200 bg-purple-50", textColor: "text-purple-600", items: ["SaaS・GitHub・VPSに接続", "データとツールを統合", "AIにツールの使い方を教える"] },
                { month: "3ヶ月目", title: "構築", color: "border-[#B8860B]/20 bg-[#B8860B]/5", textColor: "text-[#B8860B]", items: ["AIエージェントを構築", "実際のビジネスに展開", "チームへのトレーニング"] },
              ].map((m, i) => (
                <div key={i} className={`p-5 rounded-xl border ${m.color}`}>
                  <div className={`text-xs font-medium uppercase tracking-wider ${m.textColor} mb-1`}>{m.month}</div>
                  <p className={`font-semibold text-base ${m.textColor} mb-3`}>{m.title}</p>
                  <ul className="space-y-2">
                    {m.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm text-[#6E6E73]">
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
              <p className="font-semibold text-base text-[#1B7D5A] mb-2">運用・改善・サポート</p>
              <div className="flex flex-wrap gap-6 text-sm text-[#6E6E73]">
                <span>&#10003; 日々の業務で活用し実証</span>
                <span>&#10003; ユースケースに特化したシステム構築</span>
                <span>&#10003; 実際の利用に基づいて改善</span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-4 text-center">
              {[
                { value: "10", label: "AIエージェント", sub: "業務ワークフローを実行" },
                { value: "100%", label: "ドキュメント化・所有", sub: "チームが運用・拡張" },
                { value: "ゼロ", label: "ベンダー依存", sub: "ツールを変えてもデータはそのまま" },
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-xl border border-[#1B7D5A]/10 bg-[#1B7D5A]/3">
                  <p className="text-3xl font-bold text-[#1B7D5A]">{m.value}</p>
                  <p className="text-sm font-semibold text-[#1D1D1F] mt-1">{m.label}</p>
                  <p className="text-xs text-[#86868B]">{m.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 11: PRICING */}
      <Slide>
        <div className="flex flex-col items-center w-full">
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/5 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
            07 — 料金プラン
          </div>
          <h2 className="text-4xl font-bold text-center">
            AIオペレーティングシステムを構築する<br /><span className="bg-gradient-to-r from-[#B8860B] via-[#D4A843] to-[#B8860B] bg-clip-text text-transparent">3つの方法</span>
          </h2>
          <p className="text-base text-[#86868B] mt-2 text-center max-w-2xl">
            個人でも企業でも、ゴールは同じです。6ヶ月後に、あなたが所有するAIが本番稼働していること。
          </p>

          <div className="mt-6 w-full max-w-4xl grid grid-cols-3 gap-4">
            {[
              { label: "グループ学習", title: "グループコホート", price: "¥20,000", per: "/月", commitment: "6ヶ月 · 次回：2026年5月", features: ["週2回×60分のグループセッション", "Slackで随時質問可能", "専用GitHubリポジトリ", "オーナーシップ保証"], recommended: false },
              { label: "パーソナルコーチング", title: "マンツーマン", price: "¥50,000", per: "/月", commitment: "6ヶ月 · いつでも開始可能", features: ["週1回の専属セッション", "ビジネスに完全カスタマイズ", "Lewisへの直接Slackアクセス", "オーナーシップ保証"], recommended: true },
              { label: "チームトレーニング", title: "カンパニービルド", price: "¥200,000", per: "/月", commitment: "6ヶ月 · いつでも開始可能", features: ["最大10名まで参加可能", "御社ニーズに合わせたプログラム", "全24回の伴走型セッション", "オーナーシップ保証"], recommended: false },
            ].map((plan, i) => (
              <div key={i} className={`p-6 rounded-2xl border-2 relative ${plan.recommended ? "border-[#B8860B]/40 bg-[#B8860B]/3 scale-[1.03] z-10" : "border-[#E8E8ED] bg-white"}`}>
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#B8860B] text-white text-[10px] font-bold uppercase tracking-wider">
                    おすすめ
                  </div>
                )}
                <p className="text-[10px] uppercase tracking-wider text-[#86868B] font-medium">{plan.label}</p>
                <p className="text-xl font-bold text-[#1D1D1F] mt-1">{plan.title}</p>
                <div className="mt-3 flex items-baseline gap-1">
                  <span className={`text-4xl font-bold ${plan.recommended ? "text-[#B8860B]" : "text-[#1D1D1F]"}`}>{plan.price}</span>
                  <span className="text-sm text-[#86868B]">{plan.per}</span>
                </div>
                <p className="text-xs text-[#86868B] mt-1">{plan.commitment}</p>
                <ul className="mt-4 space-y-2">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-[#6E6E73]">
                      <span className="text-[#B8860B] mt-0.5 shrink-0">&#10003;</span>
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-[#86868B] mt-4">先着5社限定の導入価格です。</p>
        </div>
      </Slide>

      {/* SLIDE 12: GUARANTEE */}
      <Slide>
        <div className="flex flex-col items-center max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-emerald-200 bg-emerald-50 text-emerald-600 text-xs font-medium uppercase tracking-wider">
            08 — 保証
          </div>
          <Shield className="size-20 text-emerald-500 mb-6" />
          <h2 className="text-5xl font-bold text-center leading-tight">
            オーナーシップ<span className="text-emerald-500">保証</span>
          </h2>
          <div className="mt-8 p-8 rounded-2xl border-2 border-emerald-200 bg-emerald-50 text-center max-w-2xl">
            <p className="text-2xl text-[#1D1D1F] leading-relaxed font-medium">
              6ヶ月後にエージェンティックAIを運用できなければ、<br />
              <span className="text-emerald-600 font-bold">できるまで無償でサポート。</span>
            </p>
            <p className="text-base text-[#6E6E73] mt-4 leading-relaxed">
              言い訳なし。小さな文字なし。6ヶ月のプログラムを完走してください。<br />
              自力で運用できない場合、できるようになるまで無償でサポートを続けます。
            </p>
            <p className="text-base text-emerald-600 mt-4 font-medium">
              私たちはあなたの能力を増幅します——チームを置き換えることは決してありません。
            </p>
          </div>
        </div>
      </Slide>

      {/* SLIDE 13: CLOSING */}
      <Slide>
        <div className="flex flex-col items-center max-w-4xl w-full">
          <h2 className="text-5xl font-bold text-center leading-tight max-w-3xl">
            問いは「AIを使うべきか？」ではなく
          </h2>
          <h2 className="text-5xl font-bold text-center leading-tight mt-4">
            <span className="bg-gradient-to-r from-[#B8860B] via-[#D4A843] to-[#B8860B] bg-clip-text text-transparent">「AIを動かすインフラがあるか？」</span>
          </h2>

          <div className="mt-10 w-full max-w-2xl grid grid-cols-2 gap-4">
            <div className="rounded-2xl border-2 border-[#B8860B]/30 bg-[#B8860B]/3 p-6 text-center">
              <Sparkles className="size-7 text-[#B8860B] mx-auto mb-3" />
              <p className="text-lg font-bold text-[#1D1D1F]">無料AI活用診断</p>
              <p className="text-sm text-[#86868B] mt-1">まずは診断から</p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1D1D1F] text-white font-semibold text-sm">
                <ArrowRight className="size-4" />
                aios.mottodigital.jp/audit
              </div>
            </div>
            <div className="rounded-2xl border-2 border-[#1B7D5A]/20 bg-[#1B7D5A]/5 p-6 text-center">
              <UserPlus className="size-7 text-[#1B7D5A] mx-auto mb-3" />
              <p className="text-lg font-bold text-[#1D1D1F]">席を確保する</p>
              <p className="text-sm text-[#86868B] mt-1">申し込んでみませんか</p>
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1B7D5A] text-white font-semibold text-sm">
                <ArrowRight className="size-4" />
                aios.mottodigital.jp/signup
              </div>
            </div>
          </div>

          <div className="mt-8 flex items-center gap-10">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-[#1D1D1F]">
                <Layers className="size-4 text-[#B8860B]" />
                <span className="font-semibold">MOTTO Digital</span>
                <span className="text-[#E8E8ED] mx-1">&middot;</span>
                <span className="text-[#6E6E73]">Lewis Rice</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#6E6E73]">
                <Mail className="size-4 text-[#B8860B]/70" />
                <span>aios@mottodigital.jp</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#6E6E73]">
                <Linkedin className="size-4 text-[#B8860B]/70" />
                <span>linkedin.com/in/lewisrice</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#6E6E73]">
                <Globe className="size-4 text-[#B8860B]/70" />
                <span>aios.mottodigital.jp</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="size-28 rounded-xl border-2 border-[#B8860B]/20 bg-[#F5F5F7] flex flex-col items-center justify-center gap-2">
                <QrCode className="size-12 text-[#B8860B]/60" />
                <p className="text-[10px] text-[#86868B] font-medium">QR CODE</p>
              </div>
              <p className="text-xs text-[#86868B] mt-2">スキャンして予約</p>
            </div>
          </div>
        </div>
      </Slide>
    </div>
  );
}
