"use client";

interface LanguageToggleProps {
  locale: "en" | "ja";
  onToggle: (locale: "en" | "ja") => void;
}

export function LanguageToggle({ locale, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={() => onToggle(locale === "en" ? "ja" : "en")}
      className="flex items-center gap-1.5 rounded-full border border-zinc-700/50 bg-zinc-800/50 px-2.5 py-1 text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:border-zinc-600 transition-colors"
      aria-label={locale === "en" ? "Switch to Japanese" : "Switch to English"}
    >
      <span className={locale === "en" ? "text-zinc-200" : "text-zinc-500"}>EN</span>
      <span className="text-zinc-600">/</span>
      <span className={locale === "ja" ? "text-zinc-200" : "text-zinc-500"}>JP</span>
    </button>
  );
}
