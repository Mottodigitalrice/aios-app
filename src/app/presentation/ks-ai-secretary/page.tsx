"use client";

/**
 * KS BRAND — "AI秘書にできること" (What an AI Secretary Can Do) Deck
 *
 * Built 2026-06-08. Sibling of ks-brand-line — a content-swap clone of that
 * proven Next.js presentation pattern. Shares all render helpers + components
 * in src/components/presentation/.
 *
 * Purpose: present the OPERATING-SYSTEM thesis for an AI secretary —
 *   「Claude Codeがあらゆる機能をつくる ・ n8nが自律的にcronを回す ・ 公式LINEがUIになる」
 *   = Claude Code builds any function · n8n runs the autonomous cron · Official LINE is the UI.
 * State the thesis vividly (slides 0-1), then PROVE it with real built systems
 * (slides 2-4), then frame what the same proven architecture could do for
 * KS BRAND (slide 5), and close on the thesis (slide 6).
 *
 * 7 slides (bilingual JA/EN, default JA):
 *   0. title             (intro — the OS thesis)
 *   1. os-thesis         (automation — 3 parts, one OS)            PROVEN ARCHITECTURE
 *   2. example-secretary (automation — LINE AI Sales Secretary)    BUILT · LIVE
 *   3. example-fraud     (automation — AI lead screening/fraud)    BUILT
 *   4. proof-line-ui     (automation — Official LINE as the UI)    LIVE DEMO
 *   5. ks-case           (automation — an AI secretary for KS)     READY TO BUILD
 *   6. closing           (closing — restate the thesis)
 *
 * Honesty mechanism: the `badge` field carries a status marker per slide
 * (PROVEN ARCHITECTURE / BUILT · LIVE / BUILT / LIVE DEMO / READY TO BUILD).
 * Slides 2-4 are genuinely built/live. Slide 5 is explicitly a 構想 (concept) —
 * the deck must not overclaim KS-specific work as already done.
 *
 * Slides 2 + 3 (example-secretary, example-fraud) are REUSED VERBATIM from the
 * ks-brand-line deck — already anonymized to 「ある士業・専門サービス企業」.
 * Grounding: projects/waiting/ks-brand-aios-prospect/working-files/
 *   2026-06-08-realworld-architecture-brief.md + 2026-06-08-anonymization-map.md
 */

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Layers } from "lucide-react";

import { SlideWrapper } from "@/components/presentation/SlideWrapper";
import { PresenterNotes } from "@/components/presentation/PresenterNotes";
import { useDeckNavigation } from "@/components/presentation/useDeckNavigation";
import { useMermaidSlide } from "@/components/presentation/useMermaidSlide";
import { segmentJapanese } from "@/lib/budoux-transform";

type Lang = "ja" | "en";

type Bilingual = { ja: string; en: string };

