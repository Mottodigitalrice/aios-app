"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, Sparkles, Mail, ShieldCheck } from "lucide-react";
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
  const isFull = formData.plan === "full";

  const trackDisplay = isCohort ? s.trackCohort : s.trackCorporate;
  const priceDisplay = isCohort
    ? s.cohortPrice
    : isFull
      ? s.corporateFullPrice
      : s.corporateMonthlyPrice;

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
            <div className="flex justify-between items-center py-2 border-b border-zinc-800/30">
              <span className="text-sm text-zinc-400">{s.trackLabel}</span>
              <span className="text-sm font-medium text-zinc-100">
                {trackDisplay}
              </span>
            </div>
            {!isCohort && (
              <div className="flex justify-between items-center py-2 border-b border-zinc-800/30">
                <span className="text-sm text-zinc-400">{s.planLabel}</span>
                <span className="text-sm font-medium text-zinc-100">
                  {isFull ? s.planFull : s.planMonthly}
                </span>
              </div>
            )}
            <div className="flex justify-between items-center py-2 border-b border-zinc-800/30">
              <span className="text-sm text-zinc-400">{s.priceLabel}</span>
              <span className="text-sm font-bold text-indigo-400">
                {priceDisplay}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-800/30">
              <span className="text-sm text-zinc-400">{s.nameLabel}</span>
              <span className="text-sm text-zinc-100">{formData.name}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-zinc-800/30">
              <span className="text-sm text-zinc-400">{s.emailLabel}</span>
              <span className="text-sm text-zinc-100">{formData.email}</span>
            </div>
            {formData.company && (
              <div className="flex justify-between items-center py-2 border-b border-zinc-800/30">
                <span className="text-sm text-zinc-400">{s.companyLabel}</span>
                <span className="text-sm text-zinc-100">
                  {formData.company}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Payment note */}
        <div className="rounded-xl border border-amber-500/20 bg-amber-500/[0.05] p-5">
          <h4 className="text-sm font-semibold text-amber-300 mb-2">
            {s.paymentTitle}
          </h4>
          <p className="text-sm text-zinc-400 leading-relaxed mb-3">
            {s.paymentComingSoon}
          </p>
          <div className="flex items-center gap-2">
            <Mail className="size-4 text-indigo-400 shrink-0" />
            <a
              href={`mailto:${s.contactEmail}`}
              className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              {s.contactEmail}
            </a>
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
