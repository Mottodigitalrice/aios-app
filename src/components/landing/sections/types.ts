import type en from "@/lib/i18n/dictionaries/en";

// EN is the canonical type — JA matches at runtime
export type LandingT = (typeof en)["landing"];
export type Locale = "en" | "ja";

export interface SectionProps {
  t: LandingT;
  locale: Locale;
}
