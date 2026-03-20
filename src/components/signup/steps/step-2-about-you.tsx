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
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-2">
          {s.question}
        </h2>
        <p className="text-[#6E6E73] text-base leading-relaxed">
          {s.description}
        </p>
      </div>

      <div className="space-y-5 mb-8">
        {/* Full Name */}
        <div className="space-y-2">
          <Label htmlFor="signup-name" className="text-sm font-medium text-[#6E6E73]">
            {s.nameLabel} <span className="text-red-600">*</span>
          </Label>
          <Input
            id="signup-name"
            type="text"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
            onBlur={() => validateField("name")}
            placeholder={s.namePlaceholder}
            className="bg-[#F5F5F7] border-[#E8E8ED] text-[#1D1D1F] placeholder:text-[#86868B] focus:border-[#B8860B]/50 focus:ring-[#B8860B]/20"
          />
          {fieldErrors?.name && (
            <p className="text-xs text-red-600">{fieldErrors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="signup-email" className="text-sm font-medium text-[#6E6E73]">
            {s.emailLabel} <span className="text-red-600">*</span>
          </Label>
          <Input
            id="signup-email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => validateField("email")}
            placeholder={s.emailPlaceholder}
            className="bg-[#F5F5F7] border-[#E8E8ED] text-[#1D1D1F] placeholder:text-[#86868B] focus:border-[#B8860B]/50 focus:ring-[#B8860B]/20"
          />
          {fieldErrors?.email && (
            <p className="text-xs text-red-600">{fieldErrors.email}</p>
          )}
        </div>

        {/* Company */}
        <div className="space-y-2">
          <Label htmlFor="signup-company" className="text-sm font-medium text-[#6E6E73]">
            {s.companyLabel} <span className="text-red-600">*</span>
          </Label>
          <Input
            id="signup-company"
            type="text"
            value={formData.company}
            onChange={(e) => updateField("company", e.target.value)}
            onBlur={() => validateField("company")}
            placeholder={s.companyPlaceholder}
            className="bg-[#F5F5F7] border-[#E8E8ED] text-[#1D1D1F] placeholder:text-[#86868B] focus:border-[#B8860B]/50 focus:ring-[#B8860B]/20"
          />
          {fieldErrors?.company && (
            <p className="text-xs text-red-600">{fieldErrors.company}</p>
          )}
        </div>

        {/* Role */}
        <div className="space-y-2">
          <Label htmlFor="signup-role" className="text-sm font-medium text-[#6E6E73]">
            {s.roleLabel} <span className="text-red-600">*</span>
          </Label>
          <Input
            id="signup-role"
            type="text"
            value={formData.role}
            onChange={(e) => updateField("role", e.target.value)}
            onBlur={() => validateField("role")}
            placeholder={s.rolePlaceholder}
            className="bg-[#F5F5F7] border-[#E8E8ED] text-[#1D1D1F] placeholder:text-[#86868B] focus:border-[#B8860B]/50 focus:ring-[#B8860B]/20"
          />
          {fieldErrors?.role && (
            <p className="text-xs text-red-600">{fieldErrors.role}</p>
          )}
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600 mb-4">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="border-[#E8E8ED] text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] gap-2"
        >
          <ArrowLeft className="size-4" />
          {t.common.back}
        </Button>
        <Button
          type="button"
          onClick={onNext}
          disabled={isLoading}
          className="flex-1 bg-[#1D1D1F] hover:bg-[#2D2D2F] text-white gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
