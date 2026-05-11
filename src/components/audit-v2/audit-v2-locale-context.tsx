"use client";

import { createContext, useContext, useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { AuditV2Dictionary } from "@/lib/i18n/dictionaries/audit-v2-en";
import auditV2En from "@/lib/i18n/dictionaries/audit-v2-en";
import auditV2Ja from "@/lib/i18n/dictionaries/audit-v2-ja";

interface Ctx {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: AuditV2Dictionary;
}

const AuditV2LocaleContext = createContext<Ctx | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "ja";
  const params = new URLSearchParams(window.location.search);
  const url = params.get("lang");
  if (url === "ja" || url === "en") return url;
  const stored = localStorage.getItem("aios-audit-v2-locale");
  if (stored === "ja" || stored === "en") return stored;
  return "ja";
}

export function AuditV2LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  useEffect(() => {
    localStorage.setItem("aios-audit-v2-locale", locale);
  }, [locale]);

  const t = (locale === "ja" ? auditV2Ja : auditV2En) as AuditV2Dictionary;

  return (
    <AuditV2LocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </AuditV2LocaleContext.Provider>
  );
}

export function useAuditV2Locale() {
  const ctx = useContext(AuditV2LocaleContext);
  if (!ctx) throw new Error("useAuditV2Locale must be used within AuditV2LocaleProvider");
  return ctx;
}

/**
 * Resolve the right-language label for an option object that has both `ja` and `en`.
 */
export function pickLabel<T extends { ja: string; en: string }>(opt: T, locale: Locale): string {
  return locale === "ja" ? opt.ja : opt.en;
}
