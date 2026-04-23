"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSignupLocale } from "../signup-locale-context";
import {
  AVAILABILITY_SLOTS,
  type AvailabilityCommitment,
  type SignupFormData,
  type FieldErrors,
} from "@/hooks/use-signup-form";

interface Step5AvailabilityProps {
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

const COMMITMENT_OPTIONS: {
  value: AvailabilityCommitment;
  labelKey: "legendCommit" | "legendMaybe" | "legendNo";
  activeClasses: string;
}[] = [
  {
    value: "commit",
    labelKey: "legendCommit",
    activeClasses:
      "border-[#1B7D5A]/40 bg-[#1B7D5A]/10 text-[#1B7D5A] ring-1 ring-[#1B7D5A]/30",
  },
  {
    value: "maybe",
    labelKey: "legendMaybe",
    activeClasses:
      "border-[#B8860B]/40 bg-[#B8860B]/10 text-[#B8860B] ring-1 ring-[#B8860B]/30",
  },
  {
    value: "no",
    labelKey: "legendNo",
    activeClasses:
      "border-[#C93C20]/40 bg-[#C93C20]/10 text-[#C93C20] ring-1 ring-[#C93C20]/30",
  },
];

const IDLE_CLASSES =
  "border-[#E8E8ED] bg-white text-[#86868B] hover:border-[#B8860B]/30";

export function Step5Availability({
  formData,
  updateField,
  onNext,
  onBack,
  isLoading,
  error,
}: Step5AvailabilityProps) {
  const { t } = useSignupLocale();
  const s = t.steps[5];

  const setSlot = (slotId: string, value: AvailabilityCommitment) => {
    updateField("availability", {
      ...formData.availability,
      [slotId]: value,
    });
  };

  const dayLabels: Record<string, string> = {
    mon: s.dayMon,
    wed: s.dayWed,
    thu: s.dayThu,
  };

  const slotsByDay = AVAILABILITY_SLOTS.reduce<
    Record<string, typeof AVAILABILITY_SLOTS>
  >((acc, slot) => {
    (acc[slot.day] ||= []).push(slot);
    return acc;
  }, {});

  const commitCount = Object.values(formData.availability).filter(
    (v) => v === "commit"
  ).length;
  const maybeCount = Object.values(formData.availability).filter(
    (v) => v === "maybe"
  ).length;
  const meetsMinimum = commitCount >= 2 || maybeCount >= 3;

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] mb-3">
          {s.question}
        </h2>
        <p className="text-[#6E6E73] text-sm font-medium mb-3">
          {s.description}
        </p>
        <ul className="space-y-2">
          {s.descriptionBullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#6E6E73] leading-relaxed">
              <span className="text-[#B8860B] shrink-0 mt-0.5">•</span>
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mb-6 rounded-xl border border-[#B8860B]/20 bg-[#B8860B]/5 p-4 flex gap-3">
        <Clock className="size-4 text-[#B8860B] mt-0.5 shrink-0" />
        <p className="text-sm text-[#6E6E73] leading-relaxed">
          {s.helperNote}
        </p>
      </div>

      <p className="text-xs text-[#86868B] mb-4">{s.timezoneNote}</p>

      <div className="space-y-6 mb-6">
        {Object.entries(slotsByDay).map(([day, slots]) => (
          <div key={day}>
            <h3 className="text-sm font-semibold text-[#1D1D1F] mb-3">
              {dayLabels[day]}
            </h3>
            <div className="space-y-2">
              {slots.map((slot) => {
                const current = formData.availability[slot.slotId] || "no";
                return (
                  <div
                    key={slot.slotId}
                    className="flex items-center gap-3 rounded-xl border border-[#E8E8ED] bg-[#F5F5F7] p-3"
                  >
                    <span className="text-sm font-medium text-[#1D1D1F] w-24 sm:w-28 shrink-0">
                      {slot.time}
                    </span>
                    <div className="flex flex-wrap gap-2 ml-auto">
                      {COMMITMENT_OPTIONS.map((opt) => {
                        const isActive = current === opt.value;
                        return (
                          <button
                            key={opt.value}
                            type="button"
                            onClick={() => setSlot(slot.slotId, opt.value)}
                            className={cn(
                              "rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-150",
                              isActive ? opt.activeClasses : IDLE_CLASSES
                            )}
                          >
                            {s[opt.labelKey]}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!meetsMinimum && (
        <p className="text-xs text-[#86868B] mb-4">{s.validationHint}</p>
      )}

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
