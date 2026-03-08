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
}

export function MultiSelectChips({
  options,
  selected,
  onChange,
  allowOther = true,
  otherValue = "",
  onOtherChange,
  renderIcon,
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
            onClick={() => toggleOption(option)}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-all duration-200",
              selected.includes(option)
                ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300"
                : "border-zinc-800/50 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
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
            onClick={() => toggleOption("Other")}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-all duration-200",
              showOtherInput
                ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300"
                : "border-zinc-800/50 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
            )}
          >
            + Other
          </button>
        )}
      </div>
      {showOtherInput && (
        <Input
          value={otherValue}
          onChange={(e) => onOtherChange?.(e.target.value)}
          placeholder="Please specify..."
          className="bg-zinc-950/50 border-zinc-700/50 text-zinc-100 placeholder:text-zinc-600 focus-visible:border-indigo-500/50 focus-visible:ring-indigo-500/20"
          autoFocus
        />
      )}
    </div>
  );
}
