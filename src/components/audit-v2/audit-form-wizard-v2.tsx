"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Layers,
  ArrowLeft,
  Sparkles,
  Shield,
  Target,
  ListChecks,
  Building2,
  Wrench,
  Bot,
  Calculator,
  Lightbulb,
  Briefcase,
  MailCheck,
  Zap,
  Clock,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/landing/language-toggle";
import { ProgressBar } from "./shared/v2-progress-bar";
import { AuditV2LocaleProvider, useAuditV2Locale } from "./audit-v2-locale-context";
import { useAuditFormV2, type StepId } from "@/hooks/use-audit-form-v2";
import { segmentJapanese } from "@/lib/budoux-transform";
import { S1Tier } from "./steps/s1-tier";
import { S2Goals } from "./steps/s2-goals";
import { S3Rank } from "./steps/s3-rank";
import { S4Blockers } from "./steps/s4-blockers";
import { S5Company } from "./steps/s5-company";
import { S6Tools } from "./steps/s6-tools";
import { S7AI } from "./steps/s7-ai";
import { S8Process } from "./steps/s8-process";
import { S9RobotTask } from "./steps/s9-robot-task";
import { S10Qualification } from "./steps/s10-qualification";
import { S11Contact } from "./steps/s11-contact";
import { EmailReviewPopup } from "./email-review-popup";

const STEP_ICONS: Record<StepId, React.ElementType[]> = {
  tier: [Zap, Clock],
  "goals-select": [Target, Sparkles],
  "goals-rank": [ListChecks, Sparkles],
  blockers: [ListChecks, Lightbulb],
  company: [Building2, Sparkles],
  tools: [Wrench, Sparkles],
  ai: [Bot, Lightbulb],
  process: [Calculator, Sparkles],
  "robot-task": [Lightbulb, Sparkles],
  qualification: [Briefcase, Sparkles],
  contact: [MailCheck, Shield],
};

function V2Sidebar({ stepId }: { stepId: StepId | undefined }) {
  const { t } = useAuditV2Locale();
  if (!stepId) return null;
  const sidebar = t.sidebar.steps[stepId.replace("goals-select", "goals").replace("goals-rank", "rank") as keyof typeof t.sidebar.steps];
  if (!sidebar) return null;

  const icons = STEP_ICONS[stepId] || [Sparkles];

  return (
    <div className="hidden lg:block w-80 shrink-0">
      <div className="sticky top-28 space-y-6">
        <div className="rounded-xl border border-[#E8E8ED] bg-gradient-to-br from-[#F5F5F7] to-white p-6">
          <div className="flex items-center gap-2 mb-4">
            <span
              className="size-1.5 rounded-full bg-[#B8860B] agent-dot-pulse"
              aria-hidden
            />
            <h3 className="text-[11px] font-semibold text-[#B8860B] uppercase tracking-[0.12em]">
              Agent Brief · {segmentJapanese(sidebar.title)}
            </h3>
          </div>
          <div className="space-y-3">
            {sidebar.items.map((item, i) => {
              const Icon = icons[i % icons.length];
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

function AuditFormWizardV2Inner() {
  const form = useAuditFormV2();
  const { locale, setLocale, t } = useAuditV2Locale();
  const router = useRouter();

  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [animating, setAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (animating) {
      const timer = setTimeout(() => setAnimating(false), 300);
      return () => clearTimeout(timer);
    }
  }, [animating]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [form.stepIndex]);

  // Sync locale field on data
  useEffect(() => {
    form.update({ locale });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale]);

  const handleNext = () => {
    setDirection("forward");
    setAnimating(true);
    if (form.isLast) {
      form.submit(locale);
    } else {
      form.goNext();
    }
  };

  const handleBack = () => {
    setDirection("backward");
    setAnimating(true);
    form.goPrev();
  };

  const animationClass = animating
    ? direction === "forward"
      ? "animate-slide-in-right"
      : "animate-slide-in-left"
    : "";

  const renderStep = () => {
    const sharedProps = {
      data: form.data,
      update: form.update,
      onNext: handleNext,
      onBack: handleBack,
      isLoading: form.isLoading,
      error: form.error,
    };
    switch (form.currentStep) {
      case "tier":
        return <S1Tier {...sharedProps} />;
      case "goals-select":
        return <S2Goals {...sharedProps} />;
      case "goals-rank":
        return <S3Rank {...sharedProps} />;
      case "blockers":
        return <S4Blockers {...sharedProps} />;
      case "company":
        return <S5Company {...sharedProps} updateCompany={form.updateCompany} />;
      case "tools":
        return <S6Tools {...sharedProps} />;
      case "ai":
        return <S7AI {...sharedProps} />;
      case "process":
        return <S8Process {...sharedProps} />;
      case "robot-task":
        return <S9RobotTask {...sharedProps} />;
      case "qualification":
        return (
          <S10Qualification
            {...sharedProps}
            updateQualification={form.updateQualification}
          />
        );
      case "contact":
        return (
          <S11Contact
            {...sharedProps}
            updateContact={form.updateContact}
            isLast
          />
        );
      default:
        return null;
    }
  };

  const isHero = form.currentStep === "tier";
  const featureChipIcons = [Target, Shield, Sparkles];

  return (
    <div
      lang={locale}
      className={`min-h-screen bg-white text-[#1D1D1F] ${locale === "ja" ? "audit-ja" : ""}`}
    >
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-[#E8E8ED] bg-white/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2 text-lg font-bold tracking-tight">
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

      {isHero && (
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
                const Icon = featureChipIcons[i] || Sparkles;
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

      <div className={isHero ? "pb-4 px-6" : "pt-24 sm:pt-28 pb-4 px-6"}>
        <div className="mx-auto max-w-xl">
          <ProgressBar currentStep={form.stepIndex} totalSteps={form.totalSteps} />
        </div>
      </div>

      <section className={isHero ? "pb-20 sm:pb-28" : "py-8 sm:py-12"}>
        <div className="mx-auto max-w-5xl px-6">
          <div className="flex gap-12 items-start">
            <div className="flex-1 min-w-0 max-w-2xl" ref={containerRef}>
              <div className={`${animationClass}`}>{renderStep()}</div>
            </div>
            <V2Sidebar stepId={form.currentStep} />
          </div>
        </div>
      </section>

      <footer className="border-t border-[#E8E8ED] py-12">
        <div className="mx-auto max-w-6xl px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-2 text-sm font-semibold text-[#6E6E73]">
            <Layers className="size-5 text-[#B8860B]" />
            <span>Mottodigital</span>
          </Link>
          <div className="flex items-center gap-6 text-sm text-[#86868B]">
            <Link href="/" className="hover:text-[#6E6E73] transition-colors">
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

      {form.isComplete && (
        <EmailReviewPopup
          name={form.data.contact.name}
          onClose={() => router.push("/")}
        />
      )}
    </div>
  );
}

export function AuditFormWizardV2() {
  return (
    <AuditV2LocaleProvider>
      <AuditFormWizardV2Inner />
    </AuditV2LocaleProvider>
  );
}
