"use client";

/**
 * KS BRAND — IG Automation Menu Deck
 *
 * Wave 8 restructure (2026-05-27): 14 → 9 slides per Lewis feedback.
 *
 * v4 slide order (9 slides):
 *   1. title-v4               (new — minimal title slide)
 *   2. spec-3-engagement-persona  (Spec 3 extended — opener automation)
 *   3. spec-1-comment-to-dm   (Spec 1 modified — 2hr human-wait window)
 *   4. spec-4-brand-rag-dm    (Spec 4 unchanged structure, copy-refreshed)
 *   5. spec-2-giveaway-flow   (Spec 2 modified — 2 examples)
 *   6. spec-5a-sns-coach      (NEW from Spec 5 split — annual deep-dive)
 *   7. spec-5b-weekly-report  (NEW from Spec 5 split — weekly Monday report)
 *   8. spec-9-hashtag-tracker (Spec 9 narrowed — industry hashtag only)
 *   9. disclaimer             (new — closer)
 *
 * Bilingual JA/EN (default JA per CMO recommendation).
 * Copy is CMO-locked (cmo-locked: 2026-05-27-wave8) — JA and EN strings are pasted
 * verbatim from the Wave 8 Phase A copy file:
 *   projects/waiting/ks-brand-aios-prospect/working-files/2026-05-27-wave8-slide-copy.md
 *
 * Archived v3 slides (intro 1-3, Spec 6, Spec 7, Spec 8, Spec 10, closing) are preserved at
 *   projects/waiting/ks-brand-aios-prospect/working-files/archive/2026-05-27-wave8-archived-slides/
 * with restore instructions in the archive README.
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
   * Wave 5 polish (CPO Wave 4 deferral): some flowcharts are wider than the
   * default 1fr_1.1fr column allowance handles cleanly. When true, the
   * automation slide renders with a bullets-narrow / diagram-wide grid
   * (1fr_1.8fr) so the diagram has room to breathe at projector distance
   * and on the exported PDF. Applied to Spec 2 (7-node giveaway LR flow)
   * and to Spec 3 v4 (longer engagement → score → DM → nurture chain).
   */
  wideMermaid?: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES — 9 slides v4 (Wave 8 restructure)
// Copy locked: cmo-locked: 2026-05-27-wave8
// ─────────────────────────────────────────────────────────────────────────────

