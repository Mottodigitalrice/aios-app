"use client";

import { Label } from "@/components/ui/label";
import { StepLayout } from "../shared/step-layout";
import { SelectCard } from "../shared/select-card";
import { MultiSelectChips } from "../shared/multi-select-chips";
import type { AuditFormData } from "@/hooks/use-audit-form";

const EXPERIENCE_OPTIONS = [
  "None yet",
  "Experimenting",
  "Using regularly",
  "Advanced",
];

const VISION_OPTIONS = [
  "Automate repetitive tasks",
  "Connect existing tools",
  "Improve customer communication",
  "Generate reports / analytics",
  "Reduce costs",
  "Train team on AI",
  "Build custom AI agents",
];

interface Step6Props {
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

export function Step6AI({
  formData,
  updateField,
  onNext,
  onBack,
  isLoading,
  error,
}: Step6Props) {
  return (
    <StepLayout
      question="AI experience & vision"
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      error={error}
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <Label className="text-zinc-300">
            How much AI experience does your team have?
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {EXPERIENCE_OPTIONS.map((option) => (
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
            What would you want AI to do in 6 months?
          </Label>
          <MultiSelectChips
            options={VISION_OPTIONS}
            selected={formData.sixMonthVision}
            onChange={(selected) => updateField("sixMonthVision", selected)}
            otherValue={formData.sixMonthVisionOther}
            onOtherChange={(value) =>
              updateField("sixMonthVisionOther", value)
            }
          />
        </div>
      </div>
    </StepLayout>
  );
}
