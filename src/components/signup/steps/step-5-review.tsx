"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Sparkles, ShieldCheck } from "lucide-react";
import { useSignupLocale } from "../signup-locale-context";
import type { SignupFormData } from "@/hooks/use-signup-form";

interface Step5ReviewProps {
  formData: SignupFormData;
  onSubmit: () => void;
  onBack: () => void;
  isLoading?: boolean;
  error?: string | null;
}

export function Step5Review({
  formData,
  onSubmit,
  onBack,
  isLoading,
  error,
}: Step5ReviewProps) {
  const { t } = useSignupLocale();
  const s = t.steps[5];

  const isCohort = formData.track === "cohort";
  const trackDisplay = isCohort ? s.trackCohort : s.trackCorporate;

  // Build rows for the summary table
  const rows: { label: string; value: string }[] = [
    { label: s.trackLabel, value: trackDisplay },
  ];

  // Only show plan for corporate
  if (!isCohort && formData.plan) {
    rows.push({
      label: s.planLabel,
      value: formData.plan === "full" ? s.planFull : s.planMonthly,
    });
  }

  rows.push({ label: s.nameLabel, value: formData.name });
  rows.push({ label: s.emailLabel, value: formData.email });

  if (formData.company) {
    rows.push({ label: s.companyLabel, value: formData.company });
  }
  if (formData.role) {
    rows.push({ label: s.roleLabel, value: formData.role });
  }
  if (formData.goals) {
    rows.push({ label: s.goalsLabel, value: formData.goals });
  }
  if (formData.startPreference) {
    rows.push({ label: s.startLabel, value: formData.startPreference });
  }
  if (formData.referralSource) {
    rows.push({ label: s.referralLabel, value: formData.referralSource });
  }

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
        {/* Enrollment summary */}
        <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-6 space-y-4">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider">
            {s.summaryTitle}
          </h3>

          <div className="grid gap-3">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-start py-2 border-b border-zinc-800/30 gap-4"
              >
                <span className="text-sm text-zinc-400 shrink-0">
                  {row.label}
                </span>
                <span className="text-sm font-medium text-zinc-100 text-right">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="flex items-start gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/[0.05] p-4">
          <ShieldCheck className="size-5 text-emerald-400 mt-0.5 shrink-0" />
          <p className="text-xs text-emerald-300 leading-relaxed">
            {s.guarantee}
          </p>
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
          onClick={onSubmit}
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
              <Sparkles className="size-4" />
              {t.common.submit}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