const SLIDES: SlideDef[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 1 — Title (NEW)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "title-v4",
    variant: "intro",
    transition: "scale",
    badge: { ja: "MOTTO × KS BRAND", en: "MOTTO × KS BRAND" },
    title: {
      ja: "Claude Code + VPS で実現する Instagram 自動化 — 事例と可能性",
      en: "Instagram Automation with Claude Code + VPS — Examples and What's Possible",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 2 — Engagement-triggered persona system (Spec 3 v4 — extended)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-3-engagement-persona",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "自動化 01 ・ SPEC 3 v4", en: "AUTOMATION 01 ・ SPEC 3 v4" },
    title: {
      ja: "エンゲージした人を、見えるようにする。",
      en: "Make Your Engagers Visible.",
    },
    subtitle: {
      ja: "コメント・いいね・DMを起点に、自動でペルソナを生成し、優良見込み客にアプローチする。",
      en: "Every like, comment, or DM triggers analysis — persona built, client likelihood scored, high-potential prospects reached automatically.",
    },
    bullets: [
      {
        ja: "エンゲージした人の直近20投稿をClaudeが読み、興味・ライフスタイル・購買シグナルを分析してペルソナカードを自動生成する",
        en: "For each person who engages, Claude reads their last 20 public posts — outputs a persona card: interests, lifestyle signals, buying likelihood",
      },
      {
        ja: "購買可能性スコアが高い人を自動で特定し、ブランドの声でDMを送信する",
        en: "High-likelihood prospects are identified and auto-DM'd in KS BRAND's voice",
      },
      {
        ja: "DMへの反応に応じてナーチャリングフローが続く。手動対応は関心が確認されてから",
        en: "Nurture flow continues based on reply — manual follow-up only once genuine interest is confirmed",
      },
    ],
    callout: {
      ja: "「このエンゲージャーの中に、誰が本物の購買層か」という問いに、初めてデータで答えられる。",
      en: "For the first time, \"which of my engagers are real buyers?\" has a data-backed answer — not a gut call.",
    },
    // v4 Spec 3 — engagement-triggered, extended chain (engagement → 20-post read →
    // persona card → score → auto-DM → nurture flow → manual on confirmed interest).
    // Designed wider than v3 (wideMermaid) to give the 8-node LR chain room to breathe.
    mermaid: `flowchart LR
  A["いいね・コメント<br/>DM・シェア"]:::start --> B["エンゲージャー<br/>捕捉"]:::infra
  B --> C["Claude<br/>直近20投稿を読む"]:::ai
  C --> D["ペルソナカード<br/>生成"]:::ai
  D --> E["購買可能性<br/>スコアリング"]:::ai
  E --> F{"高スコア?"}:::gate
  F -- "yes" --> G["ブランド声で<br/>自動DM送信"]:::ai
  F -- "no" --> H["DB蓄積のみ"]:::infra
  G --> I["返信あり?"]:::gate
  I -- "yes" --> J["ナーチャリング<br/>フロー継続"]:::done
  I -- "no" --> K["停止"]:::infra
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 3 — Auto-DM commenters with 2hr human wait (Spec 1 v4)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-1-comment-to-dm",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 02 ・ SPEC 1 v4", en: "AUTOMATION 02 ・ SPEC 1 v4" },
    title: {
      ja: "コメントに、2時間以内に返す。",
      en: "Every Comment Gets a Reply. Within 2 Hours.",
    },
    subtitle: {
      ja: "人が返信しなければ、AIが投稿・コメント・ブランドを読んで返す。テンプレートではない。",
      en: "If no human reply comes in time, AI reads the post, the comment, and the brand — then writes one. Not a template.",
    },
    bullets: [
      {
        ja: "任意のコメントを検知 → 設定時間（例: 2時間）、人が返信するのを待つ",
        en: "Any comment detected → system waits a set window (e.g. 2 hours) for a human reply",
      },
      {
        ja: "時間内に返信がなければ、ClaudeがそのコメントとKS BRANDの投稿・商品情報を読んで返信文を生成する",
        en: "If no reply arrives, Claude reads the comment alongside the post context and brand knowledge — writes a relevant, on-brand reply",
      },
      {
        ja: "返信済みコメントはスキップ。二重返信はない",
        en: "Already-replied comments are skipped automatically — no double replies",
      },
    ],
    callout: {
      ja: "キーワードに限らない。どんなコメントも取りこぼさない。",
      en: "No keyword required. No comment left unanswered.",
    },
    // v4 Spec 1 — any comment, 2hr human-wait window, AI fallback. Drops keyword-trigger framing.
    mermaid: `flowchart LR
  A["任意のコメント<br/>Webhook"]:::start --> B["人の返信を<br/>2時間待機"]:::infra
  B --> C{"人が返信?"}:::gate
  C -- "yes" --> D["スキップ<br/>二重返信防止"]:::done
  C -- "no" --> E["Claude<br/>投稿 + コメント読込"]:::ai
  E --> F["ブランド知識<br/>参照"]:::ai
  F --> G["返信生成<br/>+ 送信"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 4 — Brand-voice DM replier (Spec 4 — unchanged structure, copy-refreshed)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-4-brand-rag-dm",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 03 ・ SPEC 4", en: "AUTOMATION 03 ・ SPEC 4" },
    title: {
      ja: "DM応答、ブランドの声で。",
      en: "DM Replies. Brand Voice. Every Time.",
    },
    subtitle: {
      ja: "商品カタログとブランドガイドで学習したシステムが、相手に合わせたトーンでDMに返信する。",
      en: "A system trained on your catalog, your style guide, and your past Q&A — answers DMs in the right register for whoever is asking.",
    },
    bullets: [
      {
        ja: "商品DB・スタイルガイド・過去Q&Aを学習させる",
        en: "Catalog, style guide, and 200+ historical Q&A pairs indexed",
      },
      {
        ja: "エンゲージャーのペルソナデータを参照して敬語/カジュアルを自動切替する",
        en: "Persona data from Slide 2 auto-routes tone: casual for consumers, keigo for wholesale",
      },
      {
        ja: "24時間以内にブランドの声でDM返信を送信",
        en: "On-brand DM reply sent within the 24-hour messaging window",
      },
    ],
    callout: {
      ja: "DMはブランドの声で返信される。サイズを聞いてきた20代にはカジュアルに、卸先バイヤーには敬語で。カタログは、すでにシステムが完全に把握している。",
      en: "DMs answered in your brand's voice — casual for a 20-something asking about sizing, formal keigo for a wholesale buyer on lead times. The system already knows your catalog cold.",
    },
    // v4 Spec 4 — same structure as v3 (incoming DM → catalog/FAQ RAG → brand-voice reply
    // → persona-aware tone routing → rate-limited send). Updated to reference Slide 2's
    // persona engine instead of v3's Spec 3.
    mermaid: `flowchart LR
  A["着信DM<br/>Webhook"]:::start --> B["会話状態<br/>取得"]:::infra
  B --> C["pgvector RAG<br/>カタログ + FAQ"]:::ai
  C --> D["Claude<br/>ブランド声で返信"]:::ai
  D --> E["ペルソナ層で<br/>敬語/カジュアル調整"]:::ai
  E --> F["レート制限<br/>+ 送信"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 5 — Comment-trigger campaigns: 2 examples (Spec 2 v4)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-2-giveaway-flow",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "自動化 04 ・ SPEC 2 v4", en: "AUTOMATION 04 ・ SPEC 2 v4" },
    title: {
      ja: "コメントが、アクションになる。",
      en: "Comment Triggers Action.",
    },
    subtitle: {
      ja: "特定のコメントを起点に、自動でDMを送る。プレゼントも、無料資料も、当選通知も。",
      en: "A specific comment triggers an automatic DM — free guides, draw entries, winner notifications. All without manual steps.",
    },
    bullets: [
      {
        ja: "例1 — 無料ガイド配布: 「ガイド」とコメントした人に、ガイドのダウンロードリンクを即DM",
        en: "Example 1 — Free guide: Comment \"ガイド\" → system instantly DMs the download link",
      },
      {
        ja: "例2 — プレゼント応募: 「応募」とコメントした人を受付・重複除外 → 抽選でランダム5名を選出 → 当選DM配信",
        en: "Example 2 — Draw: Comment \"応募\" → entries captured and deduplicated → 5 random winners selected → winner DMs sent automatically",
      },
      {
        ja: "キャンペーンごとにトリガーワードと送信文をカスタマイズできる",
        en: "Trigger word and DM message are customizable per campaign — no code changes needed",
      },
    ],
    callout: {
      ja: "何百件の応募でも、手作業はゼロ。",
      en: "Hundreds of entries. Zero manual steps.",
    },
    // v4 Spec 2 — drops "Pick a Winner" framing. Shows TWO parallel example flows
    // (free-guide instant-DM + draw-style entry-capture-and-select) both branching from
    // the same comment-detection trigger. Demonstrates the underlying mechanism is one
    // pipeline, two campaign shapes.
    mermaid: `flowchart LR
  A["コメント検知<br/>Webhook"]:::start --> B{"トリガーワード"}:::gate
  B -- "「ガイド」" --> C1["即時DM送信<br/>ガイドリンク"]:::done
  B -- "「応募」" --> C2["応募受付<br/>+ 重複除外"]:::infra
  C2 --> D2["Postgres<br/>entries"]:::infra
  D2 --> E2["ランダム抽選<br/>5名選出"]:::ai
  E2 --> F2["当選DM配信"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 6 — On-demand SNS deep-dive coach (Spec 5a — NEW from Spec 5 split)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-5a-sns-coach",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 05 ・ SPEC 5a", en: "AUTOMATION 05 ・ SPEC 5a" },
    title: {
      ja: "1年分の投稿を、一気に読む。",
      en: "Read a Year of Posts. In One Session.",
    },
    subtitle: {
      ja: "過去12か月のKS BRAND投稿を分析し、何が効いていて何が効いていないかをまとめたロードマップを出力する。",
      en: "Analyze 12 months of KS BRAND posts at once — output a strategy document showing what drove engagement and what didn't.",
    },
    bullets: [
      {
        ja: "KS BRANDの直近12か月の全投稿とエンゲージメントデータを読み込み、上位・下位パフォーマーを特定する",
        en: "Reads all KS BRAND posts from the past 12 months — identifies top and bottom performers by engagement",
      },
      {
        ja: "勝ちパターンを抽出する：キャプションの書き方・投稿時間・フォーマット・テーマ",
        en: "Extracts winning patterns: caption structure, posting time, format, topic clusters",
      },
      {
        ja: "次の四半期の投稿戦略ロードマップとして出力する。Kishi-sanが走らせたいときに実行できる",
        en: "Outputs a strategic roadmap document — run it on demand whenever Kishi-san wants a fresh read",
      },
    ],
    callout: {
      ja: "感覚でやっていたことが、データになる。",
      en: "What you've been doing by feel — now has evidence behind it.",
    },
    // v4 Spec 5a (NEW from split) — on-demand annual deep-dive. Pulls 12 months of posts
    // and engagement data → Claude pattern-analysis → strategic roadmap document. The
    // output doc becomes the baseline that Slide 7 (Spec 5b) references for weekly deltas.
    mermaid: `flowchart LR
  A["オンデマンド<br/>実行"]:::start --> B["過去12か月<br/>全投稿読込"]:::infra
  B --> C["エンゲージメント<br/>データ集計"]:::infra
  C --> D["Claude<br/>勝ちパターン抽出"]:::ai
  D --> E["上位・下位<br/>パフォーマー特定"]:::ai
  E --> F["四半期ロードマップ<br/>文書出力"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 7 — Weekly Monday market report (Spec 5b — NEW from Spec 5 split)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-5b-weekly-report",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 06 ・ SPEC 5b", en: "AUTOMATION 06 ・ SPEC 5b" },
    title: {
      ja: "毎週月曜、先週のデータが届く。",
      en: "Every Monday. Last Week's Data. Waiting for You.",
    },
    subtitle: {
      ja: "先月のパフォーマンスをSlide 6の年次ベースラインと照合し、今週やるべきことを3点に絞って届ける。",
      en: "Last month's performance measured against the annual baseline — three tactical recommendations, every Monday morning.",
    },
    bullets: [
      {
        ja: "先月の投稿パフォーマンスを自動集計し、エンゲージメントの増減を可視化する",
        en: "Last month's post performance auto-aggregated — engagement up/down made visible",
      },
      {
        ja: "Slide 6の年次ベースラインと照合して、外れ値と傾向の変化を検出する",
        en: "Cross-referenced against the Slide 6 annual baseline to surface outliers and trend shifts",
      },
      {
        ja: "Claudeが今週の投稿戦略に関するアクション提案を3点で出力する。毎週月曜に届く",
        en: "Claude outputs 3 tactical action points for this week's strategy — delivered every Monday",
      },
    ],
    callout: {
      ja: "データは蓄積するだけでは意味がない。毎週、判断材料に変わって届く。",
      en: "Data that accumulates without surfacing is useless. This one surfaces it, every week.",
    },
    // v4 Spec 5b (NEW from split) — weekly Monday report. Cron-triggered each Monday →
    // pulls last month's data → cross-references Slide 6 baseline → Claude generates
    // 3 tactical action points. Paired with Slide 6 (5a) — without the baseline, this
    // is just a number dump; with it, deltas mean something.
    mermaid: `flowchart LR
  A["Cron 月曜 09:00"]:::start --> B["先月の投稿<br/>パフォーマンス集計"]:::infra
  B --> C["Slide 6 年次<br/>ベースライン参照"]:::infra
  C --> D["Claude<br/>外れ値・傾向検出"]:::ai
  D --> E["今週のアクション<br/>3点生成"]:::ai
  E --> F["月曜朝<br/>レポート配信"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 8 — Industry hashtag tracker (Spec 9 v4 — narrowed)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-9-hashtag-tracker",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 07 ・ SPEC 9 v4", en: "AUTOMATION 07 ・ SPEC 9 v4" },
    title: {
      ja: "業界ハッシュタグ、毎週スキャン。",
      en: "Industry Hashtags. Scanned Every Week.",
    },
    subtitle: {
      ja: "追跡する業界を決めると、毎週その業界で最も使われているハッシュタグを自動でレポートする。",
      en: "Choose the industry to track — get a weekly report of the most-used hashtags in that space, automatically.",
    },
    bullets: [
      {
        ja: "業界を1つ指定する。そのカテゴリで最もよく使われているハッシュタグを毎週スキャンする",
        en: "Pick one industry. The system scans the most-used hashtags in that category every week",
      },
      {
        ja: "投稿数・エンゲージメント率の増減を追跡し、伸びているタグと落ちているタグを識別する",
        en: "Post volume and engagement trends tracked week-over-week — rising and falling tags identified",
      },
      {
        ja: "Claudeが毎週日本語サマリーで届ける。今週使うべきタグ、避けるべきタグが明確になる",
        en: "Claude writes a weekly digest — which tags to use this week, which to avoid",
      },
    ],
    callout: {
      ja: "ハッシュタグを感覚で選ぶのをやめる。",
      en: "Stop guessing which hashtags to use.",
    },
    // v4 Spec 9 — narrowed. v3 had parallel hashtag-scan + brand-mention branches; v4
    // drops the brand-mention branch entirely. Industry-only tracking, weekly cron,
    // rising/falling identification, Claude weekly digest. Phase-2 LLM-presence footnote
    // removed per Lewis (was already descoped).
    mermaid: `flowchart LR
  A["週次 Cron"]:::start --> B["業界カテゴリ<br/>指定"]:::infra
  B --> C["業界ハッシュタグ<br/>スキャン"]:::infra
  C --> D["週次トレンド<br/>集計"]:::infra
  D --> E["Claude<br/>伸びる・落ちるタグ識別"]:::ai
  E --> F["週次サマリー<br/>+ 推奨タグセット"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 9 — Disclaimer (NEW closer)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "disclaimer",
    variant: "closing",
    transition: "scale",
    badge: { ja: "DISCLAIMER", en: "DISCLAIMER" },
    title: {
      ja: "正直に、一点だけ。",
      en: "One Honest Note.",
    },
    bullets: [
      {
        ja: "このデッキの内容はすべて技術的に実現可能だ。ただし、実際のコスト・ROI・チューニング期間は、建てる前には確定できない。",
        en: "Everything in this deck is technically buildable. Actual cost, ROI, and tuning time cannot be confirmed before we build.",
      },
      {
        ja: "オープンソースツールと低コストモデルの組み合わせで、費用は現実的な範囲に収まる。しかし結果の保証はない。",
        en: "Open-source tooling and low-cost models keep the economics viable. That does not mean results are guaranteed.",
      },
      {
        ja: "どれか1点を選び、小さく始め、実測値を出す。それが唯一の正しい順番だ。",
        en: "Pick one. Start small. Get real numbers. That is the only honest sequence.",
      },
    ],
    callout: {
      ja: "可能性を見せるのが、このデッキの役割だ。数字は、実験から出てくる。",
      en: "This deck shows what's possible. The numbers come from the experiment.",
    },
  },
];

const TOTAL_STEPS = SLIDES.length;

// ─────────────────────────────────────────────────────────────────────────────
// Presenter notes (one per slide, in slide order)
// Copy locked: cmo-locked: 2026-05-27-wave8
// ─────────────────────────────────────────────────────────────────────────────

type SlidePresenterNote = { timing: string; ja: string[]; en: string[] };

const PRESENTER_NOTES: SlidePresenterNote[] = [
  // 0 — Title (Slide 1)
  {
    timing: "30s",
    ja: [
      "このデッキは提案書ではない。「今、実際に建てられるもの」を並べたメニューだ。9点の自動化を見ていただき、最も関心のあるものから試す。それだけのドキュメントだ。数字のコミットも、完成保証もない。ただし、技術的な実現可能性はすべて検証済みの話をしている。見積もりが必要なものは、関心を持ったあとに一緒に出せる。トーンは静かに、直接的に。",
    ],
    en: [
      "This is not a proposal. It is a menu — nine things that are buildable today with the current stack. Pick what's interesting, start there. No cost commitments here. No completion guarantees. What you will see is technically verified. If something catches Kishi-san's eye, we scope it together after. Keep the tone calm and direct — this is a document that speaks for itself.",
    ],
  },
  // 1 — Spec 3 v4 (Slide 2)
  {
    timing: "90-120s",
    ja: [
      "フォロワーリスト全体を分析することはできない。Instagramの仕様上、フォロワーのユーザー名リストには、自分のアカウントでもアクセスできない。これは2018年から変わっていない事実だ。",
      "だからこの自動化は「エンゲージ」を起点にする。いいね・コメント・DM・シェアのいずれかが発生した瞬間に、その人をシステムが捕捉する。その後、公開されている直近20投稿をClaudeが読み、ペルソナカードを生成する。関心領域・ライフスタイル傾向・購買シグナルの3軸で評価する。年齢・性別は方向性の推定に留まる。",
      "スコアが閾値を超えた人には、KS BRANDの声で書かれたDMが自動で送られる。返信があれば、それを起点にナーチャリングフローが動く。返信がなければ、そこで止まる。仮に1,000人がエンゲージして50人にDMが届き、そのうち10人が返信すれば——Kishi-sanの手は一切動いていない。",
    ],
    en: [
      "The follower list is not accessible — not even for your own account. That has been true since 2018 and has not changed. Any system claiming to analyze \"all 50,000 followers\" is either scraping (ban risk) or fabricating.",
      "This automation solves the same underlying question through a different, legal door: engagement as the trigger. The moment someone likes, comments, DMs, or shares, they enter the pipeline. Claude reads their last 20 public posts and outputs a persona card — interests, lifestyle signals, buying likelihood. Age and gender are directional estimates, not precise data. The honest framing: interests are reliable; income and intent are signals, not facts.",
      "High-likelihood prospects receive an auto-DM in KS BRAND's voice. If they reply, the nurture flow continues. If they don't, the sequence stops. Kishi-san's manual attention enters only once genuine interest is confirmed — every step before that runs without human input.",
    ],
  },
  // 2 — Spec 1 v4 (Slide 3)
  {
    timing: "90s",
    ja: [
      "v3までのSpec 1はキーワードトリガーだった。Kishi-sanのフィードバックを受け、v4では「任意のコメント」すべてが対象になった。これは一見シンプルな変更だが、実際の運用では大きい。「DM」「詳細」など特定のワードを書かないフォロワーも、コメントをした以上は関心を持っている。そこを取りこぼすかどうかが、エンゲージメント率に直接響く。",
      "重要な設計は「人を優先する」待機ウィンドウだ。2時間、Kishi-sanかスタッフが手動で返信できる。返信があれば、AIは動かない。返信がなかった場合だけ、AIがコメント・投稿・KS BRANDの知識ベースを参照して返信文を生成する。テンプレートを送るのではなく、その投稿のコンテキストを読んで書く。だから返信がブランドに馴染む。",
      "Slide 4（DM返信）との違い: こちらはパブリックコメントへの返信。Slide 4はプライベートDMへの返信。担う場所が違う。",
    ],
    en: [
      "The v3 version required a keyword trigger. Lewis's feedback for v4: any comment at all. This looks like a small change. In practice it is not — plenty of followers comment with genuine interest without ever writing \"DM me\" or \"how to order.\" A keyword-only system misses them. This catches them.",
      "The critical design is the human-priority window. Kishi-san or a team member gets first right of reply — set at 2 hours, adjustable. If they respond, the automation never fires. Only when the window closes with no reply does Claude step in. It reads the specific comment, the post it appeared on, and KS BRAND's knowledge base — and writes a reply that fits that context. Not a template. Not the same message for every comment.",
      "The distinction from Slide 4 (DM replier): this slide handles the public comment surface. Slide 4 handles open private DM conversations. Same brand voice, different surfaces.",
    ],
  },
  // 3 — Spec 4 (Slide 4)
  {
    timing: "90-120s",
    ja: [
      "Slide 3との違いを明確にする。Slide 3はパブリックサーフェスのコメントへの返信だ。このSlide 4は、プライベートサーフェスのDMへの返信——しかも会話全体を読んで答える。同じDMチャネルでも、Slide 2で送る「ペルソナスコアが高い人への起点DM」とも役割が違う。Slide 4が担うのは「すでに届いている、返信が必要なDM」だ。",
      "このシステムはKS BRANDの商品カタログ・スタイルガイド・過去の顧客Q&A 200件以上をベクトルDBに格納している。DMが届くと、関連情報をベクトル検索で引き出し、Claudeがその情報を使って返信を生成する。推測ではなく、KS固有の情報に基づいた回答だ。",
      "トーン自動切替がもうひとつの特徴だ。Slide 2のペルソナデータを参照して、消費者にはカジュアルな語調、卸先バイヤーには敬語を使い分ける。手動でトーンを変える必要はない。",
    ],
    en: [
      "The distinction between slides matters here. Slide 3 handles public comments — any comment, human-first window, then AI steps in. This slide handles private DMs — open conversations, brand-knowledge-driven. And Slide 2's nurture flow handles the outbound DMs we initiate to high-likelihood prospects. Three DM-adjacent automations, three different roles: public reply, prospect outreach, inbound conversation management.",
      "Slide 4's AI is trained on KS BRAND's full product catalog, brand style guide, and over 200 historical customer Q&A pairs — all indexed in a vector database. When a DM arrives, the system retrieves relevant context and passes it to Claude to generate the reply. It draws on KS-specific information — not a generic response.",
      "Tone routing is the second differentiator. The system reads the sender's persona tier from the Slide 2 engine and routes accordingly: casual Japanese for a consumer asking about sizing, keigo for a wholesale partner on lead times. One system, two registers, automatic.",
    ],
  },
  // 4 — Spec 2 v4 (Slide 5)
  {
    timing: "90s",
    ja: [
      "v3の「Pick a Winner」というフレーミングは、抽選機能の一面しか見せていなかった。v4では2つの具体例を並べることで、「コメントトリガー」の汎用性が伝わるようになった。",
      "例1（無料ガイド）は、情報発信型コンテンツと組み合わせる使い方だ。KS BRANDがスタイリングガイドやシーズンルックブックをPDFで持っているなら、「コメントで受け取れる」仕組みがフォロワーとのエンゲージメントポイントになる。応募のハードルが低い分、データが取れる母数が増える。",
      "例2（抽選）は、キャンペーン運営の自動化だ。応募コメントのリアルタイム受付・重複除外・ランダム抽選・当選DM配信まで、人が介在せずに完結する。規模が大きくなっても手は動かない。",
      "2つの例は異なるように見えるが、仕組みは同じだ。コメントを検知 → DMを送る、という1本のフロー。トリガーワードと送信内容を変えるだけで、別のキャンペーンになる。",
    ],
    en: [
      "The v3 \"Pick a Winner\" framing showed only one dimension — the draw. Two concrete examples side-by-side shows what the mechanism actually is: a comment-triggered DM system that can be pointed at any campaign objective.",
      "Example 1 (free guide) pairs well with content-led strategies. If KS BRAND has a styling guide or seasonal lookbook as a PDF, \"comment to receive it\" is a low-friction engagement hook. The barrier is low, so the response volume is higher, and every responder now has a persona card being built from Slide 2's engine.",
      "Example 2 (draw) handles campaign operations. Entry capture, duplicate removal, random draw, winner DMs — the full pipeline runs without human intervention. At 50 entries or 500, the manual effort is the same: zero.",
      "The underlying mechanism is identical. Comment detected → DM sent. The trigger word and message body change per campaign. No new build required for each new campaign type.",
    ],
  },
  // 5 — Spec 5a (Slide 6)
  {
    timing: "90s",
    ja: [
      "このスライドはSlide 7（週次レポート）と対になっている。この2枚は別々に読まず、一続きの話として見てほしい。",
      "Slide 6は「戦略レイヤー」だ。年に数回、あるいは大きな方針変更が必要だと感じたタイミングで走らせる。12か月分の投稿データを一気に処理し、KS BRANDの「勝ちパターン」を文書化する。出力は四半期ロードマップの形にする——どんなテーマで、どんなフォーマットで、何曜日に投稿すると反応が取れるか。Kishi-sanが今まで感覚でやってきたことに、初めてデータの裏付けがつく。",
      "このドキュメントはSlide 7の週次レポートが参照する「ベースライン」にもなる。年次分析を先にやることで、週次の変化が「ベースラインからの乖離」として読めるようになる。この順番が重要だ。",
    ],
    en: [
      "This slide and Slide 7 (weekly market report) are paired. Read them together as one story — they are two layers of the same system.",
      "Slide 6 is the strategic layer. Run it a few times a year, or whenever a shift in direction feels necessary. The system processes 12 months of post and engagement data in one pass and produces a written roadmap: what topics, what formats, what posting cadence drove results for KS BRAND. The patterns Kishi-san has been running on instinct get documented with data.",
      "This document also becomes the baseline that Slide 7's weekly reports reference. Without this annual read, the weekly report has nothing to compare against. With it, every Monday's delta measurement has context: \"we are up against our annual pattern\" or \"this week is an outlier.\" Running Slide 6 first is what makes Slide 7 meaningful.",
    ],
  },
  // 6 — Spec 5b (Slide 7)
  {
    timing: "90s",
    ja: [
      "Slide 6が戦略レイヤーなら、このSlide 7はオペレーションレイヤーだ。年に数回の深いダイブと、毎週の軽い確認——この2つが組み合わさることで、KS BRANDのSNS運用に初めて「測定と改善のループ」が入る。",
      "毎週月曜の朝、先月分の集計が自動で完了し、Slide 6で作った年次ベースラインと照合される。上がっているもの、下がっているもの、外れ値になった投稿がClaudeによってピックアップされる。そして「今週やるべきこと」を3点に絞った提案が届く。Kishi-sanが毎朝データを見に行く必要はない。週に1回、月曜に届くものを読むだけでいい。",
      "重要なのは、このシステムが「感想を出す」のではなく「年次ベースラインとの比較」という構造を持っていることだ。比較がなければ、数字は意味を持たない。",
    ],
    en: [
      "If Slide 6 is the strategic layer, Slide 7 is the operational layer. A few deep dives per year plus a light weekly check-in — together, they put a genuine measurement and improvement loop into KS BRAND's content operation for the first time.",
      "Every Monday morning, last month's performance is auto-aggregated and cross-referenced against the annual baseline built in Slide 6. What went up, what went down, which posts were outliers — Claude surfaces all of it, plus three action points for the current week. Kishi-san does not need to log in to a dashboard every day. Monday morning, one read, actionable direction.",
      "The structural difference that matters: this system does not output \"observations.\" It outputs deltas — changes measured against a known baseline. Without Slide 6's annual read as the reference point, a weekly report is just a number dump. With it, the numbers mean something.",
    ],
  },
  // 7 — Spec 9 v4 (Slide 8)
  {
    timing: "90s",
    ja: [
      "ハッシュタグ選定は、多くのブランドが「前回使ったものをそのまま流用する」か「なんとなく人気そうなものを選ぶ」かになっている。どちらも戦略ではない。",
      "このシステムは特定の業界カテゴリ（例: 日本のファッション、サステナブルアパレル、ストリートスタイルなど）をターゲットとして設定し、毎週そのカテゴリで実際に使われているハッシュタグのデータを集める。前週比で伸びているタグと落ちているタグを識別し、Claudeが週次のサマリーを書く。",
      "出力はシンプルに3点に絞る: 今週伸びているタグ上位3つ、下落傾向にある注意タグ、今週の投稿に使うべき推奨タグセット。Kishi-sanが投稿を作るときに、そのままコピーして使えるレベルで具体的にする。",
      "1点の制約を正直に伝える: トラッキングできる業界は1度に1カテゴリ。スコープを絞ることで、データの密度が上がる。",
    ],
    en: [
      "Most brands pick hashtags the same way: reuse last time's list, or choose whatever looks popular. Neither is a strategy.",
      "This system targets a specific industry category — Japanese fashion, sustainable apparel, streetwear, whatever fits KS BRAND's positioning — and collects weekly data on the hashtags actually being used within it. Week-over-week movement is tracked: rising tags get flagged, falling tags get flagged. Claude writes the summary.",
      "Output format is narrow by design: top 3 rising tags this week, top 3 in decline, a recommended tag set to drop into this week's posts. Specific enough to use without editing.",
      "One honest constraint: tracking is focused on one industry category at a time. That is intentional — broader scope means thinner data per tag. Narrower scope means better signal. If KS BRAND's positioning spans two distinct categories, that is a conversation for the scoping phase.",
    ],
  },
  // 8 — Disclaimer (Slide 9)
  {
    timing: "60s",
    ja: [
      "このスライドはデッキの締めに置く。内容は謝罪でも免責事項でもない。Kishi-sanに対して正直でいることが、長期の信頼に直結するという判断だ。",
      "3点の事実を淡々と伝える。技術的な実現可能性はある。コストとROIは建てる前に確定できない。小さく始めることが正しい。",
      "プレゼンのトーンとして、「なので少しだけ試しませんか」という方向には誘導しない。それは言わなくても伝わる。このスライドの役割は、デッキ全体が「夢を売っている」ように見えないようにすることだ。技術的に誠実なプレゼンテーションは、最後がこういう着地をする。",
      "Kishi-sanはビジネスパーソンだ。保証のない話を聞かされると反射的に距離を置く。先に「保証はない、でも試す価値はある」と言い切ることで、むしろ信頼が上がる。",
    ],
    en: [
      "This slide closes the deck. It is not an apology. It is not legal cover. It is the honest positioning that makes everything before it trustworthy.",
      "Three facts, stated plainly. Technical feasibility is real — nothing in this deck is speculative technology. Cost and ROI cannot be locked before the build — that is true of any custom software. Starting small is the right sequence — not because the full vision is uncertain, but because real numbers only come from real experiments.",
      "The presenter should not pitch this slide. Do not turn it into \"so let's start with a small pilot.\" That conclusion is Kishi-san's to reach. This slide's job is to ensure the deck does not read as a sales document with a technology veneer. Direct, technically honest presentations close this way. The final word belongs to the work — not to a closing hook.",
    ],
  },
];

// Wave 4 polish (CPO sign-off): anonymized notes shown unless the URL carries
// `?presenter=1`. Live route at /presentation/ks-brand-automations defaults
// to empty notes so accidental screen-shares cannot leak the internal script.
// Real notes still available to Lewis via /presentation/ks-brand-automations?presenter=1
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
          {/* Wave 4 polish: BudouX phrase-aware wrap on intro titles
              for mobile kinsoku (Slide 1 hook etc.). segmentJapanese
              no-ops on non-JP strings so EN toggle stays unchanged. */}
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
          {slide.title[lang]}
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

function KsBrandAutomationsDeckInner() {
  // Default JA per CMO recommendation
  const [lang, setLang] = useState<Lang>("ja");

  // Wave 4 polish (CPO sign-off): presenter notes gated behind ?presenter=1.
  // Without the query string, the N key opens an empty notes panel — no leak.
  // With ?presenter=1, Lewis gets the real internal speaker script.
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

  // Mount Mermaid for all automation slides.
  // v4 (9 slides): slide 0 = title (intro, no mermaid), slides 1..7 = automation (mermaid),
  // slide 8 = disclaimer (closing, no mermaid). Mermaid range = indices 1..7 inclusive.
  useMermaidSlide(slideIndex, 1, 7);

  const currentNote = notesSource[slideIndex];

  return (
    <div
      role="application"
      aria-label="KS BRAND IG Automation Menu — use arrow keys or click to navigate"
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
export default function KsBrandAutomationsDeck() {
  return (
    <Suspense fallback={<div className="h-screen bg-white" />}>
      <KsBrandAutomationsDeckInner />
    </Suspense>
  );
}
