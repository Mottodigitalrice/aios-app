"use client";

/**
 * KS BRAND — "What's Possible with Official LINE" Capabilities Showcase Deck
 *
 * Built 2026-06-05 (autonomous wave loop). Sibling of ks-brand-automations —
 * a content-swap clone of that proven Next.js presentation pattern. Shares all
 * render helpers + components in src/components/presentation/.
 *
 * Purpose: a teaser of what an Official LINE account can do when wired to a
 * database + n8n + Claude Code. NOT a priced proposal — a menu of possibility.
 * We hear what Kishi-san wants at the Mon 2026-06-08 16:00 JST scoping meeting,
 * then quote.
 *
 * 6 slides (bilingual JA/EN, default JA):
 *   0. title        (intro — menu, not proposal)
 *   1. cap-database (automation — connect LINE to a DB)        BUILT · DATA LAYER
 *   2. cap-flex     (automation — rich Flex carousels)         LIVE DEMO
 *   3. cap-ai-reply (automation — AI replies in brand voice)   LIVE DEMO
 *   4. cap-push     (automation — segmented push/broadcast)    READY TO BUILD
 *   5. closing      (honest note + bridge to Monday)
 *
 * Honesty mechanism: the `badge` field carries a 3-level status marker per slide
 * (LIVE DEMO / BUILT / READY TO BUILD). Slide 4 callout + closing reinforce that
 * push/broadcast is grounded but not-yet-shipped — the deck must not overclaim.
 *
 * Copy is locked from the Wave 1 copy file:
 *   projects/waiting/ks-brand-aios-prospect/working-files/2026-06-05-line-deck-copy.md
 * Slide content grounded in: DEVELOPMENT/builds/artifacts/n8n-line-oa-inbox/
 * LINE_OA_Inbox_MOTTO_Digital.json (S1) + .claude/skills/line-demo-builder/SKILL.md
 * + flex-message-patterns.md (S2/S3) + live demo IDs (TOKYO RENTAL 22rhGwJGjBWt5rQm,
 * MEMBER SEARCH kqc8XuT8qnk5aUlQ).
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
   * distance and on the exported PDF. Applied to the 8-node branching flows
   * (S1 ingestion, S2 carousel, S4 push fan-out).
   */
  wideMermaid?: boolean;
};

