"use client";

import React from "react";
import { FileText, ExternalLink, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import en from "@/lib/i18n/dictionaries/en";
import ja from "@/lib/i18n/dictionaries/ja";

const dictionaries = { en, ja } as const;

/* ─────────────────────────────────────────────
   ShiryoDialog — Presentation download dialog
   Section 9: Two options — View Now or Download PDF
   ───────────────────────────────────────────── */
export function ShiryoDialog({ locale, trigger }: { locale: "en" | "ja"; trigger?: React.ReactNode }) {
  const dict = dictionaries[locale];
  // ja.ts may not have shiryo yet — fall back to en
  const t =
    "shiryo" in dict.landing
      ? (dict.landing as typeof en.landing).shiryo
      : en.landing.shiryo;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger ?? (
          <button className="text-sm text-zinc-400 hover:text-zinc-200 underline-offset-4 hover:underline transition-colors inline-flex items-center gap-1.5">
            <FileText className="size-3.5" />
            {t.buttonText}
          </button>
        )}
      </DialogTrigger>

      <DialogContent className="bg-zinc-950 border-zinc-800 sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-zinc-100">
            {t.dialogTitle}
          </DialogTitle>
          <DialogDescription className="text-zinc-400">
            {t.dialogSubtitle}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 mt-2">
          {/* Option 1: View Now */}
          <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700/80">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-indigo-500/20 bg-indigo-500/10">
                <ExternalLink className="size-5 text-indigo-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-zinc-200 mb-1">
                  {t.viewNow.label}
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                  {t.viewNow.body}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200"
                  onClick={() => window.open("/presentation", "_blank")}
                >
                  {t.viewNow.cta}
                  <ExternalLink className="size-3.5 ml-1" />
                </Button>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-zinc-800" />
            <span className="text-xs text-zinc-600 uppercase tracking-wider">
              {locale === "ja" ? "または" : "or"}
            </span>
            <div className="flex-1 h-px bg-zinc-800" />
          </div>

          {/* Option 2: Download PDF */}
          <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700/80">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                <Download className="size-5 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-zinc-200 mb-1">
                  {t.getPdf.label}
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                  {t.getPdf.body}
                </p>
                <a href="/aios-overview.pdf" download>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-emerald-500/30 text-emerald-300 hover:bg-emerald-500/10 hover:text-emerald-200"
                  >
                    {t.getPdf.cta}
                    <Download className="size-3.5 ml-1" />
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/* ─────────────────────────────────────────────
   Exported trigger button for external use
   ───────────────────────────────────────────── */
export { DialogTrigger as ShiryoTrigger } from "@/components/ui/dialog";
