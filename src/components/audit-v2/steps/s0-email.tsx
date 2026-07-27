"use client";

import { V2StepLayout } from "../shared/v2-step-layout";
import { useAuditV2Locale } from "../audit-v2-locale-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { segmentJapanese } from "@/lib/budoux-transform";
import type { AuditV2Data } from "@/hooks/use-audit-form-v2";

interface Props {
  data: AuditV2Data;
  updateContact: (patch: Partial<AuditV2Data["contact"]>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

export function S0Email({ data, updateContact, onNext, onBack, isLoading, error }: Props) {
  const { t } = useAuditV2Locale();
  const email = data.contact.email;
  const ready = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <V2StepLayout
      question={t.email.question}
      description={t.email.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue={ready}
      error={error}
    >
      <div className="space-y-2">
        <Label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8860B] block">
          {segmentJapanese(t.email.label)}
        </Label>
        <Input
          type="email"
          inputMode="email"
          autoComplete="email"
          autoFocus
          value={email}
          onChange={(e) => updateContact({ email: e.target.value })}
          placeholder={t.email.placeholder}
          required
          className="bg-white border-[#E8E8ED] text-base h-12 focus-visible:border-[#B8860B]/50 focus-visible:ring-[#B8860B]/20"
        />
        <p className="text-xs text-[#86868B] mt-2 leading-relaxed">
          {segmentJapanese(t.email.hint)}
        </p>
      </div>
    </V2StepLayout>
  );
}
