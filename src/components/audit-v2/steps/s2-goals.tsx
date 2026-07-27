"use client";

import { V2StepLayout } from "../shared/v2-step-layout";
import { useAuditV2Locale, pickLabel } from "../audit-v2-locale-context";
import { GOALS, type GoalId } from "@/lib/audit-v2/goals";
import { GOAL_ICONS } from "../shared/icons";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { segmentJapanese } from "@/lib/budoux-transform";
import type { AuditV2Data } from "@/hooks/use-audit-form-v2";

interface Props {
  data: AuditV2Data;
  update: (patch: Partial<AuditV2Data>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
  isFirst?: boolean;
}

export function S2Goals({ data, update, onNext, onBack, isLoading, error, isFirst }: Props) {
  const { t, locale } = useAuditV2Locale();

  const toggle = (id: GoalId) => {
    const set = new Set(data.goalsSelected);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    update({ goalsSelected: Array.from(set) });
  };

  return (
    <V2StepLayout
      question={t.goals.select.question}
      description={t.goals.select.description}
      onNext={onNext}
      onBack={onBack}
      isFirst={isFirst}
      isLoading={isLoading}
      canContinue={data.goalsSelected.length > 0}
      error={error}
    >
      <div className="mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8860B]">
          {data.goalsSelected.length > 0
            ? `${data.goalsSelected.length} ${t.common.selected}`
            : t.goals.select.hint}
        </span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {GOALS.map((g) => {
          const selected = data.goalsSelected.includes(g.id);
          const Icon = GOAL_ICONS[g.id];
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => toggle(g.id)}
              aria-pressed={selected}
              className={cn(
                "relative flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-[1px] min-h-[112px]",
                selected
                  ? "border-[#B8860B] bg-gradient-to-br from-[#B8860B]/10 to-transparent ring-2 ring-[#B8860B]/25 shadow-[0_2px_8px_rgba(184,134,11,0.08)]"
                  : "border-[#E8E8ED] bg-[#F5F5F7] hover:border-[#B8860B]/40 hover:bg-white"
              )}
            >
              {selected && (
                <span className="absolute top-2 right-2 size-5 rounded-full bg-[#B8860B] text-white grid place-items-center">
                  <Check className="size-3" strokeWidth={3} />
                </span>
              )}
              <Icon className="size-6 text-[#B8860B]" aria-hidden />
              <span className="text-sm font-semibold text-[#1D1D1F] leading-tight">
                {segmentJapanese(pickLabel(g, locale))}
              </span>
              {locale === "ja" && (
                <span className="text-[11px] text-[#86868B]">{g.en}</span>
              )}
            </button>
          );
        })}
      </div>
    </V2StepLayout>
  );
}
