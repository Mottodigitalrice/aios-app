"use client";

interface LanguageToggleProps {
  locale: "en" | "ja";
  onToggle: (locale: "en" | "ja") => void;
}

export function LanguageToggle({ locale, onToggle }: LanguageToggleProps) {
  return (
    <button
      onClick={() => onToggle(locale === "en" ? "ja" : "en")}
      className="flex items-center gap-1.5 rounded-full border border-[#D1D1D6] bg-white/80 px-3 py-2 min-h-[44px] min-w-[44px] text-xs font-medium text-zinc-500 hover:text-[#1D1D1F] hover:border-[#86868B] cursor-pointer transition-colors"
      aria-label={locale === "en" ? "Switch to Japanese" : "英語に切り替え"}
    >
      <span className={locale === "en" ? "text-[#1D1D1F]" : "text-[#86868B]"}>EN</span>
      <span className="text-[#D1D1D6]">/</span>
      <span className={locale === "ja" ? "text-[#1D1D1F]" : "text-[#86868B]"}>JP</span>
    </button>
  );
}
