import type { Locale } from "./config";

const dictionaries = {
  en: () => import("./dictionaries/audit-en").then((m) => m.default),
  ja: () => import("./dictionaries/audit-ja").then((m) => m.default),
};

export async function getAuditDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export type AuditDictionary = Awaited<ReturnType<typeof getAuditDictionary>>;
