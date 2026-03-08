"use client";

import { useState, useEffect } from "react";
import {
  FileSpreadsheet,
  Mail,
  Copy,
  Clock,
  AlertTriangle,
  Zap,
  Database,
  Bot,
  CheckCircle2,
  RefreshCw,
  BarChart3,
} from "lucide-react";
import { useInView } from "@/hooks/use-in-view";

const manualSteps = [
  { icon: FileSpreadsheet, label: "Copy data from spreadsheet", color: "text-red-400" },
  { icon: Mail, label: "Draft email manually", color: "text-red-400" },
  { icon: Copy, label: "Paste into CRM", color: "text-red-400" },
  { icon: Clock, label: "Wait for response", color: "text-red-400" },
  { icon: AlertTriangle, label: "Fix errors & repeat", color: "text-red-400" },
];

const automatedSteps = [
  { icon: Database, label: "Data syncs automatically", color: "text-emerald-400" },
  { icon: Bot, label: "AI agent processes", color: "text-emerald-400" },
  { icon: Zap, label: "Workflows trigger", color: "text-emerald-400" },
  { icon: RefreshCw, label: "Systems update in sync", color: "text-emerald-400" },
  { icon: BarChart3, label: "Reports generated", color: "text-emerald-400" },
];

export function WorkflowDemo() {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.2 });
  const [activeManual, setActiveManual] = useState(-1);
  const [activeAuto, setActiveAuto] = useState(-1);
  const [phase, setPhase] = useState<"manual" | "auto" | "done">("manual");

  useEffect(() => {
    if (!isInView) return;

    let timeout: NodeJS.Timeout;

    // Animate manual steps first
    const runManual = (step: number) => {
      if (step < manualSteps.length) {
        setActiveManual(step);
        timeout = setTimeout(() => runManual(step + 1), 800);
      } else {
        timeout = setTimeout(() => {
          setPhase("auto");
          setActiveManual(-1);
          runAuto(0);
        }, 600);
      }
    };

    // Then animate automated steps
    const runAuto = (step: number) => {
      if (step < automatedSteps.length) {
        setActiveAuto(step);
        timeout = setTimeout(() => runAuto(step + 1), 500);
      } else {
        setPhase("done");
        // Loop after delay
        timeout = setTimeout(() => {
          setPhase("manual");
          setActiveManual(-1);
          setActiveAuto(-1);
          runManual(0);
        }, 3000);
      }
    };

    timeout = setTimeout(() => runManual(0), 500);

    return () => clearTimeout(timeout);
  }, [isInView]);

  return (
    <div ref={ref} className="mt-10 rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-6 sm:p-8 overflow-hidden">
      <h3 className="text-lg font-semibold mb-6 text-center">
        Manual Process vs. AIOS Automated
      </h3>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Manual side */}
        <div className={`rounded-xl border p-5 transition-all duration-500 ${
          phase === "manual" ? "border-red-500/30 bg-red-500/[0.03]" : "border-zinc-800/30 bg-zinc-900/30 opacity-60"
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <div className="size-2 rounded-full bg-red-400" />
            <span className="text-xs font-semibold text-red-400 uppercase tracking-wider">Manual Process</span>
            {phase === "manual" && (
              <span className="ml-auto text-xs text-red-400/60">~4 hours/day</span>
            )}
          </div>
          <div className="space-y-2">
            {manualSteps.map((step, i) => {
              const Icon = step.icon;
              const isActive = phase === "manual" && activeManual >= i;
              const isCurrent = phase === "manual" && activeManual === i;
              return (
                <div
                  key={step.label}
                  className={`flex items-center gap-3 rounded-lg p-2.5 transition-all duration-300 ${
                    isCurrent
                      ? "bg-red-500/10 border border-red-500/20"
                      : isActive
                      ? "bg-red-500/5 border border-transparent"
                      : "border border-transparent opacity-40"
                  }`}
                >
                  <div className={`flex size-8 items-center justify-center rounded-lg transition-colors duration-300 ${
                    isActive ? "bg-red-500/15" : "bg-zinc-800/50"
                  }`}>
                    <Icon className={`size-4 transition-colors duration-300 ${isActive ? step.color : "text-zinc-600"}`} />
                  </div>
                  <span className={`text-xs font-medium transition-colors duration-300 ${
                    isActive ? "text-zinc-300" : "text-zinc-600"
                  }`}>
                    {step.label}
                  </span>
                  {isCurrent && (
                    <div className="ml-auto size-2 rounded-full bg-red-400 animate-pulse" />
                  )}
                  {isActive && !isCurrent && (
                    <CheckCircle2 className="ml-auto size-3.5 text-red-400/50" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Automated side */}
        <div className={`rounded-xl border p-5 transition-all duration-500 ${
          phase === "auto" || phase === "done" ? "border-emerald-500/30 bg-emerald-500/[0.03]" : "border-zinc-800/30 bg-zinc-900/30 opacity-60"
        }`}>
          <div className="flex items-center gap-2 mb-4">
            <div className="size-2 rounded-full bg-emerald-400" />
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">AIOS Automated</span>
            {(phase === "auto" || phase === "done") && (
              <span className="ml-auto text-xs text-emerald-400/60">~30 seconds</span>
            )}
          </div>
          <div className="space-y-2">
            {automatedSteps.map((step, i) => {
              const Icon = step.icon;
              const isActive = (phase === "auto" || phase === "done") && activeAuto >= i;
              const isCurrent = phase === "auto" && activeAuto === i;
              return (
                <div
                  key={step.label}
                  className={`flex items-center gap-3 rounded-lg p-2.5 transition-all duration-300 ${
                    isCurrent
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : isActive
                      ? "bg-emerald-500/5 border border-transparent"
                      : "border border-transparent opacity-40"
                  }`}
                >
                  <div className={`flex size-8 items-center justify-center rounded-lg transition-colors duration-300 ${
                    isActive ? "bg-emerald-500/15" : "bg-zinc-800/50"
                  }`}>
                    <Icon className={`size-4 transition-colors duration-300 ${isActive ? step.color : "text-zinc-600"}`} />
                  </div>
                  <span className={`text-xs font-medium transition-colors duration-300 ${
                    isActive ? "text-zinc-300" : "text-zinc-600"
                  }`}>
                    {step.label}
                  </span>
                  {isCurrent && (
                    <div className="ml-auto size-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  {isActive && !isCurrent && (
                    <CheckCircle2 className="ml-auto size-3.5 text-emerald-400/50" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Result summary */}
      <div className={`mt-6 text-center transition-all duration-500 ${
        phase === "done" ? "opacity-100" : "opacity-0"
      }`}>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2">
          <Zap className="size-4 text-emerald-400" />
          <span className="text-sm font-medium text-emerald-300">
            4 hours of manual work reduced to 30 seconds
          </span>
        </div>
      </div>
    </div>
  );
}
