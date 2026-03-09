"use client";

import { Badge } from "@/components/ui/badge";
import { AnimateInView } from "@/components/landing/animate-in-view";
import en from "@/lib/i18n/dictionaries/en";
import ja from "@/lib/i18n/dictionaries/ja";

const dictionaries = { en, ja } as const;

/* ─────────────────────────────────────────────
   C-suite colour mapping
   ───────────────────────────────────────────── */
const csuiteColors: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  CPO: {
    bg: "bg-violet-500/10",
    border: "border-violet-500/30",
    text: "text-violet-300",
  },
  CTO: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    text: "text-blue-300",
  },
  CMO: {
    bg: "bg-rose-500/10",
    border: "border-rose-500/30",
    text: "text-rose-300",
  },
  COO: {
    bg: "bg-amber-500/10",
    border: "border-amber-500/30",
    text: "text-amber-300",
  },
  CFO: {
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/30",
    text: "text-emerald-300",
  },
};

/* ─────────────────────────────────────────────
   Node component — a single org chart box
   ───────────────────────────────────────────── */
function OrgNode({
  label,
  sublabel,
  className = "",
  badgeClassName = "",
}: {
  label: string;
  sublabel?: string;
  className?: string;
  badgeClassName?: string;
}) {
  return (
    <div
      className={`rounded-lg border border-zinc-700/60 bg-zinc-900/80 px-4 py-3 text-center ${className}`}
    >
      <span className={`text-sm font-semibold ${badgeClassName}`}>{label}</span>
      {sublabel && (
        <span className="block text-xs text-zinc-500 mt-0.5">{sublabel}</span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Vertical connector line
   ───────────────────────────────────────────── */
function Connector({ className = "" }: { className?: string }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="w-px h-6 bg-zinc-700/60" />
    </div>
  );
}

/* ─────────────────────────────────────────────
   AgentOrgChart — Section 5 org chart component
   ───────────────────────────────────────────── */
export function AgentOrgChart({
  locale,
  compact = false,
}: {
  locale: "en" | "ja";
  compact?: boolean;
}) {
  const dict = dictionaries[locale];
  // ja.ts may not have orgChart yet — fall back to en
  const t =
    "orgChart" in dict.landing
      ? (dict.landing as typeof en.landing).orgChart
      : en.landing.orgChart;

  const inner = (
    <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-6 sm:p-10">
        {/* Section title */}
        <h3 className="text-lg sm:text-xl font-semibold text-center mb-8 sm:mb-10">
          {t.title}
        </h3>

        {/* ─── Desktop / Tablet layout ─── */}
        <div className="hidden sm:block">
          {/* CEO */}
          <div className="flex justify-center">
            <OrgNode
              label={t.ceo}
              className="border-indigo-500/30 bg-indigo-500/[0.06] min-w-[180px]"
              badgeClassName="text-indigo-300"
            />
          </div>

          <Connector />

          {/* Integrator */}
          <div className="flex justify-center">
            <OrgNode
              label={t.integrator}
              className="border-indigo-500/30 bg-indigo-500/[0.06] min-w-[180px]"
              badgeClassName="text-indigo-300"
            />
          </div>

          <Connector />

          {/* Horizontal connector for C-suite */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-3xl">
              {/* Horizontal line across top */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px bg-zinc-700/60" />

              {/* C-suite row */}
              <div className="grid grid-cols-5 gap-3 pt-6">
                {t.csuite.map((agent) => {
                  const colors = csuiteColors[agent.role] || {
                    bg: "bg-zinc-500/10",
                    border: "border-zinc-500/30",
                    text: "text-zinc-300",
                  };
                  return (
                    <div key={agent.role} className="flex flex-col items-center">
                      {/* Vertical tick down from horizontal line */}
                      <div className="w-px h-6 bg-zinc-700/60 -mt-6 mb-0" />
                      <OrgNode
                        label={agent.role}
                        sublabel={agent.domain}
                        className={`${colors.border} ${colors.bg} w-full`}
                        badgeClassName={colors.text}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <Connector className="mt-2" />

          {/* Vendor row */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {t.vendors.map((vendor) => (
              <Badge
                key={vendor.name}
                variant="outline"
                className="border-zinc-700/60 text-zinc-400 bg-zinc-800/50 text-xs"
                title={vendor.description}
              >
                {vendor.name}
              </Badge>
            ))}
          </div>

          {/* Vendor descriptions below */}
          <div className="mt-4 grid grid-cols-5 gap-3 max-w-3xl mx-auto">
            {t.vendors.map((vendor) => (
              <p
                key={vendor.name}
                className="text-[10px] text-zinc-600 text-center leading-tight"
              >
                {vendor.description}
              </p>
            ))}
          </div>
        </div>

        {/* ─── Mobile layout (stacked vertical) ─── */}
        <div className="sm:hidden space-y-2">
          {/* CEO */}
          <OrgNode
            label={t.ceo}
            className="border-indigo-500/30 bg-indigo-500/[0.06]"
            badgeClassName="text-indigo-300"
          />

          <Connector />

          {/* Integrator */}
          <OrgNode
            label={t.integrator}
            className="border-indigo-500/30 bg-indigo-500/[0.06]"
            badgeClassName="text-indigo-300"
          />

          <Connector />

          {/* C-suite */}
          <div className="space-y-2 pl-4 border-l border-zinc-700/60 ml-4">
            {t.csuite.map((agent) => {
              const colors = csuiteColors[agent.role] || {
                bg: "bg-zinc-500/10",
                border: "border-zinc-500/30",
                text: "text-zinc-300",
              };
              return (
                <OrgNode
                  key={agent.role}
                  label={agent.role}
                  sublabel={agent.domain}
                  className={`${colors.border} ${colors.bg}`}
                  badgeClassName={colors.text}
                />
              );
            })}
          </div>

          <Connector />

          {/* Vendors */}
          <div className="space-y-2 pl-4 border-l border-zinc-700/40 ml-4">
            {t.vendors.map((vendor) => (
              <div
                key={vendor.name}
                className="rounded-lg border border-zinc-800/50 bg-zinc-900/60 px-3 py-2"
              >
                <span className="text-xs font-mono font-medium text-zinc-400">
                  {vendor.name}
                </span>
                <span className="block text-[11px] text-zinc-600 mt-0.5">
                  {vendor.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
  );

  // In compact mode (presentation), skip the scroll-triggered animation wrapper
  if (compact) return inner;
  return <AnimateInView>{inner}</AnimateInView>;
}
