/**
 * Pure ROI computation for the S8 process-frequency grid.
 *
 * Hours saved/week = Σ(hours_per_freq × capture_rate)
 * Annual savings   = hours_saved × 52 × hourly_rate_for_industry
 */

import {
  FREQUENCIES,
  INDUSTRIES,
  PROCESSES,
  type FrequencyId,
  type IndustryId,
  type ProcessId,
} from "./constants";

const FREQ_BY_ID = Object.fromEntries(FREQUENCIES.map((f) => [f.id, f.hoursPerWeek])) as Record<
  FrequencyId,
  number
>;
const PROC_BY_ID = Object.fromEntries(PROCESSES.map((p) => [p.id, p.captureRate])) as Record<
  ProcessId,
  number
>;
const INDUSTRY_RATE = Object.fromEntries(
  INDUSTRIES.map((i) => [i.id, i.hourlyRate])
) as Record<IndustryId, number>;

const DEFAULT_HOURLY_RATE = 4500;

export interface RoiResult {
  hoursPerWeek: number;
  annualSavings: number;
  topProcesses: { processId: ProcessId; hoursSaved: number }[];
}

export function computeRoi(
  grid: Partial<Record<ProcessId, FrequencyId>>,
  industry?: IndustryId | ""
): RoiResult {
  const rate = (industry && INDUSTRY_RATE[industry as IndustryId]) || DEFAULT_HOURLY_RATE;

  const perProcess: { processId: ProcessId; hoursSaved: number }[] = [];
  let total = 0;

  for (const proc of PROCESSES) {
    const freq = grid[proc.id];
    if (!freq) continue;
    const baseHours = FREQ_BY_ID[freq] ?? 0;
    const captured = baseHours * (PROC_BY_ID[proc.id] ?? 0);
    if (captured > 0) {
      perProcess.push({ processId: proc.id, hoursSaved: captured });
      total += captured;
    }
  }

  perProcess.sort((a, b) => b.hoursSaved - a.hoursSaved);

  return {
    hoursPerWeek: total,
    annualSavings: Math.round(total * 52 * rate),
    topProcesses: perProcess.slice(0, 3),
  };
}

export function formatYen(n: number): string {
  if (n >= 100_000_000) return `¥${(n / 100_000_000).toFixed(1)}億`;
  if (n >= 10_000) return `¥${(n / 10_000).toFixed(0)}万`;
  return `¥${n.toLocaleString()}`;
}
