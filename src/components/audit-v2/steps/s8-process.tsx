"use client";

import { useMemo } from "react";
import { V2StepLayout } from "../shared/v2-step-layout";
import { useAuditV2Locale, pickLabel } from "../audit-v2-locale-context";
import {
  FREQUENCIES,
  INDUSTRIES,
  PROCESSES,
  type FrequencyId,
  type ProcessId,
} from "@/lib/audit-v2/constants";
import { computeRoi, formatYen } from "@/lib/audit-v2/roi-calculator";
import { cn } from "@/lib/utils";
import { TrendingUp, Sparkles } from "lucide-react";
import { segmentJapanese } from "@/lib/budoux-transform";
import type { AuditV2Data } from "@/hooks/use-audit-form-v2";

interface Props {
  data: AuditV2Data;
  update: (patch: Partial<AuditV2Data>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

export function S8Process({ data, update, onNext, onBack, isLoading, error }: Props) {
  const { t, locale } = useAuditV2Locale();

  const roi = useMemo(
    () => computeRoi(data.processGrid, data.company.industry || ""),
    [data.processGrid, data.company.industry]
  );

  const setFreq = (proc: ProcessId, freq: FrequencyId) => {
    update({ processGrid: { ...data.processGrid, [proc]: freq } });
  };

  const industryLabel = useMemo(() => {
    const ind = INDUSTRIES.find((i) => i.id === data.company.industry);
    return ind ? pickLabel(ind, locale) : "—";
  }, [data.company.industry, locale]);

  const hasAny = Object.values(data.processGrid).some((v) => v && v !== "never");

  return (
    <V2StepLayout
      question={t.process.question}
      description={t.process.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue
      error={error}
    >
      <div className="rounded-xl border border-[#B8860B]/30 bg-gradient-to-br from-[#B8860B]/5 to-transparent p-5 mb-6">
        {hasAny ? (
          <div className="flex items-start gap-3">
            <TrendingUp className="size-5 text-[#B8860B] mt-0.5 shrink-0" />
            <div className="space-y-1">
              <p className="text-base font-semibold text-[#1D1D1F]">
                {segmentJapanese(
                  t.process.summaryHours.replace("{hours}", roi.hoursPerWeek.toFixed(1))
                )}
              </p>
              <p className="text-sm text-[#6E6E73]">
                {segmentJapanese(
                  t.process.summaryYen
                    .replace("{yen}", formatYen(roi.annualSavings))
                    .replace("{industry}", industryLabel)
                )}
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-3">
            <Sparkles className="size-5 text-[#B8860B] mt-0.5 shrink-0" />
            <p className="text-sm text-[#6E6E73]">
              {segmentJapanese(t.process.summaryEmpty)}
            </p>
          </div>
        )}
      </div>

      <div className="overflow-x-auto -mx-2 px-2">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="text-left py-2 pr-2 font-semibold text-[11px] uppercase tracking-[0.1em] text-[#86868B]">
                {t.process.headers.process}
              </th>
              {FREQUENCIES.map((f) => (
                <th
                  key={f.id}
                  className="text-center py-2 px-1 font-semibold text-[10px] uppercase tracking-[0.08em] text-[#86868B] min-w-[64px]"
                >
                  {t.process.headers[f.id]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {PROCESSES.map((proc) => {
              const current = data.processGrid[proc.id];
              return (
                <tr
                  key={proc.id}
                  className="border-t border-[#E8E8ED] hover:bg-[#F5F5F7]/40 transition-colors"
                >
                  <td className="py-3 pr-2 text-[#1D1D1F] font-medium align-middle">
                    {segmentJapanese(pickLabel(proc, locale))}
                  </td>
                  {FREQUENCIES.map((f) => {
                    const selected = current === f.id;
                    return (
                      <td key={f.id} className="text-center py-3 px-1">
                        <button
                          type="button"
                          aria-pressed={selected}
                          aria-label={`${pickLabel(proc, locale)} — ${t.process.headers[f.id]}`}
                          onClick={() => setFreq(proc.id, f.id)}
                          className={cn(
                            "size-6 rounded-full border-2 transition-all duration-150",
                            selected
                              ? "border-[#B8860B] bg-[#B8860B] shadow-[0_0_0_4px_rgba(184,134,11,0.15)]"
                              : "border-[#E8E8ED] bg-white hover:border-[#B8860B]/50"
                          )}
                        />
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </V2StepLayout>
  );
}
