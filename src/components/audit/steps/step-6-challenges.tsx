"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StepLayout } from "../shared/step-layout";
import { SelectCard } from "../shared/select-card";
import { MultiSelectChips } from "../shared/multi-select-chips";
import type { AuditFormData } from "@/hooks/use-audit-form";
import { useAuditLocale } from "../audit-locale-context";

interface Step6Props {
  formData: AuditFormData;
  updateField: <K extends keyof AuditFormData>(
    field: K,
    value: AuditFormData[K]
  ) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

export function Step6Challenges({
  formData,
  updateField,
  onNext,
  onBack,
  isLoading,
  error,
}: Step6Props) {
  const { t } = useAuditLocale();
  const step = t.steps[6];
  const perspective = formData.perspective;
  const isIndividual = perspective === "individual";
  const isCompany = perspective === "company";
  const isDepartment = perspective === "department";

  const question = isIndividual ? step.questionIndividual : step.question;
  const challenges = isIndividual ? step.challengesIndividual : step.challenges;
  const repetitiveLabel = isIndividual
    ? step.repetitiveHoursLabel
    : step.repetitiveHoursLabelTeam;

  return (
    <StepLayout
      question={question}
      description={step.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      error={error}
    >
      <div className="space-y-8">
        {/* Challenges — branched list */}
        <MultiSelectChips
          options={[...challenges]}
          selected={formData.challenge}
          onChange={(selected) => updateField("challenge", selected)}
          otherValue={formData.challengeOther}
          onOtherChange={(value) => updateField("challengeOther", value)}
          otherLabel={t.common.other}
          otherPlaceholder={t.common.otherPlaceholder}
        />

        {/* Bottlenecks — company/department paths */}
        {!isIndividual && (
          <div className="space-y-3">
            <Label className="text-zinc-300">{step.bottlenecksLabel}</Label>
            <MultiSelectChips
              options={[...step.bottlenecks]}
              selected={formData.bottlenecks}
              onChange={(selected) => updateField("bottlenecks", selected)}
              allowOther={false}
            />
          </div>
        )}

        {/* Repetitive hours per week — all paths */}
        <div className="space-y-2">
          <Label htmlFor="repetitiveHours" className="text-zinc-300">
            {repetitiveLabel}
          </Label>
          <Input
            id="repetitiveHours"
            type="number"
            min="0"
            max="168"
            value={formData.repetitiveHoursPerWeek}
            onChange={(e) => updateField("repetitiveHoursPerWeek", e.target.value)}
            placeholder={step.repetitiveHoursPlaceholder}
            className="bg-zinc-950/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 h-12 text-base max-w-xs"
          />
        </div>

        {/* Robot task — individual path */}
        {isIndividual && (
          <div className="space-y-2">
            <Label htmlFor="robotTask" className="text-zinc-300">
              {step.robotTaskLabel}
            </Label>
            <textarea
              id="robotTask"
              value={formData.robotTask}
              onChange={(e) => updateField("robotTask", e.target.value)}
              placeholder={step.robotTaskPlaceholder}
              rows={3}
              className="w-full rounded-lg bg-zinc-950/50 border border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20 focus-visible:ring-1 focus-visible:outline-none px-3 py-2.5 text-base resize-none"
            />
          </div>
        )}

        {/* Onboarding — company path */}
        {isCompany && (
          <div className="space-y-3">
            <Label className="text-zinc-300">{step.onboardingLabel}</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {step.onboardingOptions.map((option) => (
                <SelectCard
                  key={option}
                  label={option}
                  selected={formData.onboardingProcess === option}
                  onClick={() => updateField("onboardingProcess", option)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Cross-department dependency — department path */}
        {isDepartment && (
          <div className="space-y-3">
            <Label className="text-zinc-300">{step.crossDeptLabel}</Label>
            <div className="grid grid-cols-1 gap-2">
              {step.crossDeptOptions.map((option) => (
                <SelectCard
                  key={option}
                  label={option}
                  selected={formData.crossDeptDependency === option}
                  onClick={() => updateField("crossDeptDependency", option)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </StepLayout>
  );
}
