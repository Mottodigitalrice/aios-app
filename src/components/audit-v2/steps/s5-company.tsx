"use client";

import { V2StepLayout } from "../shared/v2-step-layout";
import { OptionPills } from "../shared/option-pills";
import { useAuditV2Locale, pickLabel } from "../audit-v2-locale-context";
import {
  INDUSTRIES,
  TEAM_SIZES,
  REVENUE_BANDS,
  ROLES,
  YEARS_IN_BUSINESS,
  LOCATIONS,
  type IndustryId,
} from "@/lib/audit-v2/constants";
import { INDUSTRY_ICONS } from "../shared/icons";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { segmentJapanese } from "@/lib/budoux-transform";
import type { AuditV2Data } from "@/hooks/use-audit-form-v2";

interface Props {
  data: AuditV2Data;
  update: (patch: Partial<AuditV2Data>) => void;
  updateCompany: (patch: Partial<AuditV2Data["company"]>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

export function S5Company({ data, updateCompany, onNext, onBack, isLoading, error }: Props) {
  const { t, locale } = useAuditV2Locale();
  const c = data.company;

  const ready = !!c.industry && !!c.teamSize && !!c.role;

  return (
    <V2StepLayout
      question={t.company.question}
      description={t.company.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue={ready}
      error={error}
    >
      <div className="space-y-8">
        <Section label={t.company.industry}>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {INDUSTRIES.map((ind) => {
              const selected = c.industry === ind.id;
              const Icon = INDUSTRY_ICONS[ind.id];
              return (
                <button
                  key={ind.id}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => updateCompany({ industry: ind.id as IndustryId })}
                  className={cn(
                    "relative flex flex-col items-center gap-1.5 rounded-lg border p-3 transition-all duration-200 hover:-translate-y-[1px] min-h-[88px]",
                    selected
                      ? "border-[#B8860B] bg-gradient-to-br from-[#B8860B]/10 to-transparent ring-2 ring-[#B8860B]/25"
                      : "border-[#E8E8ED] bg-[#F5F5F7] hover:border-[#B8860B]/40 hover:bg-white"
                  )}
                >
                  {selected && (
                    <span className="absolute top-1 right-1 size-4 rounded-full bg-[#B8860B] text-white grid place-items-center">
                      <Check className="size-2.5" strokeWidth={3} />
                    </span>
                  )}
                  <Icon className="size-6 text-[#B8860B]" aria-hidden />
                  <span className="text-[11px] text-center text-[#1D1D1F] font-medium leading-tight">
                    {segmentJapanese(pickLabel(ind, locale))}
                  </span>
                </button>
              );
            })}
          </div>
        </Section>

        <Section label={t.company.teamSize}>
          <OptionPills
            options={TEAM_SIZES}
            value={c.teamSize}
            onChange={(id) => updateCompany({ teamSize: id })}
          />
        </Section>

        <Section label={t.company.revenue}>
          <OptionPills
            options={REVENUE_BANDS}
            value={c.revenue}
            onChange={(id) => updateCompany({ revenue: id })}
          />
        </Section>

        <Section label={t.company.role}>
          <OptionPills
            options={ROLES}
            value={c.role}
            onChange={(id) => updateCompany({ role: id })}
          />
        </Section>

        <Section label={t.company.yearsInBusiness}>
          <OptionPills
            options={YEARS_IN_BUSINESS}
            value={c.yearsInBusiness}
            onChange={(id) => updateCompany({ yearsInBusiness: id })}
          />
        </Section>

        <Section label={t.company.location}>
          <OptionPills
            options={LOCATIONS}
            value={c.location}
            onChange={(id) => updateCompany({ location: id })}
          />
        </Section>

        <Section label={t.company.website}>
          <Input
            type="url"
            inputMode="url"
            placeholder={t.company.websitePlaceholder}
            value={c.website}
            onChange={(e) => updateCompany({ website: e.target.value })}
            className="bg-white border-[#E8E8ED] text-[#1D1D1F] placeholder:text-[#86868B] focus-visible:border-[#B8860B]/50 focus-visible:ring-[#B8860B]/20"
          />
        </Section>
      </div>
    </V2StepLayout>
  );
}

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8860B] mb-3">
        {segmentJapanese(label)}
      </h3>
      {children}
    </div>
  );
}
