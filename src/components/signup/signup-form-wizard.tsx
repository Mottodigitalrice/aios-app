"use client";

import { useRef, useState, useEffect } from "react";
import { useSignupForm } from "@/hooks/use-signup-form";
import { SignupLocaleProvider, useSignupLocale } from "./signup-locale-context";
import { LanguageToggle } from "@/components/landing/language-toggle";
import { SignupSuccess } from "./signup-success";
import { Step1Track } from "./steps/step-1-track";
import { Step2AboutYou } from "./steps/step-2-about-you";
import { Step3Goals } from "./steps/step-3-goals";
import { Step4GettingStarted } from "./steps/step-4-getting-started";
import { Step5Review } from "./steps/step-5-review";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  ArrowLeft,
  Sparkles,
  Shield,
  Users,
  TrendingUp,
  CheckCircle2,
  Zap,
  Target,
  Check,
} from "lucide-react";
import Link from "next/link";

// ---------------------------------------------------------------------------
// Progress bar (self-contained for signup)
// ---------------------------------------------------------------------------

function SignupProgressBar({
  currentStep,
  totalSteps,
}: {
  currentStep: number;
  totalSteps: number;
}) {
  const { t } = useSignupLocale();
  const progress = ((currentStep + 1) / totalSteps) * 100;
  const encouragement =
    t.progressBar?.[currentStep as keyof typeof t.progressBar];

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-500">
            {t.common.stepOf
              .replace("{current}", String(currentStep + 1))
              .replace("{total}", String(totalSteps))}
          </span>
          {currentStep > 0 && (
            <div key={currentStep} className="animate-check-pop">
              <Check className="size-3.5 text-emerald-400" />
            </div>
          )}
        </div>
        <span className="text-xs text-zinc-500">{Math.round(progress)}%</span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-zinc-800/50 overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-indigo-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
      {encouragement && (
        <div
          key={currentStep}
          className="flex items-center justify-between mt-2 animate-encourage"
        >
          <span className="text-xs font-medium text-indigo-400">
            {encouragement.text}
          </span>
          <span className="text-xs text-zinc-600">
            {encouragement.timeLeft}
          </span>
        </div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Sidebar content per step
// ---------------------------------------------------------------------------

function SignupSidebar({ step }: { step: number }) {
  const { t } = useSignupLocale();
  const sidebarStep = t.sidebar.steps[step as keyof typeof t.sidebar.steps];
  if (!sidebarStep) return null;

  const ICONS = [
    [Zap, Target, Shield, CheckCircle2],
    [Users, TrendingUp],
    [Target, Zap],
    [CheckCircle2, Sparkles, Shield],
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
                  <p className="text-sm text-zinc-300 leading-relaxed">
                    {item}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trust badge */}
        <div className="flex items-center gap-2 px-2">
          <Shield className="size-4 text-emerald-400" />
          <p className="text-xs text-zinc-500">{t.sidebar.trustBadge}</p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Inner wizard (needs locale context)
// ---------------------------------------------------------------------------

function SignupFormWizardInner() {
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
  } = useSignupForm();

  const { locale, setLocale, t } = useSignupLocale();

  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Read URL params on mount for track pre-selection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const urlTrack = params.get("track");
    const urlPlan = params.get("plan");

    if (urlTrack === "cohort" || urlTrack === "corporate") {
      updateField("track", urlTrack);
    }
    if (urlPlan === "monthly" || urlPlan === "full") {
      updateField("plan", urlPlan);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Clear animation after transition
  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  // Keyboard support -- Escape goes back
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
    return <SignupSuccess />;
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
    submitFinal();
  };

  const animationClass = animating
    ? direction === "forward"
      ? "animate-slide-in-right"
      : "animate-slide-in-left"
    : "";

  const FEATURE_CHIPS_ICONS = [Zap, Shield, Sparkles];

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Step1Track
            formData={formData}
            updateField={updateField}
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
          <Step3Goals
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
          <Step4GettingStarted
            formData={formData}
            updateField={updateField}
            onNext={handleNext}
            onBack={handleBack}
            isLoading={isLoading}
            error={error}
            fieldErrors={fieldErrors}
          />
        );
      case 4:
        return (
          <Step5Review
            formData={formData}
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

      {/* Hero -- only on first step */}
      {currentStep === 0 && (
        <section className="relative pt-32 pb-8 sm:pt-40 sm:pb-12 radial-glow">
          <div className="mx-auto max-w-2xl px-6 text-center">
            <div className="animate-fade-in-up">
              <Badge
                variant="outline"
                className="mb-6 border-indigo-500/30 text-indigo-300 bg-indigo-500/10"
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

      {/* Progress bar -- shown from step 2 onwards */}
      {currentStep > 0 && (
        <div className="pt-24 sm:pt-28 pb-4 px-6">
          <div className="mx-auto max-w-xl">
            <SignupProgressBar
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
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
            <SignupSidebar step={currentStep} />
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

// ---------------------------------------------------------------------------
// Exported wrapper with locale provider
// ---------------------------------------------------------------------------

export function SignupFormWizard() {
  return (
    <SignupLocaleProvider>
      <SignupFormWizardInner />
    </SignupLocaleProvider>
  );
}
