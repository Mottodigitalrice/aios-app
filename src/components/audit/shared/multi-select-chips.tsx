"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

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

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={selected.includes(option)}
            onClick={() => toggleOption(option)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-all duration-200",
              selected.includes(option)
                ? "border-[#B8860B]/30 bg-[#B8860B]/8 text-[#B8860B]"
                : "border-[#E8E8ED] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#B8860B]/30 hover:text-[#6E6E73]"
            )}
          >
            {renderIcon && (
              <span className="shrink-0">{renderIcon(option)}</span>
            )}
            {option}
          </button>
        ))}
        {allowOther && (
          <button
            type="button"
            aria-pressed={showOtherInput}
            onClick={() => toggleOption("Other")}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-all duration-200",
              showOtherInput
                ? "border-[#B8860B]/30 bg-[#B8860B]/8 text-[#B8860B]"
                : "border-[#E8E8ED] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#B8860B]/30 hover:text-[#6E6E73]"
            )}
          >
            + {otherLabel}
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
