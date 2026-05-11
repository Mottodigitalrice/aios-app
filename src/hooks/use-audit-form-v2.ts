"use client";

import { useCallback, useMemo, useState } from "react";
import {
  type AiExperienceId,
  type FrequencyId,
  type IndustryId,
  type ProcessId,
  type Tier,
  type ToolCategoryId,
} from "@/lib/audit-v2/constants";
import type { GoalId } from "@/lib/audit-v2/goals";

// ---------------------------------------------------------------------------
// Form data shape
// ---------------------------------------------------------------------------

export interface AuditV2Data {
  tier: Tier | "";
  // S2-S4
  goalsSelected: GoalId[];
  goalsRanked: GoalId[];
  topGoalBlockers: string[]; // blocker JA strings (stable identifier)
  // S5
  company: {
    industry: IndustryId | "";
    teamSize: string;
    revenue: string;
    role: string;
    yearsInBusiness: string;
    location: string;
    website: string;
  };
  // S6
  toolStack: Partial<Record<ToolCategoryId, string[]>>;
  toolStackCategoryOther: Partial<Record<ToolCategoryId, string>>;
  toolStackOther: string;
  // S7
  aiExperience: AiExperienceId | "";
  aiTriedDidntStick: "yes" | "no" | "";
  aiTriedReasons: string[];
  // S8
  processGrid: Partial<Record<ProcessId, FrequencyId>>;
  // S9
  robotTask: string;
  // S10
  qualification: {
    budget: string;
    timeline: string;
    decisionMaker: string;
  };
  // S11
  contact: {
    name: string;
    email: string;
    company: string;
    phone: string;
  };
  locale: "en" | "ja";
}

const INITIAL_DATA: AuditV2Data = {
  tier: "",
  goalsSelected: [],
  goalsRanked: [],
  topGoalBlockers: [],
  company: {
    industry: "",
    teamSize: "",
    revenue: "",
    role: "",
    yearsInBusiness: "",
    location: "",
    website: "",
  },
  toolStack: {},
  toolStackCategoryOther: {},
  toolStackOther: "",
  aiExperience: "",
  aiTriedDidntStick: "",
  aiTriedReasons: [],
  processGrid: {},
  robotTask: "",
  qualification: { budget: "", timeline: "", decisionMaker: "" },
  contact: { name: "", email: "", company: "", phone: "" },
  locale: "ja",
};

// ---------------------------------------------------------------------------
// Step plan (Full = all 11 screens, Quick = 7)
// ---------------------------------------------------------------------------

export type StepId =
  | "tier"
  | "goals-select"
  | "goals-rank"
  | "blockers"
  | "company"
  | "tools"
  | "ai"
  | "process"
  | "robot-task"
  | "qualification"
  | "contact";

const FULL_STEPS: StepId[] = [
  "tier",
  "goals-select",
  "goals-rank",
  "blockers",
  "company",
  "tools",
  "ai",
  "process",
  "robot-task",
  "qualification",
  "contact",
];

const QUICK_STEPS: StepId[] = [
  "tier",
  "goals-select",
  "goals-rank",
  "blockers",
  "company",
  "ai",
  "qualification",
  "contact",
];

