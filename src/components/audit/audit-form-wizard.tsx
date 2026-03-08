"use client";

import { useRef, useState, useEffect } from "react";
import { useAuditForm } from "@/hooks/use-audit-form";
import { ProgressBar } from "./shared/progress-bar";
import { AuditSuccess } from "./audit-success";
import { Step1Email } from "./steps/step-1-email";
import { Step2AboutYou } from "./steps/step-2-about-you";
import { Step3Company } from "./steps/step-3-company";
import { Step4Tools } from "./steps/step-4-tools";
import { Step5Challenges } from "./steps/step-5-challenges";
import { Step6AI } from "./steps/step-6-ai";
import { Step7Logistics } from "./steps/step-7-logistics";
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
} from "lucide-react";
import Link from "next/link";

const FEATURE_CHIPS = [
  { icon: FileText, label: "Custom report" },
  { icon: Clock, label: "Live walkthrough call" },
  { icon: Sparkles, label: "Yours to keep, free" },
];

// ---------------------------------------------------------------------------
// Sidebar content per step
// ---------------------------------------------------------------------------

interface SidebarContent {
  title: string;
  items: { icon: React.ElementType; text: string }[];
  highlight?: string;
  testimonial?: { quote: string; author: string; role: string };
}

const SIDEBAR_CONTENT: Record<number, SidebarContent> = {
  0: {
    title: "What you'll get",
    items: [
      { icon: FileText, text: "Custom AI readiness report tailored to your business" },
      { icon: Clock, text: "30-min live walkthrough call with Lewis" },
      { icon: Sparkles, text: "Actionable recommendations you can implement immediately" },
      { icon: Shield, text: "100% free, no strings attached" },
    ],
  },
  1: {
    title: "You're in good company",
    items: [
      { icon: Users, text: "50+ companies have taken the audit" },
      { icon: TrendingUp, text: "Average 40% efficiency gain after implementation" },
    ],
    testimonial: {
      quote: "The audit opened our eyes to automation opportunities we never considered. Highly recommended.",
      author: "Takeshi M.",
      role: "CEO, Tech Startup",
    },
  },
  2: {
    title: "Why we ask this",
    items: [
      { icon: Users, text: "Company size determines the right AI strategy" },
      { icon: TrendingUp, text: "We tailor recommendations to your team's scale" },
    ],
    testimonial: {
      quote: "Lewis understood our company's unique challenges from the start. The report was spot-on.",
      author: "Yuki S.",
      role: "COO, Manufacturing",
    },
  },
  3: {
    title: "Making progress!",
    items: [
      { icon: Zap, text: "Your tool stack helps us identify quick wins" },
      { icon: CheckCircle2, text: "We'll map integration opportunities across your tools" },
    ],
    highlight: "Most companies have 3-5 automation opportunities hiding in their current stack.",
  },
  4: {
    title: "Great insights!",
    items: [
      { icon: Zap, text: "Understanding your pain points helps us prioritize" },
      { icon: CheckCircle2, text: "Each challenge maps to a specific AI solution" },
    ],
    highlight: "Companies typically save 15-20 hours per week after addressing their top 3 challenges.",
  },
  5: {
    title: "Almost there!",
    items: [
      { icon: TrendingUp, text: "Your vision shapes our roadmap recommendations" },
      { icon: Sparkles, text: "We'll match your ambitions with realistic timelines" },
    ],
    highlight: "85% of audit recipients start implementing within the first month.",
  },
  6: {
    title: "One click away!",
    items: [
      { icon: CheckCircle2, text: "Your custom audit report will be ready within 48 hours" },
      { icon: Shield, text: "No sales pressure, no obligations" },
      { icon: Sparkles, text: "The full report is yours to keep forever" },
    ],
  },
};

function AuditSidebar({ step }: { step: number }) {
  const content = SIDEBAR_CONTENT[step];
  if (!content) return null;

  return (
    <div className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-28 space-y-6">
        <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-6">
          <h3 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-4">
            {content.title}
          </h3>
          <div className="space-y-3">
            {content.items.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <item.icon className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                <p className="text-sm text-zinc-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>

          {content.highlight && (
            <div className="mt-5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 p-4">
              <p className="text-xs text-indigo-300 leading-relaxed">
                {content.highlight}
              </p>
            </div>
          )}

          {content.testimonial && (
            <div className="mt-5 pt-5 border-t border-zinc-800/50">
              <p className="text-sm text-zinc-400 italic leading-relaxed mb-3">
                &ldquo;{content.testimonial.quote}&rdquo;
              </p>
              <div>
                <p className="text-sm font-medium text-zinc-300">
                  {content.testimonial.author}
                </p>
                <p className="text-xs text-zinc-500">{content.testimonial.role}</p>
              </div>
            </div>
          )}
        </div>

        {/* Trust badge */}
        <div className="flex items-center gap-2 px-2">
          <Shield className="size-4 text-emerald-400" />
          <p className="text-xs text-zinc-500">
            Your data is encrypted and never shared with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}

export function AuditFormWizard() {
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

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && currentStep > 0) {
        handleBack();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  if (isComplete) {
    return <AuditSuccess />;
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
          <Step4Tools
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
          <Step5Challenges
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
          <Step6AI
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
          <Step7Logistics
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
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline">Back to Home</span>
          </Link>
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
                Free &middot; No Obligation
              </Badge>
            </div>
            <h1 className="animate-fade-in-up animation-delay-100 text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-[1.1]">
              Get Your Free{" "}
              <span className="gradient-text">AI Audit</span>
            </h1>
            <p className="animate-fade-in-up animation-delay-200 mt-4 text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
              Answer a few quick questions and Lewis will personally put together
              a custom AI readiness audit &mdash; then walk you through it on a
              call. The full report is yours to keep, completely free.
            </p>
            <div className="animate-fade-in-up animation-delay-300 mt-6 flex flex-wrap items-center justify-center gap-3">
              {FEATURE_CHIPS.map((chip) => (
                <div
                  key={chip.label}
                  className="flex items-center gap-2 rounded-full border border-zinc-800/50 bg-zinc-900/50 px-4 py-2 text-sm text-zinc-300"
                >
                  <chip.icon className="size-4 text-indigo-400" />
                  <span>{chip.label}</span>
                </div>
              ))}
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
