"use client";

import { useRef, useState, useEffect } from "react";
import { useAuditForm } from "@/hooks/use-audit-form";
import { AuditLocaleProvider, useAuditLocale } from "./audit-locale-context";
import { LanguageToggle } from "@/components/landing/language-toggle";
import { ProgressBar } from "./shared/progress-bar";
import { AuditSuccess } from "./audit-success";
import { Step1Email } from "./steps/step-1-email";
import { Step2AboutYou } from "./steps/step-2-about-you";
import { Step3Company } from "./steps/step-3-company";
import { Step4Data } from "./steps/step-4-data";
import { Step5Tools } from "./steps/step-5-tools";
import { Step6Challenges } from "./steps/step-6-challenges";
import { Step7AI } from "./steps/step-7-ai";
import { Step8Logistics } from "./steps/step-8-logistics";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  ArrowLeft,
  FileText,
  Clock,
  Sparkles,
  Shield,
  Users,
  TrendingUp,
  CheckCircle2,
  Zap,
  Database,
} from "lucide-react";
import Link from "next/link";
import { segmentJapanese } from "@/lib/budoux-transform";

// ---------------------------------------------------------------------------
// Sidebar content per step (now locale-driven)
// ---------------------------------------------------------------------------

function AuditSidebar({ step }: { step: number }) {
  const { t } = useAuditLocale();
  const sidebarStep = t.sidebar.steps[step as keyof typeof t.sidebar.steps];
  if (!sidebarStep) return null;

  const ICONS = [
    [FileText, Clock, Sparkles, Shield],
    [Users, TrendingUp, Sparkles],
    [Users, TrendingUp],
    [Database, CheckCircle2],
    [Zap, CheckCircle2],
    [Zap, CheckCircle2],
    [TrendingUp, Sparkles],
    [TrendingUp, Sparkles],
    [CheckCircle2, Shield, Sparkles],
  ];

  const stepIcons = ICONS[step] || [Sparkles];

  return (
    <div className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-28 space-y-6">
        <div className="rounded-xl border border-[#E8E8ED] bg-gradient-to-br from-[#F5F5F7] to-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <span className="size-1.5 rounded-full bg-[#B8860B] agent-dot-pulse" aria-hidden />
            <h3 className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-[0.12em]">
              Agent Brief · {segmentJapanese(sidebarStep.title)}
            </h3>
          </div>
          <div className="space-y-3">
            {sidebarStep.items.map((item, i) => {
              const Icon = stepIcons[i % stepIcons.length];
              return (
                <div key={i} className="flex items-start gap-3">
                  <Icon className="size-4 text-[#B8860B] mt-0.5 shrink-0" />
                  <p className="text-sm text-[#6E6E73] leading-relaxed">
                    {segmentJapanese(item)}
                  </p>
                </div>
              );
            })}
          </div>

        </div>

        {/* Trust badge */}
        <div className="flex items-center gap-2 px-2">
          <Shield className="size-4 text-[#1B7D5A]" />
          <p className="text-xs text-[#86868B]">
            {segmentJapanese(t.sidebar.trustBadge)}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inner wizard (needs locale context)
// ---------------------------------------------------------------------------

function AuditFormWizardInner() {
  const {
    currentStep,
    totalSteps,
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
  } = useAuditForm();

  const { locale, setLocale, t } = useAuditLocale();

  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Clear animation after transition
  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  // Keyboard support — Escape goes back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && currentStep > 0) {
        setDirection("backward");
        setAnimating(true);
        setError(null);
        goToPrev();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, goToPrev, setError]);

  if (isComplete) {
    return <AuditSuccess perspective={formData.perspective || undefined} />;
  }

  const handleNext = () => {
    setDirection("forward");
    setAnimating(true);
    goToNext();
  };

  const handleBack = () => {
    setDirection("backward");
    setAnimating(true);
    setError(null);
    goToPrev();
  };

  const handleSubmit = () => {
    setDirection("forward");
    submitFinal(locale);
  };

  const animationClass = animating
    ? direction === "forward"
      ? "animate-slide-in-right"
      : "animate-slide-in-left"
    : "";

  const FEATURE_CHIPS_ICONS = [FileText, Clock, Sparkles];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1Email
            formData={formData}
            updateField={updateField}
            validateField={validateField}
            onNext={handleNext}
            isLoading={isLoading}
            error={error}
            fieldErrors={fieldErrors}
          />
        );
      case 1:
        return (
          <Step2AboutYou
            formData={formData}
            updateField={updateField}
            validateField={validateField}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
            error={error}
            fieldErrors={fieldErrors}
          />
        );
      case 2:
        return (
          <Step3Company
            formData={formData}
            updateField={updateField}
            validateField={validateField}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
            error={error}
            fieldErrors={fieldErrors}
          />
        );
      case 3:
        return (
          <Step4Data
            formData={formData}
            updateField={updateField}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
            error={error}
          />
        );
      case 4:
        return (
          <Step5Tools
            formData={formData}
            updateField={updateField}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
            error={error}
          />
        );
      case 5:
        return (
          <Step6Challenges
            formData={formData}
            updateField={updateField}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
            error={error}
          />
        );
      case 6:
        return (
          <Step7AI
            formData={formData}
            updateField={updateField}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
            error={error}
          />
        );
      case 7:
        return (
          <Step8Logistics
            formData={formData}
            updateField={updateField}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isLoading={isLoading}
            error={error}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      lang={locale}
      className={`min-h-screen bg-white text-[#1D1D1F] ${locale === "ja" ? "audit-ja" : ""}`}
    >
      {/* Fixed Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#E8E8ED] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-bold tracking-tight"
          >
            <Layers className="size-6 text-[#B8860B]" />
            <span>Mottodigital</span>
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

      {/* Hero — only on first step */}
      {currentStep === 0 && (
        <section className="relative pt-32 pb-8 sm:pt-40 sm:pb-12">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <div className="animate-fade-in-up">
              <Badge
                variant="outline"
                className="mb-6 border-[#1B7D5A]/20 text-[#1B7D5A] bg-[#1B7D5A]/10"
              >
                {t.badge}
              </Badge>
            </div>
            <h1 className="animate-fade-in-up animation-delay-100 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.15]">
              {segmentJapanese(t.title)}{" "}
              <span className="gradient-text">{segmentJapanese(t.titleHighlight)}</span>
            </h1>
            <p className="animate-fade-in-up animation-delay-200 mt-5 text-lg text-[#6E6E73] max-w-xl mx-auto leading-[1.7]">
              {segmentJapanese(t.subtitle)}
            </p>
            <div className="animate-fade-in-up animation-delay-300 mt-6 flex flex-wrap items-center justify-center gap-3">
              {t.chips.map((chip, i) => {
                const Icon = FEATURE_CHIPS_ICONS[i] || Sparkles;
                return (
                  <div
                    key={chip}
                    className="flex items-center gap-2 rounded-full border border-[#E8E8ED] bg-[#F5F5F7] px-4 py-2 text-sm text-[#6E6E73]"
                  >
                    <Icon className="size-4 text-[#B8860B]" />
                    <span>{segmentJapanese(chip)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Progress bar — shown on all steps (below hero on step 0, top on later steps) */}
      <div className={currentStep === 0 ? "pb-4 px-6" : "pt-24 sm:pt-28 pb-4 px-6"}>
        <div className="mx-auto max-w-xl">
          <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
        </div>
      </div>

      {/* Step content + sidebar */}
      <section
        className={currentStep === 0 ? "pb-20 sm:pb-28" : "py-8 sm:py-12"}
      >
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex gap-12 items-start">
            <div className="flex-1 min-w-0 max-w-2xl" ref={containerRef}>
              <div className={`${animationClass}`}>{renderStep()}</div>
            </div>
            <AuditSidebar step={currentStep} />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#E8E8ED] py-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm font-semibold text-[#6E6E73]"
          >
            <Layers className="size-5 text-[#B8860B]" />
            <span>Mottodigital</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-[#86868B]">
            <Link
              href="/"
              className="hover:text-[#6E6E73] transition-colors"
            >
              {t.nav.home}
            </Link>
            <Link
              href={locale === "ja" ? "/privacy?lang=ja" : "/privacy"}
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

// ---------------------------------------------------------------------------
// Exported wrapper with locale provider
// ---------------------------------------------------------------------------

export function AuditFormWizard() {
  return (
    <AuditLocaleProvider>
      <AuditFormWizardInner />
    </AuditLocaleProvider>
  );
}
