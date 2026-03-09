"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";

const labels = {
  en: {
    description: "This page doesn\u2019t exist or has been moved.",
    back: "Back to home",
  },
  ja: {
    description: "このページは存在しないか、移動されました。",
    back: "ホームに戻る",
  },
};

function getLocale(): "en" | "ja" {
  if (typeof window === "undefined") return "en";
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  return lang === "ja" ? "ja" : "en";
}

export default function NotFound() {
  const [locale] = useState(getLocale);
  const t = labels[locale];

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-md text-center px-6">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800/50">
          <Layers className="size-8 text-indigo-400" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <p className="mt-3 text-zinc-400">
          {t.description}
        </p>
        <Link href="/">
          <Button className="mt-8 bg-indigo-600 hover:bg-indigo-500 text-white">
            {t.back}
          </Button>
        </Link>
      </div>
    </div>
  );
}
