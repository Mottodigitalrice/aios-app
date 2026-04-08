"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { segmentJapanese } from "@/lib/budoux-transform";

interface MultiSelectChipsProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
  allowOther?: boolean;
  otherValue?: string;
  onOtherChange?: (value: string) => void;
  renderIcon?: (option: string) => React.ReactNode;
  otherLabel?: string;
  otherPlaceholder?: string;
}

export function MultiSelectChips({
  options,
  selected,
  onChange,
  allowOther = true,
  otherValue = "",
  onOtherChange,
  renderIcon,
  otherLabel = "Other",
  otherPlaceholder = "Please specify...",
}: MultiSelectChipsProps) {
  const [showOtherInput, setShowOtherInput] = useState(
    selected.includes("Other")
  );

  const toggleOption = (option: string) => {
    if (option === "Other") {
      setShowOtherInput(!showOtherInput);
      if (showOtherInput) {
        onChange(selected.filter((s) => s !== "Other"));
        onOtherChange?.("");
      } else {
        onChange([...selected, "Other"]);
      }
      return;
    }

    if (selected.includes(option)) {
      onChange(selected.filter((s) => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };

  const selectedCount =
    selected.filter((s) => s !== "Other").length + (showOtherInput ? 1 : 0);

  return (
    <div className="space-y-3">
      {selectedCount > 0 && (
        <p className="text-[11px] font-medium uppercase tracking-[0.1em] text-[#B8860B]">
          {selectedCount} selected
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={selected.includes(option)}
            onClick={() => toggleOption(option)}
            className={cn(
              "inline-flex items-center gap-2 min-h-[40px] rounded-lg border px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-[1px]",
              selected.includes(option)
                ? "border-[#B8860B] bg-[#1D1D1F] text-white shadow-[0_2px_8px_rgba(184,134,11,0.18)] border-l-[3px] border-l-[#B8860B]"
                : "border-[#E8E8ED] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#B8860B]/40 hover:bg-white hover:text-[#1D1D1F]"
            )}
          >
            {renderIcon && (
              <span className="shrink-0">{renderIcon(option)}</span>
            )}
            {segmentJapanese(option)}
          </button>
        ))}
        {allowOther && (
          <button
            type="button"
            aria-pressed={showOtherInput}
            onClick={() => toggleOption("Other")}
            className={cn(
              "inline-flex items-center gap-2 min-h-[40px] rounded-lg border px-3.5 py-2 text-sm font-medium transition-all duration-200 hover:-translate-y-[1px]",
              showOtherInput
                ? "border-[#B8860B] bg-[#1D1D1F] text-white shadow-[0_2px_8px_rgba(184,134,11,0.18)] border-l-[3px] border-l-[#B8860B]"
                : "border-[#E8E8ED] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#B8860B]/40 hover:bg-white hover:text-[#1D1D1F]"
            )}
          >
            + {segmentJapanese(otherLabel)}
          </button>
        )}
      </div>
      {showOtherInput && (
        <Input
          value={otherValue}
          onChange={(e) => onOtherChange?.(e.target.value)}
          placeholder={otherPlaceholder}
          className="bg-white border-[#E8E8ED] text-[#1D1D1F] placeholder:text-[#86868B] focus-visible:border-[#B8860B]/50 focus-visible:ring-[#B8860B]/20"
          autoFocus
        />
      )}
    </div>
  );
}
