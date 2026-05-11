"use client";

import { V2StepLayout } from "../shared/v2-step-layout";
import { useAuditV2Locale } from "../audit-v2-locale-context";
import { cn } from "@/lib/utils";
import { Clock, Zap, Check } from "lucide-react";
import { segmentJapanese } from "@/lib/budoux-transform";
import type { AuditV2Data } from "@/hooks/use-audit-form-v2";
import type { Tier } from "@/lib/audit-v2/constants";

interface Props {
  data: AuditV2Data;
  update: (patch: Partial<AuditV2Data>) => void;
  onNext: () => void;
  isLoading: boolean;
  error: string | null;
}

export function S1Tier({ data, update, onNext, isLoading, error }: Props) {
  const { t } = useAuditV2Locale();

  const cards: { id: Tier; icon: React.ReactNode; copy: typeof t.tier.quick }[] = [
    { id: "quick", icon: <Zap className="size-5" />, copy: t.tier.quick },
    { id: "full", icon: <Clock className="size-5" />, copy: t.tier.full },
  ];

  return (
    <V2StepLayout
      question={t.tier.question}
      description={t.tier.description}
      onNext={onNext}
      isFirst
      isLoading={isLoading}
      canContinue={!!data.tier}
      error={error}
    >
      <div className="grid sm:grid-cols-2 gap-4">
        {cards.map((c) => {
          const selected = data.tier === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => update({ tier: c.id })}
              className={cn(
                "relative text-left rounded-2xl border p-6 transition-all duration-200 hover:-translate-y-[2px]",
                selected
                  ? "border-[#B8860B] bg-gradient-to-br from-[#B8860B]/10 to-transparent ring-2 ring-[#B8860B]/30 shadow-[0_4px_20px_rgba(184,134,11,0.12)]"
                  : "border-[#E8E8ED] bg-white hover:border-[#B8860B]/40 hover:shadow-md"
              )}
            >
              {selected && (
                <span className="absolute top-3 right-3 size-6 rounded-full bg-[#B8860B] text-white grid place-items-center">
                  <Check className="size-3.5" strokeWidth={3} />
                </span>
              )}
              <div className="flex items-center gap-2 text-[#B8860B] mb-3">
                {c.icon}
                <span className="text-[11px] font-semibold uppercase tracking-[0.12em]">
                  {c.copy.eyebrow}
                </span>
              </div>
              <h3 className="text-xl font-semibold text-[#1D1D1F] mb-2">
                {segmentJapanese(c.copy.title)}
              </h3>
              <p className="text-sm text-[#6E6E73] leading-relaxed">
                {segmentJapanese(c.copy.blurb)}
              </p>
            </button>
          );
        })}
      </div>
    </V2StepLayout>
  );
}
