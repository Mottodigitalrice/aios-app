"use client";

import { useState, useCallback } from "react";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Form data types
// ---------------------------------------------------------------------------

export interface AuditFormData {
  // Step 1
  email: string;
  privacyConsent: boolean;
  // Step 2
  perspective: "individual" | "company" | "department" | "";
  name: string;
  role: string;
  // Step 3 — Context (branched by perspective)
  company: string;
  employees: string;
  industry: string;
  revenueRange: string;
  teamComposition: string;
  departmentName: string;
  departmentSize: string;
  departmentFunction: string;
  // Step 4 (Workflow & Data — branched)
  typicalDay: string;
  dataMaturity: string;
  dataConfidence: number | null;
  dataLocation: string[];
  dataRestructuringOpenness: string;
  processDocumentation: string;
  toolAutonomy: string;
  // Step 5
  tools: string[];
  // Step 6 (Challenges — branched)
  challenge: string[];
  challengeOther: string;
  bottlenecks: string[];
  repetitiveHoursPerWeek: string;
  robotTask: string;
  onboardingProcess: string;
  crossDeptDependency: string;
  // Step 7 (AI experience & readiness)
  aiExperience: string;
  sixMonthVision: string[];
  sixMonthVisionOther: string;
  aiBudget: string;
  aiTriedBefore: string;
  aiTimeline: string;
  decisionMaker: string;
  // Step 8
  source: string;
  preferredTime: string;
  website: string;
}

const INITIAL_DATA: AuditFormData = {
  email: "",
  privacyConsent: false,
  perspective: "",
  name: "",
  role: "",
  company: "",
  employees: "",
  industry: "",
  revenueRange: "",
  teamComposition: "",
  departmentName: "",
  departmentSize: "",
  departmentFunction: "",
  typicalDay: "",
  dataMaturity: "",
  dataConfidence: null,
  dataLocation: [],
  dataRestructuringOpenness: "",
  processDocumentation: "",
  toolAutonomy: "",
  tools: [],
  challenge: [],
  challengeOther: "",
  bottlenecks: [],
  repetitiveHoursPerWeek: "",
  robotTask: "",
  onboardingProcess: "",
  crossDeptDependency: "",
  aiExperience: "",
  sixMonthVision: [],
  sixMonthVisionOther: "",
  aiBudget: "",
  aiTriedBefore: "",
  aiTimeline: "",
  decisionMaker: "",
  source: "",
  preferredTime: "",
  website: "",
};

const TOTAL_STEPS = 8;

// ---------------------------------------------------------------------------
// Per-step validation schemas
// ---------------------------------------------------------------------------

const baseStepSchemas: Record<number, z.ZodType> = {
  0: z.object({
    email: z.string().check(
      z.email({ message: "Please enter a valid email" })
    ),
    privacyConsent: z.literal(true, {
      message: "You must agree to the privacy policy",
    }),
  }),
  1: z.object({
    name: z.string().min(1, "Name is required"),
    perspective: z.string().min(1, "Please select a perspective"),
  }),
  // Step 2 (company) — validated dynamically based on perspective
  2: z.object({}),
  3: z.object({}), // data maturity — optional
  4: z.object({}), // tools — optional
  5: z.object({}), // challenges — optional
  6: z.object({}), // AI experience & readiness — optional
  7: z.object({}), // logistics — optional
};

// Company/department require company name, individual does not
const step2CompanySchema = z.object({
  company: z.string().min(1, "Company name is required"),
});
const step2DepartmentSchema = z.object({
  company: z.string().min(1, "Company name is required"),
});
const step2IndividualSchema = z.object({});

function getStepSchemas(perspective: string): Record<number, z.ZodType> {
  const step2 =
    perspective === "company"
      ? step2CompanySchema
      : perspective === "department"
        ? step2DepartmentSchema
        : step2IndividualSchema;
  return {
    ...baseStepSchemas,
    2: step2,
  };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export type FieldErrors = Record<string, string>;

export function useAuditForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AuditFormData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const updateField = useCallback(
    <K extends keyof AuditFormData>(field: K, value: AuditFormData[K]) => {
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
    (field: keyof AuditFormData) => {
      const stepSchemas = getStepSchemas(formData.perspective);
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
    const stepSchemas = getStepSchemas(formData.perspective);
    const schema = stepSchemas[currentStep];
    if (!schema) return null;

    const result = schema.safeParse(formData);
    if (!result.success) {
      // Set all field errors at once
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
    // Validate
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
      const response = await fetch("/api/audit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.error || "Something went wrong. Please try again.");
      }

      setIsComplete(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us at rice@mottodigital.jp."
      );
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

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
