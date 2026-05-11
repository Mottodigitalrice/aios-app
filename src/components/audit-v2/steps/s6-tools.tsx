"use client";

import { V2StepLayout } from "../shared/v2-step-layout";
import { useAuditV2Locale, pickLabel } from "../audit-v2-locale-context";
import { TOOL_CATEGORIES, type ToolCategoryId } from "@/lib/audit-v2/constants";
import { cn } from "@/lib/utils";
import { Check, Ban, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { segmentJapanese } from "@/lib/budoux-transform";
import type { AuditV2Data } from "@/hooks/use-audit-form-v2";

interface Props {
  data: AuditV2Data;
  update: (patch: Partial<AuditV2Data>) => void;
  onNext: () => void;
  onBack: () => void;
  isLoading: boolean;
  error: string | null;
}

const NONE = "__none__";
const OTHER = "__other__";

export function S6Tools({ data, update, onNext, onBack, isLoading, error }: Props) {
  const { t, locale } = useAuditV2Locale();

  const setCategory = (cat: ToolCategoryId, next: string[]) => {
    update({ toolStack: { ...data.toolStack, [cat]: next } });
  };

  const toggleTool = (cat: ToolCategoryId, tool: string) => {
    const current = data.toolStack[cat] ?? [];
    // Picking a named tool clears the "None" sentinel
    const without = current.filter((v) => v !== NONE);
    const set = new Set(without);
    if (set.has(tool)) set.delete(tool);
    else set.add(tool);
    setCategory(cat, Array.from(set));
  };

  const toggleNone = (cat: ToolCategoryId) => {
    const current = data.toolStack[cat] ?? [];
    if (current.includes(NONE)) {
      setCategory(cat, []);
    } else {
      // None is mutually exclusive — clear everything else
      setCategory(cat, [NONE]);
      // Also clear any in-flight "other" text for this category
      const nextOther = { ...data.toolStackCategoryOther };
      delete nextOther[cat];
      update({
        toolStack: { ...data.toolStack, [cat]: [NONE] },
        toolStackCategoryOther: nextOther,
      });
    }
  };

  const toggleOther = (cat: ToolCategoryId) => {
    const current = data.toolStack[cat] ?? [];
    const without = current.filter((v) => v !== NONE);
    const set = new Set(without);
    if (set.has(OTHER)) {
      set.delete(OTHER);
      const nextOther = { ...data.toolStackCategoryOther };
      delete nextOther[cat];
      update({
        toolStack: { ...data.toolStack, [cat]: Array.from(set) },
        toolStackCategoryOther: nextOther,
      });
    } else {
      set.add(OTHER);
      setCategory(cat, Array.from(set));
    }
  };

  const setOtherText = (cat: ToolCategoryId, value: string) => {
    update({
      toolStackCategoryOther: {
        ...data.toolStackCategoryOther,
        [cat]: value.slice(0, 80),
      },
    });
  };

  return (
    <V2StepLayout
      question={t.tools.question}
      description={t.tools.description}
      onNext={onNext}
      onBack={onBack}
      isLoading={isLoading}
      canContinue
      error={error}
    >
      <div className="space-y-7">
        {TOOL_CATEGORIES.map((cat) => {
          const selected = data.toolStack[cat.id] ?? [];
          const isNone = selected.includes(NONE);
          const isOther = selected.includes(OTHER);
          return (
            <div key={cat.id}>
              <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8860B] mb-3">
                {segmentJapanese(pickLabel(cat, locale))}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cat.tools.map((tool) => {
                  const isSelected = selected.includes(tool);
                  return (
                    <button
                      key={tool}
                      type="button"
                      aria-pressed={isSelected}
                      onClick={() => toggleTool(cat.id, tool)}
                      className={cn(
                        "inline-flex items-center gap-2 min-h-[36px] rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:-translate-y-[1px]",
                        isSelected
                          ? "border-[#B8860B] bg-[#1D1D1F] text-white"
                          : "border-[#E8E8ED] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#B8860B]/40 hover:bg-white hover:text-[#1D1D1F]"
                      )}
                    >
                      {isSelected && <Check className="size-3" strokeWidth={3} />}
                      <span>{tool}</span>
                    </button>
                  );
                })}

                {/* Other... pill (per-category) */}
                <button
                  type="button"
                  aria-pressed={isOther}
                  onClick={() => toggleOther(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-2 min-h-[36px] rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:-translate-y-[1px]",
                    isOther
                      ? "border-[#B8860B] bg-[#1D1D1F] text-white"
                      : "border-[#E8E8ED] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#B8860B]/40 hover:bg-white hover:text-[#1D1D1F]"
                  )}
                >
                  <Plus className="size-3.5" />
                  <span>{segmentJapanese(t.tools.otherInCategory)}</span>
                </button>

                {/* None pill (per-category, mutually exclusive) */}
                <button
                  type="button"
                  aria-pressed={isNone}
                  onClick={() => toggleNone(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-2 min-h-[36px] rounded-lg border px-3 py-1.5 text-sm font-medium transition-all duration-200 hover:-translate-y-[1px]",
                    isNone
                      ? "border-[#86868B] bg-[#86868B] text-white"
                      : "border-[#E8E8ED] bg-[#F5F5F7] text-[#6E6E73] hover:border-[#86868B]/40 hover:bg-white hover:text-[#1D1D1F]"
                  )}
                >
                  <Ban className="size-3.5" />
                  <span>{segmentJapanese(t.tools.none)}</span>
                </button>
              </div>

              {/* Other text input (revealed when Other... is toggled) */}
              {isOther && (
                <div className="mt-3">
                  <Input
                    autoFocus
                    value={data.toolStackCategoryOther[cat.id] ?? ""}
                    onChange={(e) => setOtherText(cat.id, e.target.value)}
                    placeholder={t.tools.otherInCategoryPlaceholder}
                    maxLength={80}
                    className="bg-white border-[#E8E8ED] text-[#1D1D1F] placeholder:text-[#86868B] focus-visible:border-[#B8860B]/50 focus-visible:ring-[#B8860B]/20"
                  />
                </div>
              )}
            </div>
          );
        })}

        {/* Free-form catch-all at the bottom — for tools that don't fit any category */}
        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#B8860B] mb-3">
            {segmentJapanese(t.tools.other)}
          </h3>
          <Input
            value={data.toolStackOther}
            onChange={(e) => update({ toolStackOther: e.target.value.slice(0, 200) })}
            placeholder={t.tools.otherPlaceholder}
            maxLength={200}
            className="bg-white border-[#E8E8ED] text-[#1D1D1F] placeholder:text-[#86868B] focus-visible:border-[#B8860B]/50 focus-visible:ring-[#B8860B]/20"
          />
        </div>
      </div>
    </V2StepLayout>
  );
}
