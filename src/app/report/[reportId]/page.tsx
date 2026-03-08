"use client";

import { use } from "react";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import type { Id } from "../../../../convex/_generated/dataModel";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { Check, AlertTriangle, Layers, ArrowLeft } from "lucide-react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const STATUS_STYLES: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  risk: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  none: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20",
};

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  risk: "At Risk",
  none: "Missing",
};

const LEVEL_STYLES: Record<string, string> = {
  High: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Medium: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Low: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
};

const ROADMAP_COLORS_LIST = [
  {
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    dot: "bg-blue-400",
  },
  {
    border: "border-emerald-500/30",
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  {
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    text: "text-violet-400",
    dot: "bg-violet-400",
  },
  {
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    dot: "bg-amber-400",
  },
];

const INVESTMENT = {
  monthly: {
    rate: "\u00a5200,000",
    period: "6 months",
    total: "\u00a51,200,000",
  },
  upfront: {
    rate: "\u00a51,000,000",
    savings: "\u00a5200,000",
    note: "Save \u00a5200,000 \u2014 pay 5, get 6",
  },
  footnote:
    "Launch pricing \u2014 first 3 clients only.",
};

const NEXT_STEPS = [
  {
    step: 1,
    title: "Review this report",
    description:
      "Share with your leadership team and identify priorities.",
  },
  {
    step: 2,
    title: "Schedule a follow-up call",
    description:
      "We\u2019ll walk through the roadmap, answer questions, and discuss timing.",
  },
  {
    step: 3,
    title: "Start building",
    description:
      "Kick off Phase 1 \u2014 your AIOS foundation \u2014 with the first weekly session.",
  },
];

// ---------------------------------------------------------------------------
// Loading Skeleton
// ---------------------------------------------------------------------------

function ReportSkeleton() {
  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* Header */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-2">
            <Layers className="h-5 w-5 text-indigo-400" />
            <Skeleton className="h-4 w-28 bg-zinc-800" />
          </div>
          <Skeleton className="h-6 w-28 rounded-full bg-zinc-800" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Title */}
        <div className="mb-12">
          <Skeleton className="h-12 w-80 bg-zinc-800" />
          <div className="mt-4 flex gap-4">
            <Skeleton className="h-4 w-40 bg-zinc-800" />
            <Skeleton className="h-4 w-32 bg-zinc-800" />
            <Skeleton className="h-4 w-44 bg-zinc-800" />
          </div>
        </div>

        <Separator className="mb-12 bg-zinc-800" />

        {/* Executive Summary */}
        <section className="mb-16">
          <Skeleton className="mb-6 h-8 w-60 bg-zinc-800" />
          <Card className="border-zinc-800 bg-zinc-900">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                <div className="flex flex-col items-center gap-2">
                  <Skeleton className="h-4 w-24 bg-zinc-800" />
                  <Skeleton className="h-16 w-20 bg-zinc-800" />
                </div>
                <div className="flex-1 space-y-3">
                  <Skeleton className="h-6 w-64 bg-zinc-800" />
                  <Skeleton className="h-4 w-full bg-zinc-800" />
                  <Skeleton className="h-4 w-full bg-zinc-800" />
                  <Skeleton className="h-4 w-3/4 bg-zinc-800" />
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Current State */}
        <section className="mb-16">
          <Skeleton className="mb-6 h-8 w-72 bg-zinc-800" />
          <Card className="mb-8 border-zinc-800 bg-zinc-900">
            <CardHeader>
              <Skeleton className="h-6 w-28 bg-zinc-800" />
              <Skeleton className="mt-2 h-4 w-72 bg-zinc-800" />
            </CardHeader>
            <CardContent className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-10 w-full bg-zinc-800" />
              ))}
            </CardContent>
          </Card>
          <div className="grid gap-6 sm:grid-cols-2">
            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader>
                <Skeleton className="h-6 w-24 bg-zinc-800" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <Skeleton key={i} className="h-4 w-full bg-zinc-800" />
                ))}
              </CardContent>
            </Card>
            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader>
                <Skeleton className="h-6 w-16 bg-zinc-800" />
              </CardHeader>
              <CardContent className="space-y-3">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-4 w-full bg-zinc-800" />
                ))}
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Opportunities */}
        <section className="mb-16">
          <Skeleton className="mb-6 h-8 w-56 bg-zinc-800" />
          <Card className="border-zinc-800 bg-zinc-900">
            <CardContent className="space-y-4 pt-6">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-12 w-full bg-zinc-800" />
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Roadmap */}
        <section className="mb-16">
          <Skeleton className="mb-6 h-8 w-80 bg-zinc-800" />
          <div className="grid gap-6 sm:grid-cols-2">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="border-zinc-800 bg-zinc-900">
                <CardHeader>
                  <Skeleton className="h-6 w-28 bg-zinc-800" />
                </CardHeader>
                <CardContent className="space-y-3">
                  {[1, 2, 3].map((j) => (
                    <Skeleton key={j} className="h-4 w-full bg-zinc-800" />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Not Found
// ---------------------------------------------------------------------------

function ReportNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-zinc-100">
      <div className="text-center">
        <div className="mb-6 flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-900 border border-zinc-800">
            <Layers className="h-8 w-8 text-zinc-500" />
          </div>
        </div>
        <h1 className="mb-2 text-2xl font-bold">Report not found</h1>
        <p className="mb-8 text-zinc-400">
          This report doesn&apos;t exist or may have been removed.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ReportPage({
  params,
}: {
  params: Promise<{ reportId: string }>;
}) {
  const { reportId } = use(params);

  const report = useQuery(api.functions.auditReports.getById, {
    id: reportId as Id<"auditReports">,
  });

  // Loading state
  if (report === undefined) {
    return <ReportSkeleton />;
  }

  // Not found
  if (report === null) {
    return <ReportNotFound />;
  }

  // Compute total time saved from opportunities
  const totalTimeSaved = report.opportunities.reduce((total, opp) => {
    const match = opp.timeSaved.match(/(\d+)/);
    return total + (match ? parseInt(match[1], 10) : 0);
  }, 0);
  const totalTimeSavedLabel = `${totalTimeSaved} hours/week`;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">
      {/* ----------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ----------------------------------------------------------------- */}
      <header className="border-b border-zinc-800">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link
            href="https://mottodigital.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-zinc-300 transition-colors hover:text-white"
          >
            <Layers className="h-5 w-5 text-indigo-400" />
            <span className="text-sm font-medium">mottodigital.com</span>
          </Link>
          <Badge
            variant="outline"
            className="border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
          >
            AI Audit Report
          </Badge>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-12">
        {/* Title block */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {report.clientName}
          </h1>
          <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-sm text-zinc-400">
            <span>
              Prepared for: {report.contactName}, {report.contactRole}
            </span>
            <span className="hidden sm:inline">|</span>
            <span>{report.reportDate}</span>
            <span className="hidden sm:inline">|</span>
            <span>Lewis Rice, MOTTO Digital</span>
          </div>
        </div>

        <Separator className="mb-12 bg-zinc-800" />

        {/* --------------------------------------------------------------- */}
        {/* 1. Executive Summary                                            */}
        {/* --------------------------------------------------------------- */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            1. Executive Summary
          </h2>

          <Card className="border-zinc-800 bg-zinc-900">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
                {/* Score */}
                <div className="flex flex-col items-center text-center">
                  <span className="text-sm font-medium uppercase tracking-wider text-zinc-500">
                    AI Readiness
                  </span>
                  <div className="mt-1 flex items-baseline gap-1">
                    <span className="gradient-text text-6xl font-bold">
                      {report.score}
                    </span>
                    <span className="text-2xl text-zinc-500">
                      /{report.maxScore}
                    </span>
                  </div>
                </div>

                {/* Verdict + Summary */}
                <div className="flex-1">
                  <p className="mb-2 text-lg font-semibold text-indigo-300">
                    {report.verdict}
                  </p>
                  <p className="leading-relaxed text-zinc-400">
                    {report.summary}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* 2. Current State Assessment                                     */}
        {/* --------------------------------------------------------------- */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            2. Current State Assessment
          </h2>

          {/* Tool Audit Table */}
          <Card className="mb-8 border-zinc-800 bg-zinc-900">
            <CardHeader>
              <CardTitle>Tool Audit</CardTitle>
              <CardDescription>
                Overview of your current technology stack and AI readiness.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400">Tool</TableHead>
                    <TableHead className="text-zinc-400">Status</TableHead>
                    <TableHead className="text-zinc-400">Notes</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.tools.map((tool) => (
                    <TableRow
                      key={tool.name}
                      className="border-zinc-800/50 hover:bg-zinc-800/30"
                    >
                      <TableCell className="font-medium">{tool.name}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={STATUS_STYLES[tool.status]}
                        >
                          {STATUS_LABELS[tool.status]}
                        </Badge>
                      </TableCell>
                      <TableCell className="whitespace-normal text-zinc-400">
                        {tool.notes}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Strengths & Gaps */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Strengths */}
            <Card className="border-emerald-500/20 bg-zinc-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-emerald-400">
                  <Check className="h-5 w-5" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.strengths.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span className="text-sm leading-relaxed text-zinc-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Gaps */}
            <Card className="border-amber-500/20 bg-zinc-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-amber-400">
                  <AlertTriangle className="h-5 w-5" />
                  Gaps
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {report.gaps.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
                      <span className="text-sm leading-relaxed text-zinc-300">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* 3. Opportunity Matrix                                           */}
        {/* --------------------------------------------------------------- */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            3. Opportunity Matrix
          </h2>

          <Card className="border-zinc-800 bg-zinc-900">
            <CardContent className="pt-6">
              <Table>
                <TableHeader>
                  <TableRow className="border-zinc-800 hover:bg-transparent">
                    <TableHead className="text-zinc-400">Area</TableHead>
                    <TableHead className="text-zinc-400">Impact</TableHead>
                    <TableHead className="text-zinc-400">Effort</TableHead>
                    <TableHead className="text-right text-zinc-400">
                      Time Saved
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {report.opportunities.map((opp) => (
                    <TableRow
                      key={opp.area}
                      className="border-zinc-800/50 hover:bg-zinc-800/30"
                    >
                      <TableCell>
                        <div>
                          <p className="font-medium">{opp.area}</p>
                          <p className="mt-0.5 whitespace-normal text-xs text-zinc-500">
                            {opp.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={LEVEL_STYLES[opp.impact] || ""}
                        >
                          {opp.impact}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={LEVEL_STYLES[opp.effort] || ""}
                        >
                          {opp.effort}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right font-medium text-indigo-300">
                        {opp.timeSaved}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <Separator className="my-4 bg-zinc-800" />

              <div className="flex items-center justify-end gap-2">
                <span className="text-sm text-zinc-400">Total:</span>
                <span className="text-lg font-semibold text-indigo-300">
                  {totalTimeSavedLabel}
                </span>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* 4. Recommended 6-Month Roadmap                                  */}
        {/* --------------------------------------------------------------- */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            4. Recommended 6-Month Roadmap
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {report.roadmap.map((phase, index) => {
              const colors =
                ROADMAP_COLORS_LIST[index % ROADMAP_COLORS_LIST.length];
              return (
                <Card
                  key={phase.phase}
                  className={`${colors.border} bg-zinc-900`}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className={colors.text}>
                        {phase.phase}
                      </CardTitle>
                      <Badge
                        variant="outline"
                        className={`${colors.bg} ${colors.text} border-transparent`}
                      >
                        {phase.months}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <span
                            className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${colors.dot}`}
                          />
                          <span className="text-sm leading-relaxed text-zinc-300">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* 5. Investment                                                    */}
        {/* --------------------------------------------------------------- */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            5. Investment
          </h2>

          <div className="grid gap-6 sm:grid-cols-2">
            {/* Monthly */}
            <Card className="border-zinc-800 bg-zinc-900">
              <CardHeader>
                <CardTitle className="text-zinc-300">Monthly</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-zinc-100">
                    {INVESTMENT.monthly.rate}
                  </span>
                  <span className="text-zinc-500">/mo</span>
                </div>
                <p className="mt-2 text-sm text-zinc-500">
                  x {INVESTMENT.monthly.period} = {INVESTMENT.monthly.total}
                </p>
              </CardContent>
            </Card>

            {/* Upfront */}
            <Card className="border-indigo-500/30 bg-zinc-900">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-indigo-300">Upfront</CardTitle>
                  <Badge
                    variant="outline"
                    className="border-indigo-500/30 bg-indigo-500/10 text-indigo-300"
                  >
                    Best Value
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-zinc-100">
                    {INVESTMENT.upfront.rate}
                  </span>
                </div>
                <p className="mt-2 text-sm text-emerald-400">
                  {INVESTMENT.upfront.note}
                </p>
              </CardContent>
            </Card>
          </div>

          <p className="mt-4 text-center text-sm text-zinc-500">
            {INVESTMENT.footnote}
          </p>
        </section>

        {/* --------------------------------------------------------------- */}
        {/* 6. Next Steps                                                   */}
        {/* --------------------------------------------------------------- */}
        <section className="mb-16">
          <h2 className="mb-6 text-2xl font-semibold tracking-tight">
            6. Next Steps
          </h2>

          <div className="grid gap-4 sm:grid-cols-3">
            {NEXT_STEPS.map((step) => (
              <Card
                key={step.step}
                className="border-zinc-800 bg-zinc-900"
              >
                <CardContent className="pt-6">
                  <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-500/10 text-sm font-bold text-indigo-400">
                    {step.step}
                  </div>
                  <h3 className="mb-2 font-semibold text-zinc-100">
                    {step.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-zinc-400">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="mb-12 bg-zinc-800" />

        {/* --------------------------------------------------------------- */}
        {/* Footer                                                          */}
        {/* --------------------------------------------------------------- */}
        <footer className="pb-12 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <Layers className="h-5 w-5 text-indigo-400" />
            <span className="font-semibold text-zinc-300">MOTTO Digital</span>
          </div>
          <p className="text-sm text-zinc-500">
            AI Operating System for Business
          </p>
          <p className="mt-4 text-xs text-zinc-600">
            Confidential &mdash; prepared exclusively for {report.clientName}
          </p>
        </footer>
      </main>
    </div>
  );
}
