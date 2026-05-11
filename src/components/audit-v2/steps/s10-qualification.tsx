"use client";

import { V2StepLayout } from "../shared/v2-step-layout";
import { OptionPills } from "../shared/option-pills";
import { useAuditV2Locale } from "../audit-v2-locale-context";
import {
  BUDGET_OPTIONS,
  TIMELINE_OPTIONS,
  DECISION_MAKER_OPTIONS,
} from "@/lib/audit-v2/constants";
import { segmentJapanese } from "@/lib/budoux-transform";
import type { AuditV2Data } from "@/hooks/use-audit-form-v2";

interface Props {
  data: AuditV2Data;
  update: (patch: Partial<AuditV2Data>) => void;
  updateQualification: (patch: Partial<AuditV2Data["qualification"]>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

export function S10Qualification({
  data,
  updateQualification,
  onNext,
  onBack,
  isLoading,
  error,
}: Props) {
  const { t } = useAuditV2Locale();
  const isFull = data.tier === "full";
  const q = data.qualification;
  const ready = !!q.timeline;

  return (
    <V2StepLayout
      question={t.qualification.question}
      description={t.qualification.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue={ready}
      error={error}
    >
      <div className="space-y-7">
        {isFull && (
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8860B] mb-1">
              {segmentJapanese(t.qualification.budget)}
            </h3>
            <p className="text-xs text-[#86868B] mb-3">
              {segmentJapanese(t.qualification.budgetNote)}
            </p>
            <OptionPills
              options={BUDGET_OPTIONS}
              value={q.budget}
              onChange={(id) => updateQualification({ budget: id })}
            />
          </div>
        )}
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8860B] mb-3">
            {segmentJapanese(t.qualification.timeline)}
          </h3>
          <OptionPills
            options={TIMELINE_OPTIONS}
            value={q.timeline}
            onChange={(id) => updateQualification({ timeline: id })}
          />
        </div>
        {isFull && (
          <div>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8860B] mb-3">
              {segmentJapanese(t.qualification.decisionMaker)}
            </h3>
            <OptionPills
              options={DECISION_MAKER_OPTIONS}
              value={q.decisionMaker}
              onChange={(id) => updateQualification({ decisionMaker: id })}
            />
          </div>
        )}
      </div>
    </V2StepLayout>
  );
}
