"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Layers,
  Database,
  Zap,
  Check,
  ArrowRight,
  Calendar,
  ShieldCheck,
  User,
  Mail,
  Linkedin,
  Brain,
  TrendingUp,
  Clock,
  Users,
  FileText,
  X,
  Timer,
} from "lucide-react";
import { MobileNav } from "@/components/landing/mobile-nav";
import { FAQSection } from "@/components/landing/faq-section";
import { HeroOrgVisual } from "@/components/landing/hero-org-visual";
import { LanguageToggle } from "@/components/landing/language-toggle";
import { AnimateInView, CountUp } from "@/components/landing/animate-in-view";
import { BrainBodySection } from "@/components/landing/brain-body-section";
import { AgentOrgChart } from "@/components/landing/agent-org-chart";
import { AIOSPyramid } from "@/components/landing/aios-pyramid";

import { METRICS } from "@/lib/constants";
import en from "@/lib/i18n/dictionaries/en";
import ja from "@/lib/i18n/dictionaries/ja";

const dictionaries = { en, ja } as const;

function getInitialLocale(): "en" | "ja" {
  if (typeof window === "undefined") return "en";
  const params = new URLSearchParams(window.location.search);
  const urlLocale = params.get("lang");
  if (urlLocale === "ja" || urlLocale === "en") return urlLocale;
  return "en";
}

