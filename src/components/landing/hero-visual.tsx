"use client";

import { useEffect, useState, useRef } from "react";

/* ── Feed items that cycle through the activity log ── */
const feedItems = [
  { text: "Invoice reconciliation completed", icon: "check", color: "emerald" },
  { text: "New lead: Tanaka Corp via LINE", icon: "plus", color: "indigo" },
  { text: "Weekly report generated", icon: "doc", color: "violet" },
  { text: "GBP post scheduled: Ryowa House", icon: "cal", color: "amber" },
  { text: "Follow-up email sent to Saito-san", icon: "send", color: "blue" },
  { text: "Pipeline: 3 deals moved to proposal", icon: "arrow", color: "emerald" },
];

/* ── Agent status indicators ── */
const agents = [
  { name: "Sales", status: "active", tasks: 3 },
  { name: "Support", status: "active", tasks: 2 },
  { name: "Data", status: "idle", tasks: 0 },
  { name: "Content", status: "active", tasks: 1 },
];

/* ── Tiny SVG icons (no imports needed) ── */
function MiniIcon({ type, className }: { type: string; className?: string }) {
  const c = className ?? "size-3";
  switch (type) {
    case "check":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8.5l3.5 3.5 6.5-7" />
        </svg>
      );
    case "plus":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M8 3v10M3 8h10" />
        </svg>
      );
    case "doc":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="2" width="10" height="12" rx="1.5" />
          <path d="M6 6h4M6 9h3" />
        </svg>
      );
    case "cal":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="3" width="12" height="11" rx="1.5" />
          <path d="M2 7h12M5 1v3M11 1v3" />
        </svg>
      );
    case "send":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M2 8l12-5-5 12-2-5z" />
        </svg>
      );
    case "arrow":
      return (
        <svg className={c} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      );
    default:
      return null;
  }
}

const colorClasses: Record<string, { dot: string; text: string; bg: string; border: string }> = {
  emerald: { dot: "bg-emerald-400", text: "text-emerald-400", bg: "bg-emerald-500/10", border: "border-emerald-500/20" },
  indigo: { dot: "bg-indigo-400", text: "text-indigo-400", bg: "bg-indigo-500/10", border: "border-indigo-500/20" },
  violet: { dot: "bg-violet-400", text: "text-violet-400", bg: "bg-violet-500/10", border: "border-violet-500/20" },
  amber: { dot: "bg-amber-400", text: "text-amber-400", bg: "bg-amber-500/10", border: "border-amber-500/20" },
  blue: { dot: "bg-blue-400", text: "text-blue-400", bg: "bg-blue-500/10", border: "border-blue-500/20" },
};

