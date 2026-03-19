"use client";

import { useEffect, useState, useRef } from "react";
import en from "@/lib/i18n/dictionaries/en";
import ja from "@/lib/i18n/dictionaries/ja";

const dictionaries = { en, ja } as const;

/* ──────────────────────────────────────────────
   Activity feed items — cycle through the system
   ────────────────────────────────────────────── */
const activityEN = [
  { agent: "CPO", text: "Sprint backlog updated", color: "violet" as const },
  { agent: "CTO", text: "Deployed v2.3 to prod", color: "blue" as const },
  { agent: "CMO", text: "LinkedIn post scheduled", color: "rose" as const },
  { agent: "COO", text: "Invoice reconciled", color: "amber" as const },
  { agent: "CFO", text: "Monthly report ready", color: "emerald" as const },
  { agent: "notion-ops", text: "12 tasks synced", color: "zinc" as const },
  { agent: "n8n-builder", text: "Workflow deployed", color: "zinc" as const },
];

const activityJA = [
  { agent: "CPO", text: "バックログ更新済", color: "violet" as const },
  { agent: "CTO", text: "v2.3をデプロイ完了", color: "blue" as const },
  { agent: "CMO", text: "LinkedIn投稿を予約", color: "rose" as const },
  { agent: "COO", text: "請求書を照合済み", color: "amber" as const },
  { agent: "CFO", text: "月次レポート完了", color: "emerald" as const },
  { agent: "notion-ops", text: "12件のタスクを同期", color: "zinc" as const },
  { agent: "n8n-builder", text: "ワークフロー展開完了", color: "zinc" as const },
];

/* ──────────────────────────────────────────────
   Color system — light theme version
   ────────────────────────────────────────────── */
type AgentColor = "indigo" | "violet" | "blue" | "rose" | "amber" | "emerald" | "zinc";

const palette: Record<AgentColor, {
  bg: string; border: string; text: string; dot: string; glow: string; line: string;
}> = {
  indigo: {
    bg: "bg-indigo-500/[0.06]", border: "border-indigo-500/20", text: "text-indigo-600",
    dot: "bg-indigo-500", glow: "shadow-indigo-500/10", line: "from-indigo-500/30 to-indigo-500/5",
  },
  violet: {
    bg: "bg-violet-500/[0.06]", border: "border-violet-500/20", text: "text-violet-600",
    dot: "bg-violet-500", glow: "shadow-violet-500/10", line: "from-violet-500/30 to-violet-500/5",
  },
  blue: {
    bg: "bg-blue-500/[0.06]", border: "border-blue-500/20", text: "text-blue-600",
    dot: "bg-blue-500", glow: "shadow-blue-500/10", line: "from-blue-500/30 to-blue-500/5",
  },
  rose: {
    bg: "bg-rose-500/[0.06]", border: "border-rose-500/20", text: "text-rose-600",
    dot: "bg-rose-500", glow: "shadow-rose-500/10", line: "from-rose-500/30 to-rose-500/5",
  },
  amber: {
    bg: "bg-amber-500/[0.06]", border: "border-amber-500/20", text: "text-amber-600",
    dot: "bg-amber-500", glow: "shadow-amber-500/10", line: "from-amber-500/30 to-amber-500/5",
  },
  emerald: {
    bg: "bg-emerald-500/[0.06]", border: "border-emerald-500/20", text: "text-emerald-600",
    dot: "bg-emerald-500", glow: "shadow-emerald-500/10", line: "from-emerald-500/30 to-emerald-500/5",
  },
  zinc: {
    bg: "bg-zinc-500/[0.04]", border: "border-zinc-300/50", text: "text-zinc-500",
    dot: "bg-zinc-400", glow: "shadow-zinc-500/5", line: "from-zinc-400/30 to-zinc-400/10",
  },
};

const csuiteColors: AgentColor[] = ["violet", "blue", "rose", "amber", "emerald"];

/* ──────────────────────────────────────────────
   Sparkle SVG — AI indicator for the Integrator
   ────────────────────────────────────────────── */
function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8L12 2z" />
    </svg>
  );
}

/* ──────────────────────────────────────────────
   Animated connection line (vertical)
   ────────────────────────────────────────────── */
