"use client";

import { cn } from "@/lib/utils";

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
        "flex items-center gap-3 w-full rounded-xl border p-4 text-left text-sm font-medium transition-all duration-200",
        selected
          ? "border-[#B8860B]/30 bg-[#B8860B]/8 text-[#B8860B] ring-1 ring-[#B8860B]/20"
          : "border-[#E8E8ED] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#B8860B]/30 hover:bg-[#F5F5F7]"
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
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
