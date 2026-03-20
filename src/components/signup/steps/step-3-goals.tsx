"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useSignupLocale } from "../signup-locale-context";
import type { SignupFormData, FieldErrors } from "@/hooks/use-signup-form";

interface Step3GoalsProps {
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

export function Step3Goals({
  formData,
  updateField,
  validateField,
  onNext,
  onBack,
  isLoading,
  error,
  fieldErrors,
}: Step3GoalsProps) {
  const { t } = useSignupLocale();
  const s = t.steps[3];

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
        {/* Goals */}
        <div className="space-y-2">
          <Label htmlFor="signup-goals" className="text-sm font-medium text-[#6E6E73]">
            {s.goalsLabel} <span className="text-red-600">*</span>
          </Label>
          <Textarea
            id="signup-goals"
            value={formData.goals}
            onChange={(e) => updateField("goals", e.target.value)}
            onBlur={() => validateField("goals")}
            placeholder={s.goalsPlaceholder}
            rows={4}
            className="bg-[#F5F5F7] border-[#E8E8ED] text-[#1D1D1F] placeholder:text-[#86868B] focus:border-[#B8860B]/50 focus:ring-[#B8860B]/20 resize-none"
          />
          {fieldErrors?.goals && (
            <p className="text-xs text-red-600">{fieldErrors.goals}</p>
          )}
        </div>

        {/* Pain Points */}
        <div className="space-y-2">
          <Label htmlFor="signup-pain-points" className="text-sm font-medium text-[#6E6E73]">
            {s.painPointsLabel}{" "}
            <span className="text-[#86868B] text-xs">({t.common.optional})</span>
          </Label>
          <Textarea
            id="signup-pain-points"
            value={formData.painPoints}
            onChange={(e) => updateField("painPoints", e.target.value)}
            placeholder={s.painPointsPlaceholder}
            rows={3}
            className="bg-[#F5F5F7] border-[#E8E8ED] text-[#1D1D1F] placeholder:text-[#86868B] focus:border-[#B8860B]/50 focus:ring-[#B8860B]/20 resize-none"
          />
        </div>

        {/* Team Size (company only) */}
        {formData.signupType === "company" && (
          <div className="space-y-2">
            <Label htmlFor="signup-team-size" className="text-sm font-medium text-[#6E6E73]">
              {s.teamSizeLabelCompany}{" "}
              <span className="text-[#86868B] text-xs">({t.common.optional})</span>
            </Label>
            <Input
              id="signup-team-size"
              type="number"
              min={1}
              value={formData.teamSize}
              onChange={(e) => updateField("teamSize", e.target.value)}
              placeholder={s.teamSizePlaceholder}
              className="bg-[#F5F5F7] border-[#E8E8ED] text-[#1D1D1F] placeholder:text-[#86868B] focus:border-[#B8860B]/50 focus:ring-[#B8860B]/20 max-w-[200px]"
            />
          </div>
        )}
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
