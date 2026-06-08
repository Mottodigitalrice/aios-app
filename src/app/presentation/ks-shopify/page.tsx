"use client";

/**
 * KS BRAND — "What's Possible on Shopify" Capabilities Showcase Deck
 *
 * Built 2026-06-08. Sibling of ks-brand-line — a content-swap clone of that
 * proven Next.js presentation pattern. Shares all render helpers + components in
 * src/components/presentation/.
 *
 * Purpose: a teaser of what becomes possible when KS BRAND's shop is wired to
 * Claude Code + n8n + the Shopify Admin API. NOT a priced proposal — a menu of
 * possibility, framed honestly as a migration / new-build.
 *
 * HONESTY CONTEXT (load-bearing): KS BRAND currently runs "lautashi.official.ec"
 * — a BASE / "official.ec"-style Japanese EC store, NOT Shopify. So every
 * automation here is a 構想 / READY-TO-BUILD greenfield item, premised on a move
 * to (or new build on) Shopify. MOTTO has no prior Shopify build; the confidence
 * comes from the SAME architecture already proven on our LINE / Instagram
 * automations. The deck must NOT fake a live Shopify demo or claim one exists.
 *
 * 7 slides (bilingual JA/EN, default JA):
 *   0. title             (intro — what's possible on Shopify)        MOTTO × KS BRAND
 *   1. cap-content       (automation — AI descriptions + SEO sync)   READY TO BUILD
 *   2. cap-imagery       (automation — AI imagery → products)        READY TO BUILD
 *   3. cap-inventory     (automation — scheduled stock/price sync)   READY TO BUILD
 *   4. cap-order-webhook (automation — order webhook fan-out)        READY TO BUILD
 *   5. cap-reviews       (automation — reviews/UGC + AI support)     READY TO BUILD
 *   6. closing           (closing — honest CTA: migrate or new-build) MOTTO × KS BRAND
 *
 * Honesty mechanism: the `badge` field carries a status marker per slide
 * (mostly 構想 / READY TO BUILD). The slide-4 callout reinforces that the
 * LINE/CRM/n8n fan-out side is already proven while the Shopify trigger is the
 * new piece, and the slide-1 callout states plainly that lautashi is BASE-class
 * so this is a migration / new-build premise grounded in proven architecture.
 *
 * Shopify Admin API references are real resource/mutation names: productCreate /
 * productUpdate + metafieldsSet (descriptions + SEO + custom data), product media
 * + variants, inventorySetQuantities / productVariantsBulkUpdate (stock + price),
 * the orders/create webhook topic, and the REST + GraphQL Admin API surface.
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
   * distance and on the exported PDF. Applied to the branching flows
   * (S1 content sync, S3 inventory/price, S4 order-webhook fan-out).
   */
  wideMermaid?: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES — 7 slides (Shopify capabilities showcase — top-5 automations)
// All automations are 構想 / READY-TO-BUILD: lautashi.official.ec is BASE-class,
// so each is premised on a Shopify migration / new build, grounded in the same
// architecture already proven on our LINE / Instagram automations.
// ─────────────────────────────────────────────────────────────────────────────

