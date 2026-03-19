"use client";

import { Check } from "lucide-react";
import { useAuditLocale } from "../audit-locale-context";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const { t } = useAuditLocale();
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const encouragement = t.progressBar?.[currentStep as keyof typeof t.progressBar];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#86868B]">
            {t.common.stepOf
              .replace("{current}", String(currentStep + 1))
              .replace("{total}", String(totalSteps))}
          </span>
          {currentStep > 0 && (
            <div key={currentStep} className="animate-check-pop">
              <Check className="size-3.5 text-[#1B7D5A]" />
            </div>
          )}
        </div>
        <span className="text-xs text-[#86868B]">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-[#E8E8ED] overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#B8860B] to-[#D4A843] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {encouragement && (
        <div
          key={currentStep}
          className="flex items-center justify-between mt-2 animate-encourage"
        >
          <span className="text-xs font-medium text-[#B8860B]">
            {encouragement.text}
          </span>
          <span className="text-xs text-[#86868B]">
            {encouragement.timeLeft}
          </span>
        </div>
      )}
    </div>
  );
}
