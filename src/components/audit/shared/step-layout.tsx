"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";
import { useAuditLocale } from "../audit-locale-context";
import { segmentJapanese } from "@/lib/budoux-transform";

interface StepLayoutProps {
  question: string;
  description?: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  isLoading?: boolean;
  canContinue?: boolean;
  error?: string | null;
}

export function StepLayout({
  question,
  description,
  children,
  onNext,
  onBack,
  isFirst,
  isLast,
  isLoading,
  canContinue = true,
  error,
}: StepLayoutProps) {
  const { t } = useAuditLocale();

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-10">
        <h2 className="text-2xl sm:text-[28px] font-semibold tracking-[-0.01em] text-[#1D1D1F] mb-3 leading-[1.35]">
          {segmentJapanese(question)}
        </h2>
        {description && (
          <p className="text-[15px] text-[#6E6E73] leading-[1.75]">
            {segmentJapanese(description)}
          </p>
        )}
      </div>

      <div className="mb-8">{children}</div>

      {error && (
        <p role="alert" className="text-sm text-red-600 mb-4">{error}</p>
      )}

      <div className="flex items-center gap-3">
        {!isFirst && onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="border-[#E8E8ED] text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] gap-2 min-h-[44px]"
          >
            <ArrowLeft className="size-4" />
            {t.common.back}
          </Button>
        )}
        <Button
          type="button"
          onClick={onNext}
          disabled={!canContinue || isLoading}
          className="flex-1 bg-[#1D1D1F] hover:bg-[#2D2D2F] hover:scale-[1.02] active:scale-[0.98] transition-transform duration-150 text-white gap-2 disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              {t.common.saving}
            </>
          ) : isLast ? (
            <>
              <Sparkles className="size-4" />
              {t.common.submit}
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
