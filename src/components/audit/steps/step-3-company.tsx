"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepLayout } from "../shared/step-layout";
import { SelectCard } from "../shared/select-card";
import type { AuditFormData, FieldErrors } from "@/hooks/use-audit-form";
import { useAuditLocale } from "../audit-locale-context";

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
  const { t } = useAuditLocale();
  const step = t.steps[3];
  const isPersonal = formData.perspective === "personal";

  // Corporate: company required. Personal: always can continue.
  const canContinue = isPersonal ? true : formData.company.length > 0;

  const question = isPersonal ? step.questionPersonal : step.question;

  if (isPersonal) {
    return (
      <StepLayout
        question={question}
        onNext={onNext}
        onBack={onBack}
        isLoading={isLoading}
        canContinue={canContinue}
        error={error}
      >
        <div className="space-y-6">
          {/* Work type selector */}
          <div className="space-y-3">
            <Label className="text-zinc-300">{step.workTypeLabel}</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {step.workTypeOptions.map((wt) => (
                <SelectCard
                  key={wt}
                  label={wt}
                  selected={formData.workType === wt}
                  onClick={() => updateField("workType", wt)}
                />
              ))}
            </div>
          </div>

          {/* Use case selector */}
          <div className="space-y-3">
            <Label className="text-zinc-300">{step.useCaseLabel}</Label>
            <div className="grid grid-cols-1 gap-2">
              <SelectCard
                label={step.useCasePersonal}
                selected={formData.useCase === "personal"}
                onClick={() => updateField("useCase", "personal")}
              />
              <SelectCard
                label={step.useCaseBusiness}
                selected={formData.useCase === "business"}
                onClick={() => updateField("useCase", "business")}
              />
              <SelectCard
                label={step.useCaseBoth}
                selected={formData.useCase === "both"}
                onClick={() => updateField("useCase", "both")}
              />
            </div>
          </div>

          {/* Optional company name */}
          <div className="space-y-2">
            <Label htmlFor="company" className="text-zinc-300">
              {step.companyOptionalLabel}
            </Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => updateField("company", e.target.value)}
              placeholder={step.companyPlaceholder}
              className="bg-zinc-950/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-12 text-base"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onNext();
                }
              }}
            />
          </div>
        </div>
      </StepLayout>
    );
  }

  // Corporate variant (original)
  return (
    <StepLayout
      question={question}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue={canContinue}
      error={error}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="company" className="text-zinc-300">
            {step.companyLabel} <span className="text-red-400">*</span>
          </Label>
          <Input
            id="company"
            value={formData.company}
            onChange={(e) => updateField("company", e.target.value)}
            onBlur={() => validateField("company")}
            placeholder={step.companyPlaceholder}
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
          <Label className="text-zinc-300">{step.sizeLabel}</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {step.sizeOptions.map((size) => (
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
