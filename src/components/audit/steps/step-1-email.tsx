"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepLayout } from "../shared/step-layout";
import type { AuditFormData, FieldErrors } from "@/hooks/use-audit-form";
import { useAuditLocale } from "../audit-locale-context";
import Link from "next/link";

interface Step1Props {
  formData: AuditFormData;
  updateField: <K extends keyof AuditFormData>(
    field: K,
    value: AuditFormData[K]
  ) => void;
  validateField: (field: keyof AuditFormData) => void;
  onNext: () => void;
  isLoading: boolean;
  error: string | null;
  fieldErrors: FieldErrors;
}

export function Step1Email({
  formData,
  updateField,
  validateField,
  onNext,
  isLoading,
  error,
  fieldErrors,
}: Step1Props) {
  const { t, locale } = useAuditLocale();
  const step = t.steps[1];
  const canContinue = formData.email.length > 0 && formData.privacyConsent;

  return (
    <StepLayout
      question={step.question}
      description={step.description}
      onNext={onNext}
      isFirst
      isLoading={isLoading}
      canContinue={canContinue}
      error={error}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-[#6E6E73]">
            {step.emailLabel}
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            onBlur={() => formData.email && validateField("email")}
            placeholder={step.emailPlaceholder}
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className={`bg-white text-[#1D1D1F] placeholder:text-[#86868B] focus-visible:border-[#B8860B]/50 focus-visible:ring-[#B8860B]/20 h-12 text-base ${
              fieldErrors.email
                ? "border-red-500/50 focus-visible:border-red-500/50 focus-visible:ring-red-500/20"
                : "border-[#E8E8ED]"
            }`}
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && canContinue) {
                e.preventDefault();
                onNext();
              }
            }}
          />
          {fieldErrors.email && (
            <p id="email-error" role="alert" className="text-xs text-red-600 mt-1">{fieldErrors.email}</p>
          )}
        </div>

        <div>
          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.privacyConsent}
              onChange={(e) => updateField("privacyConsent", e.target.checked)}
              aria-label={step.consentLabel}
              className={`mt-0.5 size-4 rounded bg-white text-[#B8860B] focus:ring-[#B8860B]/20 accent-[#B8860B] ${
                fieldErrors.privacyConsent ? "border-red-500" : "border-[#E8E8ED]"
              }`}
            />
            <span className="text-sm text-[#6E6E73] group-hover:text-[#6E6E73] transition-colors">
              {step.consentLabel}{" "}
              <Link
                href={locale === "ja" ? "/privacy?lang=ja" : "/privacy"}
                target="_blank"
                className="text-[#B8860B] hover:text-[#D4A843] underline underline-offset-2"
              >
                {step.consentLink}
              </Link>
            </span>
          </label>
          {fieldErrors.privacyConsent && (
            <p role="alert" className="text-xs text-red-600 mt-1 ml-7">{fieldErrors.privacyConsent}</p>
          )}
        </div>
      </div>
    </StepLayout>
  );
}
