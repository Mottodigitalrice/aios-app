"use client";

import Image from "next/image";
import { StepLayout } from "../shared/step-layout";
import { MultiSelectChips } from "../shared/multi-select-chips";
import type { AuditFormData } from "@/hooks/use-audit-form";

const TOOLS = [
  "Slack",
  "Notion",
  "Google Workspace",
  "HubSpot",
  "Salesforce",
  "Chatwork",
  "Kintone",
  "Freee",
  "LINE",
  "Microsoft 365",
  "Zoom",
  "Asana",
  "Jira",
];

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

interface Step4Props {
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

export function Step4Tools({
  formData,
  updateField,
  onNext,
  onBack,
  isLoading,
  error,
}: Step4Props) {
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
      question="What tools does your team use?"
      description="Select all that apply — this helps us understand your current stack."
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      error={error}
    >
      <MultiSelectChips
        options={TOOLS}
        selected={formData.tools}
        onChange={(selected) => updateField("tools", selected)}
        renderIcon={renderIcon}
      />
    </StepLayout>
  );
}
