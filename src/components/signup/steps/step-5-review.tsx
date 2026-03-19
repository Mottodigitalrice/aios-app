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

  // 3-way track display based on signupType
  const trackDisplay =
    formData.signupType === "individual"
      ? s.trackIndividual
      : formData.signupType === "department"
        ? s.trackDepartment
        : formData.signupType === "company"
          ? s.trackCompany
          : formData.track === "cohort"
            ? s.trackCohort
            : s.trackCorporate;

  // Build rows for the summary table
  const rows: { label: string; value: string }[] = [
    { label: s.trackLabel, value: trackDisplay },
  ];

  // Only show plan for non-individual
  if (formData.signupType !== "individual" && formData.plan) {
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
  if (formData.departmentName) {
    rows.push({ label: s.departmentLabel, value: formData.departmentName });
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
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-2">
          {s.question}
        </h2>
        <p className="text-[#6E6E73] text-base leading-relaxed">
          {s.description}
        </p>
      </div>

      <div className="space-y-6 mb-8">
        {/* Enrollment summary */}
        <div className="rounded-xl border border-[#E8E8ED] bg-[#F5F5F7] p-6 space-y-4">
          <h3 className="text-sm font-semibold text-[#6E6E73] uppercase tracking-wider">
            {s.summaryTitle}
          </h3>

          <div className="grid gap-3">
            {rows.map((row) => (
              <div
                key={row.label}
                className="flex justify-between items-start py-2 border-b border-[#E8E8ED] gap-4"
              >
                <span className="text-sm text-[#6E6E73] shrink-0">
                  {row.label}
                </span>
                <span className="text-sm font-medium text-[#1D1D1F] text-right">
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantee */}
        <div className="flex items-start gap-3 rounded-xl border border-[#1B7D5A]/20 bg-[#1B7D5A]/5 p-4">
          <ShieldCheck className="size-5 text-[#1B7D5A] mt-0.5 shrink-0" />
          <p className="text-xs text-[#1B7D5A] leading-relaxed">
            {s.guarantee}
          </p>
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
          className="border-[#E8E8ED] text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] gap-2 min-h-[44px]"
        >
          <ArrowLeft className="size-4" />
          {t.common.back}
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={isLoading}
          className="flex-1 bg-[#1D1D1F] hover:bg-[#2D2D2F] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 text-white gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
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

      {/* What happens next */}
      <div className="mt-8 rounded-xl border border-[#E8E8ED] bg-[#F5F5F7] p-5">
        <h4 className="text-sm font-semibold text-[#6E6E73] mb-3">
          {s.whatHappensNextTitle || "What happens next"}
        </h4>
        <ol className="space-y-2 text-sm text-[#6E6E73]">
          <li className="flex items-start gap-2">
            <span className="text-[#B8860B] font-semibold shrink-0">1.</span>
            <span>{s.whatHappensNext1 || "Lewis reviews your submission within 24 hours"}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#B8860B] font-semibold shrink-0">2.</span>
            <span>{s.whatHappensNext2 || "You'll get a personal email"}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-[#B8860B] font-semibold shrink-0">3.</span>
            <span>{s.whatHappensNext3 || "Book a free call to discuss"}</span>
          </li>
        </ol>
        <div className="mt-4 pt-3 border-t border-[#E8E8ED] flex items-center gap-2">
          <ShieldCheck className="size-4 text-[#1B7D5A] shrink-0" />
          <p className="text-xs text-[#1B7D5A]/80">
            {s.guaranteeReinforcement || "Backed by our Ownership Guarantee"}
          </p>
        </div>
      </div>
    </div>
  );
}
