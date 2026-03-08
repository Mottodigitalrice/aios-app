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
          ? "border-indigo-500/50 bg-indigo-500/10 text-indigo-300 ring-1 ring-indigo-500/30"
          : "border-zinc-800/50 bg-zinc-900/50 text-zinc-300 hover:border-zinc-700 hover:bg-zinc-800/50"
      )}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{label}</span>
      {selected && (
        <span className="ml-auto shrink-0 size-5 rounded-full bg-indigo-500 flex items-center justify-center">
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
