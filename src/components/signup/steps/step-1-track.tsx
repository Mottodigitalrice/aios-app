"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, User, Building2, Users, Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSignupLocale } from "../signup-locale-context";
import type { SignupFormData, FieldErrors } from "@/hooks/use-signup-form";

interface Step1TrackProps {
  formData: SignupFormData;
  updateField: <K extends keyof SignupFormData>(
    field: K,
    value: SignupFormData[K]
  ) => void;
  onNext: () => void;
  isLoading?: boolean;
  error?: string | null;
  fieldErrors?: FieldErrors;
}

export function Step1Track({
  formData,
  updateField,
  onNext,
  isLoading,
  error,
}: Step1TrackProps) {
  const { t } = useSignupLocale();
  const s = t.steps[1];

  const selectType = (type: "cohort" | "individual" | "company") => {
    updateField("signupType", type);
    if (type === "cohort") {
      updateField("track", "cohort");
    } else if (type === "individual") {
      updateField("track", "oneOnOne");
    } else {
      updateField("track", "company");
    }
  };

  const cards = [
    {
      type: "cohort" as const,
      icon: Users,
      label: s.cohortLabel,
      price: s.cohortPrice,
      description: s.cohortDescription,
      bestFor: s.cohortBestFor,
    },
    {
      type: "individual" as const,
      icon: User,
      label: s.individualLabel,
      price: s.individualPrice,
      description: s.individualDescription,
      bestFor: s.individualBestFor,
    },
    {
      type: "company" as const,
      icon: Building2,
      label: s.companyLabel,
      price: s.companyPrice,
      description: s.companyDescription,
      bestFor: s.companyBestFor,
    },
  ];

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

      <div className="space-y-4 mb-8">
        {cards.map((card) => {
          const isSelected = formData.signupType === card.type;
          const Icon = card.icon;
          return (
            <button
              key={card.type}
              type="button"
              onClick={() => selectType(card.type)}
              className={cn(
                "w-full rounded-xl border p-5 text-left transition-all duration-200",
                isSelected
                  ? "border-[#B8860B]/30 bg-[#B8860B]/8 ring-1 ring-[#B8860B]/20"
                  : "border-[#E8E8ED] bg-[#F5F5F7] hover:border-[#B8860B]/30 hover:bg-[#F5F5F7]"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "mt-1 rounded-lg p-2",
                    isSelected ? "bg-[#B8860B]/10" : "bg-[#E8E8ED]"
                  )}
                >
                  <Icon className="size-5 text-[#B8860B]" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-[#1D1D1F]">{card.label}</h3>
                    {isSelected && (
                      <span className="size-5 rounded-full bg-[#B8860B] flex items-center justify-center">
                        <Check className="size-3 text-white" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-[#B8860B] mb-2">
                    {card.price}
                  </p>
                  <p className="text-sm text-[#6E6E73] leading-relaxed mb-2">
                    {card.description}
                  </p>
                  <p className="text-xs text-[#86868B]">{card.bestFor}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-600 mb-4">
          {error}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button
          type="button"
          onClick={onNext}
          disabled={!formData.signupType || isLoading}
          className="flex-1 bg-[#1D1D1F] hover:bg-[#2D2D2F] text-white gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t.common.continue}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
