"use client";

import { Badge } from "@/components/ui/badge";
import { AnimateInView } from "@/components/landing/animate-in-view";
import en from "@/lib/i18n/dictionaries/en";
import ja from "@/lib/i18n/dictionaries/ja";

const dictionaries = { en, ja } as const;

/* ─────────────────────────────────────────────
   C-suite colour mapping — light theme
   ───────────────────────────────────────────── */
const csuiteColors: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  CPO: {
    bg: "bg-violet-500/8",
    border: "border-violet-500/20",
    text: "text-violet-600",
  },
  CTO: {
    bg: "bg-blue-500/8",
    border: "border-blue-500/20",
    text: "text-blue-600",
  },
  CMO: {
    bg: "bg-rose-500/8",
    border: "border-rose-500/20",
    text: "text-rose-600",
  },
  COO: {
    bg: "bg-amber-500/8",
    border: "border-amber-500/20",
    text: "text-amber-600",
  },
  CFO: {
    bg: "bg-emerald-500/8",
    border: "border-emerald-500/20",
    text: "text-emerald-600",
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
  dark = false,
}: {
  label: string;
  sublabel?: string;
  className?: string;
  badgeClassName?: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`rounded-lg px-4 py-3 text-center ${className}`}
      style={{
        border: className.includes("border-") ? undefined : dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--lp-border-visible)",
        backgroundColor: className.includes("bg-") ? undefined : dark ? "rgba(255,255,255,0.05)" : "var(--lp-bg-elevated)",
      }}
    >
      <span className={`text-sm font-semibold ${badgeClassName}`}>{label}</span>
      {sublabel && (
        <span className="block text-xs mt-0.5" style={{ color: dark ? "rgba(255,255,255,0.5)" : "var(--lp-text-muted)" }}>{sublabel}</span>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Vertical connector line
   ───────────────────────────────────────────── */
function Connector({ className = "", dark = false }: { className?: string; dark?: boolean }) {
  return (
    <div className={`flex justify-center ${className}`}>
      <div className="w-px h-6" style={{ backgroundColor: dark ? "rgba(255,255,255,0.15)" : "var(--lp-border-visible)" }} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   AgentOrgChart — Section 5 org chart component
   ───────────────────────────────────────────── */
export function AgentOrgChart({
  locale,
  compact = false,
  dark = false,
}: {
  locale: "en" | "ja";
  compact?: boolean;
  dark?: boolean;
}) {
  const dict = dictionaries[locale];
  const t =
    "orgChart" in dict.landing
      ? (dict.landing as typeof en.landing).orgChart
      : en.landing.orgChart;

  const inner = (
    <div
      className="rounded-xl p-6 sm:p-10"
      style={{
        backgroundColor: dark ? "rgba(255,255,255,0.03)" : "var(--lp-bg-elevated)",
        border: dark ? "1px solid rgba(255,255,255,0.08)" : "1px solid var(--lp-border-visible)",
      }}
    >
        {/* Section title */}
        <h3
          className="text-lg sm:text-xl font-semibold text-center mb-8 sm:mb-10"
          style={{ color: dark ? "#FFFFFF" : "var(--lp-text-heading)" }}
        >
          {t.title}
        </h3>

        {/* ─── Desktop / Tablet layout ─── */}
        <div className="hidden sm:block">
          {/* CEO */}
          <div className="flex justify-center">
            <OrgNode
              label={t.ceo}
              className={`border ${dark ? "border-indigo-400/30 bg-indigo-400/10" : "border-indigo-500/20 bg-indigo-500/[0.06]"} min-w-[180px]`}
              badgeClassName={dark ? "text-indigo-300" : "text-indigo-600"}
              dark={dark}
            />
          </div>

          <Connector dark={dark} />

          {/* Integrator */}
          <div className="flex justify-center">
            <OrgNode
              label={t.integrator}
              className={`border ${dark ? "border-indigo-400/30 bg-indigo-400/10" : "border-indigo-500/20 bg-indigo-500/[0.06]"} min-w-[180px]`}
              badgeClassName={dark ? "text-indigo-300" : "text-indigo-600"}
              dark={dark}
            />
          </div>

          <Connector dark={dark} />

          {/* Horizontal connector for C-suite */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-3xl">
              {/* Horizontal line across top */}
              <div className="absolute top-0 left-[10%] right-[10%] h-px" style={{ backgroundColor: dark ? "rgba(255,255,255,0.15)" : "var(--lp-border-visible)" }} />

              {/* C-suite row */}
              <div className="grid grid-cols-5 gap-3 pt-6">
                {t.csuite.map((agent) => {
                  const colors = csuiteColors[agent.role] || {
                    bg: "bg-zinc-500/8",
                    border: "border-zinc-500/20",
                    text: "text-zinc-600",
                  };
                  return (
                    <div key={agent.role} className="flex flex-col items-center">
                      {/* Vertical tick down from horizontal line */}
                      <div className="w-px h-6 -mt-6 mb-0" style={{ backgroundColor: dark ? "rgba(255,255,255,0.15)" : "var(--lp-border-visible)" }} />
                      <OrgNode
                        label={agent.role}
                        sublabel={agent.domain}
                        className={`border ${colors.border} ${colors.bg} w-full`}
                        badgeClassName={colors.text}
                        dark={dark}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <Connector className="mt-2" dark={dark} />

          {/* Vendor row */}
          <div className="flex flex-wrap justify-center gap-2 mt-2">
            {t.vendors.map((vendor) => (
              <Badge
                key={vendor.name}
                variant="outline"
                className="text-xs"
                style={{
                  borderColor: dark ? "rgba(255,255,255,0.15)" : "var(--lp-border-visible)",
                  color: dark ? "rgba(255,255,255,0.7)" : "var(--lp-text-body)",
                  backgroundColor: dark ? "rgba(255,255,255,0.05)" : "var(--lp-bg-primary)",
                }}
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
                className="text-[10px] text-center leading-tight"
                style={{ color: dark ? "rgba(255,255,255,0.4)" : "var(--lp-text-muted)" }}
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
            className={`border ${dark ? "border-indigo-400/30 bg-indigo-400/10" : "border-indigo-500/20 bg-indigo-500/[0.06]"}`}
            badgeClassName={dark ? "text-indigo-300" : "text-indigo-600"}
            dark={dark}
          />

          <Connector dark={dark} />

          {/* Integrator */}
          <OrgNode
            label={t.integrator}
            className={`border ${dark ? "border-indigo-400/30 bg-indigo-400/10" : "border-indigo-500/20 bg-indigo-500/[0.06]"}`}
            badgeClassName={dark ? "text-indigo-300" : "text-indigo-600"}
            dark={dark}
          />

          <Connector dark={dark} />

          {/* C-suite */}
          <div className="space-y-2 pl-4 ml-4" style={{ borderLeft: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid var(--lp-border-visible)" }}>
            {t.csuite.map((agent) => {
              const colors = csuiteColors[agent.role] || {
                bg: "bg-zinc-500/8",
                border: "border-zinc-500/20",
                text: "text-zinc-600",
              };
              return (
                <OrgNode
                  key={agent.role}
                  label={agent.role}
                  sublabel={agent.domain}
                  className={`border ${colors.border} ${colors.bg}`}
                  badgeClassName={colors.text}
                  dark={dark}
                />
              );
            })}
          </div>

          <Connector dark={dark} />

          {/* Vendors */}
          <div className="space-y-2 pl-4 ml-4" style={{ borderLeft: dark ? "1px solid rgba(255,255,255,0.15)" : "1px solid var(--lp-border-visible)" }}>
            {t.vendors.map((vendor) => (
              <div
                key={vendor.name}
                className="rounded-lg px-3 py-2"
                style={{
                  border: dark ? "1px solid rgba(255,255,255,0.1)" : "1px solid var(--lp-border-visible)",
                  backgroundColor: dark ? "rgba(255,255,255,0.05)" : "var(--lp-bg-primary)",
                }}
              >
                <span className="text-xs font-mono font-medium" style={{ color: dark ? "rgba(255,255,255,0.7)" : "var(--lp-text-body)" }}>
                  {vendor.name}
                </span>
                <span className="block text-[11px] mt-0.5" style={{ color: dark ? "rgba(255,255,255,0.4)" : "var(--lp-text-muted)" }}>
                  {vendor.description}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
  );

  if (compact) return inner;
  return <AnimateInView>{inner}</AnimateInView>;
}
