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
  Clock,
} from "lucide-react";
import { AIOSPyramid } from "@/components/landing/aios-pyramid";
import { BrainBodyDiagram } from "@/components/landing/brain-body-section";

// Print version: renders all 22 slides as static pages for PDF generation
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
            Mottodigital — AI Infrastructure
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

      {/* SLIDE 2: CASE STUDIES INTRO */}
      <Slide>
        <div className="flex flex-col items-center">
          <div className="inline-flex items-center gap-2 mb-6 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/8 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
            実証済み導入事例 / Verified Case Studies
          </div>
          <h2 className="text-5xl font-bold text-center">
            すでに<span className="bg-gradient-to-r from-[#B8860B] via-[#D4A843] to-[#B8860B] bg-clip-text text-transparent">日本企業</span>が活用中
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
              { name: "ナレッジワーク", sub: "1名" },
            ].map((c) => (
              <div key={c.name} className="px-4 py-2 rounded-xl border border-[#B8860B]/15 bg-[#B8860B]/3 text-center">
                <p className="text-sm font-semibold text-[#1D1D1F]">{c.name}</p>
                <p className="text-[10px] text-[#86868B]">{c.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      {/* SLIDE 3: RAKUTEN */}
      <Slide>
        <div className="flex flex-col px-6 pt-10 pb-4 w-full h-full">
          <div className="max-w-5xl mx-auto grid grid-cols-[1fr_auto] gap-4 w-full">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] mb-1">楽天グループ — 従業員32,000名 <span className="normal-case tracking-normal font-normal text-[#86868B]">Rakuten Group — 32,000 Employees</span></p>
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-1 leading-snug">24日かかっていた作業が5日に。財務チームに余裕が生まれた。</h3>
              <p className="text-xs text-[#86868B] mb-2">From 24 days to 5. A finance team that got their afternoons back.</p>
              <p className="text-xs text-[#6E6E73] leading-relaxed mb-3">日本最大のECコングロマリットは、開発・運用プロセス全体を再設計した。<br/><span className="text-[#86868B]">Japan&apos;s largest e-commerce conglomerate redesigned their entire process around AI.</span></p>
              <div className="rounded-lg p-3 mb-3" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                <p className="text-xs text-[#1D1D1F] leading-relaxed">「以前は丸1日かかっていた作業が、今では1時間で完了します。」</p>
                <p className="text-[10px] text-[#86868B] mt-0.5 italic">&ldquo;What once took a day, we can now accomplish in an hour.&rdquo;</p>
                <p className="text-[10px] text-[#86868B] mt-1">— 加地 雄介氏 / Yusuke Kaji, GM of AI, Rakuten</p>
              </div>
              <div className="text-xs space-y-1">
                <div><span className="text-[#B8860B] font-semibold">財務チームの変化:</span> <span className="text-[#6E6E73]">丸1日のスプレッドシート調整がClaudeで自動化。問題を自動検出し、レポートを生成。</span></div>
                <div><span className="text-[#B8860B] font-semibold">エンジニアリング:</span> <span className="text-[#6E6E73]">リリース24日→5日。24同時セッション。7時間の自律コーディング。</span></div>
                <div><span className="text-[#B8860B] font-semibold">全部門展開:</span> <span className="text-[#6E6E73]">1週間でProduct・Sales・Marketing・Financeに展開。</span></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 h-fit shrink-0 w-48">
              {[{ v: "79%", l: "市場投入短縮", le: "Faster to market" },{ v: "97%", l: "エラー削減", le: "Fewer errors" },{ v: "1hr", l: "財務レポート", le: "Was a full day" },{ v: "1wk", l: "部門展開", le: "Deploy to any dept" }].map((m,i) => (
                <div key={i} className="rounded-xl p-3 text-center bg-[#F5F5F7] border border-[#E8E8ED]">
                  <div className="text-lg font-bold bg-gradient-to-r from-[#B8860B] via-[#D4A843] to-[#B8860B] bg-clip-text text-transparent">{m.v}</div>
                  <div className="text-[10px] text-[#86868B]">{m.l}</div>
                  <div className="text-[9px] text-[#86868B]/60">{m.le}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 4: NRI */}
      <Slide>
        <div className="flex flex-col px-6 pt-10 pb-4 w-full h-full">
          <div className="max-w-5xl mx-auto grid grid-cols-[1fr_auto] gap-4 w-full">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] mb-1">野村総合研究所 — 従業員6,500名 <span className="normal-case tracking-normal font-normal text-[#86868B]">Nomura Research Institute — 6,500 Employees</span></p>
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-1 leading-snug">専門家が数時間かけていた複雑な日本語文書のレビュー時間を半減。</h3>
              <p className="text-xs text-[#86868B] mb-2">Complex Japanese documents that took experts hours — cut in half.</p>
              <p className="text-xs text-[#6E6E73] leading-relaxed mb-3">日本最大のITコンサル企業が、実際の日本語ビジネス文書で全AIモデルを評価。1つのモデルが圧倒的に勝ち、同社はそれに賭けた。<br/><span className="text-[#86868B]">Japan&apos;s largest IT consulting firm tested every AI on real Japanese business documents. One model won decisively.</span></p>
              <div className="rounded-lg p-3 mb-3" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                <p className="text-xs text-[#1D1D1F] leading-relaxed">「生成AIは定型業務を自動化し、既存ワーカーの生産性を高め、24時間365日の顧客対応を実現できる — 日本の労働力不足を直接補完するものだ。」</p>
                <p className="text-[10px] text-[#86868B] mt-0.5 italic">&ldquo;Generative AI can automate routine tasks and provide 24/7 capabilities — directly supplementing Japan&apos;s workforce needs.&rdquo;</p>
                <p className="text-[10px] text-[#86868B] mt-1">— 稲葉 孝彦氏 / Takahiko Inaba, Head of AI — NRI</p>
              </div>
              <div className="text-xs space-y-1">
                <div><span className="text-[#B8860B] font-semibold">日本語特化テスト:</span> <span className="text-[#6E6E73]">契約書・技術仕様書・規制関連書類など実際の日本語業務文書で独自の評価テストを構築。Claudeが全競合を上回った。</span></div>
                <div><span className="text-[#B8860B] font-semibold">労働力不足への解決策:</span> <span className="text-[#6E6E73]">人を置き換えるのではなく、一人ひとりにより大きなチームの能力を与える。</span></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 h-fit shrink-0 w-48">
              {[{ v: "50%", l: "レビュー短縮", le: "Faster review" },{ v: "#1 JP", l: "公認リセラー", le: "JP Reseller #1" },{ v: "独自JP", l: "日本語テスト", le: "Real JP tests" },{ v: "全部門", l: "導入済み", le: "All departments" }].map((m,i) => (
                <div key={i} className="rounded-xl p-3 text-center bg-[#F5F5F7] border border-[#E8E8ED]">
                  <div className="text-lg font-bold bg-gradient-to-r from-[#B8860B] via-[#D4A843] to-[#B8860B] bg-clip-text text-transparent">{m.v}</div>
                  <div className="text-[10px] text-[#86868B]">{m.l}</div>
                  <div className="text-[9px] text-[#86868B]/60">{m.le}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 5: CLASSMETHOD */}
      <Slide>
        <div className="flex flex-col px-6 pt-10 pb-4 w-full h-full">
          <div className="max-w-5xl mx-auto grid grid-cols-[1fr_auto] gap-4 w-full">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] mb-1">クラスメソッド — 日本トップのAWSパートナー <span className="normal-case tracking-normal font-normal text-[#86868B]">Classmethod — Japan&apos;s Top AWS Partner</span></p>
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-1 leading-snug">24時間の作業が60分で完了。そして全チームの働き方を変えた。</h3>
              <p className="text-xs text-[#86868B] mb-2">A 24-hour task finished in 60 minutes. Then they changed how every team works.</p>
              <p className="text-xs text-[#6E6E73] leading-relaxed mb-3">最大10倍の生産性向上、コードレビュー80%短縮、特定管理業務96%削減。確信を得た同社は、他社向け体験センターまで開設した。<br/><span className="text-[#86868B]">Up to 10x productivity gains, 80% faster code reviews, 96% reduction on admin tasks.</span></p>
              <div className="rounded-lg p-3 mb-3" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                <p className="text-xs text-[#1D1D1F] leading-relaxed">「生成されたコードの品質は、他のプロダクトと比べて明らかに優れていた。24時間かかっていたGoogle Apps Scriptの作業が1時間で完了した。」</p>
                <p className="text-[10px] text-[#86868B] mt-0.5 italic">&ldquo;The generated code quality was significantly superior. A 24-hour GAS task completed in 1 hour.&rdquo;</p>
                <p className="text-[10px] text-[#86868B] mt-1">— クラスメソッド エンジニアリングチーム / Classmethod Engineering Team</p>
              </div>
              <div className="text-xs space-y-1">
                <div><span className="text-[#B8860B] font-semibold">数字で見る成果:</span> <span className="text-[#6E6E73]">GAS：24h→1h（96%削減）。月間デプロイ：108→165 PR（50%増）。コードレビュー：80%短縮。</span></div>
                <div><span className="text-[#B8860B] font-semibold">他社支援:</span> <span className="text-[#6E6E73]">「AIDD Boostチーム」を発足し他社のAI駆動開発を支援。AI体験センターを開設。</span></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 h-fit shrink-0 w-48">
              {[{ v: "10x", l: "生産性向上", le: "Productivity" },{ v: "96%", l: "管理業務削減", le: "Admin reduction" },{ v: "80%", l: "レビュー短縮", le: "Faster reviews" },{ v: "99%", l: "AI生成率", le: "AI-generated" }].map((m,i) => (
                <div key={i} className="rounded-xl p-3 text-center bg-[#F5F5F7] border border-[#E8E8ED]">
                  <div className="text-lg font-bold bg-gradient-to-r from-[#B8860B] via-[#D4A843] to-[#B8860B] bg-clip-text text-transparent">{m.v}</div>
                  <div className="text-[10px] text-[#86868B]">{m.l}</div>
                  <div className="text-[9px] text-[#86868B]/60">{m.le}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 6: PANASONIC */}
      <Slide>
        <div className="flex flex-col px-6 pt-10 pb-4 w-full h-full">
          <div className="max-w-5xl mx-auto grid grid-cols-[1fr_auto] gap-4 w-full">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] mb-1">パナソニックホールディングス — 従業員240,000名 <span className="normal-case tracking-normal font-normal text-[#86868B]">Panasonic Holdings — 240,000 Employees</span></p>
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-1 leading-snug">製造業の巨人からAI駆動企業へ — 2030年までに売上の30%を目標に。</h3>
              <p className="text-xs text-[#86868B] mb-2">From manufacturing giant to AI-powered business — targeting 30% of revenue by 2030.</p>
              <p className="text-xs text-[#6E6E73] leading-relaxed mb-3">AIを社内利用するだけでなく、10億人の顧客に向けた消費者製品にClaudeを組み込み、4部門に戦略的アセットとして導入。<br/><span className="text-[#86868B]">Built Claude into a consumer product for 1 billion customers and deployed across 4 departments.</span></p>
              <div className="rounded-lg p-3 mb-3" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                <p className="text-xs text-[#1D1D1F] leading-relaxed">「AI駆動のハードウェア・ソフトウェア・ソリューション事業は、2030年までにパナソニックの総売上の30%に達する。」</p>
                <p className="text-[10px] text-[#86868B] mt-0.5 italic">&ldquo;AI-driven businesses will reach 30% of Panasonic&apos;s total revenue by 2030.&rdquo;</p>
                <p className="text-[10px] text-[#86868B] mt-1">— Panasonic Go — CES 2025 Keynote</p>
              </div>
              <div className="text-xs space-y-1">
                <div><span className="text-[#B8860B] font-semibold">消費者プロダクト「Umi」:</span> <span className="text-[#6E6E73]">Claude搭載のウェルネスアプリ。音声チャット、目標設定。Calm、Blue Apronと提携。世界10億人向け。</span></div>
                <div><span className="text-[#B8860B] font-semibold">社内トランスフォーメーション:</span> <span className="text-[#6E6E73]">24万人にClaudeを「戦略的アセット」として導入。全チームが持つべきケイパビリティ。</span></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 h-fit shrink-0 w-48">
              {[{ v: "30%", l: "AI売上目標", le: "AI revenue target" },{ v: "10億人", l: "顧客ターゲット", le: "Global customers" },{ v: "4部門", l: "戦略活用", le: "Strategic depts" },{ v: "CES'25", l: "基調講演", le: "CES keynote" }].map((m,i) => (
                <div key={i} className="rounded-xl p-3 text-center bg-[#F5F5F7] border border-[#E8E8ED]">
                  <div className="text-lg font-bold bg-gradient-to-r from-[#B8860B] via-[#D4A843] to-[#B8860B] bg-clip-text text-transparent">{m.v}</div>
                  <div className="text-[10px] text-[#86868B]">{m.l}</div>
                  <div className="text-[9px] text-[#86868B]/60">{m.le}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 7: KNOWLEDGE WORK */}
      <Slide>
        <div className="flex flex-col px-6 pt-10 pb-4 w-full h-full">
          <div className="max-w-5xl mx-auto grid grid-cols-[1fr_auto] gap-4 w-full">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] mb-1">ナレッジワーク — B2B SaaS、データ基盤1名体制 <span className="normal-case tracking-normal font-normal text-[#86868B]">Knowledge Work — B2B SaaS, 1-Person Data Team</span></p>
              <h3 className="text-xl font-bold text-[#1D1D1F] mb-1 leading-snug">たった1人。1ヶ月で448回の本番デプロイ。誤植ではない。</h3>
              <p className="text-xs text-[#86868B] mb-2">One person. 448 production deployments in a single month. Not a typo.</p>
              <p className="text-xs text-[#6E6E73] leading-relaxed mb-3">データ基盤エンジニア1名が、7つのAIセッションを同時並行で実行。人間に残された手作業はレビューと承認だけだ。<br/><span className="text-[#86868B]">One engineer, 7 parallel AI sessions. Only remaining manual task: review and approve.</span></p>
              <div className="rounded-lg p-3 mb-3" style={{ background: "linear-gradient(135deg, rgba(184,134,11,0.04), rgba(184,134,11,0.02))", borderLeft: "3px solid #B8860B" }}>
                <p className="text-xs text-[#1D1D1F] leading-relaxed">「人間に残された手作業はPRレビューだけ。計画、実装、検証、デプロイ — それ以外はすべてAIが担う。」</p>
                <p className="text-[10px] text-[#86868B] mt-0.5 italic">&ldquo;The human&apos;s only task is PR review. Everything else — planning, implementation, deployment — is AI.&rdquo;</p>
                <p className="text-[10px] text-[#86868B] mt-1">— ナレッジワーク エンジニアリング / Knowledge Work Engineering — Claude Code Meetup Japan</p>
              </div>
              <div className="text-xs space-y-1">
                <div><span className="text-[#B8860B] font-semibold">この事例が重要な理由:</span> <span className="text-[#6E6E73]">人を置き換える話ではない。適切なシステムがあれば1人が何を成し遂げられるかという話。448回のデプロイ — 残業はわずか10〜30時間。</span></div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 h-fit shrink-0 w-48">
              {[{ v: "448", l: "月間マージ", le: "Monthly merges" },{ v: "7", l: "並行セッション", le: "Parallel sessions" },{ v: "1人", l: "チーム人数", le: "Team size" },{ v: "10-30h", l: "残業時間", le: "Overtime only" }].map((m,i) => (
                <div key={i} className="rounded-xl p-3 text-center bg-[#F5F5F7] border border-[#E8E8ED]">
                  <div className="text-lg font-bold bg-gradient-to-r from-[#B8860B] via-[#D4A843] to-[#B8860B] bg-clip-text text-transparent">{m.v}</div>
                  <div className="text-[10px] text-[#86868B]">{m.l}</div>
                  <div className="text-[9px] text-[#86868B]/60">{m.le}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 8: AUTOMATION */}
      <Slide>
        <div className="flex flex-col items-center w-full px-4 pt-6">
          <div className="inline-flex items-center gap-2 mb-3 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/8 text-[#B8860B] text-xs font-medium uppercase tracking-wider">
            実際の自動化 / Real Automation
          </div>
          <h2 className="text-4xl font-bold text-center">
            <span className="bg-gradient-to-r from-[#B8860B] via-[#D4A843] to-[#B8860B] bg-clip-text text-transparent">あなたの業務</span>で何を自動化できるか？
          </h2>
          <p className="text-sm text-[#86868B] mt-1 text-center">
            What could you automate? Real tasks, real time savings.
          </p>

          <div className="mt-4 w-full grid grid-cols-3 gap-3">
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
              <div key={di} className={`rounded-xl p-3 border ${dept.color}`}>
                <div className="text-xs font-bold text-[#1D1D1F] mb-0.5">{dept.dept} <span className="font-normal text-[#86868B]">{dept.deptEn}</span></div>
                {dept.items.map((item, ii) => (
                  <div key={ii} className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-[#6E6E73]">{item.task} <span className="text-[#86868B]">{item.taskEn}</span></span>
                    <span className="shrink-0 ml-2">
                      <span className="text-[#86868B] line-through opacity-60">{item.before}</span>
                      <span className="text-[#86868B] mx-1">&rarr;</span>
                      <span className="text-[#B8860B] font-bold">{item.after}</span>
                    </span>
                  </div>
                ))}
                <div className="mt-1.5 pt-1.5 border-t border-current/10 flex justify-between text-[11px]">
                  <span className="text-[#86868B]">回収時間 / Time recovered</span>
                  <span className="text-[#B8860B] font-bold">{dept.total}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full mt-3 rounded-xl bg-[#1D1D1F] p-4 flex items-center justify-between">
            <div>
              <p className="text-sm text-white/70">
                すべて合計すると、月間で取り戻せる時間は
              </p>
              <p className="text-xs text-white/40 mt-0.5">
                Add it up. Real workflows automated by AIOS users.
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-[#D4A843]">115+時間</div>
              <div className="text-[10px] text-white/40">per month, per business</div>
            </div>
          </div>
        </div>
      </Slide>

      {/* SLIDE 11: THE AI ADOPTION TRAP */}
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

      {/* SLIDE 12: 2024 CHATBOTS */}
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

      {/* SLIDE 13: 2025 AUTOMATIONS */}
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

      {/* SLIDE 14: BRAIN + BODY */}
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

      {/* SLIDE 15: CLI ARCHITECTURE */}
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

      {/* SLIDE 16: OWNERSHIP */}
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

      {/* SLIDE 17: SELF-IMPROVING */}
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

      {/* SLIDE 18: VALUE PROPS */}
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

      {/* SLIDE 19: PROGRAM */}
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

      {/* SLIDE 20: PRICING */}
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
              { label: "パーソナルコーチング", title: "マンツーマン", price: "¥50,000", per: "/月", commitment: "6ヶ月 · いつでも開始可能", features: ["週1回×90分の専属セッション", "月120時間の直接開発・セットアップ", "ビジネスに完全カスタマイズ", "オーナーシップ保証"], recommended: true },
              { label: "チームトレーニング", title: "カンパニービルド", price: "¥200,000", per: "/月", commitment: "6ヶ月 · いつでも開始可能", features: ["週1回×90分の専属セッション", "月120時間の直接開発・セットアップ", "最大10名までコース参加可能", "オーナーシップ保証"], recommended: false },
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

      {/* SLIDE 21: GUARANTEE */}
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

      {/* SLIDE 22: CLOSING */}
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
                <span className="font-semibold">Mottodigital</span>
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
