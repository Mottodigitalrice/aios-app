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
  const perspective = formData.perspective;

  const question =
    perspective === "individual"
      ? step.questionIndividual
      : perspective === "department"
        ? step.questionDepartment
        : step.question;

  // Company + department require company name
  const needsCompany = perspective === "company" || perspective === "department";
  const canContinue = needsCompany ? formData.company.length > 0 : true;

  // --- Individual path ---
  if (perspective === "individual") {
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
          {/* Industry */}
          <div className="space-y-3">
            <Label className="text-zinc-300">{step.industryLabel}</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {step.industryOptions.map((ind) => (
                <SelectCard
                  key={ind}
                  label={ind}
                  selected={formData.industry === ind}
                  onClick={() => updateField("industry", ind)}
                />
              ))}
            </div>
          </div>

          {/* Revenue range (optional) */}
          <div className="space-y-3">
            <Label className="text-zinc-300">
              {step.revenueLabel}
            </Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {step.revenueOptions.map((rev) => (
                <SelectCard
                  key={rev}
                  label={rev}
                  selected={formData.revenueRange === rev}
                  onClick={() => updateField("revenueRange", rev)}
                />
              ))}
            </div>
          </div>

          {/* Team composition */}
          <div className="space-y-3">
            <Label className="text-zinc-300">{step.teamCompositionLabel}</Label>
            <div className="grid grid-cols-1 gap-2">
              {step.teamCompositionOptions.map((tc) => (
                <SelectCard
                  key={tc}
                  label={tc}
                  selected={formData.teamComposition === tc}
                  onClick={() => updateField("teamComposition", tc)}
                />
              ))}
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

  // --- Department path ---
  if (perspective === "department") {
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
          {/* Company name (required) */}
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
              aria-invalid={!!fieldErrors.company}
              aria-describedby={fieldErrors.company ? "company-error" : undefined}
              className={`bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-12 text-base ${
                fieldErrors.company
                  ? "border-red-500/70 focus-visible:border-red-500/70 focus-visible:ring-red-500/20"
                  : "border-zinc-700/50"
              }`}
              autoFocus
            />
            {fieldErrors.company && (
              <p id="company-error" role="alert" className="text-xs text-red-400 mt-1">{fieldErrors.company}</p>
            )}
          </div>

          {/* Company size */}
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

          {/* Department name */}
          <div className="space-y-2">
            <Label htmlFor="departmentName" className="text-zinc-300">
              {step.departmentNameLabel}
            </Label>
            <Input
              id="departmentName"
              value={formData.departmentName}
              onChange={(e) => updateField("departmentName", e.target.value)}
              placeholder={step.departmentNamePlaceholder}
              className="bg-zinc-950/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-12 text-base"
            />
          </div>

          {/* Department size */}
          <div className="space-y-3">
            <Label className="text-zinc-300">{step.departmentSizeLabel}</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {step.departmentSizeOptions.map((size) => (
                <SelectCard
                  key={size}
                  label={size}
                  selected={formData.departmentSize === size}
                  onClick={() => updateField("departmentSize", size)}
                />
              ))}
            </div>
          </div>

          {/* Department function */}
          <div className="space-y-3">
            <Label className="text-zinc-300">{step.departmentFunctionLabel}</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {step.departmentFunctionOptions.map((fn) => (
                <SelectCard
                  key={fn}
                  label={fn}
                  selected={formData.departmentFunction === fn}
                  onClick={() => updateField("departmentFunction", fn)}
                />
              ))}
            </div>
          </div>
        </div>
      </StepLayout>
    );
  }

  // --- Company path (default) ---
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
        {/* Company name (required) */}
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
            aria-invalid={!!fieldErrors.company}
            aria-describedby={fieldErrors.company ? "company-error" : undefined}
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
            <p id="company-error" role="alert" className="text-xs text-red-400 mt-1">{fieldErrors.company}</p>
          )}
        </div>

        {/* Industry */}
        <div className="space-y-3">
          <Label className="text-zinc-300">{step.industryLabel}</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {step.industryOptions.map((ind) => (
              <SelectCard
                key={ind}
                label={ind}
                selected={formData.industry === ind}
                onClick={() => updateField("industry", ind)}
              />
            ))}
          </div>
        </div>

        {/* Company size */}
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

        {/* Revenue range (optional) */}
        <div className="space-y-3">
          <Label className="text-zinc-300">
            {step.revenueLabel}
          </Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {step.revenueOptions.map((rev) => (
              <SelectCard
                key={rev}
                label={rev}
                selected={formData.revenueRange === rev}
                onClick={() => updateField("revenueRange", rev)}
              />
            ))}
          </div>
        </div>
      </div>
    </StepLayout>
  );
}
