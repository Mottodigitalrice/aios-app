"use client";

/**
 * KS BRAND — IG Automation Menu Deck
 *
 * Bilingual JA/EN (default JA per CMO recommendation).
 * Wave 3 Batch B+C — slides populated, Mermaid mounted, presenter notes wired.
 *
 * Slide order — 3 intro → 10 automation (CMO order: 6 → 1 → 5 → 8 → 7 → 4 → 2 → 9 → 3 → 10) → 1 closing.
 * Stable spec IDs reference projects/waiting/ks-brand-aios-prospect/context/2026-05-27-automation-shortlist.md.
 *
 * Copy is CMO-locked (2026-05-27) — JA and EN strings are pasted verbatim from
 * projects/waiting/ks-brand-aios-prospect/working-files/2026-05-27-slide-copy*.md.
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
  badge?: Bilingual; // e.g. "AUTOMATION 01 — SPEC 6"
  transition?: "scale" | "slide" | "stagger";
  /**
   * Wave 5 polish (CPO Wave 4 deferral): some flowcharts are wider than the
   * default 1fr_1.1fr column allowance handles cleanly. When true, the
   * automation slide renders with a bullets-narrow / diagram-wide grid
   * (1fr_1.8fr) so the diagram has room to breathe at projector distance
   * and on the exported PDF. Applied to Spec 2 (7-node giveaway LR flow).
   */
  wideMermaid?: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES — 14 slides, all CMO-locked copy, pasted verbatim
// ─────────────────────────────────────────────────────────────────────────────

