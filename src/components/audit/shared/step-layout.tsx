"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, Sparkles } from "lucide-react";

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
  fieldErrors?: Record<string, string>;
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
  fieldErrors: _fieldErrors,
}: StepLayoutProps) {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100 mb-2">
          {question}
        </h2>
        {description && (
          <p className="text-zinc-400 text-base leading-relaxed">
            {description}
          </p>
        )}
      </div>

      <div className="mb-8">{children}</div>

      {error && (
        <p className="text-sm text-red-400 mb-4">{error}</p>
      )}

      <div className="flex items-center gap-3">
        {!isFirst && onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 gap-2"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
        )}
        <Button
          type="button"
          onClick={onNext}
          disabled={!canContinue || isLoading}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white gap-2 glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving...
            </>
          ) : isLast ? (
            <>
              <Sparkles className="size-4" />
              Submit
            </>
          ) : (
            <>
              Continue
              <ArrowRight className="size-4" />
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
