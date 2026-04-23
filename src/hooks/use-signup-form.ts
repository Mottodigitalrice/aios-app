"use client";

import { useState, useCallback } from "react";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Form data types
// ---------------------------------------------------------------------------

export type AvailabilityCommitment = "commit" | "maybe" | "no";

// Proposed session slots (JST, 1-hour each). Based on Lewis's weekly availability blocks.
export const AVAILABILITY_SLOTS: { slotId: string; day: string; time: string }[] = [
  { slotId: "mon-11-12", day: "mon", time: "11:00–12:00" },
  { slotId: "mon-12-13", day: "mon", time: "12:00–13:00" },
  { slotId: "mon-13-14", day: "mon", time: "13:00–14:00" },
  { slotId: "mon-14-15", day: "mon", time: "14:00–15:00" },
  { slotId: "wed-11-12", day: "wed", time: "11:00–12:00" },
  { slotId: "wed-12-13", day: "wed", time: "12:00–13:00" },
  { slotId: "wed-13-14", day: "wed", time: "13:00–14:00" },
  { slotId: "wed-14-15", day: "wed", time: "14:00–15:00" },
  { slotId: "wed-20-21", day: "wed", time: "20:00–21:00" },
  { slotId: "thu-11-12", day: "thu", time: "11:00–12:00" },
  { slotId: "thu-12-13", day: "thu", time: "12:00–13:00" },
  { slotId: "thu-13-14", day: "thu", time: "13:00–14:00" },
  { slotId: "thu-14-15", day: "thu", time: "14:00–15:00" },
];

export interface SignupFormData {
  // Step 1: Track selection
  track: "cohort" | "oneOnOne" | "company" | "";
  signupType: "cohort" | "individual" | "company" | "";
  // Step 2: About you
  name: string;
  email: string;
  company: string;
  role: string;
  // Step 3: Goals
  goals: string;
  painPoints: string;
  teamSize: string;
  // Step 4: Getting started
  startPreference: string;
  referralSource: string;
  notes: string;
  // Step 5 (cohort only): Availability — map of slotId -> commitment
  availability: Record<string, AvailabilityCommitment>;
  // Step 6 (cohort only): Payment plan
  paymentPlan: "upfront" | "monthly" | "";
  // Step 7 (cohort only): Communication
  lineAdded: boolean;
  slackOptIn: "" | "yes" | "no";
}

const INITIAL_DATA: SignupFormData = {
  track: "",
  signupType: "",
  name: "",
  email: "",
  company: "",
  role: "",
  goals: "",
  painPoints: "",
  teamSize: "",
  startPreference: "",
  referralSource: "",
  notes: "",
  availability: Object.fromEntries(
    AVAILABILITY_SLOTS.map((s) => [s.slotId, "no" as AvailabilityCommitment])
  ),
  paymentPlan: "",
  lineAdded: false,
  slackOptIn: "",
};

const COHORT_TOTAL_STEPS = 8; // steps 0-7 (adds availability, payment, communication)
const DEFAULT_TOTAL_STEPS = 5; // steps 0-4

function getTotalSteps(signupType: string): number {
  return signupType === "cohort" ? COHORT_TOTAL_STEPS : DEFAULT_TOTAL_STEPS;
}

// ---------------------------------------------------------------------------
// Per-step validation schemas
// ---------------------------------------------------------------------------

function getStepSchemas(_track: string, signupType: string): Record<number, z.ZodType> {
  const isCohort = signupType === "cohort";
  const base: Record<number, z.ZodType> = {
    0: z.object({
      signupType: z.enum(["cohort", "individual", "company"], {
        message: "Please select an option",
      }),
    }),
    1: z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().check(
        z.email({ message: "Please enter a valid email" })
      ),
      company: z.string().min(1, "Company name is required"),
      role: z.string().min(1, "Role is required"),
    }),
    2: z.object({
      goals: z.string().min(1, "Please describe your goals"),
    }),
    3: z.object({
      startPreference: z.string().min(1, "Please select when you'd like to start"),
      referralSource: z.string().min(1, "Please select how you heard about us"),
    }),
  };
  if (!isCohort) {
    base[4] = z.object({}); // review for non-cohort
    return base;
  }
  base[4] = z
    .object({ availability: z.record(z.string(), z.enum(["commit", "maybe", "no"])) })
    .refine(
      (data) => {
        const counts = Object.values(data.availability).reduce(
          (acc, v) => {
            acc[v] = (acc[v] || 0) + 1;
            return acc;
          },
          {} as Record<string, number>
        );
        return (counts.commit || 0) >= 2 || (counts.maybe || 0) >= 3;
      },
      {
        message:
          "Please mark at least 2 slots as 'Can commit', or at least 3 as 'Maybe'.",
        path: ["availability"],
      }
    );
  base[5] = z.object({
    paymentPlan: z.enum(["upfront", "monthly"], {
      message: "Please choose a payment option",
    }),
  });
  base[6] = z.object({
    lineAdded: z.literal(true, {
      message: "Please add the LINE Official account and confirm to continue",
    }),
    slackOptIn: z.enum(["yes", "no"], {
      message: "Please choose whether to join the cohort Slack channel",
    }),
  });
  base[7] = z.object({}); // review
  return base;
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export type FieldErrors = Record<string, string>;

