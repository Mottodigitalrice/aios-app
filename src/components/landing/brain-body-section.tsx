"use client";

import { Brain, Zap, Plug } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { AnimateInView } from "@/components/landing/animate-in-view";
import en from "@/lib/i18n/dictionaries/en";
import ja from "@/lib/i18n/dictionaries/ja";

const dictionaries = { en, ja } as const;

/* ─────────────────────────────────────────────
   Panel config — icon, accent colour per panel
   ───────────────────────────────────────────── */
const panelConfig = [
  {
    icon: Brain,
    accent: "amber",
    iconColor: "text-amber-400",
    iconBg: "bg-amber-500/10 border-amber-500/20",
    dotColor: "bg-amber-400",
    labelColor: "text-amber-400",
  },
  {
    icon: Zap,
    accent: "indigo",
    iconColor: "text-indigo-400",
    iconBg: "bg-indigo-500/10 border-indigo-500/20",
    dotColor: "bg-indigo-400",
    labelColor: "text-indigo-400",
  },
  {
    icon: Plug,
    accent: "emerald",
    iconColor: "text-emerald-400",
    iconBg: "bg-emerald-500/10 border-emerald-500/20",
    dotColor: "bg-emerald-400",
    labelColor: "text-emerald-400",
  },
] as const;

const panelLabels = ["Old AI", "Agentic AI", "Your Business"] as const;

/* ─────────────────────────────────────────────
   BrainBodySection — Section 3: The Paradigm Shift
   ───────────────────────────────────────────── */
export function BrainBodySection({ locale }: { locale: "en" | "ja" }) {
  const dict = dictionaries[locale];
  // ja.ts may not have brainBody yet — fall back to en
  const t =
    "brainBody" in dict.landing
      ? (dict.landing as typeof en.landing).brainBody
      : en.landing.brainBody;

  return (
    <section className="py-16 sm:py-24 border-t border-zinc-800/50">
      <div className="mx-auto max-w-5xl px-6">
        {/* Header */}
        <AnimateInView className="text-center mb-12 sm:mb-16">
          <Badge
            variant="outline"
            className="mb-4 border-indigo-500/30 text-indigo-300 bg-indigo-500/10"
          >
            {t.badge}
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            {t.title}
          </h2>
          <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
            {t.subtitle}
          </p>
        </AnimateInView>

        {/* Three panels */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 relative">
          {/* Connecting arrows between panels (desktop only) */}
          <div className="hidden sm:block absolute top-1/2 left-[33.33%] w-[33.33%] -translate-y-1/2 pointer-events-none z-10">
            <div className="h-px bg-gradient-to-r from-amber-500/40 via-indigo-500/40 to-indigo-500/40" />
          </div>
          <div className="hidden sm:block absolute top-1/2 left-[66.66%] w-[33.33%] -translate-y-1/2 pointer-events-none z-10">
            <div className="h-px bg-gradient-to-r from-indigo-500/40 via-emerald-500/40 to-emerald-500/40" />
          </div>

          {t.panels.map((panel, i) => {
            const config = panelConfig[i];
            const Icon = config.icon;

            return (
              <AnimateInView key={i} delay={i * 200}>
                <div className="relative rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6 sm:p-8 h-full flex flex-col">
                  {/* Panel label */}
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`size-2 rounded-full ${config.dotColor}`} />
                    <span
                      className={`text-xs font-semibold uppercase tracking-wider ${config.labelColor}`}
                    >
                      {panelLabels[i]}
                    </span>
                  </div>

                  {/* Icon */}
                  <div
                    className={`mb-4 flex size-12 items-center justify-center rounded-lg border ${config.iconBg}`}
                  >
                    <Icon className={`size-6 ${config.iconColor}`} />
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold mb-3">{panel.title}</h3>
                  <p className="text-sm text-zinc-400 leading-relaxed flex-1">
                    {panel.body}
                  </p>
                </div>
              </AnimateInView>
            );
          })}
        </div>

        {/* Closing line */}
        <AnimateInView className="mt-10 sm:mt-14 text-center" delay={600}>
          <p className="text-lg sm:text-xl font-medium text-indigo-300">
            {t.closing}
          </p>
        </AnimateInView>
      </div>
    </section>
  );
}
