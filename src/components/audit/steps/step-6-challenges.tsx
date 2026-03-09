"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
      <div className="space-y-8">
        <MultiSelectChips
          options={[...step.challenges]}
          selected={formData.challenge}
          onChange={(selected) => updateField("challenge", selected)}
          otherValue={formData.challengeOther}
          onOtherChange={(value) => updateField("challengeOther", value)}
          otherLabel={t.common.other}
          otherPlaceholder={t.common.otherPlaceholder}
        />

        {/* Bottlenecks */}
        <div className="space-y-3">
          <Label className="text-zinc-300">{step.bottlenecksLabel}</Label>
          <MultiSelectChips
            options={[...step.bottlenecks]}
            selected={formData.bottlenecks}
            onChange={(selected) => updateField("bottlenecks", selected)}
            allowOther={false}
          />
        </div>

        {/* Repetitive hours per week */}
        <div className="space-y-2">
          <Label htmlFor="repetitiveHours" className="text-zinc-300">
            {step.repetitiveHoursLabel}
          </Label>
          <Input
            id="repetitiveHours"
            type="number"
            min="0"
            max="168"
            value={formData.repetitiveHoursPerWeek}
            onChange={(e) => updateField("repetitiveHoursPerWeek", e.target.value)}
            placeholder={step.repetitiveHoursPlaceholder}
            className="bg-zinc-950/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-12 text-base max-w-xs"
          />
        </div>
      </div>
    </StepLayout>
  );
}
