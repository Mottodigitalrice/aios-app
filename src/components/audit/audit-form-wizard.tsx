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
        <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-6">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
            {sidebarStep.title}
          </h3>
          <div className="space-y-3">
            {sidebarStep.items.map((item, i) => {
              const Icon = stepIcons[i % stepIcons.length];
              return (
                <div key={i} className="flex items-start gap-3">
                  <Icon className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-300 leading-relaxed">{item}</p>
                </div>
              );
            })}
          </div>

          {"highlight" in sidebarStep && sidebarStep.highlight && (
            <div className="mt-5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-4">
              <p className="text-xs text-indigo-300 leading-relaxed">
                {sidebarStep.highlight}
              </p>
            </div>
          )}

          {"testimonial" in sidebarStep && sidebarStep.testimonial && (
            <div className="mt-5 pt-5 border-t border-zinc-800/50">
              <p className="text-sm text-zinc-400 italic leading-relaxed mb-3">
                &ldquo;{sidebarStep.testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium text-zinc-300">
                  {sidebarStep.testimonial.author}
                </p>
                <p className="text-xs text-zinc-500">{sidebarStep.testimonial.role}</p>
              </div>
            </div>
          )}
        </div>

        {/* Trust badge */}
        <div className="flex items-center gap-2 px-2">
          <Shield className="size-4 text-emerald-400" />
          <p className="text-xs text-zinc-500">
            {t.sidebar.trustBadge}
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
  const prevStep = useRef(currentStep);
  const containerRef = useRef<HTMLDivElement>(null);

  // Track step direction for animation
  useEffect(() => {
    if (currentStep !== prevStep.current) {
      setDirection(currentStep > prevStep.current ? "forward" : "backward");
      setAnimating(true);
      prevStep.current = currentStep;
      const timer = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  // Keyboard support — Escape goes back
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && currentStep > 0) {
        handleBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  if (isComplete) {
    return <AuditSuccess perspective={formData.perspective || undefined} />;
  }

  const handleNext = () => {
    setDirection("forward");
    goToNext();
  };

  const handleBack = () => {
    setDirection("backward");
    setError(null);
    goToPrev();
  };

  const handleSubmit = () => {
    setDirection("forward");
    submitFinal();
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
    <div className="min-h-screen bg-zinc-950 text-zinc-100 grid-pattern">
      {/* Fixed Navigation */}
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

      {/* Hero — only on first step */}
      {currentStep === 0 && (
        <section className="relative pt-32 pb-8 sm:pt-40 sm:pb-12 radial-glow">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <div className="animate-fade-in-up">
              <Badge
                variant="outline"
                className="mb-6 border-emerald-500/30 text-emerald-300 bg-emerald-500/10"
              >
                {t.badge}
              </Badge>
            </div>
            <h1 className="animate-fade-in-up animation-delay-100 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              {t.title}{" "}
              <span className="gradient-text">{t.titleHighlight}</span>
            </h1>
            <p className="animate-fade-in-up animation-delay-200 mt-4 text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
            <div className="animate-fade-in-up animation-delay-300 mt-6 flex flex-wrap items-center justify-center gap-3">
              {t.chips.map((chip, i) => {
                const Icon = FEATURE_CHIPS_ICONS[i] || Sparkles;
                return (
                  <div
                    key={chip}
                    className="flex items-center gap-2 rounded-full border border-zinc-800/50 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300"
                  >
                    <Icon className="size-4 text-indigo-400" />
                    <span>{chip}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Progress bar — shown from step 2 onwards */}
      {currentStep > 0 && (
        <div className="pt-24 sm:pt-28 pb-4 px-6">
          <div className="mx-auto max-w-xl">
            <ProgressBar currentStep={currentStep} totalSteps={totalSteps} />
          </div>
        </div>
      )}

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
            <Link
              href="/"
              className="hover:text-zinc-300 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/privacy"
              className="hover:text-zinc-300 transition-colors"
            >
              Privacy
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
