import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Layers } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-md text-center px-6">
        <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800/50">
          <Layers className="size-8 text-indigo-400" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">404</h1>
        <p className="mt-3 text-zinc-400">
          This page doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button className="mt-8 bg-indigo-600 hover:bg-indigo-500 text-white">
            Back to home
          </Button>
        </Link>
      </div>
    </div>
  );
}
