"use client";

import { useEffect } from "react";
import { useAuditV2Locale } from "./audit-v2-locale-context";
import { TidyCalEmbed } from "@/components/audit/tidycal-embed";
import { segmentJapanese } from "@/lib/budoux-transform";
import { Sparkles, Handshake, X } from "lucide-react";

interface Props {
  name: string;
  onClose: () => void;
}

export function EmailReviewPopup({ name, onClose }: Props) {
  const { t } = useAuditV2Locale();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const renderBody = (str: string) => {
    // Render **bold** segments inline
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((p, i) =>
      p.startsWith("**") && p.endsWith("**") ? (
        <strong key={i} className="text-[#1D1D1F] font-semibold">
          {segmentJapanese(p.slice(2, -2))}
        </strong>
      ) : (
        <span key={i}>{segmentJapanese(p)}</span>
      )
    );
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm overflow-y-auto overscroll-contain">
      <div className="min-h-full flex items-start justify-center p-3 sm:p-6">
        <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl my-4 sm:my-8 animate-fade-in-up overflow-hidden">
          <button
            type="button"
            onClick={onClose}
            aria-label={t.popup.close}
            className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 inline-flex size-9 items-center justify-center rounded-full bg-white/90 text-[#6E6E73] shadow-sm ring-1 ring-[#E8E8ED] hover:text-[#1D1D1F] hover:bg-white transition-colors"
          >
            <X className="size-4" />
          </button>
          <div className="p-6 sm:p-10 border-b border-[#E8E8ED]">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="size-5 text-[#B8860B]" />
              <span className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-[0.12em]">
                {t.badge}
              </span>
            </div>
            <h2 className="text-xl sm:text-3xl font-bold text-[#1D1D1F] mb-4 leading-[1.3]">
              {segmentJapanese(t.popup.title.replace("{name}", name || "—"))}
            </h2>
            <p className="text-sm sm:text-base text-[#6E6E73] leading-[1.7] mb-3">
              {renderBody(t.popup.body)}
            </p>
            <p className="text-sm sm:text-base text-[#6E6E73] leading-[1.7] mb-5">
              {renderBody(t.popup.bodyConsult)}
            </p>
            <div className="rounded-xl border border-[#1B7D5A]/20 bg-[#1B7D5A]/5 p-4 flex items-start gap-3">
              <Handshake className="size-5 text-[#1B7D5A] shrink-0 mt-0.5" />
              <p className="text-sm text-[#1D1D1F] leading-relaxed">
                {segmentJapanese(t.popup.promise)}
              </p>
            </div>
          </div>

          <div className="p-6 sm:p-10">
            <h3 className="text-base font-semibold text-[#1D1D1F] mb-4">
              {segmentJapanese(t.popup.cta)}
            </h3>
            <TidyCalEmbed path="rice/aios-consult" />
            <div className="mt-6 text-center">
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-[#86868B] underline decoration-dotted underline-offset-4 hover:text-[#1D1D1F] transition-colors"
              >
                {segmentJapanese(t.popup.maybeLater)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
