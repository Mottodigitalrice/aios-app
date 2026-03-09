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
import { Menu, Layers } from "lucide-react";

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="sm:hidden text-zinc-400 hover:text-zinc-100">
          <Menu className="size-5" />
          <span className="sr-only">Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-zinc-950 border-zinc-800 w-72">
        <SheetTitle className="sr-only">Navigation</SheetTitle>
        <div className="flex flex-col gap-8 pt-8">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold" onClick={() => setOpen(false)}>
            <Layers className="size-5 text-indigo-400" />
            <span>MOTTO Digital</span>
          </Link>
          <nav className="flex flex-col gap-4">
            <Link
              href="#proof"
              className="text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded-sm"
              onClick={() => setOpen(false)}
            >
              Case Study
            </Link>
            <Link
              href="#program"
              className="text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded-sm"
              onClick={() => setOpen(false)}
            >
              Program
            </Link>
            <Link
              href="#pricing"
              className="text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded-sm"
              onClick={() => setOpen(false)}
            >
              Pricing
            </Link>
          </nav>
          <Link href="/audit" onClick={() => setOpen(false)}>
            <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
              Free Audit
            </Button>
          </Link>
        </div>
      </SheetContent>
    </Sheet>
  );
}
