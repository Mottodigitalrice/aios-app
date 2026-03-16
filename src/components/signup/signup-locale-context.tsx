"use client";

import { createContext, useContext, useState, useEffect } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { SignupDictionary } from "@/lib/i18n/get-signup-dictionary";
import signupEn from "@/lib/i18n/dictionaries/signup-en";
import signupJa from "@/lib/i18n/dictionaries/signup-ja";

interface SignupLocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: SignupDictionary;
}

const SignupLocaleContext = createContext<SignupLocaleContextValue | null>(null);

function getInitialLocale(): Locale {
  if (typeof window === "undefined") return "en";
  const params = new URLSearchParams(window.location.search);
  const urlLocale = params.get("lang");
  if (urlLocale === "ja" || urlLocale === "en") return urlLocale;
  const stored = localStorage.getItem("aios-signup-locale");
  if (stored === "ja" || stored === "en") return stored;
  return "en";
}

export function SignupLocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  // Persist locale choice
  useEffect(() => {
    localStorage.setItem("aios-signup-locale", locale);
  }, [locale]);

  const t = (locale === "ja" ? signupJa : signupEn) as SignupDictionary;

  return (
    <SignupLocaleContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </SignupLocaleContext.Provider>
  );
}

export function useSignupLocale() {
  const ctx = useContext(SignupLocaleContext);
  if (!ctx) {
    throw new Error("useSignupLocale must be used within SignupLocaleProvider");
  }
  return ctx;
}
