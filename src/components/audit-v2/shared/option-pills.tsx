"use client";

import { cn } from "@/lib/utils";
import { segmentJapanese } from "@/lib/budoux-transform";
import { useAuditV2Locale, pickLabel } from "../audit-v2-locale-context";
import type { Option } from "@/lib/audit-v2/constants";

interface PillsProps {
  options: Option[];
  value: string;
  onChange: (id: string) => void;
}

export function OptionPills({ options, value, onChange }: PillsProps) {
  const { locale } = useAuditV2Locale();
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => {
        const selected = value === o.id;
        return (
          <button
            key={o.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(o.id)}
            className={cn(
              "inline-flex items-center gap-2 min-h-[40px] rounded-lg border px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-[1px]",
              selected
                ? "border-[#B8860B] bg-[#1D1D1F] text-white shadow-[0_2px_8px_rgba(184,134,11,0.18)] border-l-[3px] border-l-[#B8860B]"
                : "border-[#E8E8ED] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#B8860B]/40 hover:bg-white hover:text-[#1D1D1F]"
            )}
          >
            {o.emoji && <span aria-hidden>{o.emoji}</span>}
            {segmentJapanese(pickLabel(o, locale))}
          </button>
        );
      })}
    </div>
  );
}
