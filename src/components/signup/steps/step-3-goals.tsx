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
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mb-2">
          {s.question}
        </h2>
        <p className="text-zinc-400 text-base leading-relaxed">
          {s.description}
        </p>
      </div>

      <div className="space-y-5 mb-8">
        {/* Goals */}
        <div className="space-y-2">
          <Label htmlFor="signup-goals" className="text-sm font-medium text-zinc-300">
            {s.goalsLabel} <span className="text-red-400">*</span>
          </Label>
          <Textarea
            id="signup-goals"
            value={formData.goals}
            onChange={(e) => updateField("goals", e.target.value)}
            onBlur={() => validateField("goals")}
            placeholder={s.goalsPlaceholder}
            rows={4}
            className="bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/20 resize-none"
          />
          {fieldErrors?.goals && (
            <p className="text-xs text-red-400">{fieldErrors.goals}</p>
          )}
        </div>

        {/* Pain Points */}
        <div className="space-y-2">
          <Label htmlFor="signup-pain-points" className="text-sm font-medium text-zinc-300">
            {s.painPointsLabel}{" "}
            <span className="text-zinc-500 text-xs">({t.common.optional})</span>
          </Label>
          <Textarea
            id="signup-pain-points"
            value={formData.painPoints}
            onChange={(e) => updateField("painPoints", e.target.value)}
            placeholder={s.painPointsPlaceholder}
            rows={3}
            className="bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/20 resize-none"
          />
        </div>

        {/* Team Size (corporate only) */}
        {formData.track === "corporate" && (
          <div className="space-y-2">
            <Label htmlFor="signup-team-size" className="text-sm font-medium text-zinc-300">
              {s.teamSizeLabel}{" "}
              <span className="text-zinc-500 text-xs">({t.common.optional})</span>
            </Label>
            <Input
              id="signup-team-size"
              type="number"
              min={1}
              value={formData.teamSize}
              onChange={(e) => updateField("teamSize", e.target.value)}
              placeholder={s.teamSizePlaceholder}
              className="bg-zinc-900/50 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500 focus:ring-indigo-500/20 max-w-[200px]"
            />
          </div>
        )}
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
