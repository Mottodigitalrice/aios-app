"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useSignupLocale } from "../signup-locale-context";
import type { SignupFormData, FieldErrors } from "@/hooks/use-signup-form";

interface Step2AboutYouProps {
  formData: SignupFormData;
  updateField: <K extends keyof SignupFormData>(
    field: K,
    value: SignupFormData[K]
  ) => void;
  validateField: (field: keyof SignupFormData) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
  error?: string | null;
  fieldErrors?: FieldErrors;
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
}: Step2AboutYouProps) {
  const { t } = useSignupLocale();
  const s = t.steps[2];

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mb-2">
          {s.question}
        </h2>
        <p className="text-zinc-400 text-base leading-relaxed">
          {s.description}
        </p>
      </div>

      <div className="space-y-5 mb-8">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="signup-name" className="text-sm font-medium text-zinc-300">
            {s.nameLabel} <span className="text-red-400">*</span>
          </Label>
          <Input
            id="signup-name"
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => validateField("name")}
            placeholder={s.namePlaceholder}
            className="bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/20"
          />
          {fieldErrors?.name && (
            <p className="text-xs text-red-400">{fieldErrors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-sm font-medium text-zinc-300">
            {s.emailLabel} <span className="text-red-400">*</span>
          </Label>
          <Input
            id="signup-email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => validateField("email")}
            placeholder={s.emailPlaceholder}
            className="bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/20"
          />
          {fieldErrors?.email && (
            <p className="text-xs text-red-400">{fieldErrors.email}</p>
          )}
        </div>

        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="signup-company" className="text-sm font-medium text-zinc-300">
            {s.companyLabel}{" "}
            {formData.signupType === "company" || formData.signupType === "department" ? (
              <span className="text-red-400">*</span>
            ) : (
              <span className="text-zinc-500 text-xs">({t.common.optional})</span>
            )}
          </Label>
          <Input
            id="signup-company"
            type="text"
            value={formData.company}
            onChange={(e) => updateField("company", e.target.value)}
            onBlur={() => validateField("company")}
            placeholder={s.companyPlaceholder}
            className="bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/20"
          />
          {(formData.signupType === "company" || formData.signupType === "department") && (
            <p className="text-xs text-zinc-500">{s.companyRequired}</p>
          )}
          {fieldErrors?.company && (
            <p className="text-xs text-red-400">{fieldErrors.company}</p>
          )}
        </div>

        {/* Department (department signup only) */}
        {formData.signupType === "department" && (
          <div className="space-y-2">
            <Label htmlFor="signup-department" className="text-sm font-medium text-zinc-300">
              {s.departmentLabel} <span className="text-red-400">*</span>
            </Label>
            <Input
              id="signup-department"
              type="text"
              value={formData.departmentName}
              onChange={(e) => updateField("departmentName", e.target.value)}
              onBlur={() => validateField("departmentName")}
              placeholder={s.departmentPlaceholder}
              className="bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/20"
            />
            <p className="text-xs text-zinc-500">{s.departmentRequired}</p>
            {fieldErrors?.departmentName && (
              <p className="text-xs text-red-400">{fieldErrors.departmentName}</p>
            )}
          </div>
        )}

        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="signup-role" className="text-sm font-medium text-zinc-300">
            {s.roleLabel}{" "}
            <span className="text-zinc-500 text-xs">({t.common.optional})</span>
          </Label>
          <Input
            id="signup-role"
            type="text"
            value={formData.role}
            onChange={(e) => updateField("role", e.target.value)}
            placeholder={s.rolePlaceholder}
            className="bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/20"
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-400 mb-4">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 gap-2"
        >
          <ArrowLeft className="size-4" />
          {t.common.back}
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={isLoading}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white gap-2 glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t.common.saving}
            </>
          ) : (
            <>
              {t.common.continue}
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
