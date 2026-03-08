"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepLayout } from "../shared/step-layout";
import { SelectCard } from "../shared/select-card";
import type { AuditFormData, FieldErrors } from "@/hooks/use-audit-form";
import { useAuditLocale } from "../audit-locale-context";
import { useState } from "react";

interface Step2Props {
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

export function Step2AboutYou({
  formData,
  updateField,
  validateField,
  onNext,
  onBack,
  isLoading,
  error,
  fieldErrors,
}: Step2Props) {
  const { t } = useAuditLocale();
  const step = t.steps[2];

  const [showOtherRole, setShowOtherRole] = useState(
    formData.role !== "" && !(step.roleOptions as readonly string[]).includes(formData.role)
  );

  const canContinue = formData.name.length > 0;

  const handleRoleSelect = (role: string) => {
    if (role === t.common.other) {
      setShowOtherRole(true);
      updateField("role", "");
    } else {
      setShowOtherRole(false);
      updateField("role", role);
    }
  };

  return (
    <StepLayout
      question={step.question}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue={canContinue}
      error={error}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-zinc-300">
            {step.nameLabel} <span className="text-red-400">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => validateField("name")}
            placeholder={step.namePlaceholder}
            className={`bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-12 text-base ${
              fieldErrors.name
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
          {fieldErrors.name && (
            <p className="text-xs text-red-400 mt-1">{fieldErrors.name}</p>
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-zinc-300">{step.roleLabel}</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {step.roleOptions.map((role) => (
              <SelectCard
                key={role}
                label={role}
                selected={formData.role === role}
                onClick={() => handleRoleSelect(role)}
              />
            ))}
            <SelectCard
              label={t.common.other}
              selected={showOtherRole}
              onClick={() => handleRoleSelect(t.common.other)}
            />
          </div>
          {showOtherRole && (
            <Input
              value={formData.role}
              onChange={(e) => updateField("role", e.target.value)}
              placeholder={t.common.otherPlaceholder}
              className="bg-zinc-950/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
              autoFocus
            />
          )}
        </div>
      </div>
    </StepLayout>
  );
}
