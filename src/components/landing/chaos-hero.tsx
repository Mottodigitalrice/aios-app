"use client";

import Image from "next/image";
import { Terminal, Server, Globe, Cpu, ArrowDown, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";

/* ─────────────────────────────────────────────
   AI tools that form the chaotic pile
   All with real logos for consistency
   ───────────────────────────────────────────── */
const chaosTools = [
  { name: "Slack", logo: "/logos/slack.svg" },
  { name: "Notion", logo: "/logos/notion.svg" },
  { name: "Google Drive", logo: "/logos/google-drive.svg" },
  { name: "HubSpot", logo: "/logos/hubspot.svg" },
  { name: "Salesforce", logo: "/logos/salesforce.svg" },
  { name: "Gmail", logo: "/logos/gmail.svg" },
  { name: "Freee", logo: "/logos/freee.svg" },
  { name: "LINE", logo: "/logos/line.svg" },
  { name: "ChatGPT", logo: "/logos/chatgpt.svg" },
  { name: "Gemini", logo: "/logos/gemini.svg" },
  { name: "Perplexity", logo: "/logos/perplexity.svg" },
  { name: "Midjourney", logo: "/logos/midjourney.svg" },
  { name: "Genspark", logo: "/logos/genspark.svg" },
  { name: "Gamma", logo: "/logos/gamma.svg" },
  { name: "Canva", logo: "/logos/canva.svg" },
  { name: "Zapier", logo: "/logos/zapier.svg" },
  { name: "Make", logo: "/logos/make.svg" },
  { name: "Claude", logo: "/logos/anthropic.svg" },
  { name: "Zoom", logo: "/logos/zoom.svg" },
  { name: "Stripe", logo: "/logos/stripe.svg" },
];

/* ─────────────────────────────────────────────
   Speech bubbles with frustrated quotes
   ───────────────────────────────────────────── */
const speechBubbles = [
  {
    text: "Which AI are we supposed to use for this?",
    position: "top-[2%] left-[2%] sm:top-[5%] sm:left-[3%]",
    rotate: "-rotate-3",
  },
  {
    text: "I paid for 6 subscriptions and nothing talks to each other",
    position: "top-[0%] right-[2%] sm:top-[3%] sm:right-[3%]",
    rotate: "rotate-2",
  },
  {
    text: "The intern built it in ChatGPT... then left",
    position: "bottom-[22%] left-[1%] sm:bottom-[18%] sm:left-[2%]",
    rotate: "rotate-1",
  },
  {
    text: "Wait, is our company data in all of these?!",
    position: "bottom-[22%] right-[1%] sm:bottom-[18%] sm:right-[2%]",
    rotate: "-rotate-2",
  },
  {
    text: "This is exhausting! None of these connect!",
    position: "bottom-[4%] left-[50%] -translate-x-1/2",
    rotate: "rotate-0",
  },
];

/* ─────────────────────────────────────────────
   Scattered positions for each tool card
   Hand-tuned for visual chaos
   ───────────────────────────────────────────── */
const scatterPositions = [
  { x: "45%", y: "30%", rotate: -12, scale: 1.1, z: 10 },
  { x: "28%", y: "25%", rotate: 8, scale: 0.95, z: 5 },
  { x: "60%", y: "22%", rotate: -5, scale: 1, z: 8 },
  { x: "38%", y: "48%", rotate: 15, scale: 0.9, z: 12 },
  { x: "55%", y: "45%", rotate: -18, scale: 1.05, z: 6 },
  { x: "22%", y: "42%", rotate: 10, scale: 0.85, z: 4 },
  { x: "68%", y: "38%", rotate: -8, scale: 0.95, z: 7 },
  { x: "48%", y: "58%", rotate: 22, scale: 0.9, z: 11 },
  { x: "32%", y: "60%", rotate: -14, scale: 1, z: 9 },
  { x: "62%", y: "55%", rotate: 6, scale: 1.1, z: 13 },
  { x: "20%", y: "55%", rotate: -20, scale: 0.85, z: 3 },
  { x: "72%", y: "50%", rotate: 12, scale: 0.9, z: 5 },
  { x: "42%", y: "38%", rotate: -25, scale: 1.05, z: 14 },
  { x: "52%", y: "65%", rotate: 18, scale: 0.8, z: 2 },
  { x: "35%", y: "35%", rotate: 3, scale: 0.95, z: 8 },
  { x: "58%", y: "32%", rotate: -10, scale: 0.9, z: 6 },
  { x: "25%", y: "35%", rotate: 20, scale: 0.85, z: 1 },
  { x: "65%", y: "62%", rotate: -15, scale: 0.9, z: 4 },
  { x: "75%", y: "28%", rotate: 7, scale: 0.8, z: 3 },
  { x: "18%", y: "48%", rotate: -6, scale: 0.85, z: 2 },
];

/* ─────────────────────────────────────────────
   Speech Bubble Component
   ───────────────────────────────────────────── */
function SpeechBubble({
  text,
  position,
  rotate,
}: {
  text: string;
  position: string;
  rotate: string;
}) {
  return (
    <div
      className={`absolute ${position} ${rotate} max-w-[180px] sm:max-w-[220px] z-30`}
    >
      <div className="bg-white rounded-2xl px-3 py-2 sm:px-4 sm:py-3 shadow-lg shadow-black/20 border border-zinc-200">
        <p className="text-[11px] sm:text-sm font-bold text-zinc-800 leading-tight">
          {text}
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Tool Card Component (the scattered app icons)
   ───────────────────────────────────────────── */
function ToolCard({
  tool,
  position,
}: {
  tool: (typeof chaosTools)[0];
  position: (typeof scatterPositions)[0];
}) {
  return (
    <div
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: position.x,
        top: position.y,
        transform: `translate(-50%, -50%) rotate(${position.rotate}deg) scale(${position.scale})`,
        zIndex: position.z,
      }}
    >
      <div className="size-12 sm:size-16 rounded-xl bg-white shadow-md shadow-black/10 border border-zinc-200/80 flex items-center justify-center p-2">
        <Image
          src={tool.logo}
          alt={tool.name}
          width={32}
          height={32}
          className="size-7 sm:size-9 object-contain"
        />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Chaos Hero Component
   ───────────────────────────────────────────── */
export function ChaosHero() {
  return (
    <>
      {/* ═══════════════════════════════════════
          SECTION 1: The Chaos (Crossed-out tools)
          ═══════════════════════════════════════ */}
      <section className="relative pt-10 pb-8 sm:pt-16 sm:pb-12 overflow-hidden border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <Badge variant="outline" className="mb-4 border-red-500/30 text-red-300 bg-red-500/10">
              This is how most companies &quot;do AI&quot;
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
              A pile of disconnected tools.{" "}
              <span className="text-red-400">No system.</span>
            </h2>
          </div>

          {/* The chaos cloud container */}
          <div className="relative mx-auto w-full aspect-[4/3] sm:aspect-[16/10] max-w-3xl">
            {/* Soft background blob */}
            <div className="absolute inset-[10%] rounded-full bg-red-500/[0.04] blur-3xl" />
            <div className="absolute inset-[15%] rounded-full bg-orange-500/[0.03] blur-2xl" />

            {/* Scattered tool cards */}
            {chaosTools.map((tool, i) => (
              <ToolCard
                key={tool.name}
                tool={tool}
                position={scatterPositions[i]}
              />
            ))}

            {/* The big X */}
            <svg
              className="absolute inset-0 w-full h-full z-20 pointer-events-none"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <line
                x1="20" y1="20" x2="80" y2="80"
                stroke="rgb(239, 68, 68)"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.8"
              />
              <line
                x1="80" y1="20" x2="20" y2="80"
                stroke="rgb(239, 68, 68)"
                strokeWidth="3"
                strokeLinecap="round"
                opacity="0.8"
              />
            </svg>

            {/* Speech bubbles */}
            {speechBubbles.map((bubble) => (
              <SpeechBubble key={bubble.text} {...bubble} />
            ))}
          </div>

          {/* Transition */}
          <div className="text-center mt-6 sm:mt-10">
            <p className="text-zinc-500 text-sm sm:text-base font-medium">
              Sound familiar? Here&apos;s what changed.
            </p>
            <ArrowDown className="mx-auto mt-3 size-5 text-zinc-600 animate-bounce" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SECTION 2: Everything Has Changed
          ═══════════════════════════════════════ */}
      <section className="py-16 sm:py-24 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-6">
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-300 bg-emerald-500/10">
              The Paradigm Shift
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              AI isn&apos;t a chatbot anymore.{" "}
              <span className="gradient-text">It&apos;s an operator.</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
              In 2024, AI answered questions. In 2026, AI agents plug into your terminal, run your servers, install software, call APIs, and execute real work — autonomously.
            </p>
          </div>

          {/* Before / After comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* BEFORE */}
            <div className="rounded-xl border border-red-500/20 bg-red-500/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="size-2 rounded-full bg-red-400" />
                <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">What most people think AI is</span>
              </div>
              <ul className="space-y-4">
                {[
                  "ChatGPT window you type questions into",
                  "Copilot that autocompletes your code",
                  "Image generators for marketing assets",
                  "Chatbot widget on your website",
                  "A tool you open when you need help",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                    <span className="text-red-400 mt-0.5 shrink-0">&#x2717;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* AFTER */}
            <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="size-2 rounded-full bg-emerald-400" />
                <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">What AI actually is now</span>
              </div>
              <ul className="space-y-4">
                {[
                  "Agents that SSH into servers and deploy code",
                  "Systems that read your databases and take action",
                  "Operators that install, configure, and run software",
                  "Workflows that call APIs, process data, and report back",
                  "An always-on workforce that operates your infrastructure",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                    <span className="text-emerald-400 mt-0.5 shrink-0">&#x2713;</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The technical reality */}
          <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6 sm:p-8">
            <h3 className="text-lg sm:text-xl font-semibold mb-6 text-center">
              How agentic AI actually works
            </h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  icon: <Terminal className="size-6 text-indigo-400" />,
                  iconBg: "bg-indigo-500/10 border-indigo-500/20",
                  title: "CLI Access",
                  description: "AI agents connect directly to your terminal. They run commands, not just conversations.",
                },
                {
                  icon: <Server className="size-6 text-violet-400" />,
                  iconBg: "bg-violet-500/10 border-violet-500/20",
                  title: "Server Control",
                  description: "They SSH into VPS, manage Docker containers, restart services, deploy updates.",
                },
                {
                  icon: <Globe className="size-6 text-emerald-400" />,
                  iconBg: "bg-emerald-500/10 border-emerald-500/20",
                  title: "API Integration",
                  description: "Agents call APIs, process webhooks, sync data between systems — automatically.",
                },
                {
                  icon: <Cpu className="size-6 text-amber-400" />,
                  iconBg: "bg-amber-500/10 border-amber-500/20",
                  title: "Software Operations",
                  description: "Install packages, configure tools, manage databases, run workflows — all autonomously.",
                },
              ].map((item) => (
                <div key={item.title} className="text-center p-4">
                  <div className={`mx-auto mb-3 flex size-12 items-center justify-center rounded-lg border ${item.iconBg}`}>
                    {item.icon}
                  </div>
                  <h4 className="text-sm font-semibold mb-1.5">{item.title}</h4>
                  <p className="text-xs text-zinc-500 leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Punchline */}
          <div className="mt-10 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-5 py-2.5">
              <Zap className="size-4 text-indigo-400" />
              <span className="text-sm font-medium text-indigo-300">
                The question isn&apos;t &quot;should we use AI?&quot; — it&apos;s &quot;do we have the infrastructure to run it?&quot;
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
