"use client";

import { useEffect, useState, useRef } from "react";
import { Check } from "lucide-react";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const STEP_ENCOURAGEMENT: Record<number, { text: string; timeLeft: string }> = {
  1: { text: "Great start!", timeLeft: "~3 min left" },
  2: { text: "You're doing great!", timeLeft: "~2 min left" },
  3: { text: "Halfway there!", timeLeft: "~2 min left" },
  4: { text: "Keep going!", timeLeft: "~1 min left" },
  5: { text: "Almost there!", timeLeft: "~1 min left" },
  6: { text: "Last step!", timeLeft: "Less than 1 min" },
};

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const encouragement = STEP_ENCOURAGEMENT[currentStep];
  const [showCheck, setShowCheck] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const prevStep = useRef(currentStep);

  useEffect(() => {
    if (currentStep > prevStep.current) {
      // Step advanced forward — show checkmark briefly
      setShowCheck(true);
      const timer = setTimeout(() => setShowCheck(false), 800);
      prevStep.current = currentStep;
      return () => clearTimeout(timer);
    }
    prevStep.current = currentStep;
  }, [currentStep]);

  // Re-key the encouragement text to re-trigger animation
  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [currentStep]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">
            Step {currentStep + 1} of {totalSteps}
          </span>
          {showCheck && (
            <div className="animate-check-pop">
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
          key={animKey}
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
