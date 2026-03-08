"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useInView } from "@/hooks/use-in-view";

/* ── Tool & model definitions ── */
const tools = [
  { name: "Google Drive", logo: "/logos/google-drive.svg" },
  { name: "Notion", logo: "/logos/notion.svg" },
  { name: "Chatwork", logo: "/logos/chatwork.svg" },
  { name: "HubSpot", logo: "/logos/hubspot.svg" },
  { name: "Freee", logo: "/logos/freee.svg" },
  { name: "Slack", logo: "/logos/slack.svg" },
  { name: "Gmail", logo: "/logos/gmail.svg" },
  { name: "LINE", logo: "/logos/line.svg" },
  { name: "Kintone", logo: "/logos/kintone.svg" },
  { name: "Stripe", logo: "/logos/stripe.svg" },
];

const agents = [
  { name: "Sales", color: "emerald" },
  { name: "Support", color: "emerald" },
  { name: "Data", color: "emerald" },
  { name: "Ops", color: "emerald" },
  { name: "Content", color: "emerald" },
];

const models = [
  { name: "Claude", logo: "/logos/anthropic.svg" },
  { name: "GPT", logo: "/logos/openai.svg" },
  { name: "Gemini", logo: "/logos/google.svg" },
];

/* ── Animated pulse dot for connection lines ── */
function PulseDot({ delay, vertical }: { delay: number; vertical?: boolean }) {
  return (
    <div
      className="absolute size-1.5 rounded-full bg-indigo-400"
      style={{
        animation: `${vertical ? "flowDown" : "flowRight"} 2s ease-in-out ${delay}s infinite`,
        opacity: 0,
      }}
    />
  );
}

