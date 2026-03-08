"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepLayout } from "../shared/step-layout";
import { SelectCard } from "../shared/select-card";
import type { AuditFormData } from "@/hooks/use-audit-form";
import { useAuditLocale } from "../audit-locale-context";
import { useState } from "react";

interface Step8Props {
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

export function Step8Logistics({
  formData,
  updateField,
  onSubmit,
  onBack,
  isLoading,
  error,
}: Step8Props) {
  const { t } = useAuditLocale();
  const step = t.steps[8];

  const [showOtherSource, setShowOtherSource] = useState(
    formData.source !== "" && !(step.sourceOptions as readonly string[]).includes(formData.source)
  );

  const handleSourceSelect = (source: string) => {
    if (source === t.common.other) {
      setShowOtherSource(true);
      updateField("source", "");
    } else {
      setShowOtherSource(false);
      updateField("source", source);
    }
  };

  return (
    <StepLayout
      question={step.question}
      onNext={onSubmit}
      onBack={onBack}
      isLast
      isLoading={isLoading}
      error={error}
    >
      <div className="space-y-8">
        <div className="space-y-3">
          <Label className="text-zinc-300">{step.sourceLabel}</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {step.sourceOptions.map((source) => (
              <SelectCard
                key={source}
                label={source}
                selected={formData.source === source}
                onClick={() => handleSourceSelect(source)}
              />
            ))}
            <SelectCard
              label={t.common.other}
              selected={showOtherSource}
              onClick={() => handleSourceSelect(t.common.other)}
            />
          </div>
          {showOtherSource && (
            <Input
              value={formData.source}
              onChange={(e) => updateField("source", e.target.value)}
              placeholder={t.common.otherPlaceholder}
              className="bg-zinc-950/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
              autoFocus
            />
          )}
        </div>

        <div className="space-y-3">
          <Label className="text-zinc-300">
            {step.timeLabel}
          </Label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {step.timeOptions.map((time) => (
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
            {step.websiteLabel} <span className="text-zinc-500">({t.common.optional})</span>
          </Label>
          <Input
            id="website"
            value={formData.website}
            onChange={(e) => updateField("website", e.target.value)}
            placeholder={step.websitePlaceholder}
            className="bg-zinc-950/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-12 text-base"
          />
        </div>
      </div>
    </StepLayout>
  );
}
