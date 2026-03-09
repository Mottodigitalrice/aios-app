"use client";

import { useState, useCallback, useEffect } from "react";
import { useMutation, useAction } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { z } from "zod";

// ---------------------------------------------------------------------------
// Form data types
// ---------------------------------------------------------------------------

export interface AuditFormData {
  // Step 1
  email: string;
  privacyConsent: boolean;
  // Step 2
  perspective: "personal" | "corporate" | "";
  name: string;
  role: string;
  // Step 3
  company: string;
  employees: string;
  workType: string;
  useCase: "personal" | "business" | "both" | "";
  // Step 4 (NEW: Data Maturity)
  dataMaturity: string;
  dataLocation: string[];
  // Step 5
  tools: string[];
  // Step 6
  challenge: string[];
  challengeOther: string;
  // Step 7 (expanded with budget)
  aiExperience: string;
  sixMonthVision: string[];
  sixMonthVisionOther: string;
  aiBudget: string;
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
  workType: "",
  useCase: "",
  dataMaturity: "",
  dataLocation: [],
  tools: [],
  challenge: [],
  challengeOther: "",
  aiExperience: "",
  sixMonthVision: [],
  sixMonthVisionOther: "",
  aiBudget: "",
  source: "",
  preferredTime: "",
  website: "",
};

const TOTAL_STEPS = 8;
const STORAGE_KEY = "aios-audit-lead";

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

// Corporate requires company name, personal does not
const step2CorporateSchema = z.object({
  company: z.string().min(1, "Company name is required"),
});
const step2PersonalSchema = z.object({});

function getStepSchemas(perspective: string): Record<number, z.ZodType> {
  return {
    ...baseStepSchemas,
    2: perspective === "corporate" ? step2CorporateSchema : step2PersonalSchema,
  };
}

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

export type FieldErrors = Record<string, string>;

export function useAuditForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<AuditFormData>(INITIAL_DATA);
  const [leadId, setLeadId] = useState<Id<"auditLeads"> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  const createPartialLead = useMutation(
    api.functions.auditLeads.createPartialLead
  );
  const updatePartialLead = useMutation(
    api.functions.auditLeads.updatePartialLead
  );
  const finalizeLead = useMutation(api.functions.auditLeads.finalizeLead);
  const forwardWebhook = useAction(
    api.functions.auditLeads.forwardToWebhook
  );

  // Restore from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const { leadId: storedId, formData: storedData, currentStep: storedStep } =
          JSON.parse(stored);
        if (storedId && storedData) {
          setLeadId(storedId as Id<"auditLeads">);
          setFormData({ ...INITIAL_DATA, ...storedData });
          setCurrentStep(storedStep || 0);
        }
      }
    } catch {
      // Ignore parse errors
    }
  }, []);

  // Save to localStorage on changes
  useEffect(() => {
    if (leadId) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ leadId, formData, currentStep })
      );
    }
  }, [leadId, formData, currentStep]);

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

  const saveStep = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      if (currentStep === 0) {
        // Step 1: Create or update partial lead
        const id = await createPartialLead({
          email: formData.email,
          privacyConsent: formData.privacyConsent,
        });
        setLeadId(id);
      } else if (leadId) {
        // Steps 2-6: Update partial lead
        const updatePayload: Record<string, unknown> = {
          id: leadId,
          currentStep: currentStep + 1,
        };

        // Include step-specific fields
        switch (currentStep) {
          case 1:
            updatePayload.name = formData.name;
            if (formData.role) updatePayload.role = formData.role;
            if (formData.perspective) updatePayload.perspective = formData.perspective;
            break;
          case 2:
            if (formData.company) updatePayload.company = formData.company;
            if (formData.employees) updatePayload.employees = formData.employees;
            if (formData.workType) updatePayload.workType = formData.workType;
            if (formData.useCase) updatePayload.useCase = formData.useCase;
            break;
          case 3:
            if (formData.dataMaturity) updatePayload.dataMaturity = formData.dataMaturity;
            if (formData.dataLocation.length > 0) updatePayload.dataLocation = formData.dataLocation;
            break;
          case 4:
            if (formData.tools.length > 0)
              updatePayload.tools = formData.tools;
            break;
          case 5:
            if (formData.challenge.length > 0)
              updatePayload.challenge = formData.challenge;
            if (formData.challengeOther)
              updatePayload.challengeOther = formData.challengeOther;
            break;
          case 6:
            if (formData.aiExperience)
              updatePayload.aiExperience = formData.aiExperience;
            if (formData.sixMonthVision.length > 0)
              updatePayload.sixMonthVision = formData.sixMonthVision;
            if (formData.sixMonthVisionOther)
              updatePayload.sixMonthVisionOther = formData.sixMonthVisionOther;
            if (formData.aiBudget)
              updatePayload.aiBudget = formData.aiBudget;
            break;
        }

        await updatePartialLead(updatePayload as Parameters<typeof updatePartialLead>[0]);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again."
      );
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [
    currentStep,
    formData,
    leadId,
    createPartialLead,
    updatePartialLead,
  ]);

  const goToNext = useCallback(async () => {
    // Validate
    const validationError = validateCurrentStep();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await saveStep();
      if (currentStep < TOTAL_STEPS - 1) {
        setCurrentStep((prev) => prev + 1);
        setError(null);
        setFieldErrors({});
      }
    } catch {
      // Error already set in saveStep
    }
  }, [currentStep, validateCurrentStep, saveStep]);

  const goToPrev = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      setError(null);
      setFieldErrors({});
    }
  }, [currentStep]);

  const submitFinal = useCallback(async () => {
    if (!leadId) return;

    setIsLoading(true);
    setError(null);

    try {
      // Save final step data + finalize
      await finalizeLead({
        id: leadId,
        source: formData.source || undefined,
        preferredTime: formData.preferredTime || undefined,
        website: formData.website || undefined,
      });

      // Fire and forget webhook
      forwardWebhook({ leadId }).catch(console.error);

      // Clear localStorage
      localStorage.removeItem(STORAGE_KEY);
      setIsComplete(true);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again or email us at hello@mottodigital.com."
      );
    } finally {
      setIsLoading(false);
    }
  }, [leadId, formData, finalizeLead, forwardWebhook]);

  return {
    currentStep,
    totalSteps: TOTAL_STEPS,
    formData,
    leadId,
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
