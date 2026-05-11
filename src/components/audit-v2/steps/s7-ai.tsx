"use client";

import { V2StepLayout } from "../shared/v2-step-layout";
import { useAuditV2Locale, pickLabel } from "../audit-v2-locale-context";
import { AI_EXPERIENCE, AI_TRIED_REASONS, type AiExperienceId } from "@/lib/audit-v2/constants";
import { AI_EXP_ICONS } from "../shared/icons";
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

export function S7AI({ data, update, onNext, onBack, isLoading, error }: Props) {
  const { t, locale } = useAuditV2Locale();

  const toggleReason = (id: string) => {
    const set = new Set(data.aiTriedReasons);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    update({ aiTriedReasons: Array.from(set) });
  };

  const showFollowUp = data.aiExperience !== "" && data.aiExperience !== "none";

  return (
    <V2StepLayout
      question={t.ai.question}
      description={t.ai.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue={!!data.aiExperience}
      error={error}
    >
      <div className="space-y-3">
        {AI_EXPERIENCE.map((opt) => {
          const selected = data.aiExperience === opt.id;
          const Icon = AI_EXP_ICONS[opt.id];
          return (
            <button
              key={opt.id}
              type="button"
              aria-pressed={selected}
              onClick={() => update({ aiExperience: opt.id as AiExperienceId })}
              className={cn(
                "w-full flex items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200 hover:-translate-y-[1px]",
                selected
                  ? "border-[#B8860B] bg-gradient-to-br from-[#B8860B]/10 to-transparent ring-2 ring-[#B8860B]/25 shadow-[0_2px_8px_rgba(184,134,11,0.08)]"
                  : "border-[#E8E8ED] bg-[#F5F5F7] hover:border-[#B8860B]/40 hover:bg-white"
              )}
            >
              <Icon className="size-6 text-[#B8860B] shrink-0" aria-hidden />
              <span className="flex-1 text-sm font-medium text-[#1D1D1F]">
                {segmentJapanese(pickLabel(opt, locale))}
              </span>
              {selected && (
                <span className="size-5 rounded-full bg-[#B8860B] text-white grid place-items-center shrink-0">
                  <Check className="size-3" strokeWidth={3} />
                </span>
              )}
            </button>
          );
        })}
      </div>

      {showFollowUp && (
        <div className="mt-8 rounded-xl border border-[#E8E8ED] bg-[#F5F5F7] p-5">
          <h3 className="text-sm font-semibold text-[#1D1D1F] mb-3">
            {segmentJapanese(t.ai.triedQuestion)}
          </h3>
          <div className="flex gap-2 mb-4">
            {(["yes", "no"] as const).map((v) => {
              const selected = data.aiTriedDidntStick === v;
              const label = v === "yes" ? t.ai.triedYes : t.ai.triedNo;
              return (
                <button
                  key={v}
                  type="button"
                  onClick={() => update({ aiTriedDidntStick: v })}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                    selected
                      ? "bg-[#1D1D1F] text-white"
                      : "bg-white border border-[#E8E8ED] text-[#6E6E73] hover:text-[#1D1D1F]"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {data.aiTriedDidntStick === "yes" && (
            <div className="flex flex-wrap gap-2">
              {AI_TRIED_REASONS.map((r) => {
                const selected = data.aiTriedReasons.includes(r.id);
                return (
                  <button
                    key={r.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleReason(r.id)}
                    className={cn(
                      "inline-flex items-center gap-2 min-h-[36px] rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200",
                      selected
                        ? "border-[#B8860B] bg-[#1D1D1F] text-white"
                        : "border-[#E8E8ED] bg-white text-[#6E6E73] hover:border-[#B8860B]/40 hover:text-[#1D1D1F]"
                    )}
                  >
                    {selected && <Check className="size-3" strokeWidth={3} />}
                    {segmentJapanese(pickLabel(r, locale))}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}
    </V2StepLayout>
  );
}
