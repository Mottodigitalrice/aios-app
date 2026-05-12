export interface ReferrerEntry {
  displayName: string;
  partner?: string;
}

export const REFERRERS: Record<string, ReferrerEntry> = {
  "ks-brand": {
    displayName: "KS BRAND",
    partner: "KS Media Company / Kishi-san",
  },
};

export const REFERRAL_EVENTS_PROJECT_ID = "35ee0cb5-63d9-8170-9345-ec835c07acd6";

export function isKnownReferrer(slug: string | null | undefined): slug is string {
  return !!slug && Object.prototype.hasOwnProperty.call(REFERRERS, slug);
}

export function getReferrerDisplayName(slug: string): string {
  return REFERRERS[slug]?.displayName ?? slug;
}

const REFERRER_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export const REFERRER_STORAGE = {
  slugKey: "aios.referrer",
  expiresKey: "aios.referrer.expires",
  sessionFiredKey: "aios.referrer.visit-fired",
  ttlMs: REFERRER_TTL_MS,
};
