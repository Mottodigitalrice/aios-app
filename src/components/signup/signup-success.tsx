"use client";

import { Button } from "@/components/ui/button";
import {
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
    <div className="min-h-screen bg-white text-[#1D1D1F]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#E8E8ED] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="text-lg font-bold tracking-tight"
          >
            MOTTO Digital
          </Link>
          <div className="flex items-center gap-4">
            <LanguageToggle locale={locale} onToggle={setLocale} />
            <Link
              href="/"
              className="flex items-center gap-2 text-sm text-[#6E6E73] hover:text-[#1D1D1F] transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span className="hidden sm:inline">{t.nav.backToHome}</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Success content */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
        <div className="mx-auto max-w-2xl px-6">
          {/* Success icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="animate-check-pop size-20 rounded-full bg-[#1B7D5A]/10 border border-[#1B7D5A]/20 flex items-center justify-center">
                <CheckCircle2 className="size-10 text-[#1B7D5A]" />
              </div>
              <div className="absolute inset-0 animate-ping size-20 rounded-full bg-[#1B7D5A]/10" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              {s.title}
            </h1>
            <p className="text-lg text-[#6E6E73] leading-relaxed max-w-xl mx-auto">
              {s.subtitle}
            </p>
          </div>

          {/* Timeline */}
          <div className="space-y-0 mb-12">
            {s.steps.map((step, i) => (
              <div key={i} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <div className="size-8 rounded-full bg-[#B8860B]/10 border border-[#B8860B]/20 flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-[#B8860B]">
                      {i + 1}
                    </span>
                  </div>
                  {i < s.steps.length - 1 && (
                    <div className="w-px h-12 bg-[#E8E8ED]" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-sm font-semibold text-[#1D1D1F] mb-1">
                    {step.title}
                  </h3>
                  <p className="text-sm text-[#6E6E73] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div className="rounded-xl border border-[#E8E8ED] bg-[#F5F5F7] p-6 mb-8">
            <p className="text-sm text-[#6E6E73] mb-3">{s.contactPrompt}</p>
            <div className="flex items-center gap-2">
              <Mail className="size-4 text-[#B8860B] shrink-0" />
              <a
                href={`mailto:${s.contactEmail}`}
                className="text-sm text-[#B8860B] hover:text-[#B8860B] transition-colors"
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
                className="border-[#E8E8ED] text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#1D1D1F] gap-2"
              >
                <ArrowRight className="size-4" />
                {s.backHome}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8E8ED] py-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="text-sm font-semibold text-[#6E6E73]"
          >
            MOTTO Digital
          </Link>
          <div className="flex items-center gap-6 text-sm text-[#86868B]">
            <Link href="/" className="hover:text-[#6E6E73] transition-colors">
              {t.nav.home}
            </Link>
            <Link
              href="/privacy"
              className="hover:text-[#6E6E73] transition-colors"
            >
              {t.nav.privacy}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