// ─────────────────────────────────────────────────────────────────────────────
// SLIDES — 6 slides (LINE capabilities showcase)
// Copy locked: 2026-06-05-line-deck-copy.md
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
      ja: "Official LINE でできること",
      en: "What's Possible with Official LINE",
    },
    subtitle: {
      ja: "公式LINEを、データベース・n8n・Claude Codeとつないだとき、何ができるか。これは提案書ではない。その可能性のメニュー。",
      en: "What becomes possible when your Official LINE is wired to a database, n8n, and Claude Code. This is not a proposal — a menu of what's possible.",
    },
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 1 — Connect LINE to a database (BUILT · DATA LAYER)
  // Grounded: LINE_OA_Inbox_MOTTO_Digital.json
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cap-database",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "実装済み ・ データ基盤", en: "BUILT ・ DATA LAYER" },
    title: {
      ja: "LINEを、データベースとつなぐ。",
      en: "Connect LINE to Your Database.",
    },
    subtitle: {
      ja: "友だち登録・メッセージ・ブロック。LINEで起きるイベントを、リアルタイムで自社のデータベースに記録する。",
      en: "Follows, messages, blocks — every event on LINE, recorded to your own database in real time.",
    },
    bullets: [
      {
        ja: "LINEのWebhookを受信し、署名（HMAC-SHA256）を検証してから処理する。なりすましは入口で弾く。",
        en: "Receives LINE webhooks and verifies the signature (HMAC-SHA256) before anything runs — spoofed events rejected at the door.",
      },
      {
        ja: "イベントの種類で自動分岐し、LINEプロフィールを取得して line_users に登録・更新する。",
        en: "Auto-routes by event type, fetches the LINE profile, and upserts into line_users.",
      },
      {
        ja: "一人ひとりのメッセージ数・最終接触日・ブロック日が貯まる。これがセグメント配信の土台。",
        en: "Message count, last-seen, and unfollow date accumulate per person — the foundation for segmented delivery.",
      },
    ],
    callout: {
      ja: "誰が、いつ、何回。LINEの会員データが、自社のデータベースに残る。すべての土台は、ここにある。",
      en: "Who, when, how often — your LINE member data lives in your own database. The whole foundation sits right here.",
    },
    mermaid: `flowchart LR
  A["LINEイベント<br/>Webhook受信"]:::start --> B["署名検証<br/>HMAC-SHA256"]:::infra
  B --> C{"イベント分岐"}:::gate
  C -- "メッセージ・友だち追加" --> D["プロフィール取得<br/>LINE API"]:::infra
  C -- "ブロック" --> E["退会フラグ<br/>unfollowedAt"]:::infra
  D --> F["line_users<br/>upsert"]:::infra
  F --> G["line_messages<br/>line_events 記録"]:::infra
  E --> G
  G --> H["セグメント抽出<br/>messageCount・lastSeenAt"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 2 — Rich Flex carousels (LIVE DEMO)
  // Grounded: line-demo-builder SKILL + flex-message-patterns + MEMBER SEARCH demo
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cap-flex",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "実装済み ・ デモあり", en: "LIVE DEMO" },
    title: {
      ja: "リッチに、見せる。",
      en: "Show It, Richly.",
    },
    subtitle: {
      ja: "テキストだけじゃない。画像・ボタン・カルーセルで、LINEの中に「動くカタログ」をつくる。",
      en: "Not just text. Images, buttons, carousels — a living catalog inside LINE itself.",
    },
    bullets: [
      {
        ja: "キーワードを送ると、AIがデータベースを検索し、該当する商品やメンバーをFlexカルーセルで返す。最大10件。",
        en: "Send a keyword — the AI searches the database and returns matches as a Flex carousel, up to 10 cards.",
      },
      {
        ja: "カードのボタンをタップすると、ポストバックで連絡先カードや詳細カードに展開する。",
        en: "Tap a card button — a postback expands it into a contact card or a detail card.",
      },
      {
        ja: "クイックリプライで次の操作を案内する。ユーザーは指一本で、迷わず進める。",
        en: "Quick-reply buttons guide the next step — one tap, never lost.",
      },
    ],
    callout: {
      ja: "これは構想ではない。MEMBER SEARCH デモとして、すでに動いている仕組み。",
      en: "Not a concept — it already runs, live, as the MEMBER SEARCH demo.",
    },
    mermaid: `flowchart LR
  A["ユーザー<br/>「商品を検索」"]:::start --> B["Webhook受信"]:::infra
  B --> C["AIがDB検索<br/>ILIKE"]:::ai
  C --> D["Flexカルーセル生成<br/>最大10件"]:::ai
  D --> E["LINE返信"]:::done
  E --> F["ボタンタップ<br/>ポストバック"]:::start
  F --> G["SYSTEM経由で<br/>AIへ"]:::ai
  G --> H["連絡先・詳細<br/>カード返信"]:::done
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 3 — AI replies in brand voice (LIVE DEMO)
  // Grounded: line-demo-builder 8-node pattern, memory window=20, gpt-4o-mini
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cap-ai-reply",
    variant: "automation",
    transition: "slide",
    badge: { ja: "実装済み ・ デモあり", en: "LIVE DEMO" },
    title: {
      ja: "AIが、ブランドの声で返す。",
      en: "AI Replies. In Your Brand Voice.",
    },
    subtitle: {
      ja: "商品カタログとスタイルガイドを読んだAIが、相手との文脈を覚えたまま、ブランドのトーンで返信する。",
      en: "An AI that has read your catalog and style guide replies in your brand's tone — remembering the thread as it goes.",
    },
    bullets: [
      {
        ja: "AIエージェントが、直近20件の会話をuserIdごとに記憶しながら応答する。話がリセットされない。",
        en: "The AI agent responds while remembering the last 20 messages per userId — the thread never resets.",
      },
      {
        ja: "商品カタログ・スタイルガイドを参照し、推測ではなくKS BRAND固有の情報で答える。",
        en: "It draws on your catalog and style guide — answering with KS BRAND's own facts, not guesses.",
      },
      {
        ja: "出力は構造化JSON。人が対応中のときは、AIを止める制御も入れられる。",
        en: "Output is structured JSON — and a control can pause the AI whenever a human is already on the chat.",
      },
    ],
    callout: {
      ja: "この応答エンジンは、すでにデモとして動いている。あとは、KS BRANDの声を教えていく。",
      en: "This reply engine already runs as a working demo — from here, we teach it KS BRAND's voice.",
    },
    mermaid: `flowchart LR
  A["メッセージ受信"]:::start --> B["AIエージェント"]:::ai
  C["Memory<br/>直近20件・userId別"]:::infra -.-> B
  K["商品カタログ<br/>スタイルガイド"]:::infra -.-> B
  B --> D["構造化JSON<br/>出力"]:::ai
  D --> E{"人が対応中?"}:::gate
  E -- "いいえ" --> F["Flex・テキスト<br/>返信"]:::done
  E -- "はい" --> G["AIは待機"]:::infra
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 4 — Segmented push / broadcast (READY TO BUILD)
  // Honest: data layer real, delivery not yet deployed by us.
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "cap-push",
    variant: "automation",
    transition: "slide",
    wideMermaid: true,
    badge: { ja: "データ基盤あり ・ これから", en: "READY TO BUILD" },
    title: {
      ja: "届けたい人に、届ける。",
      en: "Reach the Right People.",
    },
    subtitle: {
      ja: "貯めた会員データから「届けたい人」を抽出し、個別にも、グループにも、全員にも配信する。",
      en: "Pull the right people from your member data and deliver — to one, to many, or to everyone.",
    },
    bullets: [
      {
        ja: "line_users から条件で絞る。最終接触日・メッセージ数・友だち期間でセグメントを切る。",
        en: "Segment from line_users by condition — last-seen, message count, time as a friend.",
      },
      {
        ja: "n8nのスケジュールやトリガーで、配信を自動で回す。手動の一斉送信から卒業する。",
        en: "n8n schedules and triggers the sends automatically — no more manual blasts.",
      },
      {
        ja: "LINE Messaging API の Push・Multicast・Broadcast を使い分け、結果を line_events に残す。",
        en: "Push, Multicast, and Broadcast via the LINE Messaging API — results logged back to line_events.",
      },
    ],
    callout: {
      ja: "※ データ基盤はすでにあります。配信そのものは、これから一緒に組む部分です。",
      en: "Note — the data layer already exists. The delivery itself is what we'd build together next.",
    },
    mermaid: `flowchart LR
  A["line_users<br/>セグメント抽出"]:::infra --> B["n8nスケジュール<br/>トリガー"]:::start
  B --> C{"配信タイプ"}:::gate
  C -- "個別" --> D1["Push<br/>1対1"]:::ai
  C -- "複数指定" --> D2["Multicast"]:::ai
  C -- "全員" --> D3["Broadcast"]:::ai
  D1 --> E["LINE<br/>Messaging API"]:::done
  D2 --> E
  D3 --> E
  E --> F["結果を<br/>line_events 記録"]:::infra
  classDef start fill:#F5F5F7,stroke:#1D1D1F,color:#1D1D1F
  classDef ai fill:#FBF6E7,stroke:#B8860B,color:#1D1D1F
  classDef infra fill:#FFFFFF,stroke:#B8860B,stroke-dasharray:4 3,color:#B8860B
  classDef gate fill:#FFFFFF,stroke:#B8860B,color:#B8860B
  classDef done fill:#E6F2EF,stroke:#10b981,color:#1D1D1F`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // SLIDE 5 — Closing (honest note + bridge to Monday)
  // ─────────────────────────────────────────────────────────────────────────
  {
    id: "closing",
    variant: "closing",
    transition: "scale",
    badge: { ja: "MOTTO × KS BRAND", en: "MOTTO × KS BRAND" },
    title: {
      ja: "正直に、一点だけ。",
      en: "One Honest Note.",
    },
    subtitle: {
      ja: "このデッキは、提案書ではない。公式LINEで何ができるか。その可能性のメニュー。",
      en: "This deck is not a proposal. It's a menu of what's possible with Official LINE.",
    },
    bullets: [
      {
        ja: "すでに動いているもの。会話検索・Flexカルーセル・AI応答は、MEMBER SEARCH デモで動いている。",
        en: "What already runs — conversational search, Flex carousels, AI replies — is live in the MEMBER SEARCH demo.",
      },
      {
        ja: "これから組むもの。セグメント配信やリッチメニューは、データ基盤の上に、まだ載せていないだけ。",
        en: "What we'd build next — segmented delivery and rich menus — just isn't layered onto the data foundation yet.",
      },
      {
        ja: "どれが要るか、何から始めるか。それを決めるのは、月曜の打ち合わせ。",
        en: "Which you need, where to start — that's the conversation for Monday's meeting.",
      },
    ],
    callout: {
      ja: "可能性を見せるのが、このデッキの役割だ。何を作るかは、月曜に。",
      en: "This deck's job is to show what's possible. What we build, we decide Monday.",
    },
  },
];

