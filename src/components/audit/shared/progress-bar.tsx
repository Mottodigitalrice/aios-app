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
          <span className="text-xs text-zinc-500">
            {t.common.stepOf
              .replace("{current}", String(currentStep + 1))
              .replace("{total}", String(totalSteps))}
          </span>
          {currentStep > 0 && (
            <div key={currentStep} className="animate-check-pop">
              <Check className="size-3.5 text-emerald-400" />
            </div>
          )}
        </div>
        <span className="text-xs text-zinc-500">
          {Math.round(progress)}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-zinc-800/50 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {encouragement && (
        <div
          key={currentStep}
          className="flex items-center justify-between mt-2 animate-encourage"
        >
          <span className="text-xs font-medium text-indigo-400">
            {encouragement.text}
          </span>
          <span className="text-xs text-zinc-600">
            {encouragement.timeLeft}
          </span>
        </div>
      )}
    </div>
  );
}
