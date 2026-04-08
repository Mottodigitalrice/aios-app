"use client";

import { cn } from "@/lib/utils";
import { segmentJapanese } from "@/lib/budoux-transform";

interface SelectCardProps {
  label: string;
  selected: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export function SelectCard({ label, selected, onClick, icon }: SelectCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group flex items-center gap-3 w-full min-h-[52px] rounded-xl border p-4 text-left text-sm font-medium transition-all duration-200 hover:-translate-y-[1px]",
        selected
          ? "border-[#B8860B] bg-gradient-to-br from-[#B8860B]/10 to-transparent text-[#1D1D1F] ring-2 ring-[#B8860B]/25 shadow-[0_2px_8px_rgba(184,134,11,0.08)]"
          : "border-[#E8E8ED] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#B8860B]/40 hover:bg-white hover:shadow-sm"
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="flex-1">{segmentJapanese(label)}</span>
      {selected && (
        <span className="ml-auto shrink-0 size-5 rounded-full bg-[#B8860B] flex items-center justify-center">
          <svg
            className="size-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={3}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12.75l6 6 9-13.5"
            />
          </svg>
        </span>
      )}
    </button>
  );
}
