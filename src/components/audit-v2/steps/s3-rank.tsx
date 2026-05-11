"use client";

import { Reorder, motion } from "motion/react";
import { V2StepLayout } from "../shared/v2-step-layout";
import { useAuditV2Locale, pickLabel } from "../audit-v2-locale-context";
import { GOAL_BY_ID, type GoalId } from "@/lib/audit-v2/goals";
import { GOAL_ICONS } from "../shared/icons";
import { GripVertical } from "lucide-react";
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

export function S3Rank({ data, update, onNext, onBack, isLoading, error }: Props) {
  const { t, locale } = useAuditV2Locale();
  const ranked: GoalId[] =
    data.goalsRanked.length > 0 ? data.goalsRanked : data.goalsSelected;

  return (
    <V2StepLayout
      question={t.goals.rank.question}
      description={t.goals.rank.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue={ranked.length > 0}
      error={error}
    >
      <Reorder.Group
        axis="y"
        values={ranked}
        onReorder={(next) => update({ goalsRanked: next as GoalId[] })}
        className="space-y-2"
      >
        {ranked.map((id, index) => {
          const goal = GOAL_BY_ID[id];
          if (!goal) return null;
          const Icon = GOAL_ICONS[id];
          return (
            <Reorder.Item
              key={id}
              value={id}
              className="cursor-grab active:cursor-grabbing"
              whileDrag={{ scale: 1.03, boxShadow: "0 8px 24px rgba(0,0,0,0.15)" }}
            >
              <motion.div
                layout
                className="flex items-center gap-3 rounded-xl border border-[#E8E8ED] bg-white p-4 hover:border-[#B8860B]/40 transition-colors"
              >
                <span className="grid place-items-center size-8 rounded-full bg-[#B8860B] text-white text-sm font-bold tabular-nums">
                  {index + 1}
                </span>
                <Icon className="size-5 text-[#B8860B] shrink-0" aria-hidden />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-[#1D1D1F] leading-tight">
                    {segmentJapanese(pickLabel(goal, locale))}
                  </p>
                  {locale === "ja" && (
                    <p className="text-[11px] text-[#86868B] mt-0.5">{goal.en}</p>
                  )}
                </div>
                <GripVertical className="size-5 text-[#86868B]" aria-hidden />
              </motion.div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </V2StepLayout>
  );
}