const TOTAL_STEPS = SLIDES.length;

// ─────────────────────────────────────────────────────────────────────────────
// Presenter notes (one per slide, in slide order) — gated behind ?presenter=1.
// Light speaker cues for the Mon 2026-06-08 scoping meeting. Half-width numbers.
// ─────────────────────────────────────────────────────────────────────────────

type SlidePresenterNote = { timing: string; ja: string[]; en: string[] };

const PRESENTER_NOTES: SlidePresenterNote[] = [
  // 0 — Title
  {
    timing: "30s",
    ja: [
      "まず「これは提案書ではない」と伝える。公式LINEを技術基盤——データベース・n8n・Claude Code——とつないだときに何ができるか、その可能性を並べたメニューだ。価格も完成保証もここにはない。月曜に「何が要るか」を聞いてから見積もる。トーンは静かに、直接的に。",
    ],
    en: [
      "Open by saying this is not a proposal. It's a menu of what becomes possible when Official LINE is wired to the technical foundation — database, n8n, Claude Code. No prices, no guarantees here. We hear what Kishi-san wants Monday, then quote. Calm, direct tone.",
    ],
  },
  // 1 — cap-database
  {
    timing: "75s",
    ja: [
      "ここが土台。LINEで起きるイベント——友だち追加・メッセージ・ブロック——を、署名検証してから自社DBに記録する。一人ひとりのメッセージ数・最終接触日が貯まることが重要だ。この会員データがあって初めて、後ろの3枚（検索・AI応答・配信）が意味を持つ。バッジは『実装済み・データ基盤』——ワークフロー自体はすでに組んである。",
    ],
    en: [
      "This is the foundation. Every LINE event — follow, message, block — verified, then logged to your own DB. The key: message count and last-seen accumulate per person. Only with this member data do the next three slides (search, AI reply, delivery) mean anything. Badge says BUILT — the workflow itself already exists.",
    ],
  },
  // 2 — cap-flex
  {
    timing: "75s",
    ja: [
      "ここはデモで見せられる。MEMBER SEARCH デモが実際に動いている。キーワード → DB検索 → Flexカルーセル（最大10件）→ ボタンタップで詳細カード。テキストだけのLINEとの差を、画面で体感してもらう。『すでに動いている』と言い切れるのが強い。",
    ],
    en: [
      "This one we can show live. The MEMBER SEARCH demo actually runs. Keyword to DB search to Flex carousel (max 10) to tap-for-detail. Let Kishi-san feel the gap vs text-only LINE on screen. The power is being able to say 'already running.'",
    ],
  },
  // 3 — cap-ai-reply
  {
    timing: "75s",
    ja: [
      "応答エンジンも2デモで稼働中。AIエージェントが直近20件を覚えながら、カタログとスタイルガイドを参照して返す。ポイントは『ブランドの声で』——汎用チャットボットではなく、KS BRAND固有の情報で答える。人が対応中はAIを止める制御も入る。残作業は『KSの声を教えるだけ』。",
    ],
    en: [
      "The reply engine runs in two demos too. The AI agent remembers the last 20 messages, references catalog and style guide. The point is 'in your brand voice' — not a generic bot, KS BRAND's own facts. A control pauses the AI when a human is on. The only remaining work: teaching it KS's voice.",
    ],
  },
  // 4 — cap-push
  {
    timing: "75s",
    ja: [
      "ここは正直に。配信そのものは、まだ建てていない。でもデータ基盤（line_users / line_events）はもうある。だから『これから一緒に組む部分』とはっきり言う。Push・Multicast・Broadcastの使い分けは、LINEの標準機能だ。ここで誇張しないことが、デッキ全体の信頼を作る。",
    ],
    en: [
      "Be honest here. The delivery itself isn't built yet. But the data layer (line_users / line_events) already exists. So say plainly: this is what we'd build together next. Push/Multicast/Broadcast are LINE's standard features. Not overclaiming here is what makes the whole deck trustworthy.",
    ],
  },
  // 5 — closing
  {
    timing: "45s",
    ja: [
      "締めは正直に一点だけ。動いているもの（検索・カルーセル・AI応答）と、これから組むもの（配信・リッチメニュー）を分けて見せた。何が要るか、何から始めるかは、月曜に決める。価格やCTAは出さない。『可能性を見せるのが役割』と言って終える。",
    ],
    en: [
      "Close with one honest note. We separated what runs (search, carousel, AI reply) from what we'd build (delivery, rich menus). What's needed and where to start — decided Monday. No price, no CTA. End on: the deck's job is to show what's possible.",
    ],
  },
];

// Anonymized notes shown unless the URL carries `?presenter=1`. The live route
// defaults to empty notes so accidental screen-shares cannot leak the speaker script.
// Real notes available to Lewis via /presentation/ks-brand-line?presenter=1
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

function KsBrandLineDeckInner() {
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

  // Mount Mermaid for all capability slides.
  // 6 slides: slide 0 = title (intro, no mermaid), slides 1..4 = capability (mermaid),
  // slide 5 = closing (no mermaid). Mermaid range = indices 1..4 inclusive.
  useMermaidSlide(slideIndex, 1, 4);

  const currentNote = notesSource[slideIndex];

  return (
    <div
      role="application"
      aria-label="KS BRAND — What's Possible with Official LINE — use arrow keys or click to navigate"
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
export default function KsBrandLineDeck() {
  return (
    <Suspense fallback={<div className="h-screen bg-white" />}>
      <KsBrandLineDeckInner />
    </Suspense>
  );
}