export function useSignupForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<SignupFormData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const updateField = useCallback(
    <K extends keyof SignupFormData>(field: K, value: SignupFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      setFieldErrors((prev) => {
        if (prev[field]) {
          const next = { ...prev };
          delete next[field];
          return next;
        }
        return prev;
      });
      setError(null);
    },
    []
  );

  const validateField = useCallback(
    (field: keyof SignupFormData) => {
      const stepSchemas = getStepSchemas(formData.track, formData.signupType);
      const schema = stepSchemas[currentStep];
      if (!schema) return;

      const result = schema.safeParse(formData);
      if (!result.success) {
        const fieldIssue = result.error.issues.find(
          (issue) => issue.path[0] === field
        );
        if (fieldIssue) {
          setFieldErrors((prev) => ({ ...prev, [field]: fieldIssue.message }));
        } else {
          setFieldErrors((prev) => {
            if (prev[field]) {
              const next = { ...prev };
              delete next[field];
              return next;
            }
            return prev;
          });
        }
      } else {
        setFieldErrors((prev) => {
          if (prev[field]) {
            const next = { ...prev };
            delete next[field];
            return next;
          }
          return prev;
        });
      }
    },
    [currentStep, formData]
  );

  const validateCurrentStep = useCallback((): string | null => {
    const stepSchemas = getStepSchemas(formData.track, formData.signupType);
    const schema = stepSchemas[currentStep];
    if (!schema) return null;

    const result = schema.safeParse(formData);
    if (!result.success) {
      const errors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const field = issue.path[0] as string;
        if (field && !errors[field]) {
          errors[field] = issue.message;
        }
      }
      setFieldErrors(errors);
      return result.error.issues[0]?.message || "Please fill in the required fields";
    }
    setFieldErrors({});
    return null;
  }, [currentStep, formData]);

  const totalSteps = getTotalSteps(formData.signupType);

  const goToNext = useCallback(() => {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      setError(null);
      setFieldErrors({});
    }
  }, [currentStep, totalSteps, validateCurrentStep]);

  const goToPrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setError(null);
      setFieldErrors({});
    }
  }, [currentStep]);

  const submitFinal = useCallback(async (locale?: "en" | "ja") => {
    setIsLoading(true);
    setError(null);

    const isCohort = formData.signupType === "cohort";
    const availabilityArray = isCohort
      ? Object.entries(formData.availability).map(([slotId, commitment]) => ({
          slotId,
          commitment,
        }))
      : undefined;

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          track: formData.track,
          signupType: formData.signupType || undefined,
          name: formData.name,
          email: formData.email,
          company: formData.company || undefined,
          role: formData.role || undefined,
          goals: formData.goals,
          painPoints: formData.painPoints || undefined,
          teamSize: formData.teamSize
            ? parseInt(formData.teamSize, 10)
            : undefined,
          startPreference: formData.startPreference,
          referralSource: formData.referralSource,
          notes: formData.notes || undefined,
          locale: locale || "ja",
          languageTrack: locale || "ja",
          availability: availabilityArray,
          paymentPlan: isCohort && formData.paymentPlan ? formData.paymentPlan : undefined,
          lineAdded: isCohort ? formData.lineAdded : undefined,
          slackOptIn: isCohort && formData.slackOptIn
            ? formData.slackOptIn === "yes"
            : undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || "Something went wrong");
      }

      setIsComplete(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email rice@mottodigital.jp."
      );
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  return {
    currentStep,
    totalSteps,
    formData,
    isLoading,
    error,
    fieldErrors,
    isComplete,
    updateField,
    validateField,
    goToNext,
    goToPrev,
    submitFinal,
    setError,
  };
}
