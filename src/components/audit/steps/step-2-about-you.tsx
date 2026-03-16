"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepLayout } from "../shared/step-layout";
import { SelectCard } from "../shared/select-card";
import type { AuditFormData, FieldErrors } from "@/hooks/use-audit-form";
import { useAuditLocale } from "../audit-locale-context";
import { useState } from "react";
import { User, Building, Users } from "lucide-react";

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

const PERSPECTIVE_OPTIONS = [
  {
    value: "individual" as const,
    icon: User,
    labelKey: "perspectiveIndividual" as const,
    descKey: "perspectiveIndividualDesc" as const,
  },
  {
    value: "company" as const,
    icon: Building,
    labelKey: "perspectiveCompany" as const,
    descKey: "perspectiveCompanyDesc" as const,
  },
  {
    value: "department" as const,
    icon: Users,
    labelKey: "perspectiveDepartment" as const,
    descKey: "perspectiveDepartmentDesc" as const,
  },
] as const;

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

  const canContinue = formData.name.length > 0 && formData.perspective !== "";

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
        {/* Perspective selector — 3 cards */}
        <div className="space-y-3">
          <Label className="text-zinc-300">
            {step.perspectiveLabel} <span className="text-red-400">*</span>
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PERSPECTIVE_OPTIONS.map(({ value, icon: Icon, labelKey, descKey }) => (
              <button
                key={value}
                type="button"
                onClick={() => updateField("perspective", value)}
                className={`relative flex flex-col items-center gap-3 rounded-xl border p-5 text-center transition-all duration-200 ${
                  formData.perspective === value
                    ? "border-indigo-500/50 bg-indigo-500/10 ring-1 ring-indigo-500/30"
                    : "border-zinc-800/50 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800/50"
                }`}
              >
                <div
                  className={`flex size-10 items-center justify-center rounded-full ${
                    formData.perspective === value
                      ? "bg-indigo-500/20"
                      : "bg-zinc-800"
                  }`}
                >
                  <Icon
                    className={`size-5 ${
                      formData.perspective === value
                        ? "text-indigo-400"
                        : "text-zinc-400"
                    }`}
                  />
                </div>
                <div>
                  <p
                    className={`text-sm font-semibold ${
                      formData.perspective === value
                        ? "text-indigo-300"
                        : "text-zinc-300"
                    }`}
                  >
                    {step[labelKey]}
                  </p>
                  <p className="text-xs text-zinc-500 mt-1">
                    {step[descKey]}
                  </p>
                </div>
                {formData.perspective === value && (
                  <span className="absolute top-3 right-3 size-5 rounded-full bg-indigo-500 flex items-center justify-center">
                    <svg
                      className="size-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={3}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 12.75l6 6 9-13.5"
                      />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
          {fieldErrors.perspective && (
            <p role="alert" className="text-xs text-red-400 mt-1">{fieldErrors.perspective}</p>
          )}
        </div>

        {/* Name field */}
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
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-error" : undefined}
            className={`bg-zinc-950/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-12 text-base ${
              fieldErrors.name
                ? "border-red-500/70 focus-visible:border-red-500/70 focus-visible:ring-red-500/20"
                : "border-zinc-700/50"
            }`}
            onKeyDown={(e) => {
              if (e.key === "Enter" && canContinue) {
                e.preventDefault();
                onNext();
              }
            }}
          />
          {fieldErrors.name && (
            <p id="name-error" role="alert" className="text-xs text-red-400 mt-1">{fieldErrors.name}</p>
          )}
        </div>

        {/* Role selector */}
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
