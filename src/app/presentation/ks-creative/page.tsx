"use client";

/**
 * KS BRAND — "AI Creative Production" Capabilities Showcase Deck (ks-creative)
 *
 * Built 2026-06-08 (autonomous wave loop). Sibling of ks-brand-line — a
 * content-swap clone of that proven Next.js presentation pattern, ADDING a new
 * "gallery" image-forward slide variant. Shares all render helpers + components
 * in src/components/presentation/.
 *
 * Purpose: show the QUALITY of June-2026 AI image output for beauty / skincare /
 * makeup EC creative — generated product shots, retouch / background edits,
 * scene & lifestyle swaps, and one-base-to-many variations + packaging text.
 * ONE light "how it's built" pipeline at the end. NOT a priced proposal.
 *
 * 7 slides (bilingual JA/EN, default JA):
 *   0. title             (intro)                                    MOTTO × KS BRAND
 *   1. gen                (gallery — generated product visuals)      REAL EXAMPLES · GENERATED
 *   2. edit               (gallery — before→after / retouch)         REAL EXAMPLES · EDITED
 *   3. style              (gallery — scene / background / model)     REAL EXAMPLES · STYLED
 *   4. scale              (gallery — variations + JP packaging text) REAL EXAMPLES · AT SCALE
 *   5. pipeline          (automation — light "how it's built")      READY TO BUILD
 *   6. close              (closing)                                  MOTTO × KS BRAND
 *
 * HONESTY mechanism: every gallery image carries a caption naming the third-party
 * AI tool that produced it. Each gallery slide + the closing slide carry an
 * explicit copyright/honesty line: the images are illustrative third-party tool
 * outputs shown to indicate quality — NOT MOTTO client work. The creative
 * PIPELINE badge = READY TO BUILD (構想); the tools' output quality shown is real.
 *
 * Real embedded images (served from /public/gallery, downloaded 2026-06-08):
 *   - Pebblely (pebblely.com skincare gallery) — SK-II, Laneige, serum shots
 *   - Flair.ai (flair.ai beauty gallery) — OUAI, Kylie, ginseng line, bath scene
 * All images verified as real JPEG/PNG > 10KB before embedding.
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
  variant: "intro" | "automation" | "closing" | "gallery";
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
   * diagram-wide grid (0.9fr_1.8fr) so the diagram has room to breathe.
   */
  wideMermaid?: boolean;
  /**
   * Gallery-variant slides carry a set of locally-served example images. Each
   * caption MUST name the third-party AI tool that produced the image (honesty).
   */
  images?: { src: string; alt: string; caption?: Bilingual }[];
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES — 7 slides (AI creative quality showcase)
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
      ja: "AIクリエイティブ制作",
      en: "AI Creative Production",
    },
    subtitle: {
      ja: "2026年6月、AIで「作る」「直す」、ECの商品クリエイティブ。",
      en: "June 2026 — generating and editing EC product creative with AI.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 1 — 生成 GENERATED (gallery) — 6 real images
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "gen",
    variant: "gallery",
    transition: "slide",
    badge: { ja: "実例 ・ 生成", en: "REAL EXAMPLES ・ GENERATED" },
    title: {
      ja: "生成 — AIが一から作る商品ビジュアル。",
      en: "Generated — Product Visuals Built from Scratch by AI.",
    },
    subtitle: {
      ja: "スタジオも撮影も使わずに、AIがスキンケア・コスメの商品ビジュアルを一から生成する。下は、外部AIツールの実際の出力例。",
      en: "Without a studio or a shoot, AI generates skincare and cosmetics product visuals from scratch. Below — real outputs from external AI tools.",
    },
    images: [
      {
        src: "/gallery/gen-skin-skii-pink.jpg",
        alt: "AI-generated serum bottle on a soft pink studio podium",
        caption: { ja: "生成例: Pebblely", en: "Generated with Pebblely" },
      },
      {
        src: "/gallery/gen-serum-yellow.jpg",
        alt: "AI-generated dropper serum on a yellow studio backdrop",
        caption: { ja: "生成例: Pebblely", en: "Generated with Pebblely" },
      },
      {
        src: "/gallery/gen-serum-daisy.jpg",
        alt: "AI-generated facial oil among daisies in golden light",
        caption: { ja: "生成例: Pebblely", en: "Generated with Pebblely" },
      },
      {
        src: "/gallery/gen-laneige-snow.jpg",
        alt: "AI-generated cream jar on a sunlit snowy mountain",
        caption: { ja: "生成例: Pebblely", en: "Generated with Pebblely" },
      },
      {
        src: "/gallery/flair-beauty-01.png",
        alt: "AI-generated body creme jar on a marble surface",
        caption: { ja: "生成例: Flair.ai", en: "Generated with Flair.ai" },
      },
      {
        src: "/gallery/flair-beauty-02.png",
        alt: "AI-generated makeup flatlay on a pink background",
        caption: { ja: "生成例: Flair.ai", en: "Generated with Flair.ai" },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 2 — 編集 EDITED / Before→After (gallery) — 5 real images
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "edit",
    variant: "gallery",
    transition: "slide",
    badge: { ja: "実例 ・ 編集", en: "REAL EXAMPLES ・ EDITED" },
    title: {
      ja: "編集 — Before → After（背景除去・色補正・レタッチ）。",
      en: "Edited — Before → After (Background Removal, Color, Retouch).",
    },
    subtitle: {
      ja: "1枚の素材から、背景を抜き、色を整え、影や質感を補う。同じ商品を、配信先ごとにきれいなクリーン背景／質感背景へ仕上げ直す。",
      en: "From one source photo: cut the background, balance the color, restore shadow and texture — the same product re-finished onto clean or textured backdrops per channel.",
    },
    images: [
      {
        src: "/gallery/gen-skin-skii-water.jpg",
        alt: "Edited serum bottle composited onto a clean bathroom scene",
        caption: { ja: "編集例: Pebblely", en: "Edited with Pebblely" },
      },
      {
        src: "/gallery/gen-laneige-silk.jpg",
        alt: "Edited cream jar retouched onto soft silk fabric",
        caption: { ja: "編集例: Pebblely", en: "Edited with Pebblely" },
      },
      {
        src: "/gallery/gen-serum-marble.jpg",
        alt: "Edited facial oil placed on a marble counter with daylight",
        caption: { ja: "編集例: Pebblely", en: "Edited with Pebblely" },
      },
      {
        src: "/gallery/scene-laneige-water.jpg",
        alt: "Edited cream jar floating over a calm water surface",
        caption: { ja: "編集例: Pebblely", en: "Edited with Pebblely" },
      },
      {
        src: "/gallery/flair-beauty-03.png",
        alt: "Edited bath and body set staged in a candlelit spa scene",
        caption: { ja: "編集例: Flair.ai", en: "Edited with Flair.ai" },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 3 — 演出 STYLED / scene & model swaps (gallery) — 6 real images
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "style",
    variant: "gallery",
    transition: "slide",
    badge: { ja: "実例 ・ 演出", en: "REAL EXAMPLES ・ STYLED" },
    title: {
      ja: "演出 — 背景・シーン・モデル/ライフスタイル差し替え。",
      en: "Styled — Swap Background, Scene, Model & Lifestyle.",
    },
    subtitle: {
      ja: "同じ1つの商品を、季節・季節感・売り場・気分に合わせて何通りもの世界観へ。撮り直しなしで、シーンだけを差し替える。",
      en: "Take one product into many worlds — by season, mood, or sales channel. No reshoot; just swap the scene around it.",
    },
    images: [
      {
        src: "/gallery/scene-skii-bathroom.jpg",
        alt: "Same serum styled in a bright bathroom with towels and plants",
        caption: { ja: "演出例: Pebblely", en: "Styled with Pebblely" },
      },
      {
        src: "/gallery/scene-skii-monstera.jpg",
        alt: "Same serum styled in a minimal scene with a monstera leaf",
        caption: { ja: "演出例: Pebblely", en: "Styled with Pebblely" },
      },
      {
        src: "/gallery/scene-serum-forest.jpg",
        alt: "Same facial oil styled on wood with a sunlit forest path",
        caption: { ja: "演出例: Pebblely", en: "Styled with Pebblely" },
      },
      {
        src: "/gallery/scene-laneige-purple.jpg",
        alt: "Same cream jar styled against a lake at purple twilight",
        caption: { ja: "演出例: Pebblely", en: "Styled with Pebblely" },
      },
      {
        src: "/gallery/gen-laneige-snow.jpg",
        alt: "Same cream jar styled on a sunlit snowy mountain scene",
        caption: { ja: "演出例: Pebblely", en: "Styled with Pebblely" },
      },
      {
        src: "/gallery/gen-serum-daisy.jpg",
        alt: "Same facial oil styled among daisies in a meadow",
        caption: { ja: "演出例: Pebblely", en: "Styled with Pebblely" },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 4 — 量産 AT SCALE / variations + packaging text (gallery) — 6 real images
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "scale",
    variant: "gallery",
    transition: "slide",
    badge: { ja: "実例 ・ 量産", en: "REAL EXAMPLES ・ AT SCALE" },
    title: {
      ja: "量産 — 1枚からバリエーション展開＋パッケージ・日本語テキスト合成。",
      en: "At Scale — Many Variations from One Base + Packaging Text.",
    },
    subtitle: {
      ja: "1つの商品から、配信チャネル分のバリエーションを一気に。さらにパッケージ上の文字（非ラテン文字・日本語含む）も生成できる段階に。",
      en: "From one product, generate a full set of channel-ready variations at once — and now even text on packaging, including non-Latin scripts and Japanese.",
    },
    images: [
      {
        src: "/gallery/gen-serum-yellow.jpg",
        alt: "Variation 1 of the same serum on a yellow studio backdrop",
        caption: { ja: "量産例: Pebblely（同一商品・1/4）", en: "At scale: Pebblely (same product, 1/4)" },
      },
      {
        src: "/gallery/gen-serum-marble.jpg",
        alt: "Variation 2 of the same serum on a marble counter",
        caption: { ja: "量産例: Pebblely（同一商品・2/4）", en: "At scale: Pebblely (same product, 2/4)" },
      },
      {
        src: "/gallery/scene-serum-forest.jpg",
        alt: "Variation 3 of the same serum with a forest backdrop",
        caption: { ja: "量産例: Pebblely（同一商品・3/4）", en: "At scale: Pebblely (same product, 3/4)" },
      },
      {
        src: "/gallery/gen-serum-daisy.jpg",
        alt: "Variation 4 of the same serum among daisies",
        caption: { ja: "量産例: Pebblely（同一商品・4/4）", en: "At scale: Pebblely (same product, 4/4)" },
      },
      {
        src: "/gallery/flair-beauty-04.png",
        alt: "AI-generated skincare line with East-Asian text rendered on packaging",
        caption: { ja: "テキスト合成例: Flair.ai（パッケージ文字）", en: "Packaging text: Flair.ai" },
      },
      {
        src: "/gallery/flair-beauty-02.png",
        alt: "AI-generated makeup set flatlay with brand lettering",
        caption: { ja: "テキスト合成例: Flair.ai（ブランド文字）", en: "Brand lettering: Flair.ai" },
      },
    ],
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 5 — どうやって作るか / pipeline (automation, wideMermaid) — READY TO BUILD
  // ONLY slide with mermaid.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "pipeline",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "構想 ・ これから", en: "READY TO BUILD" },
    title: {
      ja: "どうやって作るか。",
      en: "How It Gets Built.",
    },
    subtitle: {
      ja: "上で見た品質を、KS BRANDの商品で量産するための制作フロー。ブリーフ作成から、生成・編集、バッチ量産＋QA、Shopify／公式LINEへの反映まで一本に通す。",
      en: "The production flow to reproduce the quality shown above with KS BRAND's products — from brief to generation and editing, batch production with QA, and publishing to Shopify and Official LINE.",
    },
    bullets: [
      {
        ja: "Claude Code が、商品とブランドガイドからクリエイティブのブリーフ（指示書）を作成する。",
        en: "Claude Code drafts the creative brief from the product and the brand guide.",
      },
      {
        ja: "画像生成・編集APIで生成し、n8nがバッチで量産。生成物はQA（品質チェック）を通す。",
        en: "Image generation and editing APIs produce the assets; n8n batches them at scale, and each output passes a QA check.",
      },
      {
        ja: "承認された画像を、Shopify と公式LINE へ自動で反映する。商品写真・ブランドガイドを常に参照しながら。",
        en: "Approved images publish automatically to Shopify and Official LINE — always referencing the product photos and brand guide.",
      },
    ],
    callout: {
      ja: "※ この制作フローはこれから一緒に組む部分です。上の品質は外部ツールの実際の出力。実制作ではKS BRANDの商品でMOTTOが生成します。",
      en: "Note — this production flow is what we'd build together next. The quality above is real third-party tool output; in the real build, MOTTO generates with KS BRAND's own products.",
    },
    mermaid: `flowchart LR
  A["ブリーフ作成<br/>（Claude Code）"]:::ai --> B["画像生成・<br/>編集API"]:::ai
  B --> C["n8nで<br/>バッチ生成＋QA"]:::infra
  C --> D["Shopify／<br/>公式LINEへ反映"]:::done
  R["参照<br/>（商品写真・<br/>ブランドガイド）"]:::infra -.-> A
  R -.-> B
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 6 — Closing (closing)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "close",
    variant: "closing",
    transition: "scale",
    badge: { ja: "MOTTO × KS BRAND", en: "MOTTO × KS BRAND" },
    title: {
      ja: "今のAIは、ここまで作れる。次は、KS BRANDの商品で。",
      en: "This is how far AI can go today. Next — with KS BRAND's products.",
    },
    subtitle: {
      ja: "掲載画像は各ツールの出力例。実制作ではKS BRANDの商品でMOTTOが生成します。",
      en: "The images shown are illustrative outputs from external tools. In the real build, MOTTO generates with KS BRAND's own products.",
    },
    callout: {
      ja: "作る。直す。量産する。あとは、KS BRANDの商品で。",
      en: "Generate. Edit. Scale. The only thing left — KS BRAND's products.",
    },
  },
];

const TOTAL_STEPS = SLIDES.length;

// ─────────────────────────────────────────────────────────────────────────────
// Presenter notes (one per slide, in slide order) — gated behind ?presenter=1.
// Half-width numbers. Timing + ja[] + en[].
// ─────────────────────────────────────────────────────────────────────────────

type SlidePresenterNote = { timing: string; ja: string[]; en: string[] };

const PRESENTER_NOTES: SlidePresenterNote[] = [
  // 0 — Title
  {
    timing: "30s",
    ja: [
      "まず一言。今日見せたいのは「2026年6月のAIで、ECの商品クリエイティブがどこまで作れるか」です。難しいバックエンドの話は最小限。中心は、生成と編集の『品質』そのもの。これは提案書ではなく、可能性のデモです。",
    ],
    en: [
      "Open simply: what we want to show today is how far June-2026 AI can take EC product creative. Minimal backend talk — the focus is the quality of generation and editing itself. This is a capability demo, not a proposal.",
    ],
  },
  // 1 — gen (Generated)
  {
    timing: "60-75s",
    ja: [
      "ここからが本題。これらは外部のAIツールが実際に生成した、スキンケア・コスメの商品ビジュアルです。",
      "スタジオも撮影も使っていません。AIが一から作っています。",
      "ピンクのスタジオ、黄色背景、デイジー畑、雪山——どれも撮影なしでこの仕上がり。",
      "正直にお伝えすると、これらはMOTTOの制作物ではなく、各ツールの公開された出力例です。品質の参考として見ていただくものです。実制作ではKS BRANDの商品で作ります。",
    ],
    en: [
      "Now the core. These are real skincare and cosmetics product visuals generated by external AI tools.",
      "No studio, no shoot — AI built them from scratch.",
      "Pink studio, yellow backdrop, a daisy meadow, a snowy peak — all without a camera.",
      "To be transparent: these are not MOTTO's work; they are the tools' own published outputs, shown to indicate the quality bar. In the real build we'd generate with KS BRAND's products.",
    ],
  },
  // 2 — edit (Edited / Before → After)
  {
    timing: "60-75s",
    ja: [
      "次は『編集』。1枚の素材から、背景を抜き、色を整え、影や質感を補い直す。",
      "同じ商品でも、配信先によってクリーンな白背景が欲しいとき、シルクや水面のような質感背景が欲しいときがあります。それを撮り直しなしで作り分けます。",
      "ここでもツール名を明記しています。Pebblely、Flair.ai——いずれも実際の出力です。",
    ],
    en: [
      "Next, editing. From a single source photo: cut the background, balance the color, restore shadow and texture.",
      "The same product sometimes needs a clean white background, sometimes a silk or water texture — produced per channel, with no reshoot.",
      "Tool names are labelled here too — Pebblely, Flair.ai — all real outputs.",
    ],
  },
  // 3 — style (Styled / scene swaps)
  {
    timing: "60-75s",
    ja: [
      "『演出』です。ここがいちばん分かりやすい。",
      "見てください——同じ1つの商品が、バスルーム、観葉植物、森の道、夕暮れの湖、雪山、デイジー畑と、まったく違う世界観に置き換わっています。",
      "季節キャンペーン、売り場、気分。同じ商品を、撮り直しなしで何通りにも演出できる。これがECで効きます。",
    ],
    en: [
      "Styling — this one is the clearest.",
      "Look: the same single product appears in a bathroom, with a monstera leaf, on a forest path, by a lake at dusk, on a snowy peak, in a daisy meadow — entirely different worlds.",
      "Seasonal campaigns, sales channels, moods — the same product styled many ways, no reshoot. This is what moves the needle in EC.",
    ],
  },
  // 4 — scale (At scale / variations + packaging text)
  {
    timing: "60-75s",
    ja: [
      "『量産』。1枚の商品から、配信チャネル分のバリエーションを一気に出します。",
      "この4枚は同じ1本のセラムです。黄色背景、マーブル、森、デイジー——1商品から4パターン。これを何十点規模でも回せます。",
      "そして、ここが2026年の進化。パッケージ上の文字も生成できる段階に来ています。右の2枚は、非ラテン文字（東アジア言語）やブランド文字がパッケージに乗っている例です。",
      "日本語テキストの精度はツールによって差があるので、実制作では文字特化ツール（Ideogramなど）を使い分けます。ここは正直に。",
    ],
    en: [
      "At scale. From one product, produce a full set of channel variations at once.",
      "These four are the same single serum — yellow, marble, forest, daisies. One product, four looks; we can run this at dozens of SKUs.",
      "And here is the 2026 leap: text on packaging can now be generated. The two on the right show non-Latin (East-Asian) scripts and brand lettering rendered onto the packaging.",
      "Japanese text accuracy varies by tool, so in the real build we'd route text-heavy work to a text specialist like Ideogram. Be honest about that.",
    ],
  },
  // 5 — pipeline (How it's built) — READY TO BUILD
  {
    timing: "60s",
    ja: [
      "最後に、どうやって作るか。バックエンドの話はここだけ、軽く。",
      "Claude Code が商品とブランドガイドからブリーフを作り、画像生成・編集APIで作り、n8nがバッチで量産しながらQAを通し、承認後にShopifyと公式LINEへ反映する。商品写真とブランドガイドを常に参照しながら。",
      "バッジは『構想・これから』です。この制作フロー自体はこれから一緒に組む部分。上で見せた品質は外部ツールの実出力ですが、フローはまだ建てていません。ここで誇張しないことが信頼になります。",
    ],
    en: [
      "Finally, how it's built — the only backend slide, kept light.",
      "Claude Code drafts the brief from the product and brand guide; generation and editing APIs produce assets; n8n batches them with a QA gate; approved images publish to Shopify and Official LINE — always referencing the product photos and brand guide.",
      "The badge says READY TO BUILD. This production flow is what we'd build together next. The quality shown is real third-party output, but the flow itself isn't built yet — not overclaiming here is what earns trust.",
    ],
  },
  // 6 — close
  {
    timing: "30s",
    ja: [
      "締め。今のAIは、ここまで作れます。次は、KS BRANDの商品で。",
      "もう一度はっきりと——掲載画像は各ツールの出力例で、MOTTOの制作物ではありません。実制作ではKS BRANDの商品でMOTTOが生成します。そこからご一緒できれば。",
    ],
    en: [
      "Close: this is how far AI can go today. Next — with KS BRAND's products.",
      "Once more, plainly: the images shown are external tools' outputs, not MOTTO's work. In the real build, MOTTO generates with KS BRAND's own products. We'd love to start there.",
    ],
  },
];

// Anonymized notes shown unless the URL carries `?presenter=1`.
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

function renderGallerySlide(slide: SlideDef, lang: Lang) {
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

        {slide.images && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-5 w-full">
            {slide.images.map((img, i) => (
              <div key={i} className="flex flex-col">
                {/* Plain <img> (NOT next/image) — images served locally from /public. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-44 object-cover rounded-lg border border-[#E8E8ED] bg-white"
                />
                {img.caption && (
                  <p className="mt-1.5 text-[11px] text-[#86868B]">
                    {img.caption[lang]}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Honesty line — copyright / attribution disclosure on every gallery slide. */}
        <p className="mt-5 text-[11px] text-[#86868B] leading-relaxed">
          {lang === "ja"
            ? "各画像は外部AIツールの出力例（出典明記）。品質の参考として掲載。"
            : "Each image is an illustrative output from an external AI tool, shown with attribution to indicate quality."}
        </p>
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
              {lang === "ja" ? "正直なところ" : "Honest note"}
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
    case "gallery":
      return renderGallerySlide(slide, lang);
    case "automation":
      return renderAutomationSlide(slide, lang, slideIndex);
    case "closing":
      return renderClosingSlide(slide, lang);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

function KsCreativeDeckInner() {
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

  // Mount Mermaid for the pipeline slide ONLY (slide 5). Gallery slides have no
  // mermaid. Range = index 5..5 inclusive.
  useMermaidSlide(slideIndex, 5, 5);

  const currentNote = notesSource[slideIndex];

  return (
    <div
      role="application"
      aria-label="KS BRAND — AI Creative Production — use arrow keys or click to navigate"
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
export default function KsCreativeDeck() {
  return (
    <Suspense fallback={<div className="h-screen bg-white" />}>
      <KsCreativeDeckInner />
    </Suspense>
  );
}
