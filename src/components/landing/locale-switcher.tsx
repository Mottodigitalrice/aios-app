"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";

export function LocaleSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const otherLocale: Locale = locale === "en" ? "ja" : "en";
  const label = locale === "en" ? "JP" : "EN";

  // Replace /en/... with /ja/... or vice versa
  const switchedPath = pathname.replace(`/${locale}`, `/${otherLocale}`);

  return (
    <Link
      href={switchedPath}
      className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors font-medium"
    >
      {label}
    </Link>
  );
}
