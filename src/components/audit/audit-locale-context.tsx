"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { AuditDictionary } from "@/lib/i18n/get-audit-dictionary";
import auditEn from "@/lib/i18n/dictionaries/audit-en";
import auditJa from "@/lib/i18n/dictionaries/audit-ja";

interface AuditLocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: AuditDictionary;
}

const AuditLocaleContext = createContext<AuditLocaleContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const params = new URLSearchParams(window.location.search);
  const urlLocale = params.get("lang");
  if (urlLocale === "ja" || urlLocale === "en") return urlLocale;
  const stored = localStorage.getItem("aios-audit-locale");
  if (stored === "ja" || stored === "en") return stored;
  return "en";
}

export function AuditLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  // Persist locale choice
  useEffect(() => {
    localStorage.setItem("aios-audit-locale", locale);
  }, [locale]);

  const t = locale === "ja" ? auditJa : auditEn;

  return (
    <AuditLocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </AuditLocaleContext.Provider>
  );
}

export function useAuditLocale() {
  const ctx = useContext(AuditLocaleContext);
  if (!ctx) {
    throw new Error("useAuditLocale must be used within AuditLocaleProvider");
  }
  return ctx;
}
