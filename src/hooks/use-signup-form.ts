"use client";

import { useState, useCallback } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Form data types
// ---------------------------------------------------------------------------

export interface SignupFormData {
  // Step 1: Track selection
  track: "cohort" | "corporate" | "";
  plan: "monthly" | "full" | "";
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
}

const INITIAL_DATA: SignupFormData = {
  track: "",
  plan: "",
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
};

const TOTAL_STEPS = 5; // steps 0-4

// ---------------------------------------------------------------------------
// Per-step validation schemas
// ---------------------------------------------------------------------------

function getStepSchemas(track: string): Record<number, z.ZodType> {
  return {
    0: z.object({
      track: z.enum(["cohort", "corporate"], {
        message: "Please select a track",
      }),
    }),
    1: z.object({
      name: z.string().min(1, "Name is required"),
      email: z.string().check(
        z.email({ message: "Please enter a valid email" })
      ),
      ...(track === "corporate"
        ? { company: z.string().min(1, "Company name is required for Corporate Build") }
        : {}),
    }),
    2: z.object({
      goals: z.string().min(1, "Please describe your goals"),
    }),
    3: z.object({
      startPreference: z.string().min(1, "Please select when you'd like to start"),
      referralSource: z.string().min(1, "Please select how you heard about us"),
    }),
    4: z.object({}), // Review step — no additional validation
  };
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

  const submitSignup = useMutation(api.functions.signups.submit);
  const forwardWebhook = useAction(api.functions.signups.forwardToWebhook);

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
      const stepSchemas = getStepSchemas(formData.track);
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
    const stepSchemas = getStepSchemas(formData.track);
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

  const goToNext = useCallback(() => {
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((prev) => prev + 1);
      setError(null);
      setFieldErrors({});
    }
  }, [currentStep, validateCurrentStep]);

  const goToPrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setError(null);
      setFieldErrors({});
    }
  }, [currentStep]);

  const submitFinal = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const signupId = await submitSignup({
        track: formData.track as "cohort" | "corporate",
        plan:
          formData.track === "corporate" && formData.plan
            ? (formData.plan as "monthly" | "full")
            : undefined,
        name: formData.name,
        email: formData.email,
        company: formData.company || undefined,
        role: formData.role || undefined,
        goals: formData.goals,
        painPoints: formData.painPoints || undefined,
        teamSize: formData.teamSize ? parseInt(formData.teamSize, 10) : undefined,
        startPreference: formData.startPreference,
        referralSource: formData.referralSource,
        notes: formData.notes || undefined,
      });

      // Fire and forget webhook
      forwardWebhook({ signupId }).catch(console.error);

      setIsComplete(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email lewis@mottodigital.jp."
      );
    } finally {
      setIsLoading(false);
    }
  }, [formData, submitSignup, forwardWebhook]);

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
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