type SlideDef = {
  id: string;
  variant: "intro" | "automation" | "closing";
  title: Bilingual;
  subtitle?: Bilingual;
  bullets?: Bilingual[];
  callout?: Bilingual;
  mermaid?: string;
  badge?: Bilingual;
  transition?: "scale" | "slide" | "stagger";
  /**
   * Some flowcharts are wider than the default 1fr_1.1fr column allowance handles
   * cleanly. When true, the automation slide renders with a bullets-narrow /
   * diagram-wide grid (0.9fr_1.8fr) so the diagram has room to breathe at projector
   * distance and on the exported PDF.
   */
  wideMermaid?: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES — 7 slides (AI秘書にできること — the OS thesis, proven then applied)
// ─────────────────────────────────────────────────────────────────────────────

const SLIDES: SlideDef[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 0 — Title (intro) — the OS thesis
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "title",
    variant: "intro",
    transition: "scale",
    badge: { ja: "MOTTO × KS BRAND", en: "MOTTO × KS BRAND" },
    title: {
      ja: "AI秘書にできること",
      en: "What an AI Secretary Can Do",
    },
    subtitle: {
      ja: "Claude Codeがあらゆる機能をつくる。n8nが自律的にcronを回す。公式LINEがUIになる。3つの部品が、ひとつのAI秘書になる。",
      en: "Claude Code builds any function. n8n runs the autonomous cron. Official LINE becomes the UI. Three parts, one AI secretary.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 1 — The OS thesis (PROVEN ARCHITECTURE)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "os-thesis",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "実証済みアーキテクチャ", en: "PROVEN ARCHITECTURE" },
    title: {
      ja: "AI秘書は、3つの部品でできた、ひとつのOS。",
      en: "An AI Secretary Is One OS, Built from Three Parts.",
    },
    subtitle: {
      ja: "魔法ではない。役割の決まった3つの部品を組み合わせるだけ。だからこそ、確実につくれる。",
      en: "Not magic — just three parts, each with a clear role. That's exactly why it can be built reliably.",
    },
    bullets: [
      {
        ja: "Claude Code が、必要な機能をその場で構築する。検索・予約・レポート——欲しい機能を、コードとして書き起こす。",
        en: "Claude Code builds the functions you need, on the spot — search, booking, reports. Whatever you want, written as code.",
      },
      {
        ja: "n8n が、つくった機能を自律的に回す。cronで定時に動き、イベントで反応する。人が押さなくても、止まらない。",
        en: "n8n runs those functions autonomously — fires on a cron schedule, reacts to events. It keeps running without anyone pressing a button.",
      },
      {
        ja: "公式LINE が、すべての窓口になる。お客様も、あなた自身も、使い慣れたLINEから秘書とやり取りする。",
        en: "Official LINE becomes the single interface — your customers, and you, interact with the secretary from the LINE you already use.",
      },
    ],
    callout: {
      ja: "機能はClaude Codeが。自律はn8nが。窓口はLINEが。この3つの組み合わせが「AI秘書」というOSをつくる。",
      en: "Functions from Claude Code. Autonomy from n8n. The interface from LINE. These three together are the OS we call an AI secretary.",
    },
    mermaid: `flowchart LR
  A["依頼・業務<br/>あなたの「やりたい」"]:::start --> B["Claude Code<br/>機能を構築"]:::ai
  B --> C["n8n<br/>cronで自律実行"]:::infra
  C --> D["公式LINE<br/>UI・受け答え"]:::done
  E["データ・API<br/>カタログ・予約・在庫"]:::infra -.-> B
  F["データ・API<br/>外部サービス連携"]:::infra -.-> C
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 2 — PROOF #1: LINE AI Sales Secretary (BUILT · LIVE)
  // REUSED VERBATIM from ks-brand-line example-secretary slide.
  // Real running agent — anonymised professional-services firm.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "example-secretary",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "実装済み ・ 稼働中", en: "BUILT ・ LIVE" },
    title: {
      ja: "24時間、問い合わせを受け、判断を完了させる。",
      en: "Handle enquiries around the clock. Complete decisions, not pitches.",
    },
    subtitle: {
      ja: "ある士業・専門サービス企業向けに構築した LINE AI営業秘書。営業時間外の問い合わせを受け付け、日英二言語で自動応答し、予約まで完結させる。",
      en: "A LINE AI Sales Secretary built for a Japanese professional-services firm — receives after-hours enquiries, responds bilingually in JP and EN, and completes bookings end-to-end.",
    },
    bullets: [
      {
        ja: "LINE経由の問い合わせを24時間受信。n8nが署名を検証し、AIエージェント（LLM）が日英二言語で応答を生成する。",
        en: "Enquiries arrive via LINE around the clock. n8n verifies the signature; the AI agent (LLM) generates a bilingual response in JP and EN.",
      },
      {
        ja: "Supabase RAGの知識ベースとCRM顧客データを参照し、その場で回答を完結させる。「検討します」で終わらせない応答設計。",
        en: "Draws from a Supabase RAG knowledge base and CRM customer data to resolve the enquiry on the spot — a reply design built to complete decisions, not defer them.",
      },
      {
        ja: "Googleカレンダーと連携し、予約を自動確定。信頼度が低い場合は人へエスカレーション。6週間で実ユーザーによるテスト稼働を開始。",
        en: "Books directly into Google Calendar and confirms automatically. Low-confidence cases escalate to a human. Reached test operation with real users in 6 weeks.",
      },
    ],
    callout: {
      ja: "ある士業・専門サービス企業向けに実際に構築・稼働中のエージェントです。現在は実ユーザーによるテスト稼働フェーズ。80%以上の意思決定完了率を目標に設計しています（目標値）。",
      en: "A real, running agent built for an anonymised Japanese professional-services firm. Currently in test operation with real users — designed to a target decision-completion rate of 80%+.",
    },
    mermaid: `flowchart LR
  A["LINE受信<br/>メッセージ着信"]:::start --> B["n8n受信<br/>署名検証"]:::infra
  B --> C["AIエージェント<br/>（LLM・日英二言語）"]:::ai
  D1["Supabase RAG<br/>知識ベース"]:::infra -.-> C
  D2["CRM<br/>顧客データ"]:::infra -.-> C
  C --> E["Google カレンダー<br/>予約処理"]:::infra
  C --> F{"信頼度低<br/>→ 人へ"}:::gate
  E --> G["自動応答・予約確定<br/>→ LINE返信"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 3 — PROOF #2: Fraud (AI Lead Screening & Fraud Detection) (BUILT)
  // REUSED VERBATIM from ks-brand-line example-fraud slide.
  // 147-node workflow — anonymised professional-services firm.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "example-fraud",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "実装済み", en: "BUILT" },
    title: {
      ja: "受信した瞬間に、審査が始まる。",
      en: "Screening starts the moment a lead arrives.",
    },
    subtitle: {
      ja: "LINEから届いたリードを、AIが自動で審査・分類・処理する。147ノードのワークフローとして構築済み。",
      en: "An AI agent screens, classifies, and processes every inbound lead from LINE — built as a 147-node workflow.",
    },
    bullets: [
      {
        ja: "公的記録・SNS・過去履歴を自動照合し、リスクスコアを算出。高リスクは担当者にアラートを上げる。",
        en: "Auto cross-checks public records, SNS, and history to generate a risk score — high-risk leads are flagged for human review.",
      },
      {
        ja: "適格リードはCRMへ自動登録・分類し、フォローアップシーケンスを起動する。",
        en: "Qualified leads are logged and categorised in the CRM automatically, triggering a follow-up sequence.",
      },
      {
        ja: "適格と判断されたリードへの請求書生成・自動送信まで、一貫して自動で処理する。",
        en: "Invoice generation and delivery to qualified leads is handled end-to-end without manual steps.",
      },
    ],
    callout: {
      ja: "※ ある士業・専門サービス企業向けに147ノードのワークフローとして構築済み。バックエンドの最終調整を進行中のため、エンドユーザーへの本番稼働ではなく「実装済み」の段階です。",
      en: "Note — built as a real 147-node workflow for a Japanese professional-services firm. Backend finalisation is in progress; this is a BUILT system, not yet live in production for end users.",
    },
    mermaid: `flowchart LR
  A["LINE / Messenger<br/>受信"]:::start --> B["n8n<br/>（147ノード）"]:::infra
  B --> C["AI 審査・<br/>適格判定（LLM）"]:::ai
  C --> D{"振り分け<br/>3分岐"}:::gate
  D -- "高リスク" --> E["不正スコア算出<br/>アラート（担当者へ）"]:::done
  D -- "適格" --> F["CRM 更新<br/>フォローアップ起動"]:::ai
  D -- "請求対象" --> G["請求書生成<br/>自動送信・完了"]:::done
  H["公的記録・SNS<br/>履歴 照合"]:::infra -.-> E
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 4 — PROOF #3: Official LINE as the UI (LIVE DEMO)
  // Keyword→DB→Flex carousel (MEMBER SEARCH) + AI replies in brand voice.
  // Both run as live demos. MEMBER SEARCH demo only (per anonymization map).
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "proof-line-ui",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "実装済み ・ デモあり", en: "LIVE DEMO" },
    title: {
      ja: "公式LINEが、UIになる。",
      en: "Official LINE Becomes the Interface.",
    },
    subtitle: {
      ja: "アプリも管理画面もいらない。キーワードを送れば検索結果がカルーセルで返り、AIがブランドの声で応答する。すでに動いているデモ。",
      en: "No app, no admin panel. Send a keyword and results come back as a carousel; the AI replies in your brand voice. Already running as a demo.",
    },
    bullets: [
      {
        ja: "キーワードを送ると、AIがデータベースを検索し、該当する商品やメンバーをFlexカルーセルで返す。最大10件（MEMBER SEARCH デモ）。",
        en: "Send a keyword — the AI searches the database and returns matching products or members as a Flex carousel, up to 10 cards (the MEMBER SEARCH demo).",
      },
      {
        ja: "AIエージェントが直近の会話を覚えたまま、カタログとスタイルガイドを参照し、ブランドのトーンで返信する。",
        en: "The AI agent remembers the recent thread and replies in your brand's tone, drawing on the catalog and style guide.",
      },
      {
        ja: "テキストでも、画像・ボタン付きのカードでも応答できる。お客様は指一本で、迷わず進める。",
        en: "It can respond in plain text or as image-and-button cards — your customer moves forward with one tap, never lost.",
      },
    ],
    callout: {
      ja: "これは構想ではない。検索もAI応答も、すでにLIVEデモとして動いている。LINEがそのままUIになる、という証明。",
      en: "Not a concept — both search and AI reply already run as live demos. Proof that LINE itself can be the interface.",
    },
    mermaid: `flowchart LR
  A["メッセージ受信<br/>LINE"]:::start --> B["AIエージェント"]:::ai
  C["記憶<br/>直近の会話"]:::infra -.-> B
  K["カタログ<br/>スタイルガイド"]:::infra -.-> B
  B --> D{"検索キーワード?"}:::gate
  D -- "はい" --> E["DB検索<br/>→ Flexカルーセル"]:::done
  D -- "いいえ" --> F["ブランドの声で<br/>テキスト返信"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 5 — KS BRAND の場合 (READY TO BUILD)
  // Honest: applying the SAME proven architecture to KS BRAND. A 構想, not yet built.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "ks-case",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "構想 ・ これから", en: "READY TO BUILD" },
    title: {
      ja: "KS BRANDの場合。",
      en: "For KS BRAND.",
    },
    subtitle: {
      ja: "同じ実証済みアーキテクチャを、KS BRANDに当てはめると——24時間の問い合わせ対応、予約・在庫確認、定時の自律レポート。すべてLINEで。",
      en: "The same proven architecture, applied to KS BRAND — 24-hour enquiry handling, booking and stock checks, scheduled autonomous reports. All through LINE.",
    },
    bullets: [
      {
        ja: "24時間、お客様からの問い合わせにブランドの声で応答する。営業時間外も、秘書が窓口に立ち続ける。",
        en: "Answer customer enquiries in your brand voice 24 hours a day — the secretary stays at the front desk even after hours.",
      },
      {
        ja: "予約や在庫の確認を、その場で完結させる。お客様はLINEから、欲しい答えをすぐ受け取る。",
        en: "Resolve booking and stock checks on the spot — customers get the answer they want, right inside LINE.",
      },
      {
        ja: "n8nが定時に自律レポートを生成し、LINEに届ける。今日の問い合わせ・在庫・予約状況を、毎朝あなたへ。",
        en: "n8n generates a scheduled autonomous report and delivers it to LINE — today's enquiries, stock, and bookings, to you every morning.",
      },
    ],
    callout: {
      ja: "※ これはKS BRAND向けの構想です。スライド2〜4の実証済みアーキテクチャを、そのまま当てはめる発想。何を載せるかは、月曜の打ち合わせで一緒に決めていきます。",
      en: "Note — this is a concept for KS BRAND, built on the proven architecture in slides 2–4. Exactly what it does, we decide together at Monday's meeting.",
    },
    mermaid: `flowchart LR
  A["お客様 / あなた<br/>LINEで依頼"]:::start --> B["AI秘書<br/>（LLM・ブランドの声）"]:::ai
  K["商品・在庫<br/>予約データ"]:::infra -.-> B
  B --> C{"内容で分岐"}:::gate
  C -- "問い合わせ" --> D["24時間<br/>自動応答"]:::done
  C -- "予約・在庫" --> E["その場で<br/>確認・完結"]:::done
  F["n8n<br/>定時cron"]:::infra --> G["自律レポート<br/>→ LINEへ"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 6 — Closing — restate the thesis
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "closing",
    variant: "closing",
    transition: "scale",
    badge: { ja: "MOTTO × KS BRAND", en: "MOTTO × KS BRAND" },
    title: {
      ja: "あなたのAI秘書を、一緒に。",
      en: "Let's Build Your AI Secretary, Together.",
    },
    subtitle: {
      ja: "魔法ではなく、組み合わせ。だから、確実につくれる。",
      en: "Not magic, but a combination — which is exactly why it can be built reliably.",
    },
    callout: {
      ja: "機能はClaude Codeが。自律はn8nが。窓口はLINEが。あなたのAI秘書を、一緒に。",
      en: "Functions from Claude Code. Autonomy from n8n. The front desk from LINE. Let's build your AI secretary, together.",
    },
  },
];

const TOTAL_STEPS = SLIDES.length;

// ─────────────────────────────────────────────────────────────────────────────
// Presenter notes (one per slide, in slide order) — gated behind ?presenter=1.
// Light speaker cues for the Mon 2026-06-08 scoping meeting. Half-width numbers.
// Slides 2/3 reuse the ks-brand-line secretary/fraud notes.
// ─────────────────────────────────────────────────────────────────────────────

type SlidePresenterNote = { timing: string; ja: string[]; en: string[] };

const PRESENTER_NOTES: SlidePresenterNote[] = [
  // 0 — Title (OS thesis)
  {
    timing: "30s",
    ja: [
      "最初に一言で言い切る。「AI秘書」は1つの製品ではなく、3つの部品でできたOSだ——機能をつくるClaude Code、自律的にcronを回すn8n、窓口になる公式LINE。この3つの組み合わせが秘書になる、というのがこのデッキの背骨。残りの6枚は、この主張を「証明する」ためにある。トーンは静かに、自信を持って。",
    ],
    en: [
      "Open with the one-liner. An AI secretary is not one product — it's an OS built from three parts: Claude Code that builds functions, n8n that runs the autonomous cron, Official LINE that becomes the interface. The thesis: these three combined make the secretary. Every later slide exists to prove it. Calm, confident tone.",
    ],
  },
  // 1 — os-thesis
  {
    timing: "60s",
    ja: [
      "ここで3部品の役割を分けて見せる。Claude Codeが「機能」、n8nが「自律」、LINEが「窓口」。図を左から右に指でなぞる：依頼 → Claude Codeが機能を構築 → n8nがcronで回す → LINEが受け答えする。横からデータ・APIが両方に入る。ポイントは「魔法ではない、役割の決まった部品の組み合わせ」——だから確実につくれる。バッジは『実証済みアーキテクチャ』、この後の3枚が証拠だと予告する。",
    ],
    en: [
      "Separate the three roles here. Claude Code = functions, n8n = autonomy, LINE = the front desk. Trace the diagram left to right: request → Claude Code builds the function → n8n runs it on a cron → LINE handles the conversation, with data/API feeding both. The point: not magic, just parts with clear roles — that's why it's reliably buildable. Badge says PROVEN ARCHITECTURE; tee up the next three slides as the proof.",
    ],
  },
  // 2 — example-secretary (LINE AI Sales Secretary)
  {
    timing: "60-75s",
    ja: [
      "このスライドは、私たちが実際に構築・稼働させているエージェントの例です。",
      "クライアントは士業・専門サービス系の企業様で、守秘義務の関係で社名は出していません。",
      "このエージェントの役割は、LINEに届く問い合わせを24時間受け取り、AIが日英二言語で応答し、そのまま予約まで完結させることです。",
      "フローをご覧ください。LINEからメッセージが届くと、n8nがまず署名を検証します。次にAIエージェントが知識ベースとCRMデータを参照しながら応答を生成し、必要であればGoogleカレンダーに予約を入れます。",
      "AIの信頼度が低い場合は、自動的にスタッフへエスカレーションします。無理に回答させません。",
      "現在は実ユーザーによるテスト稼働フェーズで、構築から6週間でこの状態に至っています。",
      "ROIや成約率などの数字はまだ出していません。ここで見ていただきたいのは、実際に動くものを私たちが作れるという事実です。",
    ],
    en: [
      "This slide shows a real agent we have built and are running — not a mockup.",
      "The client is a professional-services firm in Japan. We are keeping them anonymous under confidentiality.",
      "The agent's job: receive LINE enquiries 24 hours a day, respond bilingually in Japanese and English, and complete a booking — all without a human in the loop.",
      "Walking through the flow: a LINE message arrives, n8n verifies the signature, the AI agent pulls from a Supabase RAG knowledge base and CRM data to generate a response, then books into Google Calendar if needed.",
      "If the AI's confidence is low, it escalates to a human automatically. We do not let it guess.",
      "It is currently in test operation with real users — we reached this point six weeks after starting the build.",
      "We are not quoting ROI or conversion figures here because we do not have measured results to cite yet. What we want to show is that we can actually build this — and have.",
    ],
  },
  // 3 — example-fraud (Fraud / lead screening)
  {
    timing: "60-75s",
    ja: [
      "このスライドは、MOTTOが実際に構築したワークフローです。",
      "LINEでリードが届いた瞬間、n8nが147ノードのワークフローを起動します。",
      "AIエージェント（LLMベース）がリードを審査し、3つのルートに振り分けます。",
      "高リスクは公的記録・SNS・過去履歴と照合してスコアを算出し、担当者にアラート。適格リードはCRMへ自動登録してフォローアップを起動。請求対象は請求書を生成して自動送信します。",
      "バッジは「実装済み」です。147ノードのワークフローは完成しています。バックエンドの最終調整を進行中のため、エンドユーザーへの本番稼働はこれからです。",
      "数値の誇張はしていません。リードあたりのデューデリジェンス時間が短縮されることは確認されていますが、具体的な削減率はまだ計測中です。",
    ],
    en: [
      "This slide shows a system MOTTO has actually built — not a concept.",
      "The moment a lead arrives via LINE, n8n fires a 147-node workflow.",
      "An AI agent (LLM-based — Claude or GPT class) screens the lead and routes it one of three ways.",
      "High-risk: cross-referenced against public records, SNS, and history, scored, and flagged for a human. Qualified: logged in the CRM and a follow-up sequence is started. Invoice-ready: invoice generated and sent automatically.",
      "The badge says BUILT. The 147-node workflow exists. The backend finalisation is still in progress — we are not claiming this is live in production for end users.",
      "No metrics have been invented. The only claim: per-lead due-diligence time is substantially reduced — that is qualitative and honest.",
    ],
  },
  // 4 — proof-line-ui (LINE as the UI)
  {
    timing: "75s",
    ja: [
      "ここで3つ目の部品「LINEがUIになる」を、画面で証明する。MEMBER SEARCH デモが実際に動いている：キーワードを送ると、AIがDBを検索してFlexカルーセル（最大10件）で返す。検索じゃない普通の問い合わせには、AIがカタログとスタイルガイドを読んでブランドの声で返信する。直近の会話も覚えている。ポイントは「アプリも管理画面もいらない、LINEがそのままUI」——そしてこれは構想ではなく、すでに動くデモだと言い切る。",
    ],
    en: [
      "Here the third part — LINE as the UI — is proven on screen. The MEMBER SEARCH demo actually runs: send a keyword, the AI searches the DB and returns a Flex carousel (up to 10). For a normal enquiry rather than a search, the AI reads the catalog and style guide and replies in the brand voice, remembering the recent thread. The point: no app, no admin panel — LINE is the UI. And say plainly: not a concept, a running demo.",
    ],
  },
  // 5 — ks-case (READY TO BUILD)
  {
    timing: "75s",
    ja: [
      "ここで初めてKS BRANDの話にする。そして正直に枠を張る——「これはまだ作っていない、構想です」。でも土台はスライド2〜4で証明済みの同じアーキテクチャ。KS BRANDなら：24時間の問い合わせ対応、予約・在庫確認、そしてn8nの定時cronで自律レポートを毎朝LINEに届ける。図のレポート枝（n8n → 自律レポート → LINE）が「自律」の分かりやすい例。最後に「何を載せるかは月曜に一緒に決めましょう」と渡す。誇張しないことが信頼をつくる。",
    ],
    en: [
      "Only now do we turn to KS BRAND — and frame it honestly: this is a concept, not yet built. But the foundation is the same architecture proven in slides 2–4. For KS BRAND: 24-hour enquiry handling, booking and stock checks, and an n8n scheduled cron that delivers an autonomous report to LINE each morning. The report branch in the diagram (n8n → autonomous report → LINE) is the clearest example of 'autonomy.' Close by handing it over: let's decide what it does together on Monday. Not overclaiming is what builds trust.",
    ],
  },
  // 6 — closing
  {
    timing: "30s",
    ja: [
      "閉じは主張をもう一度。機能はClaude Codeが、自律はn8nが、窓口はLINEが。これがAI秘書というOS。そして「あなたのAI秘書を、一緒に」——一緒に作るパートナーだと伝えて終わる。間を置いて、月曜の打ち合わせへ自然につなぐ。",
    ],
    en: [
      "Close by restating the thesis. Functions from Claude Code, autonomy from n8n, the front desk from LINE — that's the AI-secretary OS. Then: let's build yours, together — end as the partner who builds it with them. Pause, then hand off naturally into Monday's meeting.",
    ],
  },
];

// Anonymized notes shown unless the URL carries `?presenter=1`. The live route
// defaults to empty notes so accidental screen-shares cannot leak the speaker script.
// Real notes available to Lewis via /presentation/ks-ai-secretary?presenter=1
const EMPTY_NOTES: SlidePresenterNote[] = SLIDES.map(() => ({
  timing: "",
  ja: [],
  en: [],
}));

// ─────────────────────────────────────────────────────────────────────────────
// Render helpers
// ─────────────────────────────────────────────────────────────────────────────

function Badge({ text }: { text: string }) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#B8860B]/20 bg-[#B8860B]/8 text-[#B8860B] text-[10px] font-mono uppercase tracking-wider">
      {text}
    </div>
  );
}

function Callout({ text }: { text: string }) {
  return (
    <div
      className="rounded-lg p-4 mt-4"
      style={{
        background: "linear-gradient(135deg, rgba(184,134,11,0.06), rgba(184,134,11,0.02))",
        borderLeft: "3px solid #B8860B",
      }}
    >
      <p className="text-sm sm:text-base text-[#1D1D1F] leading-relaxed">
        {text}
      </p>
    </div>
  );
}

function renderIntroSlide(slide: SlideDef, lang: Lang) {
  return (
    <section
      className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto"
      style={{ background: "linear-gradient(180deg, #FBF6E7 0%, #FFFFFF 100%)" }}
    >
      <div className="flex flex-col items-center max-w-3xl w-full text-center">
        <Badge text={slide.badge?.[lang] ?? ""} />
        <h1
          className="mt-5 text-3xl sm:text-4xl font-bold text-[#1D1D1F] leading-tight"
          style={{ fontFamily: '"Shippori Mincho", "Hiragino Mincho ProN", "Yu Mincho", serif' }}
        >
          {/* BudouX phrase-aware wrap on intro titles for mobile kinsoku.
              segmentJapanese no-ops on non-JP strings so EN toggle stays unchanged. */}
          {segmentJapanese(slide.title[lang])}
        </h1>
        {slide.subtitle && (
          <p className="mt-4 text-base sm:text-lg text-[#6E6E73] leading-relaxed">
            {slide.subtitle[lang]}
          </p>
        )}
        {slide.bullets && (
          <ul className="mt-7 w-full space-y-3 text-left">
            {slide.bullets.map((b, i) => (
              <li
                key={i}
                className="flex gap-3 items-start rounded-lg border border-[#E8E8ED] bg-white/70 p-3.5"
              >
                <span className="flex-shrink-0 mt-0.5 size-6 rounded-full bg-[#B8860B]/8 text-[#B8860B] text-xs font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm sm:text-[15px] text-[#1D1D1F] leading-relaxed">
                  {b[lang]}
                </span>
              </li>
            ))}
          </ul>
        )}
        {slide.callout && (
          <div className="mt-6 w-full">
            <Callout text={slide.callout[lang]} />
          </div>
        )}
      </div>
    </section>
  );
}

function renderAutomationSlide(slide: SlideDef, lang: Lang, slideIndex: number) {
  return (
    <section
      className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto"
      style={{ background: "linear-gradient(180deg, #FBF6E7 0%, #FFFFFF 100%)" }}
    >
      <div className="flex flex-col w-full max-w-6xl">
        <div className="flex items-baseline gap-3 mb-2 flex-wrap">
          <Badge text={slide.badge?.[lang] ?? ""} />
        </div>
        <h2
          className="text-2xl sm:text-3xl font-bold text-[#1D1D1F] leading-tight"
          style={{ fontFamily: '"Shippori Mincho", "Hiragino Mincho ProN", "Yu Mincho", serif' }}
        >
          {slide.title[lang]}
        </h2>
        {slide.subtitle && (
          <p className="mt-2 text-sm sm:text-base text-[#6E6E73] leading-relaxed max-w-4xl">
            {slide.subtitle[lang]}
          </p>
        )}

        <div
          className={`grid grid-cols-1 gap-6 mt-5 ${
            slide.wideMermaid
              ? "sm:grid-cols-[0.9fr_1.8fr]"
              : "sm:grid-cols-[1fr_1.1fr]"
          }`}
        >
          {/* Left column: bullets */}
          <div className="flex flex-col gap-3">
            {slide.bullets && (
              <div className="flex flex-col gap-2.5">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B]">
                  {lang === "ja" ? "仕組み" : "How it works"}
                </p>
                {slide.bullets.map((b, i) => (
                  <div
                    key={i}
                    className="flex gap-3 items-start rounded-lg border border-[#E8E8ED] bg-white/70 p-3"
                  >
                    <span className="flex-shrink-0 mt-0.5 size-6 rounded-full bg-[#B8860B]/8 text-[#B8860B] text-xs font-bold flex items-center justify-center">
                      {i + 1}
                    </span>
                    <span className="text-sm text-[#1D1D1F] leading-relaxed">
                      {b[lang]}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right column: Mermaid diagram */}
          {slide.mermaid && (
            <div className="rounded-xl border border-[#E8E8ED] bg-white/70 p-4 min-h-[36vh] flex items-center justify-center">
              <div className="mermaid w-full" data-mermaid-slide={slideIndex}>
                {slide.mermaid}
              </div>
            </div>
          )}
        </div>

        {/* Callout below */}
        {slide.callout && (
          <div className="mt-5">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8860B] mb-1.5">
              {lang === "ja" ? "実現できること" : "What's possible"}
            </p>
            <Callout text={slide.callout[lang]} />
          </div>
        )}
      </div>
    </section>
  );
}

function renderClosingSlide(slide: SlideDef, lang: Lang) {
  return (
    <section
      className="h-full flex flex-col items-center justify-center px-8 overflow-y-auto"
      style={{ background: "linear-gradient(180deg, #FBF6E7 0%, #FFFFFF 100%)" }}
    >
      <div className="flex flex-col items-center max-w-3xl w-full text-center">
        <Badge text={slide.badge?.[lang] ?? ""} />
        <h1
          className="mt-6 text-4xl sm:text-5xl font-bold text-[#1D1D1F] leading-tight"
          style={{ fontFamily: '"Shippori Mincho", "Hiragino Mincho ProN", "Yu Mincho", serif' }}
        >
          {segmentJapanese(slide.title[lang])}
        </h1>
        {slide.subtitle && (
          <p className="mt-5 text-base sm:text-lg text-[#6E6E73] leading-relaxed">
            {slide.subtitle[lang]}
          </p>
        )}
        {slide.bullets && (
          <div className="mt-8 w-full space-y-3">
            {slide.bullets.map((b, i) => (
              <p
                key={i}
                className="text-base sm:text-lg text-[#1D1D1F] leading-relaxed"
              >
                {b[lang]}
              </p>
            ))}
          </div>
        )}
        {slide.callout && (
          <div
            className="mt-10 px-6 py-5 rounded-xl"
            style={{
              background: "linear-gradient(135deg, rgba(184,134,11,0.10), rgba(184,134,11,0.04))",
              borderLeft: "3px solid #B8860B",
            }}
          >
            <p
              className="text-xl sm:text-2xl font-semibold text-[#1D1D1F] leading-snug"
              style={{ fontFamily: '"Shippori Mincho", "Hiragino Mincho ProN", "Yu Mincho", serif' }}
            >
              {slide.callout[lang]}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function renderSlide(slide: SlideDef, lang: Lang, slideIndex: number) {
  switch (slide.variant) {
    case "intro":
      return renderIntroSlide(slide, lang);
    case "automation":
      return renderAutomationSlide(slide, lang, slideIndex);
    case "closing":
      return renderClosingSlide(slide, lang);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

function KsAiSecretaryDeckInner() {
  // Default JA per CMO recommendation
  const [lang, setLang] = useState<Lang>("ja");

  // Presenter notes gated behind ?presenter=1. Without the query string, the N key
  // opens an empty notes panel — no leak. With ?presenter=1, Lewis gets the real script.
  const searchParams = useSearchParams();
  const isPresenter = searchParams?.get("presenter") === "1";
  const notesSource = isPresenter ? PRESENTER_NOTES : EMPTY_NOTES;

  const {
    globalStep,
    direction,
    advance,
    goBack,
    showNotes,
    setShowNotes,
  } = useDeckNavigation(TOTAL_STEPS);

  const slideIndex = globalStep;

  // Mount Mermaid for the automation slides.
  // 7 slides: slide 0 = title (no mermaid), slides 1..5 = automation (mermaid),
  // slide 6 = closing (no mermaid). Mermaid range = indices 1..5 inclusive.
  useMermaidSlide(slideIndex, 1, 5);

  const currentNote = notesSource[slideIndex];

  return (
    <div
      role="application"
      aria-label="KS BRAND — What an AI Secretary Can Do — use arrow keys or click to navigate"
      className="h-screen overflow-hidden bg-white text-[#1D1D1F] cursor-pointer select-none relative"
      onClick={advance}
      onContextMenu={(e) => {
        e.preventDefault();
        goBack();
      }}
    >
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-[#E8E8ED]">
        <div
          className="h-full bg-gradient-to-r from-[#B8860B] to-[#D4A843] transition-all duration-500 ease-out"
          style={{ width: `${((globalStep + 1) / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {/* Top bar */}
      <div className="fixed top-0.5 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-[#E8E8ED]">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-2.5">
          <div className="flex items-center gap-2 text-sm font-bold tracking-tight text-[#6E6E73]">
            <Layers className="size-4 text-[#B8860B]" />
            Mottodigital × KS BRAND
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLang(lang === "ja" ? "en" : "ja");
              }}
              className="text-[11px] text-[#86868B] hover:text-[#B8860B] transition-colors px-2 py-1 rounded border border-[#E8E8ED] hover:border-[#B8860B]/30"
              aria-label={`Switch to ${lang === "ja" ? "English" : "日本語"}`}
            >
              {lang === "ja" ? "EN" : "日本語"}
            </button>
            <span className="text-xs text-[#86868B] font-mono">
              {globalStep + 1} / {TOTAL_STEPS}
            </span>
          </div>
        </div>
      </div>

      {/* ── Slide container ── */}
      <div className="relative h-full pt-12">
        {SLIDES.map((slide, i) => (
          <SlideWrapper
            key={slide.id}
            active={slideIndex === i}
            transition={slide.transition ?? "slide"}
            direction={direction}
          >
            {renderSlide(slide, lang, i)}
          </SlideWrapper>
        ))}
      </div>

      {/* Presenter notes */}
      <PresenterNotes
        showNotes={showNotes}
        setShowNotes={setShowNotes}
        currentNotes={
          currentNote
            ? {
                timing: currentNote.timing,
                en: currentNote.en,
                jp: currentNote.ja,
              }
            : undefined
        }
      />
    </div>
  );
}

// Suspense wrapper required by Next.js 15+ because useSearchParams triggers
// client-side rendering bailout. Fallback is a blank white screen — the deck
// hydrates in <100ms so the user never sees it.
export default function KsAiSecretaryDeck() {
  return (
    <Suspense fallback={<div className="h-screen bg-white" />}>
      <KsAiSecretaryDeckInner />
    </Suspense>
  );
}
