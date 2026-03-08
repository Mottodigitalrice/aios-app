"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepLayout } from "../shared/step-layout";
import { SelectCard } from "../shared/select-card";
import type { AuditFormData, FieldErrors } from "@/hooks/use-audit-form";
import { useState } from "react";

const ROLE_OPTIONS = [
  "CEO / Founder",
  "CTO / Technical Lead",
  "COO / Operations",
  "VP / Director",
  "Product Manager",
  "Department Manager",
];

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
  const [showOtherRole, setShowOtherRole] = useState(
    formData.role !== "" && !ROLE_OPTIONS.includes(formData.role)
  );

  const canContinue = formData.name.length > 0;

  const handleRoleSelect = (role: string) => {
    if (role === "Other") {
      setShowOtherRole(true);
      updateField("role", "");
    } else {
      setShowOtherRole(false);
      updateField("role", role);
    }
  };

  return (
    <StepLayout
      question="Tell us about yourself"
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue={canContinue}
      error={error}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-zinc-300">
            What&apos;s your name? <span className="text-red-400">*</span>
          </Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => validateField("name")}
            placeholder="Your full name"
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
          <Label className="text-zinc-300">What&apos;s your role?</Label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {ROLE_OPTIONS.map((role) => (
              <SelectCard
                key={role}
                label={role}
                selected={formData.role === role}
                onClick={() => handleRoleSelect(role)}
              />
            ))}
            <SelectCard
              label="Other"
              selected={showOtherRole}
              onClick={() => handleRoleSelect("Other")}
            />
          </div>
          {showOtherRole && (
            <Input
              value={formData.role}
              onChange={(e) => updateField("role", e.target.value)}
              placeholder="Your role..."
              className="bg-zinc-950/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
              autoFocus
            />
          )}
        </div>
      </div>
    </StepLayout>
  );
}
