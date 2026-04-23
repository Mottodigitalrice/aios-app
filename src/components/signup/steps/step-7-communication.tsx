"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check, MessageCircle, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSignupLocale } from "../signup-locale-context";
import type { SignupFormData, FieldErrors } from "@/hooks/use-signup-form";

interface Step7CommunicationProps {
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

const LINE_QR_IMAGE = "/line-official-qr.png";
const LINE_ADD_URL = "https://lin.ee/n1Aj9Fs";

export function Step7Communication({
  formData,
  updateField,
  onNext,
  onBack,
  isLoading,
  error,
  fieldErrors,
}: Step7CommunicationProps) {
  const { t } = useSignupLocale();
  const s = t.steps[7];

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

      {/* LINE section */}
      <div className="mb-6 rounded-xl border border-[#06C755]/25 bg-[#06C755]/5 p-5">
        <div className="flex items-start gap-3 mb-4">
          <MessageCircle className="size-5 text-[#06C755] mt-0.5 shrink-0" />
          <div>
            <h3 className="text-base font-semibold text-[#1D1D1F] mb-1">
              {s.lineTitle}
            </h3>
            <p className="text-sm text-[#6E6E73] leading-relaxed">
              {s.lineBody}
            </p>
          </div>
        </div>

        <div className="rounded-lg bg-white border border-[#E8E8ED] p-4 flex flex-col sm:flex-row items-center gap-4 mb-4">
          <div className="size-32 rounded-lg border border-[#E8E8ED] bg-[#F5F5F7] overflow-hidden flex items-center justify-center shrink-0">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LINE_QR_IMAGE}
              alt="LINE Official QR"
              className="size-full object-contain"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
          <div className="flex-1 min-w-0 text-center sm:text-left">
            <p className="text-xs text-[#6E6E73] mb-3 leading-relaxed">
              {s.lineQrCaption}
            </p>
            <a
              href={LINE_ADD_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#06C755] px-4 py-2 text-sm font-semibold text-white hover:bg-[#05a546] transition-colors"
            >
              <MessageCircle className="size-4" />
              {s.lineAddButton}
            </a>
          </div>
        </div>

        <button
          type="button"
          onClick={() => updateField("lineAdded", !formData.lineAdded)}
          className={cn(
            "w-full flex items-center gap-3 rounded-lg border p-3 text-left transition-all duration-150",
            formData.lineAdded
              ? "border-[#06C755]/40 bg-[#06C755]/10"
              : "border-[#E8E8ED] bg-white hover:border-[#06C755]/30"
          )}
        >
          <div
            className={cn(
              "size-5 rounded border-2 flex items-center justify-center shrink-0",
              formData.lineAdded ? "border-[#06C755] bg-[#06C755]" : "border-[#C6C6C9]"
            )}
          >
            {formData.lineAdded && (
              <Check className="size-3 text-white" strokeWidth={3} />
            )}
          </div>
          <span
            className={cn(
              "text-sm font-medium",
              formData.lineAdded ? "text-[#06C755]" : "text-[#1D1D1F]"
            )}
          >
            {s.lineConfirmLabel}
          </span>
        </button>
        {fieldErrors?.lineAdded && (
          <p className="text-xs text-red-600 mt-2">{fieldErrors.lineAdded}</p>
        )}
      </div>

      {/* Slack section */}
      <div className="mb-6 rounded-xl border border-[#4A154B]/20 bg-[#4A154B]/5 p-5">
        <div className="flex items-start gap-3 mb-4">
          <Users className="size-5 text-[#4A154B] mt-0.5 shrink-0" />
          <div>
            <h3 className="text-base font-semibold text-[#1D1D1F] mb-1">
              {s.slackTitle}
            </h3>
            <p className="text-sm text-[#6E6E73] leading-relaxed">
              {s.slackBody}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {([
            { value: "yes", label: s.slackOptInYes },
            { value: "no", label: s.slackOptInNo },
          ] as const).map((opt) => {
            const isActive = formData.slackOptIn === opt.value;
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateField("slackOptIn", opt.value)}
                className={cn(
                  "w-full flex items-center gap-3 rounded-lg border p-3 text-left text-sm font-medium transition-all duration-150",
                  isActive
                    ? "border-[#4A154B]/40 bg-[#4A154B]/10 text-[#4A154B]"
                    : "border-[#E8E8ED] bg-white text-[#1D1D1F] hover:border-[#4A154B]/30"
                )}
              >
                <div
                  className={cn(
                    "size-5 rounded-full border-2 flex items-center justify-center shrink-0",
                    isActive ? "border-[#4A154B] bg-[#4A154B]" : "border-[#C6C6C9]"
                  )}
                >
                  {isActive && <Check className="size-3 text-white" strokeWidth={3} />}
                </div>
                <span>{opt.label}</span>
              </button>
            );
          })}
        </div>
        {fieldErrors?.slackOptIn && (
          <p className="text-xs text-red-600 mt-2">{fieldErrors.slackOptIn}</p>
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