export function HeroVisual() {
  const [visibleFeed, setVisibleFeed] = useState<number[]>([0, 1, 2]);
  const [counts, setCounts] = useState({ tasks: 0, projects: 0, pipeline: 0 });
  const [agentPulse, setAgentPulse] = useState(0);
  const hasAnimated = useRef(false);

  /* Count-up on mount */
  useEffect(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const targets = { tasks: 63, projects: 26, pipeline: 9 };
    const duration = 1800;
    const steps = 30;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCounts({
        tasks: Math.round(targets.tasks * ease),
        projects: Math.round(targets.projects * ease),
        pipeline: Math.round(targets.pipeline * ease),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, []);

  /* Cycle feed items */
  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleFeed((prev) => {
        const next = (prev[0] + 1) % feedItems.length;
        return [next, (next + 1) % feedItems.length, (next + 2) % feedItems.length];
      });
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  /* Cycle agent pulse */
  useEffect(() => {
    const timer = setInterval(() => setAgentPulse((p) => (p + 1) % agents.length), 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto mt-12 lg:mt-0 lg:max-w-none">
      {/* Ambient glow */}
      <div className="absolute -inset-8 rounded-3xl bg-gradient-to-br from-indigo-500/[0.07] via-transparent to-violet-500/[0.07] blur-3xl pointer-events-none" />

      {/* Main frame */}
      <div className="relative rounded-2xl border border-zinc-800/70 bg-zinc-950/90 backdrop-blur-sm overflow-hidden shadow-2xl shadow-indigo-500/[0.04]">
        {/* ── Title bar ── */}
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800/50 bg-zinc-900/60">
          <div className="flex gap-1.5">
            <div className="size-2 rounded-full bg-zinc-600" />
            <div className="size-2 rounded-full bg-zinc-600" />
            <div className="size-2 rounded-full bg-zinc-600" />
          </div>
          <div className="flex-1 flex justify-center">
            <span className="text-[10px] text-zinc-500 font-medium tracking-wide">AIOS Dashboard</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] text-emerald-400/80 font-medium">Connected</span>
          </div>
        </div>

        {/* ── Dashboard body ── */}
        <div className="p-3.5 space-y-3">
          {/* Top metrics row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: "Active Tasks", value: counts.tasks, color: "indigo" },
              { label: "Projects", value: counts.projects, color: "violet" },
              { label: "Pipeline", value: counts.pipeline, color: "emerald" },
            ].map((m) => (
              <div
                key={m.label}
                className={`rounded-lg border ${colorClasses[m.color].border} ${colorClasses[m.color].bg} px-3 py-2.5`}
              >
                <div className={`text-xl font-bold tabular-nums ${colorClasses[m.color].text}`}>
                  {m.value}
                </div>
                <div className="text-[9px] text-zinc-500 font-medium mt-0.5">{m.label}</div>
              </div>
            ))}
          </div>

          {/* Agent status strip */}
          <div className="rounded-lg border border-zinc-800/50 bg-zinc-900/40 px-3 py-2">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-wider">AI Agents</span>
              <span className="text-[9px] text-emerald-400/70">3 active</span>
            </div>
            <div className="flex items-center gap-2">
              {agents.map((agent, i) => (
                <div
                  key={agent.name}
                  className={`flex items-center gap-1.5 rounded-md border px-2 py-1 transition-all duration-500 ${
                    agentPulse === i
                      ? "border-emerald-500/30 bg-emerald-500/[0.06]"
                      : "border-zinc-800/40 bg-zinc-800/20"
                  }`}
                >
                  <div
                    className={`size-1.5 rounded-full ${
                      agent.status === "active" ? "bg-emerald-400" : "bg-zinc-600"
                    } ${agentPulse === i && agent.status === "active" ? "animate-pulse" : ""}`}
                  />
                  <span className="text-[9px] text-zinc-400 font-medium">{agent.name}</span>
                  {agent.tasks > 0 && (
                    <span className="text-[8px] text-zinc-500 bg-zinc-800 rounded px-1">{agent.tasks}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Live activity feed */}
          <div className="space-y-1">
            <div className="flex items-center justify-between px-0.5 mb-1">
              <span className="text-[9px] text-zinc-500 font-semibold uppercase tracking-wider">Live Activity</span>
              <span className="text-[9px] text-zinc-600">Just now</span>
            </div>
            {visibleFeed.map((idx, position) => {
              const item = feedItems[idx];
              const colors = colorClasses[item.color];
              return (
                <div
                  key={`${idx}-${position}`}
                  className={`flex items-center gap-2.5 rounded-lg border border-zinc-800/30 bg-zinc-800/20 px-3 py-2 transition-all duration-500 ${
                    position === 0 ? "opacity-100" : position === 1 ? "opacity-70" : "opacity-40"
                  }`}
                >
                  <div className={`size-5 rounded-md ${colors.bg} border ${colors.border} flex items-center justify-center shrink-0`}>
                    <MiniIcon type={item.icon} className={`size-2.5 ${colors.text}`} />
                  </div>
                  <span className="text-[10px] text-zinc-300 truncate flex-1">{item.text}</span>
                  <div className={`size-1 rounded-full ${colors.dot} shrink-0 ${position === 0 ? "animate-pulse" : ""}`} />
                </div>
              );
            })}
          </div>

          {/* Command bar at bottom */}
          <div className="rounded-lg bg-zinc-900/80 border border-zinc-800/40 px-3 py-2 font-mono">
            <div className="flex items-center gap-2">
              <span className="text-indigo-400/60 text-[10px]">aios</span>
              <span className="text-[10px] text-zinc-400">{">"}</span>
              <span className="text-[10px] text-zinc-300 typing-animation">
                Mark Tanaka proposal complete. Schedule follow-up for Thursday.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating accent lines */}
      <div className="absolute -top-3 -right-3 w-20 h-px bg-gradient-to-r from-transparent to-indigo-500/20" />
      <div className="absolute -bottom-3 -left-3 w-16 h-px bg-gradient-to-r from-violet-500/20 to-transparent" />
    </div>
  );
}
