"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const labels = {
  en: {
    title: "Something went wrong",
    description: "An unexpected error occurred. Please try again.",
    retry: "Try again",
  },
  ja: {
    title: "エラーが発生しました",
    description: "予期しないエラーが発生しました。もう一度お試しください。",
    retry: "もう一度試す",
  },
};

function getLocale(): "en" | "ja" {
  if (typeof window === "undefined") return "ja";
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  return lang === "en" ? "en" : "ja";
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [locale] = useState(getLocale);
  const t = labels[locale];

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-md text-center px-6">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
          <AlertCircle className="size-8 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{t.title}</h1>
        <p className="mt-3 text-zinc-400">
          {t.description}
        </p>
        <Button
          onClick={reset}
          className="mt-8 bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          {t.retry}
        </Button>
      </div>
    </div>
  );
}
