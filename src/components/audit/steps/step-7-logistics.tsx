"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepLayout } from "../shared/step-layout";
import { SelectCard } from "../shared/select-card";
import type { AuditFormData } from "@/hooks/use-audit-form";
import { useState } from "react";

const SOURCE_OPTIONS = [
  "LinkedIn",
  "Referral",
  "Google Search",
  "Social Media",
  "Event",
];

const TIME_OPTIONS = [
  "Morning (9-12 JST)",
  "Afternoon (13-17 JST)",
  "Evening (18-21 JST)",
];

interface Step7Props {
  formData: AuditFormData;
  updateField: <K extends keyof AuditFormData>(
    field: K,
    value: AuditFormData[K]
  ) => void;
  onSubmit: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

export function Step7Logistics({
  formData,
  updateField,
  onSubmit,
  onBack,
  isLoading,
  error,
}: Step7Props) {
  const [showOtherSource, setShowOtherSource] = useState(
    formData.source !== "" && !SOURCE_OPTIONS.includes(formData.source)
  );

  const handleSourceSelect = (source: string) => {
    if (source === "Other") {
      setShowOtherSource(true);
      updateField("source", "");
    } else {
      setShowOtherSource(false);
      updateField("source", source);
    }
  };

  return (
    <StepLayout
      question="Almost done — just a few logistics"
      onNext={onSubmit}
      onBack={onBack}
      isLast
      isLoading={isLoading}
      error={error}
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <Label className="text-zinc-300">How did you find us?</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SOURCE_OPTIONS.map((source) => (
              <SelectCard
                key={source}
                label={source}
                selected={formData.source === source}
                onClick={() => handleSourceSelect(source)}
              />
            ))}
            <SelectCard
              label="Other"
              selected={showOtherSource}
              onClick={() => handleSourceSelect("Other")}
            />
          </div>
          {showOtherSource && (
            <Input
              value={formData.source}
              onChange={(e) => updateField("source", e.target.value)}
              placeholder="How did you find us?"
              className="bg-zinc-950/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
              autoFocus
            />
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-zinc-300">
            When&apos;s a good time for a call?
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {TIME_OPTIONS.map((time) => (
              <SelectCard
                key={time}
                label={time}
                selected={formData.preferredTime === time}
                onClick={() => updateField("preferredTime", time)}
              />
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="website" className="text-zinc-300">
            Got a website? <span className="text-zinc-500">(optional)</span>
          </Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => updateField("website", e.target.value)}
            placeholder="https://example.com"
            className="bg-zinc-950/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-12 text-base"
          />
        </div>
      </div>
    </StepLayout>
  );
}
