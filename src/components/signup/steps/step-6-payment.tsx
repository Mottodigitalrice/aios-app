"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, CreditCard, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSignupLocale } from "../signup-locale-context";
import type { SignupFormData, FieldErrors } from "@/hooks/use-signup-form";

interface Step6PaymentProps {
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

export function Step6Payment({
  formData,
  updateField,
  onNext,
  onBack,
  isLoading,
  error,
  fieldErrors,
}: Step6PaymentProps) {
  const { t } = useSignupLocale();
  const s = t.steps[6];

  const options = [
    {
      value: "upfront" as const,
      label: s.upfrontLabel,
      subtitle: s.upfrontSubtitle,
      badge: s.upfrontBadge,
    },
    {
      value: "monthly" as const,
      label: s.monthlyLabel,
      subtitle: s.monthlySubtitle,
    },
  ];

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-2">
          {s.question}
        </h2>
        <p className="text-[#6E6E73] text-base leading-relaxed">
          {s.description}
        </p>
      </div>

      <div className="space-y-4 mb-6">
        <div className="rounded-xl border border-[#E8E8ED] bg-[#F5F5F7] p-4">
          <div className="flex items-start gap-3">
            <Shield className="size-4 text-[#6E6E73] mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-[#1D1D1F] mb-1">
                {s.refundTitle}
              </h3>
              <p className="text-sm text-[#6E6E73] leading-relaxed">
                {s.refundBody}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#E8E8ED] bg-[#F5F5F7] p-4">
          <div className="flex items-start gap-3">
            <CreditCard className="size-4 text-[#6E6E73] mt-0.5 shrink-0" />
            <div>
              <h3 className="text-sm font-semibold text-[#1D1D1F] mb-1">
                {s.paymentTitle}
              </h3>
              <p className="text-sm text-[#6E6E73] leading-relaxed">
                {s.paymentBody}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm font-medium text-[#1D1D1F] mb-3">
          {s.planLabel} <span className="text-red-600">*</span>
        </p>
        <div className="space-y-3">
          {options.map((opt) => {
            const isActive = formData.paymentPlan === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateField("paymentPlan", opt.value)}
                className={cn(
                  "relative w-full rounded-xl border p-4 text-left transition-all duration-200",
                  isActive
                    ? "border-[#B8860B] bg-[#B8860B]/8 ring-2 ring-[#B8860B]/30"
                    : "border-[#E8E8ED] bg-white hover:border-[#B8860B]/30"
                )}
              >
                {opt.badge && (
                  <span className="absolute -top-2 right-4 rounded-full bg-[#B8860B] px-2 py-0.5 text-[10px] font-semibold text-white">
                    {opt.badge}
                  </span>
                )}
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "mt-0.5 size-5 rounded-full border-2 flex items-center justify-center shrink-0",
                      isActive
                        ? "border-[#B8860B] bg-[#B8860B]"
                        : "border-[#E8E8ED]"
                    )}
                  >
                    {isActive && <Check className="size-3 text-white" strokeWidth={3} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-sm font-semibold mb-1",
                        isActive ? "text-[#B8860B]" : "text-[#1D1D1F]"
                      )}
                    >
                      {opt.label}
                    </p>
                    <p className="text-xs text-[#6E6E73] leading-relaxed">
                      {opt.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        {fieldErrors?.paymentPlan && (
          <p className="text-xs text-red-600 mt-2">{fieldErrors.paymentPlan}</p>
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
          {t.common.continue}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
