import type { Locale } from "./config";

const dictionaries = {
  en: () => import("./dictionaries/signup-en").then((m) => m.default),
  ja: () => import("./dictionaries/signup-ja").then((m) => m.default),
};

export async function getSignupDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type SignupDictionary = Awaited<ReturnType<typeof getSignupDictionary>>;
