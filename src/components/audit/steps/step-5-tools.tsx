"use client";

import Image from "next/image";
import { StepLayout } from "../shared/step-layout";
import { MultiSelectChips } from "../shared/multi-select-chips";
import type { AuditFormData } from "@/hooks/use-audit-form";
import { useAuditLocale } from "../audit-locale-context";

// Map tool names to SVG filenames in public/logos/
const TOOL_LOGOS: Record<string, string> = {
  Slack: "slack.svg",
  Notion: "notion.svg",
  "Google Workspace": "google.svg",
  HubSpot: "hubspot.svg",
  Salesforce: "salesforce.svg",
  Chatwork: "chatwork.svg",
  Kintone: "kintone.svg",
  Freee: "freee.svg",
  LINE: "line.svg",
  Zoom: "zoom.svg",
};

interface Step5Props {
  formData: AuditFormData;
  updateField: <K extends keyof AuditFormData>(
    field: K,
    value: AuditFormData[K]
  ) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

export function Step5Tools({
  formData,
  updateField,
  onNext,
  onBack,
  isLoading,
  error,
}: Step5Props) {
  const { t } = useAuditLocale();
  const step = t.steps[5];

  const renderIcon = (option: string) => {
    const logo = TOOL_LOGOS[option];
    if (!logo) return null;
    return (
      <Image
        src={`/logos/${logo}`}
        alt={option}
        width={16}
        height={16}
        className="size-4"
      />
    );
  };

  return (
    <StepLayout
      question={step.question}
      description={step.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      error={error}
    >
      <MultiSelectChips
        options={[...step.tools]}
        selected={formData.tools}
        onChange={(selected) => updateField("tools", selected)}
        renderIcon={renderIcon}
      />
    </StepLayout>
  );
}
