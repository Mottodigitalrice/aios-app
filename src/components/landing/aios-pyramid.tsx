"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";

/* ── Bilingual content ── */
interface PyramidLayerText {
  label: string;
  sublabel: string;
  message: string;
}

interface PyramidContent {
  layers: [PyramidLayerText, PyramidLayerText, PyramidLayerText, PyramidLayerText];
  youOwn: string;
  swappable: string;
  plusYourTools: string;
  anyLLM: string;
  toolsMCP: string;
}

const content: Record<"en" | "ja", PyramidContent> = {
  en: {
    layers: [
      {
        label: "Data Layer",
        sublabel: "Your Data & Tools",
        message: "All your existing tools connected into one system",
      },
      {
        label: "Agent Architecture",
        sublabel: "AI Agents & Tooling",
        message:
          "Skills, roles, permissions, and tools that make agents reliable",
      },
      {
        label: "Environment",
        sublabel: "Your Infrastructure",
        message: "Your infrastructure where agents operate. No shared servers.",
      },
      {
        label: "AI Models",
        sublabel: "Swappable",
        message: "Use the best model for each task. Swap anytime.",
      },
    ],
    youOwn: "You own these",
    swappable: "Swappable",
    plusYourTools: "+ your tools",
    anyLLM: "Any LLM",
    toolsMCP: "Tools / MCP",
  },
  ja: {
    layers: [
      {
        label: "データレイヤー",
        sublabel: "データとツール",
        message: "既存のすべてのツールを一つのシステムに接続",
      },
      {
        label: "エージェントアーキテクチャ",
        sublabel: "AIエージェントとツール",
        message:
          "スキル、役割、権限、ツールでエージェントを信頼性の高いものに",
      },
      {
        label: "環境",
        sublabel: "あなたのインフラ",
        message:
          "エージェントが稼働するあなたのインフラ。共有サーバーなし。",
      },
      {
        label: "AIモデル",
        sublabel: "交換可能",
        message: "各タスクに最適なモデルを使用。いつでも交換可能。",
      },
    ],
    youOwn: "あなたが所有",
    swappable: "交換可能",
    plusYourTools: "+ あなたのツール",
    anyLLM: "任意のLLM",
    toolsMCP: "ツール / MCP",
  },
};

/* ── Data definitions ── */
const tools = [
  { name: "Google Drive", logo: "/logos/google-drive.svg" },
  { name: "Notion", logo: "/logos/notion.svg" },
  { name: "Chatwork", logo: "/logos/chatwork.svg" },
  { name: "HubSpot", logo: "/logos/hubspot.svg" },
  { name: "freee", logo: "/logos/freee.svg" },
  { name: "Slack", logo: "/logos/slack.svg" },
  { name: "Gmail", logo: "/logos/gmail.svg" },
  { name: "LINE", logo: "/logos/line.svg" },
  { name: "Kintone", logo: "/logos/kintone.svg" },
  { name: "Stripe", logo: "/logos/stripe.svg" },
];

const agents = ["Sales", "Support", "Data", "Ops", "Content"];

const envOptions = [
  {
    label: "VPS",
    icon: (
      <svg className="size-4 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="8" rx="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" />
        <circle cx="6" cy="6" r="1" fill="currentColor" />
        <circle cx="6" cy="18" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: "Local",
    icon: (
      <svg className="size-4 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M7 20h10" />
        <path d="M9 16v4" />
        <path d="M15 16v4" />
      </svg>
    ),
  },
  {
    label: "On-Prem",
    icon: (
      <svg className="size-4 text-violet-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 21V7l8-4 8 4v14" />
        <path d="M8 10h8" />
        <path d="M8 14h8" />
        <path d="M8 18h8" />
      </svg>
    ),
  },
];

const models = [
  { name: "Claude", logo: "/logos/anthropic.svg" },
  { name: "GPT", logo: "/logos/openai.svg" },
  { name: "Gemini", logo: "/logos/google.svg" },
];

/* ── Layer configuration ── */
interface LayerConfig {
  border: string;
  bg: string;
  bgHover: string;
  ring: string;
  labelColor: string;
  numBg: string;
}

const layerConfigs: LayerConfig[] = [
  {
    border: "border-blue-500/25",
    bg: "bg-blue-500/[0.04]",
    bgHover: "bg-blue-500/[0.08]",
    ring: "ring-blue-500/20",
    labelColor: "text-blue-400",
    numBg: "bg-blue-500/10 border-blue-500/20",
  },
  {
    border: "border-emerald-500/25",
    bg: "bg-emerald-500/[0.04]",
    bgHover: "bg-emerald-500/[0.08]",
    ring: "ring-emerald-500/20",
    labelColor: "text-emerald-400",
    numBg: "bg-emerald-500/10 border-emerald-500/20",
  },
  {
    border: "border-violet-500/25",
    bg: "bg-violet-500/[0.04]",
    bgHover: "bg-violet-500/[0.08]",
    ring: "ring-violet-500/20",
    labelColor: "text-violet-400",
    numBg: "bg-violet-500/10 border-violet-500/20",
  },
  {
    border: "border-amber-500/25",
    bg: "bg-amber-500/[0.04]",
    bgHover: "bg-amber-500/[0.08]",
    ring: "ring-amber-500/20",
    labelColor: "text-amber-400",
    numBg: "bg-amber-500/10 border-amber-500/20",
  },
];

/* ── Gradient connector between pyramid layers ── */
function Connector({
  fromColor,
  toColor,
  visible,
}: {
  fromColor: string;
  toColor: string;
  visible: boolean;
}) {
  return (
    <div
      className="flex justify-center"
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 0.4s ease-out",
        height: "20px",
      }}
    >
      <div className="relative w-px h-full">
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
          }}
        />
        {visible && (
          <div
            className="absolute size-1.5 rounded-full left-1/2 -translate-x-1/2"
            style={{
              background: toColor,
              animation: "pyramidFlow 2s ease-in-out infinite",
            }}
          />
        )}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   MAIN COMPONENT
   ══════════════════════════════════════════════════ */
