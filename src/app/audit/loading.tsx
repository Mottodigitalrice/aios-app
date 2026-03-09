import { Layers, Loader2 } from "lucide-react";

export default function AuditLoading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 text-zinc-100">
      <div className="flex flex-col items-center gap-4">
        <Layers className="size-8 text-indigo-400" />
        <Loader2 className="size-6 text-zinc-500 animate-spin" />
      </div>
    </div>
  );
}