export function AIOSArchitectureDiagram() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.1 });
  const [activeLayer, setActiveLayer] = useState<string | null>(null);
  const [step, setStep] = useState(0);

  // Staggered reveal
  useEffect(() => {
    if (!isInView) return;
    const timers = [
      setTimeout(() => setStep(1), 100),   // bottom layer
      setTimeout(() => setStep(2), 400),   // connections
      setTimeout(() => setStep(3), 600),   // center brain
      setTimeout(() => setStep(4), 900),   // agents
      setTimeout(() => setStep(5), 1200),  // models
      setTimeout(() => setStep(6), 1500),  // footer
    ];
    return () => timers.forEach(clearTimeout);
  }, [isInView]);

  return (
    <div className="mt-20" ref={ref}>
      {/* Section header */}
      <div
        className="text-center mb-12"
        style={{
          opacity: isInView ? 1 : 0,
          transform: isInView ? "none" : "translateY(16px)",
          transition: "all 0.5s ease-out",
        }}
      >
        <h3 className="text-xl sm:text-2xl font-semibold tracking-tight">
          Four layers. One system.
        </h3>
        <p className="mt-2 text-zinc-500 text-sm max-w-lg mx-auto">
          Data flows up through a central brain. AI agents act on it. You stay in control.
        </p>
      </div>

      <div className="relative max-w-4xl mx-auto px-4">
        {/* ─── LAYER 1: Your Data & Tools (Foundation) ─── */}
        <div
          className={`relative rounded-2xl border border-blue-500/20 bg-blue-500/[0.03] transition-all duration-500 ${
            activeLayer === "data" ? "ring-1 ring-blue-500/20 bg-blue-500/[0.06]" : ""
          }`}
          style={{
            opacity: step >= 1 ? 1 : 0,
            transform: step >= 1 ? "none" : "translateY(20px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
          onMouseEnter={() => setActiveLayer("data")}
          onMouseLeave={() => setActiveLayer(null)}
        >
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-md bg-blue-500/10 border border-blue-500/20">
                  <span className="text-[10px] font-bold text-blue-400">01</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    Your Data & Tools
                  </span>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Everything you already use, connected</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {tools.map((tool, i) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-1.5 rounded-lg border border-zinc-700/30 bg-zinc-800/50 px-2.5 py-1.5 sm:px-3 sm:py-2 transition-all duration-300 hover:border-blue-500/30 hover:bg-blue-500/[0.04]"
                  style={{
                    opacity: step >= 1 ? 1 : 0,
                    transform: step >= 1 ? "none" : "translateY(8px)",
                    transition: `all 0.4s ease-out ${i * 40}ms`,
                  }}
                >
                  <Image
                    src={tool.logo}
                    alt={tool.name}
                    width={14}
                    height={14}
                    className="opacity-60 brightness-0 invert"
                  />
                  <span className="text-[10px] sm:text-xs text-zinc-400 font-medium">{tool.name}</span>
                </div>
              ))}
              <div className="flex items-center rounded-lg border border-dashed border-zinc-700/30 px-2.5 py-1.5 sm:px-3 sm:py-2">
                <span className="text-[10px] sm:text-xs text-zinc-600">+ your tools</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Connection: Data → Brain ─── */}
        <div
          className="flex justify-center py-1"
          style={{ opacity: step >= 2 ? 1 : 0, transition: "opacity 0.4s ease-out" }}
        >
          <div className="relative h-10 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500/40 to-indigo-500/40" />
            {step >= 3 && (
              <>
                <PulseDot delay={0} vertical />
                <PulseDot delay={0.7} vertical />
                <PulseDot delay={1.4} vertical />
              </>
            )}
          </div>
        </div>

        {/* ─── LAYER 2: Central Brain (Hub) ─── */}
        <div
          className={`relative rounded-2xl border-2 border-indigo-500/30 bg-gradient-to-b from-indigo-500/[0.06] to-indigo-500/[0.02] transition-all duration-500 ${
            activeLayer === "brain"
              ? "ring-1 ring-indigo-500/20 border-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.08)]"
              : ""
          }`}
          style={{
            opacity: step >= 3 ? 1 : 0,
            transform: step >= 3 ? "none" : "scale(0.95)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
          onMouseEnter={() => setActiveLayer("brain")}
          onMouseLeave={() => setActiveLayer(null)}
        >
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-8">
              {/* Brain icon - larger, more prominent */}
              <div className="relative shrink-0">
                <div className="absolute inset-0 rounded-2xl bg-indigo-500/20 blur-xl" />
                <div className="relative size-20 sm:size-24 rounded-2xl border-2 border-indigo-500/30 bg-gradient-to-br from-indigo-500/15 to-indigo-600/5 flex items-center justify-center">
                  <svg className="size-9 sm:size-11 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <ellipse cx="12" cy="6" rx="8" ry="3" />
                    <path d="M4 6v6c0 1.66 3.58 3 8 3s8-1.34 8-3V6" />
                    <path d="M4 12v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6" />
                  </svg>
                  {/* Animated ring */}
                  <div className="absolute inset-0 rounded-2xl border border-indigo-400/20 animate-ping" style={{ animationDuration: "3s" }} />
                </div>
                <div className="flex items-center justify-center mt-2">
                  <div className="flex size-7 items-center justify-center rounded-md bg-indigo-500/15 border border-indigo-500/25">
                    <span className="text-[10px] font-bold text-indigo-400">02</span>
                  </div>
                </div>
              </div>

              {/* Brain description */}
              <div className="text-center sm:text-left flex-1">
                <h4 className="text-base sm:text-lg font-semibold text-indigo-300 mb-1.5">
                  Central Brain
                </h4>
                <p className="text-sm text-zinc-400 leading-relaxed mb-3">
                  One unified database you own. All your data structured and ready for AI &mdash; no vendor lock-in.
                </p>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {["VPS", "n8n Automation", "GitHub", "API Layer"].map((cap) => (
                    <span
                      key={cap}
                      className="text-[10px] text-indigo-400/70 border border-indigo-500/20 bg-indigo-500/[0.05] rounded-full px-2.5 py-1 font-medium"
                    >
                      {cap}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Connection: Brain → Agents ─── */}
        <div
          className="flex justify-center py-1"
          style={{ opacity: step >= 4 ? 1 : 0, transition: "opacity 0.4s ease-out" }}
        >
          <div className="relative h-10 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/40 to-emerald-500/40" />
            {step >= 4 && (
              <>
                <PulseDot delay={0.3} vertical />
                <PulseDot delay={1} vertical />
              </>
            )}
          </div>
        </div>

        {/* ─── LAYER 3: AI Agents ─── */}
        <div
          className={`relative rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] transition-all duration-500 ${
            activeLayer === "agents" ? "ring-1 ring-emerald-500/20 bg-emerald-500/[0.06]" : ""
          }`}
          style={{
            opacity: step >= 4 ? 1 : 0,
            transform: step >= 4 ? "none" : "translateY(20px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
          onMouseEnter={() => setActiveLayer("agents")}
          onMouseLeave={() => setActiveLayer(null)}
        >
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-md bg-emerald-500/10 border border-emerald-500/20">
                  <span className="text-[10px] font-bold text-emerald-400">03</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                    AI Agents
                  </span>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Specialized workers with defined roles</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-5 gap-2 sm:gap-4">
              {agents.map((agent, i) => (
                <div
                  key={agent.name}
                  className="flex flex-col items-center gap-2"
                  style={{
                    opacity: step >= 4 ? 1 : 0,
                    transform: step >= 4 ? "none" : "translateY(8px)",
                    transition: `all 0.4s ease-out ${i * 60}ms`,
                  }}
                >
                  <div className="relative">
                    <div className="size-12 sm:size-14 rounded-xl border border-emerald-500/25 bg-zinc-900/80 flex items-center justify-center transition-all duration-200 hover:border-emerald-500/40 hover:bg-emerald-500/[0.04]">
                      <div className="size-5 sm:size-6 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                        <div className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      </div>
                    </div>
                    {/* Active indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 size-2.5 rounded-full bg-emerald-400 border-2 border-zinc-950" />
                  </div>
                  <span className="text-[10px] sm:text-xs text-zinc-500 font-medium">{agent.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Connection: Agents → Models ─── */}
        <div
          className="flex justify-center py-1"
          style={{ opacity: step >= 5 ? 1 : 0, transition: "opacity 0.4s ease-out" }}
        >
          <div className="relative h-10 w-px">
            <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/40 to-amber-500/40" />
            {step >= 5 && (
              <>
                <PulseDot delay={0.5} vertical />
                <PulseDot delay={1.2} vertical />
              </>
            )}
          </div>
        </div>

        {/* ─── LAYER 4: AI Models ─── */}
        <div
          className={`relative rounded-2xl border border-amber-500/20 bg-amber-500/[0.03] transition-all duration-500 ${
            activeLayer === "ai" ? "ring-1 ring-amber-500/20 bg-amber-500/[0.06]" : ""
          }`}
          style={{
            opacity: step >= 5 ? 1 : 0,
            transform: step >= 5 ? "none" : "translateY(20px)",
            transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          }}
          onMouseEnter={() => setActiveLayer("ai")}
          onMouseLeave={() => setActiveLayer(null)}
        >
          <div className="px-5 py-5 sm:px-6 sm:py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex size-7 items-center justify-center rounded-md bg-amber-500/10 border border-amber-500/20">
                  <span className="text-[10px] font-bold text-amber-400">04</span>
                </div>
                <div>
                  <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                    AI Models
                  </span>
                  <p className="text-[11px] text-zinc-500 mt-0.5">Best model for each task, swappable</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center gap-4 sm:gap-8">
              {models.map((model, i) => (
                <div
                  key={model.name}
                  className="flex flex-col items-center gap-2"
                  style={{
                    opacity: step >= 5 ? 1 : 0,
                    transform: step >= 5 ? "none" : "translateY(8px)",
                    transition: `all 0.4s ease-out ${i * 80}ms`,
                  }}
                >
                  <div className="size-14 sm:size-16 rounded-xl border border-amber-500/25 bg-zinc-900/80 flex items-center justify-center transition-all duration-200 hover:border-amber-500/40 hover:bg-amber-500/[0.04]">
                    <Image
                      src={model.logo}
                      alt={model.name}
                      width={22}
                      height={22}
                      className="opacity-70 brightness-0 invert"
                    />
                  </div>
                  <span className="text-[10px] sm:text-xs text-zinc-500 font-medium">{model.name}</span>
                </div>
              ))}
              <div className="flex flex-col items-center gap-2">
                <div className="size-14 sm:size-16 rounded-xl border border-dashed border-amber-500/15 bg-zinc-900/30 flex items-center justify-center">
                  <span className="text-zinc-600 text-lg">+</span>
                </div>
                <span className="text-[10px] sm:text-xs text-zinc-600 font-medium">Any LLM</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── Ownership footer ─── */}
        <div
          className="mt-8 text-center"
          style={{
            opacity: step >= 6 ? 1 : 0,
            transform: step >= 6 ? "none" : "translateY(8px)",
            transition: "all 0.5s ease-out",
          }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-zinc-800/50 bg-zinc-900/50 px-5 py-2.5">
            <svg className="size-4 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
            <span className="text-xs text-zinc-400 font-medium">
              You own every layer. Swap any piece without losing data.
            </span>
          </div>
        </div>
      </div>

      {/* Keyframe styles for flow animation */}
      <style jsx>{`
        @keyframes flowDown {
          0% { top: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: calc(100% - 6px); opacity: 0; }
        }
        @keyframes flowRight {
          0% { left: 0; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { left: calc(100% - 6px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
