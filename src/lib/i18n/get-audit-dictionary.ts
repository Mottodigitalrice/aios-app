import type { Locale } from "./config";
import type auditEnDict from "./dictionaries/audit-en";

const dictionaries = {
  en: () => import("./dictionaries/audit-en").then((m) => m.default),
  ja: () => import("./dictionaries/audit-ja").then((m) => m.default),
};

export async function getAuditDictionary(locale: Locale) {
  return dictionaries[locale]() as Promise<typeof auditEnDict>;
}

// EN is the canonical type
export type AuditDictionary = typeof auditEnDict;
