"use client";

import { useState } from "react";
import { FileText, ExternalLink, Mail, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
   Section 9: Two options — View Now or Get PDF
   ───────────────────────────────────────────── */
export function ShiryoDialog({ locale }: { locale: "en" | "ja" }) {
  const dict = dictionaries[locale];
  // ja.ts may not have shiryo yet — fall back to en
  const t =
    "shiryo" in dict.landing
      ? (dict.landing as typeof en.landing).shiryo
      : en.landing.shiryo;

  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handlePdfSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setLoading(true);
    // TODO: POST to /api/send-presentation when backend is ready

    // Simulate brief delay
    await new Promise((resolve) => setTimeout(resolve, 800));
    setSubmitted(true);
    setLoading(false);
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      // Reset state when dialog closes
      setEmail("");
      setSubmitted(false);
      setLoading(false);
    }
  };

  return (
    <Dialog onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <button className="text-sm text-zinc-400 hover:text-zinc-200 underline-offset-4 hover:underline transition-colors inline-flex items-center gap-1.5">
          <FileText className="size-3.5" />
          {t.buttonText}
        </button>
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

          {/* Option 2: Get the PDF */}
          <div className="rounded-lg border border-zinc-800/80 bg-zinc-900/50 p-5 transition-colors hover:border-zinc-700/80">
            <div className="flex items-start gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-emerald-500/20 bg-emerald-500/10">
                <Mail className="size-5 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-zinc-200 mb-1">
                  {t.getPdf.label}
                </h4>
                <p className="text-xs text-zinc-500 leading-relaxed mb-3">
                  {t.getPdf.body}
                </p>

                {submitted ? (
                  /* Success state */
                  <div className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/[0.06] px-3 py-2">
                    <Check className="size-4 text-emerald-400 shrink-0" />
                    <span className="text-xs text-emerald-300">
                      {t.getPdf.successMessage}
                    </span>
                  </div>
                ) : (
                  /* Email form */
                  <form
                    onSubmit={handlePdfSubmit}
                    className="flex gap-2 items-start"
                  >
                    <Input
                      type="email"
                      placeholder={t.getPdf.emailPlaceholder}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 h-8 text-xs bg-zinc-950 border-zinc-700 placeholder:text-zinc-600"
                    />
                    <Button
                      type="submit"
                      size="sm"
                      disabled={loading || !email.trim()}
                      className="bg-emerald-600 hover:bg-emerald-500 text-white h-8 text-xs shrink-0"
                    >
                      {loading ? (
                        <span className="flex items-center gap-1.5">
                          <span className="size-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        </span>
                      ) : (
                        t.getPdf.cta
                      )}
                    </Button>
                  </form>
                )}
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
