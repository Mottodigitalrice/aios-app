"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import en from "@/lib/i18n/dictionaries/en";
import ja from "@/lib/i18n/dictionaries/ja";

const dictionaries = { en, ja } as const;

interface MobileNavProps {
  locale?: "en" | "ja";
}

export function MobileNav({ locale = "en" }: MobileNavProps) {
  const [open, setOpen] = useState(false);
  const t = dictionaries[locale].landing;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden text-[#6E6E73] hover:text-[#1D1D1F] min-h-[44px] min-w-[44px]">
          <Menu className="size-5" />
          <span className="sr-only">{locale === "ja" ? "メニュー" : "Menu"}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-white border-[#E8E8ED] w-72">
        <SheetTitle className="sr-only">{locale === "ja" ? "ナビゲーション" : "Navigation"}</SheetTitle>
        <div className="flex flex-col gap-8 pt-8">
          <Link href="/" className="text-lg font-bold text-[#1D1D1F]" onClick={() => setOpen(false)}>
            MOTTO Digital
          </Link>
          <nav className="flex flex-col gap-4">
            <Link
              href="#proof"
              className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8860B] rounded-sm min-h-[44px] flex items-center"
              onClick={() => setOpen(false)}
            >
              {t.nav.proof}
            </Link>
            <Link
              href="#program"
              className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8860B] rounded-sm min-h-[44px] flex items-center"
              onClick={() => setOpen(false)}
            >
              {t.nav.program}
            </Link>
            <Link
              href="#pricing"
              className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8860B] rounded-sm min-h-[44px] flex items-center"
              onClick={() => setOpen(false)}
            >
              {t.nav.pricing}
            </Link>
            <Link
              href="/presentation"
              className="text-[#6E6E73] hover:text-[#1D1D1F] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8860B] rounded-sm min-h-[44px] flex items-center"
              onClick={() => setOpen(false)}
            >
              {t.footer.presentationLink}
            </Link>
          </nav>
          <Link href="/signup" onClick={() => setOpen(false)}>
            <Button className="w-full bg-[#1D1D1F] hover:bg-[#2D2D2F] text-white rounded-full">
              {t.nav.cta}
            </Button>
          </Link>
          <Link href="/audit" onClick={() => setOpen(false)}>
            <Button variant="outline" className="w-full border-[#B8860B]/40 text-[#B8860B] hover:bg-[#B8860B]/10 rounded-full">
              {t.hero.ctaSecondary}
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