function PulseLine({ color = "indigo", height = 24 }: { color?: AgentColor; height?: number }) {
  const p = palette[color];
  return (
    <div className="flex justify-center" style={{ height }}>
      <div className="relative w-px h-full">
        <div className={`absolute inset-0 w-px bg-gradient-to-b ${p.line}`} />
        <div
          className={`absolute w-px bg-gradient-to-b ${p.line} opacity-80`}
          style={{
            height: "40%",
            animation: "hero-pulse-line 2s ease-in-out infinite",
          }}
        />
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────
   OrgNode — individual agent node
   ────────────────────────────────────────────── */
function OrgNode({
  label,
  sublabel,
  color,
  isActive,
  taskCount,
  isHighlighted,
  icon,
}: {
  label: string;
  sublabel?: string;
  color: AgentColor;
  isActive?: boolean;
  taskCount?: number;
  isHighlighted?: boolean;
  icon?: React.ReactNode;
}) {
  const p = palette[color];
  return (
    <div
      className={`
        relative rounded-lg border px-3 py-2 text-center transition-all duration-700
        ${p.border} ${p.bg}
        ${isHighlighted ? `shadow-lg ${p.glow}` : ""}
      `}
    >
      {/* Status dot */}
      {isActive !== undefined && (
        <div className="absolute -top-1 -right-1 flex items-center justify-center">
          <div className={`size-2.5 rounded-full ${isActive ? "bg-emerald-500" : "bg-zinc-300"}`} />
          {isActive && (
            <div className="absolute size-2.5 rounded-full bg-emerald-500 animate-ping opacity-40" />
          )}
        </div>
      )}

      {/* Task count badge */}
      {taskCount !== undefined && taskCount > 0 && (
        <div className="absolute -top-1.5 -left-1.5">
          <div className="flex items-center justify-center size-4 rounded-full bg-indigo-500 text-[10px] font-bold text-white">
            {taskCount}
          </div>
        </div>
      )}

      <div className="flex items-center justify-center gap-1.5">
        {icon}
        <span className={`text-[11px] font-semibold leading-tight ${p.text}`}>{label}</span>
      </div>
      {sublabel && (
        <span className="block text-[11px] mt-0.5 leading-tight" style={{ color: "var(--lp-text-muted)" }}>{sublabel}</span>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   Main Component — HeroOrgVisual (Light Theme)
   ────────────────────────────────────────────── */
export function HeroOrgVisual({ locale = "ja", mobile = false }: { locale?: "en" | "ja"; mobile?: boolean }) {
  const dict = dictionaries[locale];
  const t = "orgChart" in dict.landing
    ? (dict.landing as typeof en.landing).orgChart
    : en.landing.orgChart;

  const activity = locale === "ja" ? activityJA : activityEN;

  const [activeAgent, setActiveAgent] = useState(0);
  const [activityIndex, setActivityIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [taskCounts, setTaskCounts] = useState([3, 2, 1, 4, 2]);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveAgent((prev) => (prev + 1) % 5);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivityIndex((prev) => (prev + 1) % activity.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [activity.length]);

  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const timer = setInterval(() => {
      setTaskCounts((prev) =>
        prev.map((c) => {
          const delta = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
          return Math.max(0, Math.min(9, c + delta));
        })
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const currentActivity = activity[activityIndex];

  // Mobile simplified view
  if (mobile) {
    return (
      <div className="relative w-full max-w-sm mx-auto">
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            backgroundColor: "var(--lp-bg-elevated)",
            border: "1px solid var(--lp-border-visible)",
            boxShadow: "0 8px 32px rgba(0,0,0,0.06)",
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-2.5"
            style={{ borderBottom: "1px solid var(--lp-border-visible)" }}
          >
            <div className="flex gap-1.5">
              <div className="size-2 rounded-full bg-zinc-300" />
              <div className="size-2 rounded-full bg-zinc-300" />
              <div className="size-2 rounded-full bg-zinc-300" />
            </div>
            <div className="flex-1 flex justify-center">
              <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: "var(--lp-text-heading)" }}>
                {locale === "ja" ? "AIOSエージェント構成" : "AIOS Agent Structure"}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[9px] text-emerald-600 font-medium">
                {locale === "ja" ? "稼働中" : "Live"}
              </span>
            </div>
          </div>
          <div className="p-4 space-y-0">
            <div className="flex justify-center">
              <OrgNode label={t.ceo} color="indigo" isActive={true} icon={
                <svg className="size-3 text-indigo-600" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="5" r="3" /><path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                </svg>
              } />
            </div>
            <PulseLine color="indigo" height={16} />
            <div className="flex justify-center">
              <div className="relative rounded-lg border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-2 text-center">
                <div className="flex items-center justify-center gap-2">
                  <SparkleIcon className="size-3.5 text-indigo-600" />
                  <span className="text-[11px] font-semibold text-indigo-600">{t.integrator}</span>
                </div>
              </div>
            </div>
            <PulseLine color="indigo" height={16} />
            <div className="grid grid-cols-5 gap-1">
              {t.csuite.map((agent, i) => (
                <OrgNode key={agent.role} label={agent.role} color={csuiteColors[i]} isActive={true} isHighlighted={activeAgent === i} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-md mx-auto mt-12 lg:mt-0 lg:max-w-none">
      {/* Ambient glow — light version */}
      <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-indigo-500/[0.04] via-transparent to-violet-500/[0.04] blur-3xl pointer-events-none" />

      {/* Main frame */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "var(--lp-bg-elevated)",
          border: "1px solid var(--lp-border-visible)",
          boxShadow: "0 12px 40px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.02)",
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ borderBottom: "1px solid var(--lp-border-visible)" }}
        >
          <div className="flex gap-1.5">
            <div className="size-2 rounded-full bg-zinc-300" />
            <div className="size-2 rounded-full bg-zinc-300" />
            <div className="size-2 rounded-full bg-zinc-300" />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-[10px] font-semibold tracking-wider uppercase" style={{ color: "var(--lp-text-heading)" }}>
              {locale === "ja" ? "AIOSエージェント構成" : "AIOS Agent Structure"}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[9px] text-emerald-600 font-medium">
              {locale === "ja" ? "稼働中" : "Live"}
            </span>
          </div>
        </div>

        {/* Body */}
        <div className="p-4 space-y-0">
          {/* CEO node */}
          <div
            className="flex justify-center"
            style={{
              animation: mounted ? "hero-node-appear 0.5s ease-out forwards" : "none",
              opacity: mounted ? 1 : 0,
            }}
          >
            <OrgNode
              label={t.ceo}
              color="indigo"
              isActive={true}
              icon={
                <svg className="size-3 text-indigo-600" viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="5" r="3" />
                  <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" />
                </svg>
              }
            />
          </div>

          <PulseLine color="indigo" height={20} />

          {/* Integrator AI node */}
          <div
            className="flex justify-center"
            style={{
              animation: mounted ? "hero-node-appear 0.5s ease-out 0.15s forwards" : "none",
              opacity: mounted ? 1 : 0,
            }}
          >
            <div className="relative">
              {/* Rotating glow ring — subtle for light theme */}
              <div
                className="absolute -inset-1 rounded-xl opacity-20"
                style={{
                  background: "conic-gradient(from 0deg, transparent, rgba(99, 102, 241, 0.3), transparent, rgba(139, 92, 246, 0.3), transparent)",
                  animation: "hero-glow-rotate 6s linear infinite",
                  filter: "blur(4px)",
                }}
              />
              <div className="relative rounded-lg border border-indigo-500/20 bg-indigo-500/[0.06] px-4 py-2.5 text-center">
                <div className="absolute -top-1 -right-1 flex items-center justify-center">
                  <div className="size-2.5 rounded-full bg-emerald-500" />
                  <div className="absolute size-2.5 rounded-full bg-emerald-500 animate-ping opacity-40" />
                </div>
                <div className="flex items-center justify-center gap-2">
                  <div className="relative">
                    <SparkleIcon className="size-3.5 text-indigo-600" />
                    <span
                      className="absolute inset-0"
                      style={{ animation: "hero-sparkle-spin 4s linear infinite" }}
                    >
                      <SparkleIcon className="size-3.5 text-violet-500 opacity-50" />
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-indigo-600">{t.integrator}</span>
                  <div
                    className="flex gap-0.5"
                    style={{ animation: "hero-data-flow 2s ease-in-out infinite" }}
                  >
                    <div className="size-1 rounded-full bg-indigo-400/50" />
                    <div className="size-1 rounded-full bg-violet-400/50" />
                    <div className="size-1 rounded-full bg-indigo-400/50" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Integrator → C-suite connections */}
          <div className="flex justify-center" style={{ height: 20 }}>
            <div className="relative w-[85%] h-full">
              <div className="absolute left-1/2 top-0 w-px h-2/3 -translate-x-px">
                <div className="w-px h-full bg-gradient-to-b from-indigo-500/30 to-indigo-500/5" />
              </div>
              <div className="absolute top-2/3 left-0 right-0 h-px" style={{ background: "linear-gradient(to right, transparent, var(--lp-border-visible), transparent)" }} />
              {[0, 1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="absolute w-px"
                  style={{
                    left: `${10 + i * 20}%`,
                    top: "66%",
                    height: "34%",
                    backgroundColor: "var(--lp-border-visible)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* C-suite row */}
          <div
            className="grid grid-cols-5 gap-1.5"
            style={{
              animation: mounted ? "hero-node-appear 0.5s ease-out 0.3s forwards" : "none",
              opacity: mounted ? 1 : 0,
            }}
          >
            {t.csuite.map((agent, i) => (
              <OrgNode
                key={agent.role}
                label={agent.role}
                sublabel={agent.domain}
                color={csuiteColors[i]}
                isActive={true}
                taskCount={taskCounts[i]}
                isHighlighted={activeAgent === i}
              />
            ))}
          </div>

          {/* C-suite → Vendors connection */}
          <div className="flex justify-center" style={{ height: 16 }}>
            <div className="relative w-[70%] h-full">
              <div className="absolute left-1/2 top-0 w-px h-2/3 -translate-x-px" style={{ background: "linear-gradient(to bottom, var(--lp-border-visible), transparent)" }} />
              <div className="absolute top-2/3 left-[5%] right-[5%] h-px" style={{ background: "linear-gradient(to right, transparent, var(--lp-border-visible), transparent)" }} />
            </div>
          </div>

          {/* Vendor specialists row */}
          <div
            className="flex flex-wrap justify-center gap-1.5"
            style={{
              animation: mounted ? "hero-node-appear 0.5s ease-out 0.45s forwards" : "none",
              opacity: mounted ? 1 : 0,
            }}
          >
            {t.vendors.map((vendor) => (
              <div
                key={vendor.name}
                className="rounded-md px-2 py-1.5 text-center"
                style={{
                  border: "1px solid var(--lp-border-visible)",
                  backgroundColor: "var(--lp-bg-primary)",
                }}
              >
                <span className="text-[11px] font-mono font-medium leading-tight block" style={{ color: "var(--lp-text-body)" }}>
                  {vendor.name}
                </span>
                <span className="text-[10px] leading-tight block mt-0.5" style={{ color: "var(--lp-text-muted)" }}>
                  {vendor.description}
                </span>
              </div>
            ))}
          </div>

          {/* Live activity ticker */}
          <div
            className="mt-3 rounded-lg px-3 py-2"
            style={{
              border: "1px solid var(--lp-border-visible)",
              backgroundColor: "var(--lp-bg-primary)",
              animation: mounted ? "hero-node-appear 0.5s ease-out 0.6s forwards" : "none",
              opacity: mounted ? 1 : 0,
            }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-1.5">
                <div className="size-1 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: "var(--lp-text-muted)" }}>
                  {locale === "ja" ? "最新の動き" : "Live Activity"}
                </span>
              </div>
              <span className="text-[11px]" style={{ color: "var(--lp-text-muted)" }}>
                {locale === "ja" ? "たった今" : "just now"}
              </span>
            </div>
            <div
              key={activityIndex}
              className="flex items-center gap-2"
              style={{ animation: "hero-feed-slide 0.4s ease-out" }}
            >
              <div className={`shrink-0 rounded px-1 py-0.5 ${palette[currentActivity.color].bg} border ${palette[currentActivity.color].border}`}>
                <span className={`text-[10px] font-bold ${palette[currentActivity.color].text}`}>
                  {currentActivity.agent}
                </span>
              </div>
              <span className="text-[9px] truncate" style={{ color: "var(--lp-text-body)" }}>{currentActivity.text}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent lines — subtle for light theme */}
      <div className="absolute -top-3 -right-3 w-20 h-px bg-gradient-to-r from-transparent to-indigo-500/10" />
      <div className="absolute -bottom-3 -left-3 w-16 h-px bg-gradient-to-r from-violet-500/10 to-transparent" />
    </div>
  );
}
