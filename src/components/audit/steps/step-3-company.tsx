"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepLayout } from "../shared/step-layout";
import { SelectCard } from "../shared/select-card";
import type { AuditFormData, FieldErrors } from "@/hooks/use-audit-form";

const SIZE_OPTIONS = ["1-5", "6-20", "21-50", "51-100", "100+"];

interface Step3Props {
  formData: AuditFormData;
  updateField: <K extends keyof AuditFormData>(
    field: K,
    value: AuditFormData[K]
  ) => void;
  validateField: (field: keyof AuditFormData) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
  fieldErrors: FieldErrors;
}

export function Step3Company({
  formData,
  updateField,
  validateField,
  onNext,
  onBack,
  isLoading,
  error,
  fieldErrors,
}: Step3Props) {
  const canContinue = formData.company.length > 0;

  return (
    <StepLayout
      question="Tell us about your company"
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue={canContinue}
      error={error}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="company" className="text-zinc-300">
            What company are you with? <span className="text-red-400">*</span>
          </Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => updateField("company", e.target.value)}
            onBlur={() => validateField("company")}
            placeholder="Company name"
            className={`bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-12 text-base ${
              fieldErrors.company
                ? "border-red-500/70 focus-visible:border-red-500/70 focus-visible:ring-red-500/20"
                : "border-zinc-700/50"
            }`}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && canContinue) {
                e.preventDefault();
                onNext();
              }
            }}
          />
          {fieldErrors.company && (
            <p className="text-xs text-red-400 mt-1">{fieldErrors.company}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-zinc-300">How big is your team?</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SIZE_OPTIONS.map((size) => (
              <SelectCard
                key={size}
                label={size}
                selected={formData.employees === size}
                onClick={() => updateField("employees", size)}
              />
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
