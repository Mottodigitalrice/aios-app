"use client";

import { StepLayout } from "../shared/step-layout";
import { MultiSelectChips } from "../shared/multi-select-chips";
import type { AuditFormData } from "@/hooks/use-audit-form";

const CHALLENGES = [
  "Manual data entry / repetitive tasks",
  "Information scattered across tools",
  "Slow internal communication",
  "No clear AI strategy",
  "Team resistance to new tools",
  "Security / compliance concerns",
  "Too many disconnected SaaS subscriptions",
  "Difficulty scaling operations",
];

interface Step5Props {
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

export function Step5Challenges({
  formData,
  updateField,
  onNext,
  onBack,
  isLoading,
  error,
}: Step5Props) {
  return (
    <StepLayout
      question="What are your biggest operational challenges?"
      description="Select all that apply."
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      error={error}
    >
      <MultiSelectChips
        options={CHALLENGES}
        selected={formData.challenge}
        onChange={(selected) => updateField("challenge", selected)}
        otherValue={formData.challengeOther}
        onOtherChange={(value) => updateField("challengeOther", value)}
      />
    </StepLayout>
  );
}