export function getStepPlan(tier: Tier | ""): StepId[] {
  return tier === "quick" ? QUICK_STEPS : FULL_STEPS;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export function useAuditFormV2() {
  const [stepIndex, setStepIndex] = useState(0);
  const [data, setData] = useState<AuditV2Data>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);

  const steps = useMemo(() => getStepPlan(data.tier), [data.tier]);
  const currentStep = steps[stepIndex];
  const totalSteps = steps.length;

  const update = useCallback((patch: Partial<AuditV2Data>) => {
    setData((prev) => ({ ...prev, ...patch }));
    setError(null);
  }, []);

  const updateCompany = useCallback((patch: Partial<AuditV2Data["company"]>) => {
    setData((prev) => ({ ...prev, company: { ...prev.company, ...patch } }));
    setError(null);
  }, []);

  const updateContact = useCallback((patch: Partial<AuditV2Data["contact"]>) => {
    setData((prev) => ({ ...prev, contact: { ...prev.contact, ...patch } }));
    setError(null);
  }, []);

  const updateQualification = useCallback(
    (patch: Partial<AuditV2Data["qualification"]>) => {
      setData((prev) => ({
        ...prev,
        qualification: { ...prev.qualification, ...patch },
      }));
      setError(null);
    },
    []
  );

  const validateCurrent = useCallback((): string | null => {
    const step = steps[stepIndex];
    switch (step) {
      case "tier":
        if (!data.tier) return "Pick Quick or Full to continue.";
        return null;
      case "goals-select":
        if (data.goalsSelected.length === 0) return "Pick at least one goal.";
        return null;
      case "goals-rank":
        if (data.goalsRanked.length === 0) return "Rank your goals.";
        return null;
      case "blockers":
        if (data.topGoalBlockers.length === 0) return "Pick at least one blocker.";
        return null;
      case "company":
        if (!data.company.industry) return "Industry is required.";
        if (!data.company.teamSize) return "Team size is required.";
        if (!data.company.role) return "Role is required.";
        return null;
      case "tools":
        return null; // optional
      case "ai":
        if (!data.aiExperience) return "Pick the option that fits best.";
        return null;
      case "process":
        return null; // optional
      case "robot-task":
        return null; // optional but encouraged
      case "qualification":
        if (data.tier === "full") {
          if (!data.qualification.timeline) return "Timeline is required.";
        } else {
          if (!data.qualification.timeline) return "Timeline is required.";
        }
        return null;
      case "contact": {
        const c = data.contact;
        if (!c.name) return "Your name is required.";
        if (!c.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email))
          return "A valid email is required.";
        if (!c.company) return "Company name is required.";
        return null;
      }
    }
    return null;
  }, [data, stepIndex, steps]);

  const goNext = useCallback(() => {
    const err = validateCurrent();
    if (err) {
      setError(err);
      return;
    }

    // Sync goalsRanked with goalsSelected when transitioning into rank
    if (steps[stepIndex] === "goals-select") {
      setData((prev) => {
        const stillSelected = prev.goalsRanked.filter((g) => prev.goalsSelected.includes(g));
        const additions = prev.goalsSelected.filter((g) => !stillSelected.includes(g));
        return { ...prev, goalsRanked: [...stillSelected, ...additions] };
      });
    }

    if (stepIndex < steps.length - 1) {
      setStepIndex((i) => i + 1);
      setError(null);
    }
  }, [stepIndex, steps, validateCurrent]);

  const goPrev = useCallback(() => {
    if (stepIndex > 0) {
      setStepIndex((i) => i - 1);
      setError(null);
    }
  }, [stepIndex]);

  const submit = useCallback(
    async (locale: "en" | "ja") => {
      const err = validateCurrent();
      if (err) {
        setError(err);
        return;
      }
      setIsLoading(true);
      setError(null);
      try {
        const payload = { ...data, locale };
        const res = await fetch("/api/audit-v2", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-request-id": `${Date.now()}-${Math.random().toString(36).slice(2)}`,
          },
          body: JSON.stringify(payload),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(body.error || "Submission failed");
        }
        setIsComplete(true);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Submission failed");
      } finally {
        setIsLoading(false);
      }
    },
    [data, validateCurrent]
  );

  const isFirst = stepIndex === 0;
  const isLast = stepIndex === steps.length - 1;

  return {
    data,
    update,
    updateCompany,
    updateContact,
    updateQualification,
    stepIndex,
    currentStep,
    totalSteps,
    isFirst,
    isLast,
    isLoading,
    isComplete,
    error,
    setError,
    goNext,
    goPrev,
    submit,
  };
}
