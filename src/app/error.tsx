"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-md text-center px-6">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-red-500/10 border border-red-500/20">
          <AlertCircle className="size-8 text-red-400" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">Something went wrong</h1>
        <p className="mt-3 text-zinc-400">
          An unexpected error occurred. Please try again.
        </p>
        <Button
          onClick={reset}
          className="mt-8 bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}