const SLIDES: SlideDef[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 0 — Title (intro)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "title",
    variant: "intro",
    transition: "scale",
    badge: { ja: "MOTTO × KS BRAND", en: "MOTTO × KS BRAND" },
    title: {
      ja: "Shopify でできること",
      en: "What's Possible on Shopify",
    },
    subtitle: {
      ja: "ショップを Claude Code・n8n・Shopify Admin API とつないだとき、何ができるか。これは提案書ではない。その可能性のメニュー。",
      en: "What becomes possible when your shop is wired to Claude Code, n8n, and the Shopify Admin API. This is not a proposal — a menu of what's possible.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 1 — AI product descriptions + SEO sync (READY TO BUILD)
  // Grounded: Shopify Admin API productCreate/productUpdate + metafieldsSet
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cap-content",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "構想 ・ これから", en: "READY TO BUILD" },
    title: {
      ja: "商品説明とSEOを、AIが書いて、自動で同期する。",
      en: "AI Writes Descriptions and SEO — Synced Automatically.",
    },
    subtitle: {
      ja: "商品ごとの説明文・SEOタイトル・メタ情報を、ブランドの声でAIが起草し、Shopifyの商品データへそのまま反映する。",
      en: "Per-product copy, SEO titles, and meta fields — drafted by AI in your brand voice, written straight back to your Shopify products.",
    },
    bullets: [
      {
        ja: "AIエージェントが商品名・素材・カテゴリーを読み、ブランドのトーンで説明文とSEO文を生成する。汎用ではなく、KS BRAND固有の言葉で。",
        en: "An AI agent reads the product name, material, and category, then writes the description and SEO copy in your brand's tone — KS BRAND's own words, not generic boilerplate.",
      },
      {
        ja: "生成結果を Shopify Admin API（productCreate / productUpdate）で商品へ書き込み、SEOやサイズ表などは metafieldsSet で構造化して保存する。",
        en: "Results are written to products via the Shopify Admin API (productCreate / productUpdate); SEO and structured data like size charts are stored with metafieldsSet.",
      },
      {
        ja: "公開前に人が確認・編集できる承認ステップを挟む。AIが下書きし、最後の判断は人が握る。",
        en: "A human approval step sits before publish — AI drafts, the final call stays with a person.",
      },
    ],
    callout: {
      ja: "※ 現状の lautashi.official.ec は BASE系のため、これらは Shopify への移行・新規構築を前提とした構想です（設計は、LINE/Instagram で実証済みのアーキテクチャに基づく）。",
      en: "Note — the current lautashi.official.ec is a BASE-class store, so these are concepts premised on a migration to (or new build on) Shopify. The design is based on the architecture we've already proven on LINE / Instagram.",
    },
    mermaid: `flowchart LR
  A["商品データ<br/>名前・素材・カテゴリ"]:::start --> B["AIエージェント<br/>説明文・SEO生成"]:::ai
  K["ブランド<br/>スタイルガイド"]:::infra -.-> B
  B --> C["構造化出力<br/>本文・SEO・メタ"]:::ai
  C --> D{"人が承認?"}:::gate
  D -- "はい" --> E["Shopify Admin API<br/>productUpdate"]:::infra
  E --> F["metafieldsSet<br/>SEO・サイズ表"]:::infra
  F --> G["商品ページ公開"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 2 — AI imagery → products/variants (READY TO BUILD)
  // Ties to the creative deck; attaches via product media on the Admin API
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cap-imagery",
    variant: "automation",
    transition: "slide",
    badge: { ja: "構想 ・ これから", en: "READY TO BUILD" },
    title: {
      ja: "商品画像をAIが作り、商品に自動で反映する。",
      en: "AI Makes the Imagery, Attaches It to Products.",
    },
    subtitle: {
      ja: "ブランドの世界観に沿った商品ビジュアルをAIで制作し、Shopifyの商品・バリエーションへ自動で紐づける。",
      en: "On-brand product imagery generated by AI, then attached automatically to your Shopify products and variants.",
    },
    bullets: [
      {
        ja: "AIが商品ごとにビジュアルを生成する。クリエイティブ提案で示したのと同じ画像パイプラインを、Shopifyの在庫に直結させる。",
        en: "AI generates imagery per product — the same creative pipeline from our visual deck, wired straight into your Shopify catalog.",
      },
      {
        ja: "生成画像を Shopify Admin API の商品メディア（product media）として登録し、色違い・サイズ違いのバリエーションにも割り当てる。",
        en: "Generated images are registered as Shopify product media via the Admin API and assigned to the right color / size variants.",
      },
      {
        ja: "ブランドガイドに照らしたAIの品質チェックを通し、合格したものだけを反映する。トーンが崩れた画像は公開しない。",
        en: "An AI quality check against your brand guide gates what gets attached — off-brand images never go live.",
      },
    ],
    callout: {
      ja: "クリエイティブ制作と商品ページが、ひとつのパイプラインでつながる。撮影のたびに手で差し替える作業から離れられる。",
      en: "Creative production and product pages connect as one pipeline — no more swapping images by hand after every shoot.",
    },
    mermaid: `flowchart LR
  A["商品<br/>ビジュアル指示"]:::start --> B["AI画像生成<br/>ブランド準拠"]:::ai
  B --> C["AI品質チェック<br/>ブランドガイド照合"]:::ai
  C --> D{"合格?"}:::gate
  D -- "いいえ" --> B
  D -- "はい" --> E["Shopify Admin API<br/>product media 登録"]:::infra
  E --> F["バリエーション割当<br/>色・サイズ"]:::infra
  F --> G["商品ページ反映"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 3 — Scheduled inventory + price sync (READY TO BUILD)
  // Grounded: n8n cron → inventorySetQuantities / productVariantsBulkUpdate
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cap-inventory",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "構想 ・ これから", en: "READY TO BUILD" },
    title: {
      ja: "在庫と価格を、決まった時間に自動で更新する。",
      en: "Inventory and Prices, Updated on a Schedule.",
    },
    subtitle: {
      ja: "手元の在庫表やセール計画を元に、n8nが定時に動いて、Shopifyの在庫数と価格を一括で書き換える。",
      en: "From your stock sheet or sale plan, n8n runs on schedule and bulk-updates inventory counts and prices on Shopify.",
    },
    bullets: [
      {
        ja: "n8nのスケジュール（cron）で定期実行する。在庫表・スプレッドシート・別システムを入力源にできる。",
        en: "Runs on an n8n schedule (cron) — your stock sheet, a spreadsheet, or another system can be the source of truth.",
      },
      {
        ja: "在庫数は Shopify Admin API の inventorySetQuantities でロケーションごとに設定し、価格は productVariantsBulkUpdate でバリエーション単位に更新する。",
        en: "Inventory is set per location via inventorySetQuantities; prices update per variant via productVariantsBulkUpdate — both on the Shopify Admin API.",
      },
      {
        ja: "セール開始・終了の自動切り替えにも対応する。タイムセールの値戻しを手作業で深夜に行う必要がなくなる。",
        en: "Handles sale start / end switchovers automatically — no more reverting flash-sale prices by hand at midnight.",
      },
    ],
    callout: {
      ja: "在庫切れの放置も、戻し忘れの値段も、減らせる。決めたルール通りに、システムが時間どおりに回す。",
      en: "Fewer stale stock-outs, fewer forgotten sale prices — the system runs your rules, on time, every time.",
    },
    mermaid: `flowchart LR
  A["在庫表・<br/>セール計画"]:::start --> B["n8nスケジュール<br/>cron 定時実行"]:::start
  B --> C{"更新タイプ"}:::gate
  C -- "在庫" --> D1["inventorySetQuantities<br/>ロケーション別"]:::infra
  C -- "価格" --> D2["productVariantsBulkUpdate<br/>バリエーション別"]:::infra
  D1 --> E["Shopify Admin API"]:::infra
  D2 --> E
  E --> F["ストア反映<br/>在庫・価格 更新"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 4 — Order webhook → CRM / LINE / email fan-out (READY TO BUILD)
  // Honest: LINE/CRM/n8n fan-out already proven; Shopify trigger is the new piece
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cap-order-webhook",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "構想（LINE側は実証済み）", en: "READY TO BUILD" },
    title: {
      ja: "注文が入った瞬間に、CRM・公式LINE・メールへ自動で流れる。",
      en: "The Moment an Order Lands, It Fans Out to CRM, LINE, and Email.",
    },
    subtitle: {
      ja: "Shopifyの注文作成を合図に、顧客データの記録・公式LINEの通知・お礼メールまで、ひと続きで自動化する。",
      en: "A new Shopify order triggers it all — customer record, Official LINE notification, and a thank-you email, in one flow.",
    },
    bullets: [
      {
        ja: "Shopify Admin API の orders/create Webhook を受信する。署名（HMAC）を検証してから処理し、なりすましは入口で弾く。",
        en: "Receives the Shopify Admin API orders/create webhook — the HMAC signature is verified before anything runs, so spoofed events are rejected at the door.",
      },
      {
        ja: "n8nが処理を扇状に分岐する。CRMへ顧客・注文を記録し、公式LINEへ通知し、お礼・配送案内メールを送る。",
        en: "n8n fans the work out — logs the customer and order to your CRM, notifies Official LINE, and sends a thank-you / shipping email.",
      },
      {
        ja: "リピート購入・休眠といったセグメントの起点にもなる。注文データが、次の打ち手の土台になる。",
        en: "It also seeds segments like repeat buyers and lapsed customers — order data becomes the foundation for the next move.",
      },
    ],
    callout: {
      ja: "※ 配信側（公式LINE・CRM・n8n の扇状連携）は、すでに別案件で実証済みです。新しく組むのは Shopify 側のトリガー部分だけです。",
      en: "Note — the delivery side (Official LINE, CRM, and the n8n fan-out) is already proven in other work. The only new piece to build is the Shopify-side trigger.",
    },
    mermaid: `flowchart LR
  A["Shopify注文<br/>orders/create"]:::start --> B["Webhook受信<br/>HMAC検証"]:::infra
  B --> C{"n8n 扇状分岐"}:::gate
  C -- "顧客・注文" --> D1["CRM 記録"]:::infra
  C -- "通知" --> D2["公式LINE<br/>Push"]:::done
  C -- "メール" --> D3["お礼・配送案内<br/>送信"]:::done
  D1 --> E["セグメント起点<br/>リピート・休眠"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 5 — Reviews / UGC + AI support replies (READY TO BUILD)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cap-reviews",
    variant: "automation",
    transition: "slide",
    badge: { ja: "構想 ・ これから", en: "READY TO BUILD" },
    title: {
      ja: "レビュー・UGCを集め、問い合わせにAIが応える。",
      en: "Collect Reviews and UGC — AI Answers the Questions.",
    },
    subtitle: {
      ja: "購入後のレビュー依頼を自動で送り、集まった声を商品ページに反映。問い合わせには、AIがブランドの声で一次対応する。",
      en: "Auto-request reviews after purchase, surface the voices on product pages, and let AI handle first-line support in your brand voice.",
    },
    bullets: [
      {
        ja: "配送完了から一定期間後に、レビュー・写真投稿の依頼を自動送信する。集まったUGCはタグ付けして整理する。",
        en: "Automatically requests reviews and photo posts a set time after delivery — incoming UGC is tagged and organized.",
      },
      {
        ja: "問い合わせには、商品カタログとFAQを読んだAIが一次対応する。判断が難しいものは人へエスカレーションする。",
        en: "An AI that has read your catalog and FAQ handles first-line enquiries; anything uncertain escalates to a human.",
      },
      {
        ja: "良質なレビュー・写真は、Shopify Admin API 経由で商品ページや metafields に紐づけ、購入の後押しに使う。",
        en: "Strong reviews and photos are linked back to product pages or metafields via the Shopify Admin API, helping the next purchase.",
      },
    ],
    callout: {
      ja: "声を集める仕組みと、声に応える仕組み。買った後のやり取りまで、ブランドの体験として設計できる。",
      en: "A system that gathers voices and one that answers them — the after-purchase experience, designed as part of the brand.",
    },
    mermaid: `flowchart LR
  A["配送完了"]:::start --> B["レビュー・UGC<br/>依頼 自動送信"]:::infra
  B --> C["回答・写真<br/>収集・タグ付け"]:::infra
  D["問い合わせ"]:::start --> E["AI一次対応<br/>カタログ・FAQ参照"]:::ai
  E --> F{"判断が難しい?"}:::gate
  F -- "はい" --> G["人へ<br/>エスカレーション"]:::infra
  F -- "いいえ" --> H["AI自動返信"]:::done
  C --> I["商品ページ・<br/>metafields 反映"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 6 — Closing (honest CTA: migrate or new-build)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "closing",
    variant: "closing",
    transition: "scale",
    badge: { ja: "MOTTO × KS BRAND", en: "MOTTO × KS BRAND" },
    title: {
      ja: "まずは、現状の lautashi から。",
      en: "Let's Start with the lautashi You Have Today.",
    },
    subtitle: {
      ja: "ここに並べたのは、すべて Shopify を前提とした構想です。実現したいものから、一緒に決めていけます。",
      en: "Everything here is a concept premised on Shopify. We can start from whichever one you most want to make real.",
    },
    callout: {
      ja: "Shopifyへの移行、あるいは新規構築から、一緒に。",
      en: "From a migration to Shopify — or a fresh build — let's do it together.",
    },
  },
];

const TOTAL_STEPS = SLIDES.length;

// ─────────────────────────────────────────────────────────────────────────────
// Presenter notes (one per slide, in slide order) — gated behind ?presenter=1.
// Light speaker cues for the KS BRAND Shopify scoping conversation. Half-width numbers.
// ─────────────────────────────────────────────────────────────────────────────

type SlidePresenterNote = { timing: string; ja: string[]; en: string[] };

const PRESENTER_NOTES: SlidePresenterNote[] = [
  // 0 — Title
  {
    timing: "30s",
    ja: [
      "まず「これは提案書ではない」と伝える。ショップを技術基盤——Claude Code・n8n・Shopify Admin API——とつないだときに何ができるか、その可能性を並べたメニューだ。価格も完成保証もここにはない。",
      "そして必ず最初に正直に言う。現状の lautashi.official.ec は BASE系のため、ここで見せるのは Shopify への移行、あるいは新規構築を前提とした構想だ。MOTTOにShopifyの過去実績はまだないが、設計はLINE/Instagramで実証済みの同じアーキテクチャに基づいている。トーンは静かに、直接的に。",
    ],
    en: [
      "Open by saying this is not a proposal. It's a menu of what becomes possible when the shop is wired to the technical foundation — Claude Code, n8n, the Shopify Admin API. No prices, no guarantees here.",
      "And say the honest part up front: the current lautashi.official.ec is a BASE-class store, so everything here is a concept premised on migrating to (or newly building on) Shopify. MOTTO has no prior Shopify build yet — but the design rests on the same architecture we've already proven on LINE / Instagram. Calm, direct tone.",
    ],
  },
  // 1 — cap-content
  {
    timing: "75s",
    ja: [
      "AIが商品説明とSEOを書き、Shopifyの商品データへ直接書き戻す。汎用ボットではなく、KS BRANDの声で。",
      "技術的には productUpdate で本文を、metafieldsSet でSEOやサイズ表などの構造化データを保存する。実在のAPIだ。",
      "公開前に必ず人の承認ステップが入る点を強調する。AIは下書きまで、最後の判断は人。",
      "このスライドのバッジは『構想・これから』。lautashi が BASE系である事実は、ここの callout で一度はっきり示す。",
    ],
    en: [
      "AI writes the product copy and SEO and writes it straight back to Shopify — in KS BRAND's voice, not a generic bot.",
      "Technically: productUpdate for the body, metafieldsSet for SEO and structured data like size charts. These are real API names.",
      "Stress the human approval step before publish — AI drafts, the human decides.",
      "Badge here is READY TO BUILD. The callout is where we state plainly, once, that lautashi is a BASE-class store today.",
    ],
  },
  // 2 — cap-imagery
  {
    timing: "75s",
    ja: [
      "クリエイティブ提案とつなげる。あの画像パイプラインを、そのままShopifyの在庫に直結させるイメージ。",
      "生成画像は product media として登録し、色違い・サイズ違いのバリエーションに割り当てる。",
      "ブランドガイドに照らしたAI品質チェックで、トーンが崩れた画像は公開しないと伝える。誇張せず、構想であることは前提として共有済み。",
    ],
    en: [
      "Bridge from the creative deck: the same image pipeline, wired into the Shopify catalog.",
      "Generated images register as product media and get assigned to the right color / size variants.",
      "An AI brand-guide quality check keeps off-brand images from going live. Don't overclaim — the concept framing is already set from slide 1.",
    ],
  },
  // 3 — cap-inventory
  {
    timing: "75s",
    ja: [
      "在庫と価格を、決めた時間に自動で更新する。深夜のセール値戻しのような手作業から離れられる。",
      "n8nのcronで定時実行。在庫は inventorySetQuantities でロケーション別に、価格は productVariantsBulkUpdate でバリエーション別に。",
      "ここは特に『現状のオペレーションの痛み』に結びつけて話す。何を入力源にするか（在庫表・スプレッドシート）はKishiさんに聞く。",
    ],
    en: [
      "Inventory and prices update on a schedule — no more midnight manual sale reverts.",
      "n8n cron drives it; inventory via inventorySetQuantities per location, prices via productVariantsBulkUpdate per variant.",
      "Tie this hard to current operational pain. Ask Kishi-san what the source of truth would be — a stock sheet, a spreadsheet, another system.",
    ],
  },
  // 4 — cap-order-webhook
  {
    timing: "75s",
    ja: [
      "ここは正直さが効く。Shopifyの orders/create Webhook を起点に、CRM・公式LINE・メールへ扇状に流す。",
      "重要な区別を明確に言う。配信側——公式LINE・CRM・n8nの扇状連携——は別案件で実証済み。新しく組むのは Shopify 側のトリガーだけだ。だからこそ現実味がある。",
      "ここで誇張しないことが、デッキ全体の信頼を作る。バッジも『構想（LINE側は実証済み）』とその区別を表している。",
    ],
    en: [
      "Honesty pays off here. The Shopify orders/create webhook triggers a fan-out to CRM, Official LINE, and email.",
      "Make the key distinction explicit: the delivery side — Official LINE, CRM, the n8n fan-out — is already proven in other work. The only new piece is the Shopify-side trigger. That's what makes it credible.",
      "Not overclaiming here is what makes the whole deck trustworthy. The badge itself — READY TO BUILD, LINE side proven — carries that distinction.",
    ],
  },
  // 5 — cap-reviews
  {
    timing: "75s",
    ja: [
      "声を集める仕組みと、声に応える仕組みの両輪。買った後の体験まで設計できると伝える。",
      "配送完了後にレビュー・写真依頼を自動送信。問い合わせはAIが一次対応し、難しいものは人へ。良いレビューは商品ページや metafields に反映する。",
      "これも構想。誇張せず、買った後のやり取りをブランド体験として組める、という可能性として話す。",
    ],
    en: [
      "Two halves: gathering voices, and answering them. The after-purchase experience can be designed too.",
      "Auto-request reviews/photos after delivery; AI handles first-line enquiries, hard cases escalate; strong reviews link back to product pages or metafields.",
      "Also a concept. No overclaiming — frame it as the possibility of designing the after-purchase loop as part of the brand.",
    ],
  },
  // 6 — Closing
  {
    timing: "45s",
    ja: [
      "締めは正直なCTAで。『まずは現状の lautashi から』と置く。今あるものを否定しない。",
      "ここで改めて言い切る。並べた5つはすべて Shopify を前提とした構想だ。だから次の一歩は、Shopifyへの移行、あるいは新規構築のどちらから始めるか——そこから一緒に決める。",
      "押し売りにしない。実現したいものから順に、一緒に決めていける、という姿勢で閉じる。",
    ],
    en: [
      "Close on an honest CTA. Lead with 'let's start with the lautashi you have today' — don't dismiss what's already there.",
      "Restate it clearly: all five are concepts premised on Shopify. So the next step is choosing where to begin — a migration to Shopify, or a fresh build — and we decide that together.",
      "No hard sell. Close on the posture of starting from whichever one matters most, together.",
    ],
  },
];

// Anonymized notes shown unless the URL carries `?presenter=1`. The live route
// defaults to empty notes so accidental screen-shares cannot leak the speaker script.
// Real notes available to Lewis via /presentation/ks-shopify?presenter=1
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

function KsShopifyDeckInner() {
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
  // 7 slides: slide 0 = title (no mermaid), slides 1..5 = automations (mermaid),
  // slide 6 = closing (no mermaid). Mermaid range = indices 1..5 inclusive.
  useMermaidSlide(slideIndex, 1, 5);

  const currentNote = notesSource[slideIndex];

  return (
    <div
      role="application"
      aria-label="KS BRAND — What's Possible on Shopify — use arrow keys or click to navigate"
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
export default function KsShopifyDeck() {
  return (
    <Suspense fallback={<div className="h-screen bg-white" />}>
      <KsShopifyDeckInner />
    </Suspense>
  );
}
