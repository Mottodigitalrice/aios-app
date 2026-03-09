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
  const isCorporate = formData.perspective === "corporate";

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

        {/* Confidence scale 1-10 — corporate path only */}
        {isCorporate && (
          <div className="space-y-3">
            <Label className="text-zinc-300">{step.confidenceLabel}</Label>
            <div className="space-y-2">
              <div className="flex gap-1.5">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => updateField("dataConfidence", n)}
                    className={`flex-1 h-10 rounded-lg border text-sm font-medium transition-all duration-200 ${
                      formData.dataConfidence === n
                        ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/30"
                        : "border-zinc-800/50 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex justify-between text-xs text-zinc-500">
                <span>{step.confidenceMin}</span>
                <span>{step.confidenceMax}</span>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          <Label className="text-zinc-300">{step.dataLocationLabel}</Label>
          <MultiSelectChips
            options={[...step.dataLocationOptions]}
            selected={formData.dataLocation}
            onChange={(selected) => updateField("dataLocation", selected)}
            allowOther={false}
          />
        </div>

        {/* Openness to restructuring — corporate path only */}
        {isCorporate && (
          <div className="space-y-3">
            <Label className="text-zinc-300">{step.restructuringLabel}</Label>
            <div className="grid grid-cols-1 gap-2">
              {step.restructuringOptions.map((option) => (
                <SelectCard
                  key={option}
                  label={option}
                  selected={formData.dataRestructuringOpenness === option}
                  onClick={() => updateField("dataRestructuringOpenness", option)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </StepLayout>
  );
}
