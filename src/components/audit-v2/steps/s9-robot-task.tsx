"use client";

import { V2StepLayout } from "../shared/v2-step-layout";
import { useAuditV2Locale } from "../audit-v2-locale-context";
import { Textarea } from "@/components/ui/textarea";
import { segmentJapanese } from "@/lib/budoux-transform";
import { Lightbulb } from "lucide-react";
import type { AuditV2Data } from "@/hooks/use-audit-form-v2";

interface Props {
  data: AuditV2Data;
  update: (patch: Partial<AuditV2Data>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

export function S9RobotTask({ data, update, onNext, onBack, isLoading, error }: Props) {
  const { t } = useAuditV2Locale();
  const max = 200;

  return (
    <V2StepLayout
      question={t.robotTask.question}
      description={t.robotTask.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue
      error={error}
    >
      <div className="space-y-4">
        <Textarea
          value={data.robotTask}
          onChange={(e) => update({ robotTask: e.target.value.slice(0, max) })}
          placeholder={t.robotTask.placeholder}
          rows={5}
          maxLength={max}
          className="bg-white border-[#E8E8ED] text-[#1D1D1F] placeholder:text-[#86868B] focus-visible:border-[#B8860B]/50 focus-visible:ring-[#B8860B]/20 resize-none"
        />
        <div className="flex items-center justify-between text-xs text-[#86868B]">
          <span>{t.robotTask.counter.replace("{count}", String(data.robotTask.length))}</span>
        </div>

        <div className="rounded-xl border border-[#B8860B]/20 bg-[#B8860B]/5 p-4 flex items-start gap-3">
          <Lightbulb className="size-5 text-[#B8860B] shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-[#1D1D1F] mb-1">
              {segmentJapanese(t.robotTask.sidebarTitle)}
            </p>
            <p className="text-xs text-[#6E6E73] leading-relaxed">
              {segmentJapanese(t.robotTask.sidebarBody)}
            </p>
          </div>
        </div>
      </div>
    </V2StepLayout>
  );
}
