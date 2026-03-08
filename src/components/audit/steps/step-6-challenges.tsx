"use client";

import { StepLayout } from "../shared/step-layout";
import { MultiSelectChips } from "../shared/multi-select-chips";
import type { AuditFormData } from "@/hooks/use-audit-form";
import { useAuditLocale } from "../audit-locale-context";

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

export function Step6Challenges({
  formData,
  updateField,
  onNext,
  onBack,
  isLoading,
  error,
}: Step6Props) {
  const { t } = useAuditLocale();
  const step = t.steps[6];

  return (
    <StepLayout
      question={step.question}
      description={step.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      error={error}
    >
      <MultiSelectChips
        options={[...step.challenges]}
        selected={formData.challenge}
        onChange={(selected) => updateField("challenge", selected)}
        otherValue={formData.challengeOther}
        onOtherChange={(value) => updateField("challengeOther", value)}
      />
    </StepLayout>
  );
}
