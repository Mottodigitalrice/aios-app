"use client";

import { Clock } from "lucide-react";

export type PresenterNote = {
  timing: string;
  en: string[];
  jp: string[];
};

/**
 * Presenter notes panel — togglable via the `showNotes` prop (deck-level
 * keyboard handler in `useDeckNavigation` flips it with the `N` key).
 *
 * The container stops click propagation so taps inside the panel don't
 * advance the deck.
 *
 * Extracted from the AIOS ks-brand deck.
 */
export function PresenterNotes({
  showNotes,
  setShowNotes,
  currentNotes,
}: {
  showNotes: boolean;
  setShowNotes: (v: boolean) => void;
  currentNotes: PresenterNote | undefined;
}) {
  return (
    <div className={`pres-notes-panel ${showNotes ? "pres-notes-visible" : "pres-notes-hidden"}`} onClick={(e) => e.stopPropagation()}>
      <div className="mx-auto max-w-4xl px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h3 className="text-sm font-semibold text-[#6E6E73] uppercase tracking-wider">
              Presenter Notes
            </h3>
            {currentNotes && (
              <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#B8860B]/8 border border-[#B8860B]/20">
                <Clock className="size-3 text-[#B8860B]" />
                <span className="text-xs text-[#B8860B] font-medium">{currentNotes.timing}</span>
              </div>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); setShowNotes(false); }}
            className="text-xs text-[#86868B] hover:text-[#1D1D1F] px-2 py-1 rounded border border-[#E8E8ED] hover:border-[#6E6E73] transition-colors"
          >
            Close (N)
          </button>
        </div>
        {currentNotes && (
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <p className="text-[10px] text-[#86868B] uppercase tracking-wider mb-2 font-semibold">English</p>
              <ul className="space-y-1.5">
                {currentNotes.en.map((note, i) => (
                  <li key={i} className="text-sm text-[#6E6E73] leading-relaxed flex gap-2">
                    <span className="text-[#B8860B]/50 shrink-0">&bull;</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-[10px] text-[#86868B] uppercase tracking-wider mb-2 font-semibold">日本語</p>
              <ul className="space-y-1.5">
                {currentNotes.jp.map((note, i) => (
                  <li key={i} className="text-sm text-[#6E6E73] leading-relaxed flex gap-2">
                    <span className="text-[#B8860B]/50 shrink-0">&bull;</span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