export function AIOSPyramid({
  locale,
  compact = false,
}: {
  locale: "en" | "ja";
  compact?: boolean;
}) {
  const t = content[locale];
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05 });
  // In compact mode (presentation), start fully revealed
  const [step, setStep] = useState(compact ? 5 : 0);
  const [hoveredLayer, setHoveredLayer] = useState<number | null>(null);

  // Staggered reveal: bottom-up (step 1=L1, step 4=L4, step 5=footer)
  // Skip animation in compact mode — everything is immediately visible
  useEffect(() => {
    if (compact) return;
    if (!isInView) return;
    const timers = [
      setTimeout(() => setStep(1), 200),
      setTimeout(() => setStep(2), 400),
      setTimeout(() => setStep(3), 600),
      setTimeout(() => setStep(4), 800),
      setTimeout(() => setStep(5), 1100),
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView, compact]);

  return (
    <div className="mt-12" ref={ref}>
      <div className="relative max-w-4xl mx-auto px-4">
        {/* ─── Ownership bracket — left side, desktop only ─── */}
        <div
          className="hidden lg:block absolute pointer-events-none"
          style={{
            left: "-28px",
            top: "0",
            bottom: "60px", // don't extend into the footer badges
            opacity: step >= 5 ? 1 : 0,
            transform: step >= 5 ? "translateX(0)" : "translateX(-8px)",
            transition: "all 0.6s ease-out",
          }}
        >
          {/* Bracket spanning bottom 3 layers (layers 1-3) */}
          <div className="absolute" style={{ bottom: "0", top: "25%", width: "20px" }}>
            <div className="h-full border-l-2 border-t-2 border-b-2 border-indigo-500/25 rounded-l-md" />
            {/* Tick mark */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-4 h-px bg-indigo-500/25" />
            {/* Label */}
            <div className="absolute -left-5 top-1/2 -translate-y-1/2">
              <span
                className="block text-[10px] font-semibold text-indigo-400/70 uppercase tracking-wider whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                {t.youOwn}
              </span>
            </div>
          </div>
          {/* Swappable annotation for layer 4 (top ~25%) */}
          <div className="absolute" style={{ top: "4%", height: "18%", width: "20px" }}>
            <div className="h-full border-l-2 border-t-2 border-b-2 border-amber-500/20 rounded-l-md" />
            <div className="absolute -left-5 top-1/2 -translate-y-1/2">
              <span
                className="block text-[10px] font-semibold text-amber-400/60 uppercase tracking-wider whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
              >
                &#8635; {t.swappable}
              </span>
            </div>
          </div>
        </div>

        {/* ─── Pyramid: top (narrowest) → bottom (widest) ─── */}
        <div className="flex flex-col items-center">
          {/* Layer 4 — AI Models (narrowest) */}
          <PyramidLayer
            layerIndex={3}
            isVisible={step >= 4}
            isHovered={hoveredLayer === 3}
            onHover={setHoveredLayer}
            t={t}
          >
            <ModelContent visible={step >= 4} t={t} />
          </PyramidLayer>

          <Connector fromColor="rgba(245,158,11,0.4)" toColor="rgba(139,92,246,0.4)" visible={step >= 4} />

          {/* Layer 3 — Environment */}
          <PyramidLayer
            layerIndex={2}
            isVisible={step >= 3}
            isHovered={hoveredLayer === 2}
            onHover={setHoveredLayer}
            t={t}
          >
            <EnvironmentContent visible={step >= 3} />
          </PyramidLayer>

          <Connector fromColor="rgba(139,92,246,0.4)" toColor="rgba(16,185,129,0.4)" visible={step >= 3} />

          {/* Layer 2 — Agent Architecture */}
          <PyramidLayer
            layerIndex={1}
            isVisible={step >= 2}
            isHovered={hoveredLayer === 1}
            onHover={setHoveredLayer}
            t={t}
          >
            <AgentContent visible={step >= 2} t={t} />
          </PyramidLayer>

          <Connector fromColor="rgba(16,185,129,0.4)" toColor="rgba(59,130,246,0.4)" visible={step >= 2} />

          {/* Layer 1 — Data Layer (widest) */}
          <PyramidLayer
            layerIndex={0}
            isVisible={step >= 1}
            isHovered={hoveredLayer === 0}
            onHover={setHoveredLayer}
            t={t}
          >
            <DataContent visible={step >= 1} t={t} />
          </PyramidLayer>
        </div>

        {/* ─── Ownership footer (mobile-friendly) ─── */}
        <div
          className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4 lg:hidden"
          style={{
            opacity: step >= 5 ? 1 : 0,
            transform: step >= 5 ? "none" : "translateY(8px)",
            transition: "all 0.5s ease-out",
          }}
        >
          <div className="inline-flex items-center gap-2.5 rounded-full border border-indigo-500/20 bg-indigo-500/[0.05] px-4 py-2">
            <svg className="size-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-xs text-indigo-300 font-medium">
              {t.youOwn} (L1&ndash;L3)
            </span>
          </div>
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/[0.05] px-4 py-2">
            <span className="text-sm text-amber-400">&#8635;</span>
            <span className="text-xs text-amber-300 font-medium">
              {t.layers[3].label} &mdash; {t.swappable}
            </span>
          </div>
        </div>
      </div>

      {/* ─── Responsive pyramid widths + animation keyframes ─── */}
      <style jsx>{`
        @keyframes pyramidFlow {
          0% { top: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: calc(100% - 6px); opacity: 0; }
        }
      `}</style>
      {/* Mobile override: all layers full-width below sm breakpoint */}
      <style jsx global>{`
        @media (max-width: 639px) {
          .pyramid-layer-card {
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   PYRAMID LAYER WRAPPER
   Each layer card narrows on sm+ screens to form the pyramid shape.
   On mobile (< 640px) all layers are full-width cards.
   ══════════════════════════════════════════════════ */
const PYRAMID_WIDTHS = ["100%", "82%", "64%", "46%"] as const;

function PyramidLayer({
  layerIndex,
  isVisible,
  isHovered,
  onHover,
  t,
  children,
}: {
  layerIndex: number;
  isVisible: boolean;
  isHovered: boolean;
  onHover: (i: number | null) => void;
  t: PyramidContent;
  children: React.ReactNode;
}) {
  const cfg = layerConfigs[layerIndex];
  const layerContent = t.layers[layerIndex];
  const layerNum = String(layerIndex + 1).padStart(2, "0");

  const hoverTransform = isHovered ? "scale(1.012)" : "scale(1)";

  return (
    <div
      className="pyramid-layer w-full transition-all duration-500"
      data-layer={layerIndex}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? hoverTransform : "translateY(16px)",
        transition: "opacity 0.5s ease-out, transform 0.35s ease-out",
      }}
    >
      <div
        className={`
          pyramid-layer-card mx-auto rounded-2xl border ${cfg.border} ${cfg.bg}
          transition-all duration-300 cursor-default
          ${isHovered ? `ring-1 ${cfg.ring} ${cfg.bgHover}` : ""}
        `}
        style={{
          maxWidth: PYRAMID_WIDTHS[layerIndex],
        }}
        onMouseEnter={() => onHover(layerIndex)}
        onMouseLeave={() => onHover(null)}
      >
        <div className="px-4 py-4 sm:px-5 sm:py-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className={`flex size-6 shrink-0 items-center justify-center rounded-md border ${cfg.numBg}`}>
                <span className={`text-[9px] font-bold ${cfg.labelColor}`}>{layerNum}</span>
              </div>
              <div className="min-w-0">
                <span className={`text-xs font-semibold ${cfg.labelColor} uppercase tracking-wider`}>
                  {layerContent.label}
                </span>
                <p className="text-[10px] text-zinc-500 mt-0.5 hidden sm:block truncate">
                  {layerContent.message}
                </p>
              </div>
            </div>
            {layerIndex === 3 && (
              <span className="text-[10px] font-medium text-amber-400/70 border border-amber-500/20 bg-amber-500/[0.05] rounded-full px-2 py-0.5 shrink-0 ml-2">
                &#8635; {t.swappable}
              </span>
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════
   LAYER CONTENT COMPONENTS
   ══════════════════════════════════════════════════ */

/* ── Layer 1: Data & Tools ── */
function DataContent({ visible, t }: { visible: boolean; t: PyramidContent }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {tools.map((tool, i) => (
        <div
          key={tool.name}
          className="flex items-center gap-1.5 rounded-lg border border-zinc-700/30 bg-zinc-800/50 px-2 py-1.5 transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/[0.04]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(6px)",
            transition: `all 0.4s ease-out ${i * 30}ms`,
          }}
        >
          <Image
            src={tool.logo}
            alt={tool.name}
            width={13}
            height={13}
            className="opacity-60 brightness-0 invert"
          />
          <span className="text-[10px] text-zinc-400 font-medium">{tool.name}</span>
        </div>
      ))}
      <div className="flex items-center rounded-lg border border-dashed border-zinc-700/30 px-2 py-1.5">
        <span className="text-[10px] text-zinc-600">{t.plusYourTools}</span>
      </div>
    </div>
  );
}

/* ── Layer 2: Agent Architecture ── */
function AgentContent({ visible, t }: { visible: boolean; t: PyramidContent }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {agents.map((agent, i) => (
        <div
          key={agent}
          className="flex items-center gap-1.5 rounded-lg border border-emerald-500/20 bg-zinc-800/50 px-2.5 py-1.5 transition-all duration-300 hover:border-emerald-500/35 hover:bg-emerald-500/[0.04]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(6px)",
            transition: `all 0.4s ease-out ${i * 50}ms`,
          }}
        >
          <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-[10px] text-zinc-400 font-medium">{agent}</span>
        </div>
      ))}
      <div className="flex items-center rounded-lg border border-dashed border-emerald-500/15 bg-emerald-500/[0.02] px-2.5 py-1.5">
        <span className="text-[10px] text-emerald-400/60 font-medium">{t.toolsMCP}</span>
      </div>
    </div>
  );
}

/* ── Layer 3: Environment ── */
function EnvironmentContent({ visible }: { visible: boolean }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {envOptions.map((env, i) => (
        <div
          key={env.label}
          className="flex items-center gap-1.5 rounded-lg border border-violet-500/20 bg-zinc-800/50 px-2.5 py-1.5 transition-all duration-300 hover:border-violet-500/35 hover:bg-violet-500/[0.04]"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(6px)",
            transition: `all 0.4s ease-out ${i * 60}ms`,
          }}
        >
          {env.icon}
          <span className="text-[10px] text-zinc-400 font-medium">{env.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ── Layer 4: AI Models ── */
function ModelContent({ visible, t }: { visible: boolean; t: PyramidContent }) {
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-4">
      {models.map((model, i) => (
        <div
          key={model.name}
          className="flex flex-col items-center gap-1.5"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "none" : "translateY(6px)",
            transition: `all 0.4s ease-out ${i * 70}ms`,
          }}
        >
          <div className="size-10 sm:size-12 rounded-xl border border-amber-500/25 bg-zinc-900/80 flex items-center justify-center transition-all duration-200 hover:border-amber-500/40 hover:bg-amber-500/[0.04]">
            <Image
              src={model.logo}
              alt={model.name}
              width={18}
              height={18}
              className="opacity-70 brightness-0 invert"
            />
          </div>
          <span className="text-[9px] sm:text-[10px] text-zinc-500 font-medium">{model.name}</span>
        </div>
      ))}
      <div
        className="flex flex-col items-center gap-1.5"
        style={{
          opacity: visible ? 1 : 0,
          transform: visible ? "none" : "translateY(6px)",
          transition: "all 0.4s ease-out 210ms",
        }}
      >
        <div className="size-10 sm:size-12 rounded-xl border border-dashed border-amber-500/15 bg-zinc-900/30 flex items-center justify-center">
          <span className="text-zinc-600 text-base">+</span>
        </div>
        <span className="text-[9px] sm:text-[10px] text-zinc-600 font-medium">{t.anyLLM}</span>
      </div>
    </div>
  );
}
