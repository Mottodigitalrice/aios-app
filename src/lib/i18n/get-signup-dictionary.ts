import type { Locale } from "./config";
import type signupEnDict from "./dictionaries/signup-en";

const dictionaries = {
  en: () => import("./dictionaries/signup-en").then((m) => m.default),
  ja: () => import("./dictionaries/signup-ja").then((m) => m.default),
};

export async function getSignupDictionary(locale: Locale) {
  return dictionaries[locale]() as Promise<typeof signupEnDict>;
}

// EN is the canonical type
export type SignupDictionary = typeof signupEnDict;
