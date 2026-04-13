"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { AnimateInView } from "@/components/landing/animate-in-view";
import {
  Activity,
  DollarSign,
  Zap,
  Heart,
  Users,
  FileText,
} from "lucide-react";
import type { SectionProps } from "./types";

const ICON_MAP: Record<string, React.ElementType> = {
  activity: Activity,
  "dollar-sign": DollarSign,
  zap: Zap,
  heart: Heart,
  users: Users,
  "file-text": FileText,
};

export default function AutomationTasksSection({ t, locale }: SectionProps) {
  const headingFont =
    locale === "ja"
      ? "font-[family-name:var(--font-shippori-mincho)]"
      : "font-[family-name:var(--font-dm-sans)]";

  const at = (t as any).automationTasks;
  if (!at) return null;

  const frontDepts = at.departments.filter((d: any) => d.group === "front");
  const backDepts = at.departments.filter((d: any) => d.group === "back");
  const [activeId, setActiveId] = useState(at.departments[0]?.id || "marketing");
  const activeDept = at.departments.find((d: any) => d.id === activeId) || at.departments[0];
  const ActiveIcon = ICON_MAP[activeDept?.icon] || Activity;

  return (
    <section
      id="automation"
      className="border-t border-[#E8E8ED]"
      style={{
        backgroundColor: "var(--lp-bg-subtle)",
        paddingTop: "var(--lp-section-gap)",
        paddingBottom: "var(--lp-section-gap)",
      }}
    >
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <AnimateInView className="text-center mb-12">
          <Badge
            variant="outline"
            className="mb-4 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/8"
          >
            {at.badge}
          </Badge>
          <h2
            className={`font-bold tracking-tight ${headingFont}`}
            style={{ fontSize: "var(--text-h2)", color: "var(--lp-text-heading)" }}
          >
            {at.title}{" "}
            <span className="gradient-text">{at.titleHighlight}</span>{" "}
            {at.titleEnd}
          </h2>
          <p
            className="mt-4 max-w-xl mx-auto text-lg"
            style={{
              color: "var(--lp-text-body)",
              ...(locale === "ja" ? { lineHeight: "1.9" } : {}),
            }}
          >
            {at.subtitle}
          </p>
        </AnimateInView>

        {/* Desktop: side-by-side */}
        <div className="hidden md:grid md:grid-cols-[260px_1fr] gap-6">
          {/* Left: Department nav */}
          <div className="flex flex-col gap-1">
            <p
              className="text-[11px] font-bold uppercase tracking-widest mb-2 px-1"
              style={{ color: "var(--lp-text-muted)" }}
            >
              {at.frontOfficeLabel}
            </p>
            {frontDepts.map((dept: any) => {
              const Icon = ICON_MAP[dept.icon] || Activity;
              const isActive = dept.id === activeId;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveId(dept.id)}
                  className={`flex items-center gap-3 w-full rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? "bg-[#1D1D1F] text-white shadow-sm"
                      : "text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
                  }`}
                >
                  <Icon className={`size-4 shrink-0 ${isActive ? "text-[#D4A843]" : ""}`} />
                  <span className="text-sm font-semibold flex-1">{dept.name}</span>
                  <span className={`text-xs font-bold ${isActive ? "text-[#D4A843]" : "gradient-text"}`}>
                    {dept.totalValue}
                  </span>
                </button>
              );
            })}

            <p
              className="text-[11px] font-bold uppercase tracking-widest mt-4 mb-2 px-1"
              style={{ color: "var(--lp-text-muted)" }}
            >
              {at.backOfficeLabel}
            </p>
            {backDepts.map((dept: any) => {
              const Icon = ICON_MAP[dept.icon] || Activity;
              const isActive = dept.id === activeId;
              return (
                <button
                  key={dept.id}
                  onClick={() => setActiveId(dept.id)}
                  className={`flex items-center gap-3 w-full rounded-xl px-4 py-3 text-left transition-all duration-200 ${
                    isActive
                      ? "bg-[#1D1D1F] text-white shadow-sm"
                      : "text-[#86868B] hover:text-[#1D1D1F] hover:bg-[#F5F5F7]"
                  }`}
                >
                  <Icon className={`size-4 shrink-0 ${isActive ? "text-[#D4A843]" : ""}`} />
                  <span className="text-sm font-semibold flex-1">{dept.name}</span>
                  <span className={`text-xs font-bold ${isActive ? "text-[#D4A843]" : "gradient-text"}`}>
                    {dept.totalValue}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right: Workflow detail */}
          <div
            key={activeId}
            className="rounded-2xl p-6 sm:p-8 animate-fade-in-up"
            style={{
              backgroundColor: "var(--lp-bg-primary)",
              border: "1px solid var(--lp-border-visible)",
            }}
          >
            {/* Dept header */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className="flex size-10 items-center justify-center rounded-xl shrink-0"
                style={{ backgroundColor: "rgba(184,134,11,0.08)" }}
              >
                <ActiveIcon className="size-5" style={{ color: "var(--lp-accent)" }} />
              </div>
              <div>
                <h3
                  className={`text-lg font-bold ${headingFont}`}
                  style={{ color: "var(--lp-text-heading)" }}
                >
                  {activeDept.name}
                </h3>
              </div>
              <span
                className="ml-auto text-lg font-bold font-[family-name:var(--font-dm-sans)]"
                style={{ color: "var(--lp-accent)" }}
              >
                {activeDept.totalValue}
              </span>
            </div>

            {/* Workflow list */}
            <ul className="space-y-3 mb-6">
              {activeDept.workflows?.map((wf: string, wi: number) => (
                <li
                  key={wi}
                  className="flex items-start gap-3 text-sm"
                  style={{
                    color: "var(--lp-text-body)",
                    lineHeight: locale === "ja" ? "1.8" : "1.6",
                  }}
                >
                  <span className="text-[#B8860B] mt-0.5 shrink-0">&#x2022;</span>
                  <span>{wf}</span>
                </li>
              ))}
            </ul>

            {/* Tools + Outcome */}
            <div
              className="pt-4"
              style={{ borderTop: "1px solid var(--lp-border-visible)" }}
            >
              <p
                className="text-xs mb-2"
                style={{ color: "var(--lp-text-muted)" }}
              >
                {activeDept.tools}
              </p>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--lp-accent)" }}
              >
                {activeDept.outcome}
              </p>
            </div>
          </div>
        </div>

        {/* Mobile: horizontal pills + stacked content */}
        <div className="md:hidden">
          <div className="overflow-x-auto -mx-6 px-6 mb-6">
            <div
              className="inline-flex w-auto gap-1.5 p-1.5 rounded-xl"
              style={{ backgroundColor: "var(--lp-bg-elevated)" }}
            >
              {at.departments.map((dept: any) => (
                <button
                  key={dept.id}
                  onClick={() => setActiveId(dept.id)}
                  className={`rounded-lg px-3.5 py-2 text-xs font-semibold whitespace-nowrap transition-all ${
                    dept.id === activeId
                      ? "bg-[#1D1D1F] text-white shadow-sm"
                      : "text-[#86868B]"
                  }`}
                >
                  {dept.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile content */}
          <div
            key={activeId}
            className="rounded-2xl p-5 animate-fade-in-up"
            style={{
              backgroundColor: "var(--lp-bg-primary)",
              border: "1px solid var(--lp-border-visible)",
            }}
          >
            <div className="flex items-center gap-3 mb-4">
              <ActiveIcon className="size-5" style={{ color: "var(--lp-accent)" }} />
              <h3 className="text-base font-bold" style={{ color: "var(--lp-text-heading)" }}>
                {activeDept.name}
              </h3>
              <span className="ml-auto text-sm font-bold gradient-text">
                {activeDept.totalValue}
              </span>
            </div>
            <ul className="space-y-2.5 mb-4">
              {activeDept.workflows?.map((wf: string, wi: number) => (
                <li
                  key={wi}
                  className="flex items-start gap-2.5 text-sm"
                  style={{
                    color: "var(--lp-text-body)",
                    lineHeight: locale === "ja" ? "1.8" : "1.6",
                  }}
                >
                  <span className="text-[#B8860B] mt-0.5 shrink-0">&#x2022;</span>
                  <span>{wf}</span>
                </li>
              ))}
            </ul>
            <div className="pt-3" style={{ borderTop: "1px solid var(--lp-border-visible)" }}>
              <p className="text-xs mb-1.5" style={{ color: "var(--lp-text-muted)" }}>{activeDept.tools}</p>
              <p className="text-sm font-medium" style={{ color: "var(--lp-accent)" }}>{activeDept.outcome}</p>
            </div>
          </div>
        </div>

        {/* Summary Bar */}
        <AnimateInView className="mt-8">
          <div
            className="rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-5"
            style={{ backgroundColor: "#1D1D1F" }}
          >
            <p
              className="text-sm text-white/70 max-w-lg"
              style={{ lineHeight: locale === "ja" ? "1.85" : "1.6" }}
            >
              {at.summaryText}
            </p>
            <div className="text-right shrink-0">
              <div
                className="text-3xl sm:text-4xl font-bold font-[family-name:var(--font-dm-sans)]"
                style={{ color: "#D4A843", letterSpacing: "-0.03em" }}
              >
                {at.summaryValue}
              </div>
              <div className="text-xs text-white/40 mt-1">{at.summaryLabel}</div>
            </div>
          </div>
        </AnimateInView>
      </div>
    </section>
  );
}
