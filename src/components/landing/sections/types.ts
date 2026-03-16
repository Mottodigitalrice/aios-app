import type en from "@/lib/i18n/dictionaries/en";
import type ja from "@/lib/i18n/dictionaries/ja";

export type LandingT = (typeof en)["landing"] | (typeof ja)["landing"];
export type Locale = "en" | "ja";

export interface SectionProps {
  t: LandingT;
  locale: Locale;
}
