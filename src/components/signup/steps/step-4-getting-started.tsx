"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSignupLocale } from "../signup-locale-context";
import type { SignupFormData, FieldErrors } from "@/hooks/use-signup-form";

interface Step4GettingStartedProps {
  formData: SignupFormData;
  updateField: <K extends keyof SignupFormData>(
    field: K,
    value: SignupFormData[K]
  ) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading?: boolean;
  error?: string | null;
  fieldErrors?: FieldErrors;
}

export function Step4GettingStarted({
  formData,
  updateField,
  onNext,
  onBack,
  isLoading,
  error,
  fieldErrors,
}: Step4GettingStartedProps) {
  const { t } = useSignupLocale();
  const s = t.steps[4];

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

      <div className="space-y-6 mb-8">
        {/* When to start */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-[#6E6E73]">
            {s.startLabel} <span className="text-red-600">*</span>
          </Label>
          <div className="space-y-2">
            {(formData.signupType === "cohort"
              ? s.startOptionsCohort
              : formData.signupType === "individual"
                ? s.startOptionsIndividual
                : s.startOptionsCompany
            ).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateField("startPreference", option)}
                className={cn(
                  "flex items-center gap-3 w-full rounded-xl border p-4 text-left text-sm font-medium transition-all duration-200",
                  formData.startPreference === option
                    ? "border-[#B8860B]/30 bg-[#B8860B]/8 text-[#B8860B] ring-1 ring-[#B8860B]/20"
                    : "border-[#E8E8ED] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#B8860B]/30 hover:bg-[#F5F5F7]"
                )}
              >
                <span>{option}</span>
                {formData.startPreference === option && (
                  <span className="ml-auto shrink-0 size-5 rounded-full bg-[#B8860B] flex items-center justify-center">
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
          {fieldErrors?.startPreference && (
            <p className="text-xs text-red-600">{fieldErrors.startPreference}</p>
          )}
        </div>

        {/* Referral source */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-[#6E6E73]">
            {s.sourceLabel} <span className="text-red-600">*</span>
          </Label>
          <div className="flex flex-wrap gap-2">
            {s.sourceOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateField("referralSource", option)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
                  formData.referralSource === option
                    ? "border-[#B8860B]/30 bg-[#B8860B]/8 text-[#B8860B] ring-1 ring-[#B8860B]/20"
                    : "border-[#E8E8ED] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#B8860B]/30 hover:bg-[#F5F5F7]"
                )}
              >
                {option}
              </button>
            ))}
          </div>
          {fieldErrors?.referralSource && (
            <p className="text-xs text-red-600">{fieldErrors.referralSource}</p>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="signup-notes" className="text-sm font-medium text-[#6E6E73]">
            {s.notesLabel}{" "}
            <span className="text-[#86868B] text-xs">({t.common.optional})</span>
          </Label>
          <Textarea
            id="signup-notes"
            value={formData.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder={s.notesPlaceholder}
            rows={3}
            className="bg-[#F5F5F7] border-[#E8E8ED] text-[#1D1D1F] placeholder:text-[#86868B] focus:border-[#B8860B]/50 focus:ring-[#B8860B]/20 resize-none"
          />
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
