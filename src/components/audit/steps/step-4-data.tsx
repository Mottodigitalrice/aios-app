"use client";

import { Label } from "@/components/ui/label";
import { StepLayout } from "../shared/step-layout";
import { SelectCard } from "../shared/select-card";
import { MultiSelectChips } from "../shared/multi-select-chips";
import type { AuditFormData } from "@/hooks/use-audit-form";
import { useAuditLocale } from "../audit-locale-context";

interface Step4DataProps {
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

export function Step4Data({
  formData,
  updateField,
  onNext,
  onBack,
  isLoading,
  error,
}: Step4DataProps) {
  const { t } = useAuditLocale();
  const step = t.steps[4];

  return (
    <StepLayout
      question={step.question}
      description={step.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      error={error}
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <Label className="text-zinc-300">{step.maturityLabel}</Label>
          <div className="grid grid-cols-1 gap-2">
            {step.maturityOptions.map((option) => (
              <SelectCard
                key={option}
                label={option}
                selected={formData.dataMaturity === option}
                onClick={() => updateField("dataMaturity", option)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Label className="text-zinc-300">{step.dataLocationLabel}</Label>
          <MultiSelectChips
            options={[...step.dataLocationOptions]}
            selected={formData.dataLocation}
            onChange={(selected) => updateField("dataLocation", selected)}
            allowOther={false}
          />
        </div>
      </div>
    </StepLayout>
  );
}
