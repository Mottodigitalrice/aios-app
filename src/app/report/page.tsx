import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Layers, ArrowRight } from "lucide-react";

export default function ReportIndexPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100">
      <div className="mx-auto max-w-md px-6">
        <Card className="border-zinc-800 bg-zinc-900">
          <CardContent className="pt-8 pb-8 text-center">
            {/* Branding */}
            <div className="mb-6 flex items-center justify-center gap-2">
              <Layers className="h-6 w-6 text-indigo-400" />
              <span className="text-lg font-semibold text-zinc-200">
                Mottodigital
              </span>
            </div>

            {/* Title */}
            <Badge
              variant="outline"
              className="mb-4 border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
            >
              AI Audit Reports
            </Badge>
            <h1 className="mb-3 text-2xl font-bold tracking-tight">
              AI Audit Reports
            </h1>
            <p className="mb-8 text-sm leading-relaxed text-zinc-400">
              Each report is generated per-client after completing the free AI
              audit. Your personalized report link will be shared with you
              directly.
            </p>

            {/* CTA */}
            <Link
              href="/audit"
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
            >
              Take the Agentic AI Audit
              <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
