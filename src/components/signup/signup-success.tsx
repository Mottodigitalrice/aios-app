"use client";

import { Button } from "@/components/ui/button";
import {
  Layers,
  CheckCircle2,
  ArrowLeft,
  Mail,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useSignupLocale } from "./signup-locale-context";
import { LanguageToggle } from "@/components/landing/language-toggle";

export function SignupSuccess() {
  const { locale, setLocale, t } = useSignupLocale();
  const s = t.success;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 grid-pattern">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight"
          >
            <Layers className="size-6 text-indigo-400" />
            <span>MOTTO Digital</span>
          </Link>
          <div className="flex items-center gap-4">
            <LanguageToggle locale={locale} onToggle={setLocale} />
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">{t.nav.backToHome}</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Success content */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 radial-glow">
        <div className="mx-auto max-w-2xl px-6">
          {/* Success icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="animate-check-pop size-20 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center">
                <CheckCircle2 className="size-10 text-emerald-400" />
              </div>
              <div className="absolute inset-0 animate-ping size-20 rounded-full bg-emerald-500/10" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {s.title}
            </h1>
            <p className="text-lg text-zinc-400 leading-relaxed max-w-xl mx-auto">
              {s.subtitle}
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-0 mb-12">
            {s.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="size-8 rounded-full bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-indigo-400">
                      {i + 1}
                    </span>
                  </div>
                  {i < s.steps.length - 1 && (
                    <div className="w-px h-12 bg-zinc-800/50" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-sm font-semibold text-zinc-100 mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-zinc-400 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-6 mb-8">
            <p className="text-sm text-zinc-400 mb-3">{s.contactPrompt}</p>
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-indigo-400 shrink-0" />
              <a
                href={`mailto:${s.contactEmail}`}
                className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {s.contactEmail}
              </a>
            </div>
          </div>

          {/* Back to home */}
          <div className="text-center">
            <Link href="/">
              <Button
                variant="outline"
                className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-zinc-100 gap-2"
              >
                <ArrowRight className="size-4" />
                {s.backHome}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-zinc-400"
          >
            <Layers className="size-5 text-indigo-400" />
            <span>MOTTO Digital</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-zinc-500">
            <Link href="/" className="hover:text-zinc-300 transition-colors">
              {t.nav.home}
            </Link>
            <Link
              href="/privacy"
              className="hover:text-zinc-300 transition-colors"
            >
              {t.nav.privacy}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