export default function HomePage() {
  const [locale, setLocale] = useState<"en" | "ja">(getInitialLocale);
  const t = dictionaries[locale].landing;

  // Keep <html lang> in sync for screen readers and SEO crawlers
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // Sync locale to URL param so language persists on refresh / sharing
  const handleLocaleToggle = (newLocale: "en" | "ja") => {
    setLocale(newLocale);
    const url = new URL(window.location.href);
    if (newLocale === "en") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", newLocale);
    }
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 grid-pattern">
      {/* Skip to main content — a11y */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-indigo-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:text-sm"
      >
        {t.nav.skipToContent}
      </a>

      {/* Fixed Navigation */}
      <header>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold tracking-tight">
            MOTTO Digital
          </Link>
          <div className="hidden sm:flex items-center gap-6">
            <Link href="#proof" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded-sm">
              {t.nav.proof}
            </Link>
            <Link href="#program" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded-sm">
              {t.nav.program}
            </Link>
            <Link href="#pricing" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded-sm">
              {t.nav.pricing}
            </Link>
            <Link href="/presentation" className="text-sm text-zinc-400 hover:text-zinc-100 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400 rounded-sm">
              {t.footer.presentationLink}
            </Link>
            <LanguageToggle locale={locale} onToggle={handleLocaleToggle} />
            <Link href="/signup">
              <Button size="sm" className="bg-indigo-600 hover:bg-indigo-500 text-white">
                {t.nav.cta}
              </Button>
            </Link>
          </div>
          <div className="flex sm:hidden items-center gap-3">
            <LanguageToggle locale={locale} onToggle={handleLocaleToggle} />
            <MobileNav locale={locale} />
          </div>
        </div>
      </nav>
      </header>

      <main id="main-content">
      {/* ===============================================
          SECTION 1: HERO -- Dream Outcome, Not the Vehicle
          =============================================== */}
      <section className="relative pt-32 pb-20 sm:pt-40 sm:pb-28 radial-glow overflow-hidden">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text content */}
            <div className="text-center lg:text-left">
              <div className="animate-fade-in-up">
                <Badge variant="outline" className="mb-6 border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
                  {t.hero.badge}
                </Badge>
              </div>
              <h1 className="animate-fade-in-up animation-delay-100 text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]">
                {t.hero.title}{" "}
                <span className="gradient-text">{t.hero.titleHighlight}</span>
              </h1>
              <p className="animate-fade-in-up animation-delay-200 mt-6 text-lg sm:text-xl text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t.hero.subtitle}
              </p>

              <div className="animate-fade-in-up animation-delay-300 mt-8 flex flex-col sm:flex-row items-start justify-center lg:justify-start gap-4">
                <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
                  <Link href="/signup" className="w-full sm:w-auto">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2 glow w-full sm:w-auto">
                      {t.hero.cta}
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <span className="text-xs text-zinc-500 mt-1.5">{t.hero.ctaTime}</span>
                </div>
                <div className="flex flex-col items-center sm:items-start w-full sm:w-auto">
                  <Link href="/audit" className="w-full sm:w-auto">
                    <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-100 gap-2 w-full sm:w-auto">
                      {t.hero.ctaSecondary}
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <span className="text-xs text-zinc-500 mt-1.5">{t.hero.ctaSecondaryTime}</span>
                </div>
              </div>

              {/* Scarcity line */}
              <div className="animate-fade-in-up animation-delay-300 mt-4 inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2 justify-center lg:justify-start">
                <Timer className="size-4 text-amber-400 shrink-0" />
                <p className="text-sm font-medium text-amber-300">
                  {t.hero.scarcity}
                </p>
              </div>

              {/* Guarantee hint — elevated for conversion */}
              <div className="animate-fade-in-up animation-delay-300 mt-5 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 justify-center lg:justify-start">
                <ShieldCheck className="size-4 text-emerald-400 shrink-0" />
                <p className="text-sm text-emerald-300">
                  {t.hero.guaranteeHint}
                </p>
              </div>

              <p className="animate-fade-in-up animation-delay-300 mt-4 text-sm text-zinc-500">
                {t.hero.stats}
              </p>
            </div>

            {/* Right: Hero visual — living org chart */}
            <div className="animate-fade-in-up animation-delay-300 hidden lg:block">
              <HeroOrgVisual locale={locale} />
            </div>
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 2: PROBLEMS -- Why most AI adoption fails
          =============================================== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-6">
          <AnimateInView className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-red-500/30 text-red-300 bg-red-500/10">
              {t.problems.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t.problems.title}{" "}
              <span className="text-zinc-500">{t.problems.titleMuted}</span>
            </h2>
            <p className="text-zinc-400 max-w-2xl mx-auto mt-4">
              {t.problems.subtitle}
            </p>
          </AnimateInView>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Layers className="size-5 text-red-400" /> },
              { icon: <ShieldCheck className="size-5 text-red-400" /> },
              { icon: <Brain className="size-5 text-red-400" /> },
              { icon: <Users className="size-5 text-red-400" /> },
              { icon: <Timer className="size-5 text-red-400" /> },
              { icon: <Database className="size-5 text-red-400" /> },
            ].map((item, i) => {
              const content = t.problems.items[i];
              return (
                <AnimateInView key={content.title} delay={i * 80}>
                  <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex size-9 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20">
                        {item.icon}
                      </div>
                      <h3 className="text-sm font-semibold">{content.title}</h3>
                    </div>
                    <p className="text-xs text-zinc-400 leading-relaxed">{content.description}</p>
                  </div>
                </AnimateInView>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 3: BEFORE / AFTER -- The Emotional Contrast
          =============================================== */}
      <section className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-5xl px-6">
          <AnimateInView className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t.beforeAfter.title}{" "}
              <span className="gradient-text">{t.beforeAfter.titleHighlight}</span>
            </h2>
          </AnimateInView>
          <div className="grid md:grid-cols-2 gap-6">
            {/* WITHOUT */}
            <AnimateInView delay={100}>
              <div className="rounded-xl border border-red-500/20 bg-red-500/[0.03] p-6 sm:p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <div className="size-2 rounded-full bg-red-400" />
                  <span className="text-sm font-semibold text-red-400 uppercase tracking-wider">{t.beforeAfter.withoutLabel}</span>
                </div>
                <ul className="space-y-4">
                  {t.beforeAfter.without.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-400">
                      <X className="size-4 text-red-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInView>

            {/* WITH */}
            <AnimateInView delay={200}>
              <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-6 sm:p-8 h-full">
                <div className="flex items-center gap-2 mb-6">
                  <div className="size-2 rounded-full bg-emerald-400" />
                  <span className="text-sm font-semibold text-emerald-400 uppercase tracking-wider">{t.beforeAfter.withLabel}</span>
                </div>
                <ul className="space-y-4">
                  {t.beforeAfter.with.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                      <Check className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* ===============================================
          SECTION 3: BRAIN & BODY -- The Paradigm Shift (NEW)
          =============================================== */}
      <BrainBodySection locale={locale} />

      {/* ===============================================
          SECTION 4: THE AIOS STACK / PYRAMID -- What You Own
          =============================================== */}
      <section id="stack" className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-6">
          <AnimateInView className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
              {t.stack.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t.stack.title}{" "}
              <span className="gradient-text">{t.stack.titleHighlight}</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
              {t.stack.subtitle}
            </p>
          </AnimateInView>

          {/* Simple 3-step overview */}
          <div className="grid sm:grid-cols-3 gap-6 mb-12">
            {t.stack.steps.map((step, i) => (
              <AnimateInView key={step.num} delay={i * 100}>
                <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-6 text-center h-full">
                  <div className="text-3xl font-bold gradient-text mb-2">{step.num}</div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-sm text-zinc-400">{step.desc}</p>
                </div>
              </AnimateInView>
            ))}
          </div>

          {/* Bridge to pyramid */}
          <AnimateInView className="text-center mb-8">
            <p className="text-sm text-zinc-500">{t.stack.pyramidFraming}</p>
          </AnimateInView>

          {/* AIOS Pyramid Diagram */}
          <AIOSPyramid locale={locale} />

        </div>
      </section>

      {/* ===============================================
          SECTION 5: LIVE SYSTEM SHOWCASE (Proof)
          =============================================== */}
      <section id="proof" className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-6">
          <AnimateInView className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-emerald-500/30 text-emerald-300 bg-emerald-500/10">
              {t.caseStudy.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t.caseStudy.title}{" "}
              <span className="gradient-text">{t.caseStudy.titleHighlight}</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
              {t.caseStudy.subtitle}
            </p>
          </AnimateInView>

          {/* Metrics Grid with CountUp — values from constants.ts for easy updates */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {[METRICS.activeProjects, METRICS.tasksInProgress, METRICS.pipelineDeals].map((value, i) => {
              const metric = t.caseStudy.metrics[i];
              return (
                <AnimateInView key={metric.label} delay={i * 100}>
                  <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-5 text-center">
                    <div className="text-3xl sm:text-4xl font-bold gradient-text mb-1">
                      <CountUp end={value} />
                    </div>
                    <div className="text-sm font-medium text-zinc-200">{metric.label}</div>
                    <div className="text-xs text-zinc-500 mt-1">{metric.sublabel}</div>
                  </div>
                </AnimateInView>
              );
            })}
          </div>

          {/* Agent Org Chart (NEW) */}
          <AgentOrgChart locale={locale} />

          {/* How it works in practice */}
          <AnimateInView>
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-8 mt-10">
              <h3 className="text-xl font-semibold mb-6 text-center">{t.caseStudy.howItWorksTitle}</h3>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  <Brain key="b" className="size-6 text-indigo-400" />,
                  <Zap key="z" className="size-6 text-amber-400" />,
                  <TrendingUp key="t" className="size-6 text-emerald-400" />,
                  <Database key="d" className="size-6 text-blue-400" />,
                  <Clock key="c" className="size-6 text-violet-400" />,
                  <Users key="u" className="size-6 text-teal-400" />,
                ].map((icon, i) => {
                  const content = t.caseStudy.howItWorks[i];
                  return (
                    <AnimateInView key={content.title} delay={i * 80}>
                      <div className="flex flex-col gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-zinc-800/50 border border-zinc-700/50">
                          {icon}
                        </div>
                        <h4 className="text-sm font-semibold">{content.title}</h4>
                        <p className="text-xs text-zinc-400 leading-relaxed">{content.description}</p>
                      </div>
                    </AnimateInView>
                  );
                })}
              </div>
            </div>
          </AnimateInView>

          {/* Founder reflection */}
          <AnimateInView className="mt-8 text-center">
            <p className="text-zinc-400 text-sm leading-relaxed max-w-2xl mx-auto">
              {t.caseStudy.testimonial}
            </p>
            <p className="mt-3 text-sm font-medium text-zinc-300">{t.caseStudy.testimonialAuthor}</p>
          </AnimateInView>
        </div>
      </section>

      {/* ===============================================
          MID-PAGE CTA -- Catch interested readers
          =============================================== */}
      <AnimateInView as="section" className="py-14 sm:py-20 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
            {t.midCta.title}
          </h2>
          <p className="text-zinc-400 mb-8 max-w-xl mx-auto">
            {t.midCta.subtitle}
          </p>
          <div className="flex flex-col items-center">
            <Link href="/signup">
              <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2 glow">
                {t.cta.title}
                <ArrowRight className="size-4" />
              </Button>
            </Link>
            <span className="text-xs text-zinc-500 mt-1.5">{t.hero.ctaTime}</span>
          </div>
        </div>
      </AnimateInView>

      {/* ===============================================
          SECTION 6: THE OFFER -- Program Timeline + Pricing
          =============================================== */}
      <section id="program" className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-6xl px-6">
          <AnimateInView className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
              {t.program.badge}
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              {t.program.title}{" "}
              <span className="gradient-text">{t.program.titleHighlight}</span>
            </h2>
            <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
              {t.program.subtitle}
            </p>
          </AnimateInView>

          <div className="space-y-6">
            {/* Month 1: Mapping & Planning */}
            <AnimateInView>
              <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex size-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">{t.program.month1.title}</h3>
                    <p className="text-sm text-zinc-500">{t.program.month1.subtitle}</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {t.program.month1.items.map((item: string) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                      <Check className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </AnimateInView>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Month 2 */}
              <AnimateInView delay={100}>
                <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex size-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-sm">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t.program.month2.title}</h3>
                      <p className="text-sm text-zinc-500">{t.program.month2.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {t.program.month2.items.map((item: string) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                        <Check className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateInView>
              {/* Month 3 */}
              <AnimateInView delay={200}>
                <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex size-10 items-center justify-center rounded-full bg-indigo-500/20 text-indigo-300 font-bold text-sm">
                      3
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t.program.month3.title}</h3>
                      <p className="text-sm text-zinc-500">{t.program.month3.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {t.program.month3.items.map((item: string) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                        <Check className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateInView>
              {/* Months 4-6 */}
              <AnimateInView delay={300}>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-8 h-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-sm">
                      4-6
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{t.program.month4.title}</h3>
                      <p className="text-sm text-emerald-400">{t.program.month4.subtitle}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {t.program.month4.items.map((item: string) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                        <Check className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimateInView>
            </div>
          </div>

          {/* By Month 6 */}
          <AnimateInView className="mt-8">
            <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 p-8">
              <h3 className="text-xl font-semibold mb-6 text-center">{t.program.byMonth6.title}</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {t.program.byMonth6.metrics.map((metric, i) => (
                  <div key={i} className="text-center">
                    <div className="text-3xl font-bold gradient-text mb-2">
                      {i === 0 ? <CountUp end={10} /> : i === 1 ? <CountUp end={100} suffix="%" /> : metric.value}
                    </div>
                    <div className="text-sm font-medium text-zinc-200">{metric.label}</div>
                    <div className="text-xs text-zinc-500 mt-1">{metric.sublabel}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimateInView>

          {/* Divider between program and guarantee */}
          <div className="border-t border-zinc-800/50 my-16" />

          {/* ===============================================
              GUARANTEE -- Risk Reversal (before pricing)
              =============================================== */}
          <AnimateInView className="mb-16">
            <div className="mx-auto max-w-3xl text-center">
              <div className="rounded-xl border-2 border-emerald-500/30 bg-emerald-500/5 p-8 sm:p-12">
                <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20">
                  <ShieldCheck className="size-8 text-emerald-400" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 uppercase">
                  {t.guarantee.title}
                </h2>
                <p className="text-zinc-400 leading-relaxed mb-6 max-w-xl mx-auto">
                  {t.guarantee.description}
                </p>
                <div className="border-t border-emerald-500/20 pt-6 mt-6 space-y-2">
                  <p className="text-sm text-zinc-400">
                    {t.guarantee.cohortNote}
                  </p>
                  <p className="text-sm text-zinc-400">
                    {t.guarantee.corporateNote}
                  </p>
                </div>
              </div>
            </div>
          </AnimateInView>

          {/* Divider between guarantee and pricing */}
          <div className="border-t border-zinc-800/50 my-16" />

          {/* ===============================================
              PRICING -- Group Cohort + Corporate Build
              =============================================== */}
          <div id="pricing">
            <AnimateInView className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-indigo-500/30 text-indigo-300 bg-indigo-500/10">
                {t.pricing.badge}
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
                {t.pricing.title}
              </h2>
              <p className="mt-4 text-zinc-400 max-w-2xl mx-auto text-lg">
                {t.pricing.subtitle}
              </p>
            </AnimateInView>

            {/* ROI comparison — value framing before price */}
            <AnimateInView className="mb-10">
              <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                <div className="rounded-xl border border-red-500/20 bg-red-500/[0.03] p-5 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-red-400 mb-2">{t.pricing.roiComparison.traditional.label}</p>
                  <p className="text-2xl font-bold text-zinc-200">{t.pricing.roiComparison.traditional.price}</p>
                  <p className="text-sm text-zinc-500 mt-1">{t.pricing.roiComparison.traditional.detail}</p>
                </div>
                <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.03] p-5 text-center">
                  <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400 mb-2">{t.pricing.roiComparison.aios.label}</p>
                  <p className="text-2xl font-bold text-zinc-200">{t.pricing.roiComparison.aios.price}</p>
                  <p className="text-sm text-zinc-500 mt-1">{t.pricing.roiComparison.aios.detail}</p>
                </div>
              </div>
            </AnimateInView>

            {/* Two pricing columns */}
            <div className="grid lg:grid-cols-2 gap-6 max-w-5xl mx-auto">

              {/* Left: Group Cohort */}
              <AnimateInView delay={100}>
                <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-8 flex flex-col h-full">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">{t.pricing.cohort.label}</span>
                  <h3 className="text-2xl font-bold mb-3">{t.pricing.cohort.title}</h3>
                  <div className="flex items-baseline gap-1 mb-1">
                    <span className="text-4xl font-bold">{t.pricing.cohort.price}</span>
                    <span className="text-zinc-500">{t.pricing.cohort.pricePer}</span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-1">{t.pricing.cohort.commitment}</p>
                  <div className="flex items-center gap-2 mb-6">
                    <Timer className="size-4 text-amber-400 shrink-0" />
                    <p className="text-sm font-medium text-amber-300">{t.pricing.cohort.spots}</p>
                  </div>
                  <ul className="space-y-3 mb-6 flex-1">
                    {t.pricing.cohort.features.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                        <Check className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-zinc-500 mb-2">{t.pricing.cohort.bestFor}</p>
                  <p className="text-xs text-emerald-400/70 mb-6">{t.pricing.cohort.guarantee}</p>
                  <Link href="/signup?track=cohort" className="w-full">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
                      {t.pricing.cohort.cta}
                    </Button>
                  </Link>
                </div>
              </AnimateInView>

              {/* Right: Corporate Build */}
              <AnimateInView delay={200}>
                <div className="rounded-xl border-2 border-indigo-500/30 bg-indigo-500/5 p-8 flex flex-col h-full relative">
                  <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 mb-2">{t.pricing.corporate.label}</span>
                  <h3 className="text-2xl font-bold mb-3">{t.pricing.corporate.title}</h3>

                  {/* Monthly option */}
                  <div className="flex items-baseline gap-1 mb-0.5">
                    <span className="text-4xl font-bold">{t.pricing.corporate.monthlyPrice}</span>
                    <span className="text-zinc-500">{t.pricing.corporate.monthlyPer}</span>
                  </div>
                  <p className="text-sm text-zinc-500 mb-3">{t.pricing.corporate.monthlyTotal}</p>

                  {/* Pay-in-full option */}
                  <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/[0.05] p-3 mb-6 flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold">{t.pricing.corporate.payInFull}</span>
                      <span className="ml-2 text-sm text-emerald-400">{t.pricing.corporate.payInFullSave}</span>
                    </div>
                    <Badge className="bg-indigo-600 text-white border-0 shrink-0">{t.pricing.corporate.bestValue}</Badge>
                  </div>

                  <ul className="space-y-3 mb-6 flex-1">
                    {t.pricing.corporate.features.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-zinc-300">
                        <Check className="size-4 text-indigo-400 mt-0.5 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="text-xs text-zinc-500 mb-2">{t.pricing.corporate.bestFor}</p>
                  <p className="text-xs text-emerald-400/70 mb-6">{t.pricing.corporate.guarantee}</p>
                  <div className="space-y-3">
                    <Link href="/signup?track=corporate&plan=monthly" className="w-full block">
                      <Button variant="outline" className="w-full border-zinc-700 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-100">
                        {t.pricing.corporate.monthlyCta}
                      </Button>
                    </Link>
                    <Link href="/signup?track=corporate&plan=full" className="w-full block">
                      <Button className="w-full bg-indigo-600 hover:bg-indigo-500 text-white">
                        {t.pricing.corporate.payInFullCta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </AnimateInView>
            </div>

            <AnimateInView className="mt-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-2">
                <Timer className="size-4 text-amber-400 shrink-0" />
                <p className="text-sm font-medium text-amber-300">
                  {t.pricing.launchNote}
                </p>
              </div>
            </AnimateInView>

            {/* ===============================================
                INTAKE CAPACITY — Scarcity + Commitment
                =============================================== */}
            <AnimateInView className="mt-16">
              <div className="max-w-3xl mx-auto rounded-xl border border-zinc-800/50 bg-zinc-900/30 p-8 sm:p-10">
                <div className="text-center mb-8">
                  <Badge variant="outline" className="mb-4 border-amber-500/30 text-amber-300 bg-amber-500/10">
                    {t.pricing.intake.badge}
                  </Badge>
                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
                    {t.pricing.intake.title}
                  </h3>
                  <p className="text-zinc-400 max-w-xl mx-auto">
                    {t.pricing.intake.subtitle}
                  </p>
                  {/* Scarcity badges */}
                  <div className="flex flex-wrap items-center justify-center gap-3 mt-4">
                    <Badge className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-sm px-3 py-1">
                      {t.pricing.intake.spotsRemaining}
                    </Badge>
                    <span className="text-xs text-zinc-500">{t.pricing.intake.nextCohort}</span>
                  </div>
                </div>

                {/* Capacity indicators */}
                <div className="grid sm:grid-cols-3 gap-6 mb-8">
                  {/* Corporate slots */}
                  <div className="rounded-lg border border-zinc-800/50 bg-zinc-950/50 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-zinc-200">{t.pricing.intake.corporate.title}</span>
                      <span className="text-xs text-amber-400 font-medium">{t.pricing.intake.corporate.label}</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-zinc-800 overflow-hidden mb-3">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-400 transition-all duration-1000"
                        style={{ width: `${(t.pricing.intake.corporate.filled / t.pricing.intake.corporate.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-zinc-500">{t.pricing.intake.corporate.clients}</p>
                  </div>

                  {/* English Cohort */}
                  <div className="rounded-lg border border-zinc-800/50 bg-zinc-950/50 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-zinc-200">{t.pricing.intake.cohortEN.title}</span>
                      <span className="text-xs text-indigo-400 font-medium">{t.pricing.intake.cohortEN.label}</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden mb-3">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-1000"
                        style={{ width: `${(t.pricing.intake.cohortEN.filled / t.pricing.intake.cohortEN.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-zinc-500">{t.pricing.intake.cohortEN.total - t.pricing.intake.cohortEN.filled} spots open</p>
                  </div>

                  {/* Japanese Cohort */}
                  <div className="rounded-lg border border-zinc-800/50 bg-zinc-950/50 p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-zinc-200">{t.pricing.intake.cohortJP.title}</span>
                      <span className="text-xs text-indigo-400 font-medium">{t.pricing.intake.cohortJP.label}</span>
                    </div>
                    <div className="h-3 w-full rounded-full bg-zinc-800 overflow-hidden mb-3">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-indigo-400 transition-all duration-1000"
                        style={{ width: `${(t.pricing.intake.cohortJP.filled / t.pricing.intake.cohortJP.total) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs text-zinc-500">{t.pricing.intake.cohortJP.total - t.pricing.intake.cohortJP.filled} spots open</p>
                  </div>
                </div>

                {/* Save your spot CTA */}
                <div className="text-center mb-8">
                  <Link href="/signup">
                    <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2 glow">
                      {t.pricing.intake.cta}
                      <ArrowRight className="size-4" />
                    </Button>
                  </Link>
                  <p className="text-xs text-zinc-500 mt-2">{t.pricing.intake.ctaNote}</p>
                </div>

                {/* Personal commitment from Lewis */}
                <div className="border-t border-zinc-800/50 pt-6">
                  <p className="text-sm text-zinc-400 leading-relaxed italic">
                    &ldquo;{t.pricing.intake.commitment}&rdquo;
                  </p>
                  <p className="mt-3 text-sm font-medium text-zinc-300">
                    {t.pricing.intake.author}
                  </p>
                </div>
              </div>
            </AnimateInView>
          </div>
        </div>
      </section>

      {/* Lead Magnet — for visitors not ready to buy */}
      <AnimateInView as="section" className="py-16 sm:py-20">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
            {t.leadMagnet.title}
          </h2>
          <p className="text-zinc-400 text-lg mb-2">
            {t.leadMagnet.subtitle}
          </p>
          <p className="text-zinc-500 text-sm mb-8">
            {t.leadMagnet.detail}
          </p>
          <Link href="/audit">
            <Button variant="outline" size="lg" className="border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200 gap-2">
              {t.leadMagnet.cta}
              <ArrowRight className="size-4" />
            </Button>
          </Link>
        </div>
      </AnimateInView>

      {/* ===============================================
          SECTION 7: FAQ -- Common Questions
          =============================================== */}
      <FAQSection locale={locale} />

      {/* ===============================================
          CONSULTANT BIO -- Lewis Rice (know who you're booking with)
          =============================================== */}
      <AnimateInView as="section" className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-6">
          <div className="rounded-xl border border-zinc-800/50 bg-zinc-900/50 p-8 sm:p-10">
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <Image
                src="/lewis-rice.jpg"
                alt="Lewis Rice"
                width={80}
                height={80}
                className="rounded-full border border-indigo-500/20 object-cover shrink-0"
              />
              <div>
                <h3 className="text-xl font-semibold mb-1">{t.bio.name}</h3>
                <p className="text-sm text-zinc-500 mb-4">{t.bio.title}</p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-4">
                  {t.bio.bio1}
                </p>
                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                  {t.bio.bio2}
                </p>
                <div className="flex flex-wrap gap-2">
                  {t.bio.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="border-zinc-700 text-zinc-400 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </AnimateInView>

      {/* ===============================================
          SECTION 8: FINAL CTA (dual conversion point)
          =============================================== */}
      <AnimateInView as="section" className="py-20 sm:py-28 border-t border-zinc-800/50">
        <div className="mx-auto max-w-3xl px-6 text-center" id="audit">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t.auditCta.title}{" "}
            <span className="gradient-text">{t.auditCta.titleHighlight}</span>
          </h2>
          <p className="text-zinc-400 text-lg max-w-xl mx-auto mb-10">
            {t.auditCta.subtitle}
          </p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-10 text-left">
            {[
              <ShieldCheck key="shield" className="size-5 text-indigo-400 shrink-0" />,
              <User key="user" className="size-5 text-indigo-400 shrink-0" />,
              <Calendar key="cal" className="size-5 text-indigo-400 shrink-0" />,
              <FileText key="file" className="size-5 text-indigo-400 shrink-0" />,
            ].map((icon, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                {icon}
                <span>{t.auditCta.benefits[i]}</span>
              </div>
            ))}
          </div>
          {/* Meet first, then decide trust point */}
          <div className="flex items-center justify-center gap-2 mb-8">
            <Users className="size-4 text-emerald-400 shrink-0" />
            <p className="text-sm text-emerald-300">{t.guarantee.meetFirst}</p>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <div className="flex flex-col items-center">
              <Link href="/signup">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-500 text-white gap-2 glow">
                  {t.cta.title}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <span className="text-xs text-zinc-500 mt-1.5">{t.hero.ctaTime}</span>
            </div>
            <div className="flex flex-col items-center">
              <Link href="/audit">
                <Button size="lg" variant="outline" className="border-zinc-700 text-zinc-100 hover:bg-zinc-800 hover:text-zinc-100 gap-2">
                  {t.hero.ctaSecondary}
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <span className="text-xs text-zinc-500 mt-1.5">{t.hero.ctaSecondaryTime}</span>
            </div>
          </div>
        </div>
      </AnimateInView>

      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/50 py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid sm:grid-cols-3 gap-10 mb-10">
            <div>
              <Link href="/" className="text-lg font-bold tracking-tight mb-3 block">
                MOTTO Digital
              </Link>
              <p className="text-sm text-zinc-500 leading-relaxed">
                {t.footer.tagline}
                <br />
                {t.footer.tagline2}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3 text-zinc-300">{t.footer.navigate}</p>
              <div className="flex flex-col gap-2 text-sm text-zinc-500">
                <Link href="#proof" className="hover:text-zinc-300 transition-colors">{t.footer.caseStudyLink}</Link>
                <Link href="#program" className="hover:text-zinc-300 transition-colors">{t.footer.programLink}</Link>
                <Link href="#pricing" className="hover:text-zinc-300 transition-colors">{t.footer.pricingLink}</Link>
                <Link href="/audit" className="hover:text-zinc-300 transition-colors">{t.footer.auditLink}</Link>
                <Link href="/privacy" className="hover:text-zinc-300 transition-colors">{t.footer.privacyLink}</Link>
                <Link href="/presentation" className="hover:text-zinc-300 transition-colors">{t.footer.presentationLink}</Link>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3 text-zinc-300">{t.footer.contact}</p>
              <address className="flex flex-col gap-2 text-sm text-zinc-500 not-italic">
                <a href="mailto:rice@mottodigital.jp" className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
                  <Mail className="size-4" />
                  rice@mottodigital.jp
                </a>
                <a href="https://www.linkedin.com/in/ricelewis/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-zinc-300 transition-colors">
                  <Linkedin className="size-4" />
                  LinkedIn
                </a>
                <p className="text-zinc-500 mt-1">{t.footer.contactCta}</p>
              </address>
            </div>
          </div>
          {/* Company legitimacy signals */}
          <div className="border-t border-zinc-800/50 pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs text-zinc-600">
            <span>{t.footer.company.representative}</span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span>{t.footer.company.location}</span>
            <span className="hidden sm:inline text-zinc-700">|</span>
            <span>{t.footer.company.founded}</span>
          </div>
          <div className="border-t border-zinc-800/30 mt-4 pt-4 text-center text-xs text-zinc-600">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
