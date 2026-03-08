"use client";

import { Label } from "@/components/ui/label";
import { StepLayout } from "../shared/step-layout";
import { SelectCard } from "../shared/select-card";
import { MultiSelectChips } from "../shared/multi-select-chips";
import type { AuditFormData } from "@/hooks/use-audit-form";
import { useAuditLocale } from "../audit-locale-context";

interface Step7Props {
  formData: AuditFormData;
  updateField: <K extends keyof AuditFormData>(
    field: K,
    value: AuditFormData[K]
  ) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

export function Step7AI({
  formData,
  updateField,
  onNext,
  onBack,
  isLoading,
  error,
}: Step7Props) {
  const { t } = useAuditLocale();
  const step = t.steps[7];

  return (
    <StepLayout
      question={step.question}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      error={error}
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <Label className="text-zinc-300">
            {step.experienceLabel}
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {step.experienceOptions.map((option) => (
              <SelectCard
                key={option}
                label={option}
                selected={formData.aiExperience === option}
                onClick={() => updateField("aiExperience", option)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-zinc-300">
            {step.visionLabel}
          </Label>
          <MultiSelectChips
            options={[...step.visionOptions]}
            selected={formData.sixMonthVision}
            onChange={(selected) => updateField("sixMonthVision", selected)}
            otherValue={formData.sixMonthVisionOther}
            onOtherChange={(value) =>
              updateField("sixMonthVisionOther", value)
            }
          />
        </div>

        <div className="space-y-3">
          <Label className="text-zinc-300">
            {step.budgetLabel}
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {step.budgetOptions.map((option) => (
              <SelectCard
                key={option}
                label={option}
                selected={formData.aiBudget === option}
                onClick={() => updateField("aiBudget", option)}
              />
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
