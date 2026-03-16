"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, User, Building2, Users, Check, Sparkles } from "lucide-react";
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

  const selectType = (type: "individual" | "company" | "department") => {
    updateField("signupType", type);
    if (type === "individual") {
      updateField("track", "cohort");
      updateField("plan", "");
    } else {
      updateField("track", "corporate");
      if (!formData.plan) updateField("plan", "monthly");
    }
  };

  const cards = [
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
    {
      type: "department" as const,
      icon: Users,
      label: s.departmentLabel,
      price: s.departmentPrice,
      description: s.departmentDescription,
      bestFor: s.departmentBestFor,
    },
  ];

  const showBillingPlan =
    formData.signupType === "company" || formData.signupType === "department";

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
                  ? "border-indigo-500/50 bg-indigo-500/10 ring-1 ring-indigo-500/30"
                  : "border-zinc-800/50 bg-zinc-900/50 hover:border-zinc-700 hover:bg-zinc-800/50"
              )}
            >
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    "mt-1 rounded-lg p-2",
                    isSelected ? "bg-indigo-500/20" : "bg-zinc-800"
                  )}
                >
                  <Icon className="size-5 text-indigo-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-semibold text-zinc-100">{card.label}</h3>
                    {isSelected && (
                      <span className="size-5 rounded-full bg-indigo-500 flex items-center justify-center">
                        <Check className="size-3 text-white" strokeWidth={3} />
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-indigo-400 mb-2">
                    {card.price}
                  </p>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-2">
                    {card.description}
                  </p>
                  <p className="text-xs text-zinc-500">{card.bestFor}</p>
                </div>
              </div>
            </button>
          );
        })}

        {/* Billing plan selection for corporate tracks */}
        {showBillingPlan && (
          <div className="ml-1 mt-2">
            <p className="text-sm font-medium text-zinc-300 mb-3">
              {s.planSelectionLabel}
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => updateField("plan", "monthly")}
                className={cn(
                  "rounded-lg border p-3 text-left text-sm transition-all duration-200",
                  formData.plan === "monthly"
                    ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/30"
                    : "border-zinc-800/50 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700"
                )}
              >
                <p className="font-medium">{s.monthlyPlanLabel}</p>
                <p className="text-xs text-zinc-500 mt-1">
                  {s.corporateMonthlyPrice}
                </p>
              </button>
              <button
                type="button"
                onClick={() => updateField("plan", "full")}
                className={cn(
                  "rounded-lg border p-3 text-left text-sm transition-all duration-200 relative",
                  formData.plan === "full"
                    ? "border-emerald-500/50 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30"
                    : "border-zinc-800/50 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700"
                )}
              >
                <Badge className="absolute -top-2 right-2 bg-emerald-600 text-white border-0 text-[10px] px-1.5 py-0">
                  <Sparkles className="size-2.5 mr-0.5" />
                  {s.payInFullSave}
                </Badge>
                <p className="font-medium">{s.fullPlanLabel}</p>
                <p className="text-xs text-zinc-500 mt-1">
                  {s.payInFullPrice}
                </p>
              </button>
            </div>
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
          onClick={onNext}
          disabled={!formData.signupType || isLoading}
          className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white gap-2 glow disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t.common.continue}
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
