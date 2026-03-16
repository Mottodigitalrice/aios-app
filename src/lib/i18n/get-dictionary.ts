import type { Locale } from "./config";
import type enDict from "./dictionaries/en";

const dictionaries = {
  en: () => import("./dictionaries/en").then((m) => m.default),
  ja: () => import("./dictionaries/ja").then((m) => m.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]() as Promise<typeof enDict>;
}

// EN is the canonical type — JA must structurally match
export type Dictionary = typeof enDict;