const SLIDES: SlideDef[] = [
  // ── Intro 1 of 3 ──
  {
    id: "intro-1-hook",
    variant: "intro",
    transition: "scale",
    badge: { ja: "INTRO 01", en: "INTRO 01" },
    title: {
      ja: "2025年は「自動化の量」。2026年は「自動化の知性」。",
      en: "Volume was 2025. Intelligence is 2026.",
    },
    subtitle: {
      ja: "既存ツールはメッセージを届けられる。でも誰に、何を、どう返すかは見えない。",
      en: "Existing tools can send messages. They cannot tell you who deserves which one.",
    },
    bullets: [
      {
        ja: "ManyChat・lgram・iステップは「返信量」を自動化する。フォロワーの本質は見えない。",
        en: "ManyChat, lgram, iステップ automate reply volume. They cannot see who the follower actually is.",
      },
      {
        ja: "Modash・HypeAuditorは「集計データ」を出す。「このフォロワー5万人のうち誰が本物の購買層か」は答えられない。",
        en: "Modash and HypeAuditor output aggregate data. Neither can answer: which 500 of your 50,000 are real buyers?",
      },
      {
        ja: "日本語AIは「翻訳レベル」のまま。ブランドのトーンで、JPネイティブで、フォロワー一人ひとりに合わせた返信は、まだどのツールも作れていない。",
        en: "Japanese AI output remains translation-grade. No tool yet delivers brand-voice, JP-native, per-follower replies at scale.",
      },
    ],
    callout: {
      ja: "ツールを持っている。インテリジェンスはまだ持っていない。",
      en: "You have the tools. You don't yet have the intelligence.",
    },
  },

  // ── Intro 2 of 3 ──
  {
    id: "intro-2-context",
    variant: "intro",
    transition: "slide",
    badge: { ja: "INTRO 02", en: "INTRO 02" },
    title: {
      ja: "スクレイピングは使わない。それが差別化になる。",
      en: "No scraping. That's the competitive edge.",
    },
    subtitle: {
      ja: "Meta公式APIとAPPI準拠を出発点にすることで、次のToS施行後も生き続けるシステムになる。",
      en: "Built on official Meta APIs and APPI compliance — designed to survive the next enforcement wave.",
    },
    bullets: [
      {
        ja: "このデッキの10自動化はすべてMeta Graph API（Business Discovery含む）を基盤にしている。アカウント停止リスクはゼロ。",
        en: "All 10 automations run on Meta's official Graph API, including Business Discovery. Zero account-ban risk.",
      },
      {
        ja: "日本のAPPI（個人情報保護法）では、公開投稿であっても分析目的での利用には開示が必要。各ビルドにはAPPI開示コピーが、後付けではなく仕組みの一部として最初から含まれる。",
        en: "Japan's APPI requires purpose disclosure even for public post data. Every build in this deck ships with a compliant JP disclosure copy template — built in from day one, not bolted on later.",
      },
      {
        ja: "スクレイピングツールを使う競合は「今は動いている」が、次のAPI施行波で止まる。このシステムは止まらない。",
        en: "Competitors using scrapers are running today. They stop at the next enforcement wave. This system keeps running.",
      },
    ],
    callout: {
      ja: "ルールの中で建てる。だからこそ、長く使える。",
      en: "Built within the rules — which is exactly why it lasts.",
    },
  },

  // ── Intro 3 of 3 ──
  {
    id: "intro-3-menu-overview",
    variant: "intro",
    transition: "slide",
    badge: { ja: "INTRO 03", en: "INTRO 03" },
    title: {
      ja: "2026年のAIが埋める、3つの空白。",
      en: "Three gaps no SaaS tool has filled. Until now.",
    },
    subtitle: {
      ja: "この10選は、市場に存在しないものを建てるための選定だ。",
      en: "The 10 automations in this deck are built around what the market hasn't shipped yet.",
    },
    bullets: [
      {
        ja: "フォロワー個人のペルソナ分析 — 「50,000人のフォロワーのうち、誰が本物の購買層か？」これに答えられるツールは、今の市場に存在しない。",
        en: "Per-follower persona analysis — \"Which 500 of my 50,000 followers are real buyers?\" No tool in the market answers this question today.",
      },
      {
        ja: "JPネイティブAIトーン + 日英バイリンガル自動ルーティング — 翻訳レベルの多言語対応ではない。KS BRANDの声で、日本語ネイティブで、相手に応じてカジュアルと丁寧語を切り替える返信。",
        en: "JP-native AI tone + bilingual flow routing — Not translation-grade multilingual. KS BRAND's actual voice, in fluent Japanese, switching between casual and formal depending on who's asking.",
      },
      {
        ja: "APPIコンプライアンスを「信頼資産」として設計 — 開示コピーから同意フロー、データ保持ポリシーまで、法的準拠をビルドの一部として出荷する。競合ツールが後から慌てて対応する部分を、最初から完成させる。",
        en: "APPI compliance as a buyer-trust asset — Disclosure copy, consent flow, and data retention policy shipped as part of the build. What competitors scramble to patch later, we ship complete on day one.",
      },
    ],
    callout: {
      ja: "次の10スライドが、この3つの空白を埋める答えだ。",
      en: "The next 10 slides are the specific answer to each of these three gaps.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AUTOMATION 01 — Spec 6 — JP-text-in-image generator
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-6-jp-text-in-image",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 01 ・ SPEC 6", en: "AUTOMATION 01 ・ SPEC 6" },
    title: {
      ja: "日本語テキスト、正確に。",
      en: "Japanese Text. Rendered Right.",
    },
    subtitle: {
      ja: "漢字も平仮名も、AIが正確に描画したグリッドカードを30秒で生成します。",
      en: "Brief the system in plain language — get a grid card with accurate kanji and hiragana in 30 seconds.",
    },
    bullets: [
      { ja: "Claudeがレイアウト指示を作成する", en: "Claude writes the layout brief from your prompt" },
      { ja: "Ideogram APIが画像を生成する", en: "Ideogram renders the image with accurate JP typography" },
      { ja: "AIが文字の正確さを検証して完成", en: "Vision AI verifies every character before it reaches you" },
    ],
    callout: {
      ja: "ついに、漢字も平仮名も正確に描けるAI画像ツールです。グリッドカードに載せたい文章を入力するだけで、30秒後には完成画像が届きます。Photoshopも、デザイナーへの往復依頼も不要です。",
      en: "Finally — an AI image tool that renders kanji and hiragana correctly. Type what you want the grid card to say, get a polished image 30 seconds later — no Photoshop, no designer back-and-forth.",
    },
    // Spec 6 simplified per Wave 2 flag — decision diamond labels trimmed for readability.
    mermaid: `flowchart LR
  A["ブリーフ"]:::start --> B["Claude<br/>レイアウト作成"]:::ai
  B --> C["Ideogram<br/>画像生成"]:::render
  C --> D["Claude Vision<br/>JP文字検証"]:::ai
  D --> E{"OK?"}:::gate
  E -- "yes" --> F["完成"]:::done
  E -- "no" --> B
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef render fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F0FF,stroke:#2563eb,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AUTOMATION 02 — Spec 1 — Comment-to-DM keyword responder
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-1-comment-to-dm",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 02 ・ SPEC 1", en: "AUTOMATION 02 ・ SPEC 1" },
    title: {
      ja: "コメントが、DMになる。即座に。",
      en: "Comment In. DM Out. Instantly.",
    },
    subtitle: {
      ja: "キーワードコメントを検知して、Claudeが書いたブランドらしい日本語DMを数秒で自動送信します。",
      en: "A follower comments a keyword — they receive an on-brand DM in fluent Japanese within seconds, automatically.",
    },
    bullets: [
      {
        ja: "投稿・リール・ストーリー・ライブを横断してリアルタイム検知",
        en: "Keyword detected on post, Reel, Story, or Live in real time",
      },
      {
        ja: "Claudeがブランドボイスで日本語DM文を生成",
        en: "Claude writes a brand-voice reply in fluent Japanese",
      },
      {
        ja: "公開返信とDMを数秒で自動送信",
        en: "Public reply and DM sent simultaneously within seconds",
      },
    ],
    callout: {
      ja: "フォロワーがキーワードをコメントすると、数秒以内にブランドらしい自然な日本語DMが届きます。テンプレートの硬さも、取りこぼしも、もうありません。",
      en: "When a follower comments a keyword on your post, they get a friendly, on-brand DM in fluent Japanese within seconds — no template-stiff replies, no missed inquiries.",
    },
    mermaid: `flowchart LR
  A["IG コメント<br/>Webhook"]:::start --> B["キーワード<br/>+ 言語判定"]:::ai
  B --> C["Claude<br/>返信生成 JP/EN"]:::ai
  C --> D["Redis<br/>レート制限"]:::infra
  D --> E["Graph API<br/>公開返信 + DM"]:::render
  E --> F["Postgres<br/>dm_log"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef render fill:#E6F0FF,stroke:#2563eb,color:#1D1D1F
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AUTOMATION 03 — Spec 5 — AI content scheduler
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-5-content-scheduler",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 03 ・ SPEC 5", en: "AUTOMATION 03 ・ SPEC 5" },
    title: {
      ja: "月曜の朝、下書きが届く。",
      en: "Monday Morning. Drafts Ready.",
    },
    subtitle: {
      ja: "過去12か月の投稿データからKS BRANDの「勝ちパターン」を学習し、1週間分のキャプション候補を自動生成します。",
      en: "The system learns your top-performing posts, identifies your winning patterns, and drafts a week of captions — waiting for your approval each Monday.",
    },
    bullets: [
      {
        ja: "直近12か月の投稿パフォーマンスを分析する",
        en: "12 months of post data analyzed for engagement patterns",
      },
      {
        ja: "Claudeが勝ちキャプション3案を生成する",
        en: "Claude drafts 3 caption options per slot in your brand voice",
      },
      {
        ja: "ダッシュボードで承認・編集・投稿",
        en: "Approve, edit, or reject each draft — nothing posts without your tap",
      },
    ],
    callout: {
      ja: "毎週月曜の朝、1週間分の投稿下書きが承認待ちになっています。4時間書く代わりに、10分で編集が完了します。",
      en: "Every Monday morning, a week's worth of post drafts in your winning voice are waiting for your approval — you spend 10 minutes editing instead of 4 hours writing.",
    },
    mermaid: `flowchart LR
  A["Cron 月曜 09:00"]:::start --> B["Postgres<br/>過去12か月投稿"]:::infra
  B --> C["Claude<br/>勝ちパターン分析"]:::ai
  C --> D["Claude<br/>キャプション3案生成"]:::ai
  D --> E["ダッシュボード<br/>承認・編集・却下"]:::render
  E --> F["Graph API<br/>予約投稿"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef render fill:#E6F0FF,stroke:#2563eb,color:#1D1D1F
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AUTOMATION 04 — Spec 8 — Reels video pipeline
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-8-reels-pipeline",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 04 ・ SPEC 8", en: "AUTOMATION 04 ・ SPEC 8" },
    title: {
      ja: "写真1枚から、Reelsへ。",
      en: "One Photo. One Reel. Ready to Post.",
    },
    subtitle: {
      ja: "商品写真と一行のタグラインから、日本語テロップ入りの10秒Reelsを数分で生成します。",
      en: "Give the system a product photo and a tagline — get a 10-second Reel with Japanese text overlay, ready to post in minutes.",
    },
    bullets: [
      {
        ja: "Claudeが10秒のショットスクリプトを作成する",
        en: "Claude writes a 10-second shot script from your brief",
      },
      {
        ja: "Runway APIが動画クリップを生成する",
        en: "Runway generates the video clip",
      },
      {
        ja: "FFmpegで日本語テロップを合成してReels投稿",
        en: "FFmpeg burns in Japanese subtitles — published to Reels via Graph API",
      },
    ],
    callout: {
      ja: "商品写真1枚から、日本語テキスト入りの10秒Reelsが数分で完成します。編集に1週間かけずに、Reelsカレンダーを絶やさず続けられます。",
      en: "Turn one product photo into a 10-second Reel with Japanese text overlay, ready to post in minutes — the right tool for keeping your Reels calendar full without burning your week on editing.",
    },
    mermaid: `flowchart LR
  A["商品写真<br/>+ タグライン"]:::start --> B["Claude<br/>10秒スクリプト"]:::ai
  B --> C["Runway<br/>gen4_turbo"]:::render
  C --> D["FFmpeg<br/>JP テロップ合成"]:::infra
  D --> E["Graph API<br/>Reels 投稿"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef render fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef infra fill:#E6F0FF,stroke:#2563eb,color:#1D1D1F
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AUTOMATION 05 — Spec 7 — Brand-LoRA photorealistic image generator
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-7-brand-lora",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 05 ・ SPEC 7", en: "AUTOMATION 05 ・ SPEC 7" },
    title: {
      ja: "KS BRANDの目線で、生成する。",
      en: "Campaign Images. Your Brand's Eye.",
    },
    subtitle: {
      ja: "厳選した20枚の商品写真でAIをトレーニングし、KS BRANDの世界観と一致したキャンペーンビジュアルを生成します。",
      en: "Train an AI model on 20 of your best product photos — then generate campaign visuals with consistent palette, lighting, and styling in seconds.",
    },
    bullets: [
      {
        ja: "厳選した20枚でKS LoRAをトレーニング",
        en: "KS BRAND LoRA trained on 20 curated product images",
      },
      {
        ja: "Claudeがキャンペーンのビジュアルブリーフを作成",
        en: "Claude writes the visual brief from your campaign concept",
      },
      {
        ja: "4バリアントを生成してAIがブランド適合度をランキング",
        en: "4 variants generated — AI ranks by brand-fit, you choose",
      },
    ],
    callout: {
      ja: "最高の商品写真20枚でAIをトレーニングすると、それ以降は「これはKS BRANDだ」と一目でわかるキャンペーンビジュアルを、数秒で生成できます。パレット、ライティング、スタイリング、すべて一貫しています。",
      en: "Train an AI model on 20 of your best product photos, and from then on generate campaign visuals that look unmistakably like KS BRAND — consistent palette, consistent lighting, consistent styling, generated in seconds.",
    },
    mermaid: `flowchart LR
  A["キャンペーン概念"]:::start --> B["Claude<br/>ブリーフ作成"]:::ai
  B --> C["FLUX + KS LoRA<br/>4バリアント生成"]:::render
  C --> D["Claude Vision<br/>ブランド適合度評価"]:::ai
  D --> E["ダッシュボード<br/>4案から選ぶ"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef render fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AUTOMATION 06 — Spec 4 — Brand-RAG AI DM replier
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-4-brand-rag-dm",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 06 ・ SPEC 4", en: "AUTOMATION 06 ・ SPEC 4" },
    title: {
      ja: "DM応答、ブランドの声で。",
      en: "DM Replies. Brand Voice. Every Time.",
    },
    subtitle: {
      ja: "商品カタログとブランドガイドで学習したAIが、相手に合わせた日本語でDMに返信します。",
      en: "An AI trained on your catalog, your style guide, and your past Q&A — answers DMs in the right Japanese register for whoever is asking.",
    },
    bullets: [
      {
        ja: "商品DB・スタイルガイド・過去Q&Aを学習させる",
        en: "Catalog, style guide, and 200+ historical Q&A pairs indexed",
      },
      {
        ja: "フォロワー属性で敬語/タメ口を自動切替する",
        en: "Persona tier auto-routes: casual JP for consumers, keigo for wholesale",
      },
      {
        ja: "24時間以内にブランドの声でDM返信を送信",
        en: "On-brand DM reply sent within the 24-hour messaging window",
      },
    ],
    callout: {
      ja: "DMはブランドの声で返信されます。サイズを聞いてきた20代にはカジュアルな日本語で、リードタイムを確認してきた卸先バイヤーには丁寧な敬語で。カタログは、すでにシステムが完全に把握しています。",
      en: "Your DMs get answered in your brand's voice — casual Japanese for a 20-something asking about sizing, proper keigo for a wholesale buyer asking about lead times — and the system already knows your catalog cold.",
    },
    mermaid: `flowchart LR
  A["着信DM<br/>Webhook"]:::start --> B["会話状態<br/>取得"]:::infra
  B --> C["pgvector RAG<br/>カタログ + FAQ"]:::ai
  C --> D["Claude<br/>ブランド声で返信"]:::ai
  D --> E["ペルソナ層で<br/>敬語/タメ口調整"]:::ai
  E --> F["レート制限<br/>+ 送信"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AUTOMATION 07 — Spec 2 — Engagement-triggered giveaway flow
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-2-giveaway-flow",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "自動化 07 ・ SPEC 2", en: "AUTOMATION 07 ・ SPEC 2" },
    title: {
      ja: "キャンペーン応募、全自動で。",
      en: "Giveaway on Autopilot. APPI-Ready.",
    },
    subtitle: {
      ja: "コメント応募から当選通知・クーポン配布まで、APPI開示コピー付きで全工程を自動化します。",
      en: "Comment entry, persona tagging, winner draw, coupon delivery — fully automated, with APPI disclosure copy shipped as part of the build.",
    },
    bullets: [
      {
        ja: "コメント応募を受付・重複除外・DM確認送信",
        en: "Comment entries captured, deduplicated, confirmed by DM",
      },
      {
        ja: "ペルソナエンジンが応募者全員にタグを付ける",
        en: "Persona engine tags every entrant while the campaign runs",
      },
      {
        ja: "自動抽選・当選DM・クーポンコード配信",
        en: "Automated draw, winner DM, coupon delivery — no manual steps",
      },
    ],
    callout: {
      ja: "眠っている間も、全応募者にペルソナタグが付きます。公正な抽選でクーポンを配布し、APPIに完全準拠。開示コピーはすでに用意されています。",
      en: "Run a giveaway that tags every entrant by persona while you sleep, picks winners fairly, and hands out coupons — fully legal under APPI, with the disclosure copy already written for you.",
    },
    mermaid: `flowchart LR
  A["応募コメント<br/>Webhook"]:::start --> B["検証 + 重複除外"]:::infra
  B --> C["DM確認送信"]:::ai
  C --> D["ペルソナエンジン<br/>(Spec 3)"]:::ai
  D --> E["Postgres<br/>entries"]:::infra
  E --> F["予約抽選 Cron"]:::infra
  F --> G["当選DM<br/>+ クーポン配信"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AUTOMATION 08 — Spec 9 — Hashtag tracker + social listening
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-9-hashtag-tracker",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 08 ・ SPEC 9", en: "AUTOMATION 08 ・ SPEC 9" },
    title: {
      ja: "毎週月曜、市場レポートが届く。",
      en: "Monday Market Report. In Japanese.",
    },
    subtitle: {
      ja: "ハッシュタグトレンドとKS BRANDへの言及をリアルタイムで追跡し、毎週日本語サマリーで届けます。",
      en: "Real-time hashtag tracking and brand-mention listening, delivered as a weekly Japanese digest.",
    },
    bullets: [
      {
        ja: "Graph APIで最大30タグを毎時スキャンする",
        en: "Up to 30 hashtags scanned hourly via Graph API",
      },
      {
        ja: "KS BRANDへの言及を1日4回モニタリング",
        en: "Brand mentions tracked 4x daily, sentiment analyzed",
      },
      {
        ja: "Claudeが毎週日本語でトレンドサマリーを作成",
        en: "Claude writes a weekly Japanese digest: rising, falling, sentiment",
      },
    ],
    callout: {
      ja: "毎週月曜、1ページの日本語レポートが届きます。今あなたの分野で最も伸びている3つのハッシュタグ、下落している3つ、そして今週KS BRANDがどんなトーンで語られているか。",
      en: "Every Monday, a one-page Japanese report lands in your inbox — the three hashtags rising fastest in your space right now, the three falling, and a sentiment read on how people are talking about KS BRAND this week.",
    },
    // Spec 9 simplified per Wave 2 flag — parallel branches consolidated into single combined feed for visual clarity.
    mermaid: `flowchart LR
  A["毎時 Cron"]:::start --> B["Graph API<br/>ハッシュタグ検索"]:::infra
  C["4回/日 Cron"]:::start --> D["ブランドメンション<br/>スキャン"]:::infra
  B --> E["Postgres<br/>hashtag_metrics"]:::infra
  D --> E
  E --> F["Claude<br/>トレンド + 感情分析"]:::ai
  F --> G["ダッシュボード<br/>週次日本語レポート"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AUTOMATION 09 — Spec 3 — Per-follower persona dossier engine
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-3-persona-dossier",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 09 ・ SPEC 3", en: "AUTOMATION 09 ・ SPEC 3" },
    title: {
      ja: "5万人の顔が、見えてくる。",
      en: "Know Your Followers. Actually Know Them.",
    },
    subtitle: {
      ja: "フォロワーの公開情報をClaudeが分析し、購買傾向・関心・エンゲージメント層のペルソナカードを自動生成します。",
      en: "Claude analyzes each follower's public content and produces a persona profile — so \"which of my 50,000 followers are likely premium buyers?\" has a data-backed answer.",
    },
    bullets: [
      {
        ja: "Graph APIでフォロワーの公開データをサンプリング",
        en: "Follower public data sampled via Graph API (Business/Creator accounts)",
      },
      {
        ja: "Claude Opusがマルチモーダルでペルソナを生成する",
        en: "Claude Opus analyzes posts and captions, outputs a structured persona card",
      },
      {
        ja: "ダッシュボードで検索・フィルタ・閲覧が可能",
        en: "Browse, filter, and search persona profiles from one dashboard",
      },
    ],
    callout: {
      ja: "すべてのフォロワーにペルソナプロフィールが付くダッシュボードです。「5万人のフォロワーのうち、プレミアム購買層はどの500人か？」という問いに、感覚ではなく証拠で答えられます。",
      en: "A dashboard where every follower has a persona profile — you can finally answer 'which 500 of my 50,000 followers are likely premium buyers?' with evidence, not gut feel.",
    },
    mermaid: `flowchart LR
  A["手動 or<br/>週次 Cron"]:::start --> B["フォロワー<br/>サンプリング"]:::infra
  B --> C["Graph API<br/>Business Discovery"]:::infra
  C --> D["Claude Opus<br/>マルチモーダル分析"]:::ai
  D --> E["Postgres<br/>follower_dossiers"]:::infra
  E --> F["ダッシュボード<br/>ペルソナ閲覧"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // AUTOMATION 10 — Spec 10 — IG ↔ LINE cross-channel identity bridge
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "spec-10-line-bridge",
    variant: "automation",
    transition: "slide",
    badge: { ja: "自動化 10 ・ SPEC 10", en: "AUTOMATION 10 ・ SPEC 10" },
    title: {
      ja: "田中さんは、1人のお客様。",
      en: "Tanaka-san Is One Customer. Everywhere.",
    },
    subtitle: {
      ja: "IG・LINE・メール・ECを横断して、同一顧客を1つのレコードに統合します。",
      en: "One customer record across Instagram, LINE, email, and e-commerce — every touchpoint unified, every channel connected.",
    },
    bullets: [
      {
        ja: "IG・LINE・メール・ECのイベントをリアルタイム連携",
        en: "IG, LINE, email, and e-commerce webhooks wired to one identity resolver",
      },
      {
        ja: "同一顧客を確率スコアで自動照合する",
        en: "Deterministic and AI-assisted fuzzy matching links records across channels",
      },
      {
        ja: "統合プロフィールをダッシュボードで一覧できる",
        en: "One unified profile per customer — all touchpoints visible in one place",
      },
    ],
    callout: {
      ja: "田中さんがInstagramでDMを送ってきたとき、彼女がLINE友達でもあり、過去2回購入していて、昨春メールリストに登録していたこともわかります。1人のお客様が、すべてのチャネルで1つのレコードになっています。",
      en: "When Tanaka-san DMs you on Instagram, you can see she's also your LINE friend, has bought from you twice, and signed up for your email list last spring — one customer, one record, across every channel.",
    },
    mermaid: `flowchart LR
  A["IG Webhook"]:::start --> D["ID リゾルバー"]:::ai
  B["LINE Webhook"]:::start --> D
  C["メール / EC<br/>Webhook"]:::start --> D
  D --> E["Postgres<br/>identities + edges"]:::infra
  E --> F["統合プロフィール<br/>ダッシュボード"]:::done
  E --> G["下流: ペルソナ・<br/>RAG・キャンペーン"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // CLOSING (14)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "closing",
    variant: "closing",
    transition: "scale",
    badge: { ja: "CLOSING", en: "CLOSING" },
    title: {
      ja: "これが今、実装可能です。",
      en: "These are buildable today.",
    },
    subtitle: {
      ja: "10点すべて、同じスタック（Claude Code + VPS + オープンソース）で動く。1点から始められる。",
      en: "All 10 run on the same stack. Pick one to start.",
    },
    bullets: [
      {
        ja: "このデッキに載っているのはコンセプトではない。すべて、今日から設計を始められる、実在するビルドだ。",
        en: "Nothing in this deck is a concept. Every item is a real build — designable starting today.",
      },
      {
        ja: "1点選んで、1週間のPOCから始める。それがMOTTOの進め方だ。",
        en: "Pick one. Start with a one-week proof of concept. That is how MOTTO builds.",
      },
    ],
    callout: {
      ja: "メニューは揃っている。選ぶのはKishi-sanだ。",
      en: "The menu is complete. The choice is Kishi-san's.",
    },
  },
];

const TOTAL_STEPS = SLIDES.length;

// ─────────────────────────────────────────────────────────────────────────────
// Presenter notes (one per slide, in slide order)
// ─────────────────────────────────────────────────────────────────────────────

type SlidePresenterNote = { timing: string; ja: string[]; en: string[] };

const PRESENTER_NOTES: SlidePresenterNote[] = [
  // 0 — Intro 1
  {
    timing: "60-90s",
    ja: [
      "ここで既存ツールを否定しているわけではない。ManyChatもlgramも、やるべき仕事はきちんとやっている。",
      "2026年にKishi-sanが問うているのは別の質問だ。「誰が来ているのか」「その人は何を求めているのか」「どう話しかけるべきか」——それはどのツールも答えていない。",
      "このスライドはその問いを立てるためのスライドで、批判するためのスライドではない。",
      "次のスライドから、その問いに対して何が建てられるかを見せていく。",
    ],
    en: [
      "This slide is not a tool takedown. ManyChat, lgram, iステップ — they all do their job.",
      "But by 2026, the question Kishi-san is asking is different: who is actually showing up, what do they care about, and how should we talk to them?",
      "No existing tool answers that. This slide establishes the question. The rest of the deck answers it.",
      "The gap is intelligence plus Japanese-native voice — at scale.",
    ],
  },
  // 1 — Intro 2
  {
    timing: "60-90s",
    ja: [
      "Kishi-sanはライン対話の中で自分から「ToSを破るのは長期戦略にならない」と言った。このスライドはその判断を裏付けるためにある。",
      "スクレイピングを使う競合他社は確かに存在するし、短期的には動く。でもKS BRANDの本番アカウントでそのリスクを取る理由はない。",
      "API制約をスライドで「できないこと」として謝罪するのではなく、「それが信頼の基盤になる」と前向きに提示する。",
      "APPIのくだりも同じで、開示コピーを法的な重荷ではなく、競合ツールが対応していない優位性として提示する。",
    ],
    en: [
      "Kishi-san said it on LINE himself — breaking ToS is not a long-term strategy. This slide backs that instinct with substance.",
      "Yes, scrapers exist. Yes, they currently work. But there is no good reason to run that risk on KS BRAND's real account.",
      "Never present the API constraints as an apology for what we cannot do. Present them as the design decision that makes the system trustworthy.",
      "APPI disclosure template is not a legal tax. It is a feature no other tool in the market ships as standard.",
    ],
  },
  // 2 — Intro 3
  {
    timing: "60-90s",
    ja: [
      "このスライドは「引き」のスライドだ。Kishi-sanに「次を見たい」と思わせる役割を持つ。",
      "3つの白地を具体的に名前で出すことで、次の10スライドが「ランダムなツールリスト」ではなく「この3つの問いへの答え」として見えるようになる。",
      "ペルソナ分析はKishi-san自ら提起した問いなので1番目に持ってきている。JPネイティブは2番目。APPIはコンプライアンスが差別化になるという2枚目の引き継ぎとして意図的に最後。",
    ],
    en: [
      "This is a pull slide. Its job is to make Kishi-san want the next 10.",
      "By naming the three gaps explicitly, the following automation slides read as specific answers to real questions — not a random tool inventory.",
      "Ordering is intentional. Per-follower persona is first because Kishi-san raised it himself. JP-native tone is second — the practical output. APPI compliance is third — a deliberate echo of Slide 2.",
      "By the time Kishi-san sees the first automation slide, he should be feeling pulled, not pushed.",
    ],
  },
  // 3 — Spec 6
  {
    timing: "60s",
    ja: [
      "日本語ブランドにとって、AI画像生成ツールの最大の課題は文字だった。漢字や平仮名が誤字だらけになる経験は誰でもしているはず。",
      "このシステムは3段階で問題を解決する。Claudeがレイアウト指示を生成 → Ideogram 3.0が描画 → Claudeが文字の正確さを判定。不合格なら自動再生成。",
      "結果として、文字品質が保証されたグリッドカードが30秒から1分で完成する。SNS投稿の頻度を上げながら、視覚品質を落とさない。",
    ],
    en: [
      "Japanese text rendering has been the silent failure mode of AI image tools. Every JP brand operator knows this burn.",
      "This system eliminates it in three steps. Claude writes an Ideogram-ready layout instruction. Ideogram renders. Claude returns as a vision reviewer.",
      "Result: a grid card with verified Japanese typography in under a minute. For a brand that publishes multiple grid assets per week, this is the highest-frequency time return in the menu.",
    ],
  },
  // 4 — Spec 1
  {
    timing: "60s",
    ja: [
      "これは「反応する」自動化。フォロワーがコメントを書くという行動を起点に、すべてが動く。",
      "Spec 4（DM返信）やSpec 5（コンテンツスケジューラー）との違いを明確に。Spec 1はコメントという公開サーフェスでの反応。",
      "ClaudeでKS BRANDの投稿コーパスで学習しているので、毎回ブランドの声に合った文章が生成される。投稿・リール・ストーリー・ライブの全サーフェスに対応。",
      "「DMを見落とした」という機会損失がゼロになる。",
    ],
    en: [
      "This is reactive automation on the comment surface. A follower's comment is the trigger.",
      "Distinction from Spec 4 and Spec 5 is load-bearing: Spec 1 handles keyword-triggered comments — reactive, public. Three different moments, three different roles.",
      "Most market tools send a template. Followers notice. This system uses Claude per-trigger, drawn from KS BRAND's voice. Coverage spans every Instagram surface.",
      "No missed inquiry.",
    ],
  },
  // 5 — Spec 5
  {
    timing: "60-90s",
    ja: [
      "これは「先回りする」自動化。Spec 1やSpec 4が「フォロワーの行動に反応する」のに対して、Spec 5は「投稿する前に動く」プロアクティブな自動化。",
      "KS BRANDの直近12か月の投稿とエンゲージメントデータを読み込み、エンゲージメント上位20%の言語パターンを抽出。",
      "Kishi-sanが翌週のトピックを入力するだけで、キャプション候補を3案ずつ生成。承認・編集・リジェクトはタップひとつ。承認されたものだけ自動投稿。",
      "大切な点：このシステムはKS BRAND自身の言葉から学ぶ。他のブランドのデータは使わない。",
    ],
    en: [
      "This is proactive automation on the feed surface. Where Spec 1 and Spec 4 react, Spec 5 works before anything happens.",
      "The system reads KS BRAND's 12-month post history, identifies the top 20% by engagement-per-follower, and extracts the linguistic patterns that drove those results.",
      "Three caption drafts per slot. Approve, edit, or reject — only approved drafts publish.",
      "Critical point: learns exclusively from KS BRAND's own data. Time math: 4 hours weekly → 10 minutes reviewing.",
    ],
  },
  // 6 — Spec 8
  {
    timing: "60s",
    ja: [
      "Reelsは今、Instagramのリーチで最も効果的なフォーマット。問題は制作コスト。撮影・編集・テロップ追加・書き出しを週に複数本は現実的でない。",
      "Kishi-sanが入力するのは商品写真とタグラインだけ。Claudeが10秒スクリプト → Runway Gen-4 Turboが映像生成 → FFmpegが日本語テロップを自動合成 → Graph API経由でReels投稿。",
      "目指しているのはReelsカレンダーを絶やさないこと。大型キャンペーンのヒロー動画を代替するものではない。",
      "動画はすべてダッシュボードでプレビューしてから投稿。自動投稿はしない。",
    ],
    en: [
      "Reels drive more organic reach than any other format on Instagram. The problem is production cost.",
      "Kishi-san provides a product photo and a tagline. Claude writes a Runway-ready motion script. Runway generates. FFmpeg burns in JP subtitles. Graph API publishes.",
      "Honest positioning: right tool for keeping the Reels calendar full at consistent cadence. Not a replacement for a videographer on a hero campaign.",
      "Every clip previews in the dashboard before posting. Nothing goes live without Kishi's approval.",
    ],
  },
  // 7 — Spec 7
  {
    timing: "60-90s",
    ja: [
      "LoRAは特定のビジュアルスタイルをAIに「覚えさせる」ファインチューニング。KS BRANDの商品写真20枚を素材にすると、ライティングのクセ、パレットの傾向、スタイリングの美意識を学ぶ。",
      "ClaudeがKS BRANDのスタイルガイドを参照しながら指示文を作り、FLUX APIが4パターン生成。Claude Opusがスタイルガイドと照合してランキング。",
      "1点正直に：このシステムの品質は、20枚の写真の品質に依存する。ウィーク1は一緒にその20枚を選ぶところから始める。",
      "LoRAは四半期ごとに更新して精度を保つ。",
    ],
    en: [
      "LoRA is a fine-tuning technique. When KS BRAND's top 20 product photos become the training set, the model learns the brand's lighting, palette, and styling at a deep level.",
      "Claude writes a FLUX-ready brief. FLUX generates four variants. Claude Opus ranks them by brand-fit.",
      "One honest note: quality is directly tied to the quality of the 20 training images. Week 1 is a joint curation session.",
      "LoRA refreshes quarterly to maintain accuracy as the brand's visual language evolves.",
    ],
  },
  // 8 — Spec 4
  {
    timing: "60-90s",
    ja: [
      "Spec 1との違いを明確に。Spec 1はコメントというパブリックサーフェスでキーワードに反応。Spec 4はDMというプライベートサーフェスで、会話全体を読んで答える。同じDMだが役割が違う。",
      "Spec 4のAIはKS BRANDの商品カタログ・スタイルガイド・過去Q&A 200件以上をベクトルDBに格納。DMが届くとベクトル検索で関連情報を引き、Claudeが返信を生成。",
      "もうひとつの特徴がトーン自動切替。Spec 3のペルソナデータを参照して、一般消費者にはカジュアル、卸先バイヤーには敬語を自動切替。既存SaaSにはない機能。",
    ],
    en: [
      "Distinction from Spec 1 is load-bearing. Spec 1 is reactive on the comment surface. Spec 4 is reactive on the DM surface — open conversation, brand-knowledge-driven.",
      "Trained on full product catalog, brand style guide, and 200+ historical customer Q&A pairs — all indexed in a vector database. Claude draws on indexed, KS-specific information — it does not guess.",
      "Tone-routing is the second differentiator. Reads the follower's persona tier from Spec 3 and routes accordingly. One system, two registers, no manual switching.",
    ],
  },
  // 9 — Spec 2
  {
    timing: "60-90s",
    ja: [
      "キャンペーン応募の運営は規模が大きくなると手に負えなくなる。応募受付・重複除外・抽選・連絡・クーポン配布。数百件以上で限界。",
      "このシステムはその全工程を自動化。応募コメントをリアルタイム検知 → Redisで重複除外 → Claude生成のDM確認 → n8nスケジューラで抽選 → 当選者にクーポンDM。",
      "Spec 3のペルソナエンジンが組み合わさる。応募者全員にペルソナタグ。「今回反応したのはどんな顧客層か」がわかり、次のキャンペーン設計のインプットになる。",
      "APPI対応は後付けではなくビルドに含まれる。開示コピー、プライバシーページ、DM確認文フッター——すべて納品物の一部。",
    ],
    en: [
      "Running a giveaway manually at scale is genuinely hard. At hundreds of entries, operational weight grows fast.",
      "Full pipeline automated. Entries captured via Graph API webhook, deduplicated via Redis, confirmed by Claude-written DM. Draw runs on Postgres-backed scheduler in n8n. Winners receive coupon DM.",
      "Spec 3 persona engine runs in parallel: every entrant tagged. When campaign closes, Kishi-san sees which segments responded — informs next campaign's targeting.",
      "APPI compliance is a deliverable, not a to-do.",
    ],
  },
  // 10 — Spec 9
  {
    timing: "60-90s",
    ja: [
      "ハッシュタグ戦略を「感覚」か「データ」かで結果が変わる。このシステムは後者を、外部SaaSなしで実現。",
      "Graph APIのハッシュタグ検索エンドポイントで最大30個を毎時計測。KS BRANDへのメンションは1日4回スキャン。すべてPostgresに蓄積し、Claudeが週次サマリーを日本語生成。",
      "サマリーは3点に絞る。今週最も伸びたハッシュタグ上位3つ、下落した3つ、KS BRANDへのメンションの感情トーン。",
      "1点の制約を透明に：Graph API仕様上、同時トラッキングできるユニークハッシュタグは7日間で30個まで。Phase 2の補足：AIアシスタント回答内でのブランド言及追跡はPhase 2対応。",
    ],
    en: [
      "Hashtag strategy run on instinct vs strategy run on data produce different results. This delivers the data layer, without a paid SaaS license.",
      "Up to 30 hashtags tracked hourly. Brand mentions scanned four times daily. All data in Postgres. Each Monday, Claude writes a Japanese digest.",
      "The digest is intentionally narrow: three rising, three falling, one sentiment read. Not a data dump — a decision-ready summary.",
      "One constraint: 30 unique hashtags per 7-day window per access token. Phase 2 note: AI-assistant response tracking held for Phase 2.",
    ],
  },
  // 11 — Spec 3
  {
    timing: "90s",
    ja: [
      "これがKishi-sanの最初のリクエスト。「フォロワーが誰なのかを知りたい」。このシステムはその答え。",
      "Graph APIのBusiness Discovery APIで、ビジネス/クリエイターアカウントのフォロワーの公開プロフィール・投稿・キャプションを取得。個人アカウントは取得不可（API仕様上の制約）。カバレッジは20〜40%と見込まれる。期待値を正しく設定。",
      "取得データはClaude Opusでペルソナ生成。「年齢帯・性別推定・関心クラスター・購買シグナル・プレミアム購買層確率」など。",
      "ダッシュボードで閲覧・フィルタ。「プレミアム購買層確率が高い上位500人」がタップひとつ。APPI開示コピー、プライバシーページはビルド納品物。",
    ],
    en: [
      "This was Kishi-san's original ask. \"I want to know who my followers are.\" This system answers it.",
      "Business Discovery endpoint pulls public profile data from Business/Creator accounts. Personal accounts not accessible — hard platform constraint. Expected coverage 20–40%.",
      "Data goes to Claude Opus for multimodal analysis. Output is structured: age band, gender inference, interests, buying signals, engagement tier, premium buyer likelihood.",
      "\"Show me top 500 by premium buyer likelihood\" is a single filter operation. APPI compliance is a build deliverable.",
    ],
  },
  // 12 — Spec 10
  {
    timing: "60-90s",
    ja: [
      "これはデッキの締めくくり直前のスライドであり、前の9つの自動化すべてが接続される基盤。それぞれの自動化はスタンドアローンで価値があるが、Spec 10が加わるとIG・LINE・メール・ECの顧客データが1つのレコードに統合される。",
      "各チャネルのWebhookが届くたびにIDリゾルバーが「この人は誰か」を判定。メールアドレスや電話番号など確定的な一致は即統合。IG IDとLINE表示名のように曖昧な一致は、Claudeが確率スコアを算出。",
      "LINE APIのコストは送信量依存。月間送信件数でライト/スタンダードが決まる。詳細はプロポーザルフェーズで。メニューデッキでは固定費用は示さない。",
      "異なるチャネルの情報を内部で統合することはAPPI上問題なし。ただし開示は必要。テンプレートはビルド納品物に含まれる。",
    ],
    en: [
      "This is the closing automation — and the one that connects everything before it. Each of the nine previous slides can stand alone.",
      "Identity resolver works on every webhook event. Deterministic matches merge immediately. Fuzzy matches go through Claude confidence-scoring.",
      "LINE API cost varies by outbound push volume. Right plan depends on actual LINE usage. That conversation belongs in the proposal phase. No fixed number in this deck.",
      "APPI note: internal cross-channel linking is permitted with disclosure. Privacy notice template is included.",
    ],
  },
  // 13 — Closing
  {
    timing: "60s",
    ja: [
      "このスライドはCTAではない。デッキ全体の着地点として「あとはKishi-sanが動くタイミングで」というメッセージを静かに置く。",
      "明示的な「ご連絡ください」は書かない——LINEでの返信はLewisが別途送る。デッキの役割はメニューを完全に提示することであり、次のステップを迫ることではない。",
      "対面・通話でプレゼンする機会があれば、「どれが一番気になりましたか？」と一言添えると自然に次の会話につながる。",
      "急かさない、でも止まらない。それがこのデッキのトーン。",
    ],
    en: [
      "This is not a CTA slide. It is the quiet landing point of the whole deck — \"when you're ready, the menu is here.\"",
      "No explicit \"contact us.\" Lewis will send the LINE follow-up separately. The deck's job is to present the menu completely.",
      "If presented live, a single spoken line — \"which of these caught your eye?\" — opens the next conversation naturally without pressure.",
      "The tone throughout: direct, no hedging, no urgency. The menu is complete. The next move is Kishi-san's.",
    ],
  },
];

// Wave 4 polish (CPO sign-off): anonymized notes shown unless the URL carries
// `?presenter=1`. Live route at /presentation/ks-brand-automations now defaults
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

  // Mount Mermaid for all automation slides (3..12 inclusive)
  useMermaidSlide(slideIndex, 3, 12);

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
