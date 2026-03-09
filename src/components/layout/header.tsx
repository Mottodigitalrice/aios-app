"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

export function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b px-6">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Admin</h2>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/" target="_blank">
          <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
            <ExternalLink className="h-3.5 w-3.5" />
            View Site
          </Button>
        </Link>
        <UserButton />
      </div>
    </header>
  );
}
