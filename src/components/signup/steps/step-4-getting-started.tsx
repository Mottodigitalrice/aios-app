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
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mb-2">
          {s.question}
        </h2>
        <p className="text-zinc-400 text-base leading-relaxed">
          {s.description}
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* When to start */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-zinc-300">
            {s.startLabel} <span className="text-red-400">*</span>
          </Label>
          <div className="space-y-2">
            {s.startOptions.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => updateField("startPreference", option)}
                className={cn(
                  "flex items-center gap-3 w-full rounded-xl border p-4 text-left text-sm font-medium transition-all duration-200",
                  formData.startPreference === option
                    ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/30"
                    : "border-zinc-800/50 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/50"
                )}
              >
                <span>{option}</span>
                {formData.startPreference === option && (
                  <span className="ml-auto shrink-0 size-5 rounded-full bg-indigo-500 flex items-center justify-center">
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
            <p className="text-xs text-red-400">{fieldErrors.startPreference}</p>
          )}
        </div>

        {/* Referral source */}
        <div className="space-y-3">
          <Label className="text-sm font-medium text-zinc-300">
            {s.sourceLabel} <span className="text-red-400">*</span>
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
                    ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/30"
                    : "border-zinc-800/50 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/50"
                )}
              >
                {option}
              </button>
            ))}
          </div>
          {fieldErrors?.referralSource && (
            <p className="text-xs text-red-400">{fieldErrors.referralSource}</p>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="signup-notes" className="text-sm font-medium text-zinc-300">
            {s.notesLabel}{" "}
            <span className="text-zinc-500 text-xs">({t.common.optional})</span>
          </Label>
          <Textarea
            id="signup-notes"
            value={formData.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder={s.notesPlaceholder}
            rows={3}
            className="bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/20 resize-none"
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
