"use client";

import { V2StepLayout } from "../shared/v2-step-layout";
import { useAuditV2Locale, pickLabel } from "../audit-v2-locale-context";
import { GOAL_BY_ID } from "@/lib/audit-v2/goals";
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
}

export function S4Blockers({ data, update, onNext, onBack, isLoading, error }: Props) {
  const { t, locale } = useAuditV2Locale();
  const topGoalId = (data.goalsRanked[0] ?? data.goalsSelected[0]) || null;
  const topGoal = topGoalId ? GOAL_BY_ID[topGoalId] : null;

  if (!topGoal) {
    return (
      <V2StepLayout
        question={t.goals.blockers.question.replace("{goal}", "")}
        onNext={onBack}
        onBack={onBack}
        isLoading={false}
        canContinue={false}
        error="No top goal selected — go back and rank your goals."
      >
        <div />
      </V2StepLayout>
    );
  }

  const goalLabel = pickLabel(topGoal, locale);

  const toggle = (key: string) => {
    const set = new Set(data.topGoalBlockers);
    if (set.has(key)) set.delete(key);
    else set.add(key);
    update({ topGoalBlockers: Array.from(set) });
  };

  return (
    <V2StepLayout
      question={t.goals.blockers.question.replace("{goal}", goalLabel)}
      description={t.goals.blockers.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue={data.topGoalBlockers.length > 0}
      error={error}
    >
      <div className="mb-3">
        <span className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8860B]">
          {data.topGoalBlockers.length > 0
            ? `${data.topGoalBlockers.length} ${t.common.selected}`
            : t.goals.blockers.hint}
        </span>
      </div>
      <div className="space-y-2">
        {topGoal.blockers.map((b) => {
          const key = b.ja; // stable key (JA is canonical)
          const selected = data.topGoalBlockers.includes(key);
          return (
            <button
              key={key}
              type="button"
              onClick={() => toggle(key)}
              aria-pressed={selected}
              className={cn(
                "w-full flex items-center gap-3 rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-[1px]",
                selected
                  ? "border-[#B8860B] bg-gradient-to-br from-[#B8860B]/10 to-transparent ring-2 ring-[#B8860B]/25 shadow-[0_2px_8px_rgba(184,134,11,0.08)]"
                  : "border-[#E8E8ED] bg-[#F5F5F7] hover:border-[#B8860B]/40 hover:bg-white"
              )}
            >
              <span
                className={cn(
                  "grid place-items-center size-5 rounded-md border-2 shrink-0",
                  selected ? "border-[#B8860B] bg-[#B8860B]" : "border-[#E8E8ED] bg-white"
                )}
              >
                {selected && <Check className="size-3 text-white" strokeWidth={3} />}
              </span>
              <span className="text-sm font-medium text-[#1D1D1F] flex-1">
                {segmentJapanese(pickLabel(b, locale))}
              </span>
            </button>
          );
        })}
      </div>
    </V2StepLayout>
  );
}
