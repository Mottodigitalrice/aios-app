"use client";

import { V2StepLayout } from "../shared/v2-step-layout";
import { useAuditV2Locale } from "../audit-v2-locale-context";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { segmentJapanese } from "@/lib/budoux-transform";
import type { AuditV2Data } from "@/hooks/use-audit-form-v2";

interface Props {
  data: AuditV2Data;
  update: (patch: Partial<AuditV2Data>) => void;
  updateContact: (patch: Partial<AuditV2Data["contact"]>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
  isLast: boolean;
}

export function S11Contact({
  data,
  updateContact,
  onNext,
  onBack,
  isLoading,
  error,
}: Props) {
  const { t } = useAuditV2Locale();
  const c = data.contact;
  const ready =
    !!c.name &&
    !!c.company &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email);

  return (
    <V2StepLayout
      question={t.contact.question}
      description={t.contact.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue={ready}
      error={error}
      isLast
    >
      <div className="space-y-4">
        <Field label={t.contact.name}>
          <Input
            value={c.name}
            onChange={(e) => updateContact({ name: e.target.value })}
            autoComplete="name"
            required
            className="bg-white border-[#E8E8ED] focus-visible:border-[#B8860B]/50 focus-visible:ring-[#B8860B]/20"
          />
        </Field>
        <Field label={t.contact.email}>
          <Input
            type="email"
            inputMode="email"
            value={c.email}
            onChange={(e) => updateContact({ email: e.target.value })}
            autoComplete="email"
            required
            className="bg-white border-[#E8E8ED] focus-visible:border-[#B8860B]/50 focus-visible:ring-[#B8860B]/20"
          />
        </Field>
        <Field label={t.contact.company}>
          <Input
            value={c.company}
            onChange={(e) => updateContact({ company: e.target.value })}
            autoComplete="organization"
            required
            className="bg-white border-[#E8E8ED] focus-visible:border-[#B8860B]/50 focus-visible:ring-[#B8860B]/20"
          />
        </Field>
        <Field label={t.contact.phone}>
          <Input
            type="tel"
            inputMode="tel"
            value={c.phone}
            onChange={(e) => updateContact({ phone: e.target.value })}
            autoComplete="tel"
            className="bg-white border-[#E8E8ED] focus-visible:border-[#B8860B]/50 focus-visible:ring-[#B8860B]/20"
          />
        </Field>
      </div>
    </V2StepLayout>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8860B] mb-2 block">
        {segmentJapanese(label)}
      </Label>
      {children}
    </div>
  );
}
