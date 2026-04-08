"use client";

import { Check } from "lucide-react";
import { useAuditLocale } from "../audit-locale-context";
import { segmentJapanese } from "@/lib/budoux-transform";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const { t } = useAuditLocale();
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const encouragement = t.progressBar?.[currentStep as keyof typeof t.progressBar];

  const stepLabel = t.common.stepOf
    .replace("{current}", String(currentStep + 1).padStart(2, "0"))
    .replace("{total}", String(totalSteps).padStart(2, "0"));

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2.5">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#B8860B]/25 bg-[#B8860B]/5 px-3 py-1">
          <span className="size-1.5 rounded-full bg-[#B8860B] agent-dot-pulse" aria-hidden />
          <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#B8860B]">
            {segmentJapanese(stepLabel)}
          </span>
          {currentStep > 0 && (
            <div key={currentStep} className="animate-check-pop">
              <Check className="size-3 text-[#1B7D5A]" />
            </div>
          )}
        </div>
        <span className="text-xs font-medium text-[#86868B] tabular-nums">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-[3px] w-full rounded-full bg-[#E8E8ED] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4A843] transition-all duration-500 ease-out progress-bar-glow"
          style={{ width: `${progress}%` }}
        />
      </div>
      {encouragement && (
        <div
          key={currentStep}
          className="flex items-center justify-between mt-2 animate-encourage"
        >
          <span className="text-xs font-medium text-[#B8860B]">
            {segmentJapanese(encouragement.text)}
          </span>
          <span className="text-xs text-[#86868B]">
            {segmentJapanese(encouragement.timeLeft)}
          </span>
        </div>
      )}
    </div>
  );
}
