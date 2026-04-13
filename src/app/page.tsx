"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin } from "lucide-react";
import { MobileNav } from "@/components/landing/mobile-nav";
import { FAQSection } from "@/components/landing/faq-section";
import { LanguageToggle } from "@/components/landing/language-toggle";

import HeroSection from "@/components/landing/sections/hero-section";
import BeforeAfterSection from "@/components/landing/sections/before-after-section";
import HowItWorksSection from "@/components/landing/sections/how-it-works-section";
import ValuePropsSection from "@/components/landing/sections/value-props-section";
import { BrainBodySection } from "@/components/landing/brain-body-section";
import { AgenticTimeline, AgenticArchitecture } from "@/components/landing/sections/agentic-terminal-section";
import SolutionSection from "@/components/landing/sections/solution-section";
import ProofSection from "@/components/landing/sections/proof-section";
import ProgramSection from "@/components/landing/sections/program-section";
import MidCtaSection from "@/components/landing/sections/mid-cta-section";
import PricingSection from "@/components/landing/sections/pricing-section";
import GuaranteeSection from "@/components/landing/sections/guarantee-section";
import BioSection from "@/components/landing/sections/bio-section";
import LeadMagnetSection from "@/components/landing/sections/lead-magnet-section";
import ToolBannerSection from "@/components/landing/sections/tool-banner-section";
import CtaSection from "@/components/landing/sections/cta-section";
import { Badge } from "@/components/ui/badge";
import { AnimateInView } from "@/components/landing/animate-in-view";

import en from "@/lib/i18n/dictionaries/en";
import ja from "@/lib/i18n/dictionaries/ja";
import type { LandingT } from "@/components/landing/sections/types";
import { budouxWrap } from "@/lib/budoux-transform";

const dictionaries = { en, ja } as const;

function getInitialLocale(): "en" | "ja" {
  if (typeof window === "undefined") return "ja";
  const params = new URLSearchParams(window.location.search);
  const urlLocale = params.get("lang");
  if (urlLocale === "ja" || urlLocale === "en") return urlLocale;
  return "ja";
}

export default function HomePage() {
  const [locale, setLocale] = useState<"en" | "ja">(getInitialLocale);
  const rawT = dictionaries[locale].landing;
  // Apply BudouX phrase segmentation to Japanese text so line breaks
  // occur at natural word boundaries, never mid-word
  const t = useMemo(
    () => (locale === "ja" ? budouxWrap(rawT) : rawT) as unknown as LandingT,
    [locale, rawT],
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const handleLocaleToggle = (newLocale: "en" | "ja") => {
    setLocale(newLocale);
    const url = new URL(window.location.href);
    if (newLocale === "ja") {
      url.searchParams.delete("lang");
    } else {
      url.searchParams.set("lang", newLocale);
    }
    window.history.replaceState({}, "", url.toString());
  };

  return (
    <div className="min-h-screen text-[#1D1D1F]" style={{ backgroundColor: "var(--lp-bg-primary)" }}>
      {/* Skip to main content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:bg-[#1D1D1F] focus:text-white focus:px-4 focus:py-2 focus:rounded-full focus:text-sm"
      >
        {t.nav.skipToContent}
      </a>

      {/* Fixed Navigation */}
      <header>
        <nav
          className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-white/80"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.06)" }}
        >
          <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight font-[family-name:var(--font-dm-sans)]">
              MOTTO Digital
            </Link>
            <div className="hidden sm:flex items-center gap-6">
              <Link href="#proof" className="nav-link-hover text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8860B] rounded-sm" style={{ color: "var(--lp-text-body)" }}>
                {t.nav.proof}
              </Link>
              <Link href="#program" className="nav-link-hover text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8860B] rounded-sm" style={{ color: "var(--lp-text-body)" }}>
                {t.nav.program}
              </Link>
              <Link href="#pricing" className="nav-link-hover text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8860B] rounded-sm" style={{ color: "var(--lp-text-body)" }}>
                {t.nav.pricing}
              </Link>
              <Link href="/presentation" className="nav-link-hover text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#B8860B] rounded-sm" style={{ color: "var(--lp-text-body)" }}>
                {t.footer.presentationLink}
              </Link>
              <LanguageToggle locale={locale} onToggle={handleLocaleToggle} />
              <Link href="/signup">
                <Button size="sm" className="bg-[#1D1D1F] hover:bg-[#2D2D2F] text-white rounded-full text-sm px-5 py-2">
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
        {/* 1. Hero — headline + social proof + dual CTAs */}
        <HeroSection t={t} locale={locale} />

        {/* 1.5. Tool Banner — what this is built on */}
        <ToolBannerSection t={t} locale={locale} />

        {/* 2. Before/After — pain agitation: what changes when your business has a brain */}
        <BeforeAfterSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 3. How It Works — 3-step action plan */}
        <HowItWorksSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 4. Value Props — what you get */}
        <ValuePropsSection t={t} locale={locale} />

        {/* 5. Proof — Lewis's AIOS metrics + org chart (dark section) */}
        <ProofSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 6. Program — 6-month roadmap */}
        <ProgramSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 7. Mid CTA — "Ready to build yours?" */}
        <MidCtaSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 8. Pricing */}
        <PricingSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 9. Guarantee */}
        <GuaranteeSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 10. Agentic AI Mega-Section — deep education for engaged scrollers */}
        <section
          style={{ backgroundColor: "var(--lp-bg-primary)", paddingTop: "var(--lp-section-gap)", paddingBottom: "var(--lp-section-gap)" }}
        >
          <div className="mx-auto max-w-5xl px-6">
            <AnimateInView className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-[#B8860B]/20 text-[#B8860B] bg-[#B8860B]/5">
                {t.agenticMega.badge}
              </Badge>
              <h2
                className={`font-bold tracking-tight ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
                style={{
                  fontSize: "var(--text-h2)",
                  color: "var(--lp-text-heading)",
                  ...(locale === "ja" ? {} : {}),
                }}
              >
                {t.agenticMega.title}{" "}
                <span className="gradient-text">{t.agenticMega.titleHighlight}</span>
              </h2>
              <p className="mt-4 max-w-2xl mx-auto text-lg" style={{ color: "var(--lp-text-body)" }}>
                {t.agenticMega.subtitle}
              </p>
            </AnimateInView>

            <AgenticTimeline t={t} locale={locale} />

            <AnimateInView className="text-center mt-16 mb-12">
              <h2
                className={`font-bold tracking-tight ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
                style={{
                  fontSize: "var(--text-h2)",
                  color: "var(--lp-text-heading)",
                  ...(locale === "ja" ? {} : {}),
                }}
              >
                {t.agenticMega.whatIsTitle}
              </h2>
            </AnimateInView>

            <AnimateInView className="mb-12">
              <h3
                className={`text-xl sm:text-2xl font-semibold mb-8 text-center ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
                style={{ color: "var(--lp-text-heading)" }}
              >
                {t.agenticMega.subSection1Title}
              </h3>
            </AnimateInView>
          </div>
          <BrainBodySection locale={locale} hideHeader />

          <div className="mx-auto max-w-5xl px-6">
            <AnimateInView className="mt-16 mb-8">
              <h3
                className={`text-xl sm:text-2xl font-semibold mb-8 text-center ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
                style={{ color: "var(--lp-text-heading)" }}
              >
                {t.agenticMega.subSection2Title}
              </h3>
            </AnimateInView>

            <AgenticArchitecture t={t} locale={locale} />

            <AnimateInView className="mt-16 mb-8">
              <h3
                className={`text-xl sm:text-2xl font-semibold mb-8 text-center ${locale === "ja" ? "font-[family-name:var(--font-shippori-mincho)]" : "font-[family-name:var(--font-dm-sans)]"}`}
                style={{ color: "var(--lp-text-heading)" }}
              >
                {t.agenticMega.subSection3Title}
              </h3>
            </AnimateInView>
          </div>
          <SolutionSection t={t} locale={locale} hideHeader />
        </section>
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 11. Bio — Company story */}
        <BioSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 12. FAQ */}
        <FAQSection locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 13. Lead Magnet — soft conversion for undecided visitors */}
        <LeadMagnetSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 14. Final CTA */}
        <CtaSection t={t} locale={locale} />
      </main>

      {/* Footer */}
      <footer className="py-16" style={{ borderTop: "1px solid var(--lp-border)", backgroundColor: "#F5F5F7" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid sm:grid-cols-3 gap-10 mb-10">
            <div>
              <Link href="/" className="text-lg font-bold tracking-tight mb-3 block font-[family-name:var(--font-dm-sans)]">
                MOTTO Digital
              </Link>
              <p className="text-sm leading-relaxed" style={{ color: "var(--lp-text-muted)" }}>
                {t.footer.tagline}
                <br />
                {t.footer.tagline2}
              </p>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--lp-text-heading)" }}>{t.footer.navigate}</p>
              <div className="flex flex-col gap-2 text-sm" style={{ color: "var(--lp-text-muted)" }}>
                <Link href="#proof" className="hover:text-[#1D1D1F] transition-colors">{t.footer.caseStudyLink}</Link>
                <Link href="#program" className="hover:text-[#1D1D1F] transition-colors">{t.footer.programLink}</Link>
                <Link href="#pricing" className="hover:text-[#1D1D1F] transition-colors">{t.footer.pricingLink}</Link>
                <Link href="/audit" className="hover:text-[#1D1D1F] transition-colors">{t.footer.auditLink}</Link>
                <Link href="/privacy" className="hover:text-[#1D1D1F] transition-colors">{t.footer.privacyLink}</Link>
                <Link href="/presentation" className="hover:text-[#1D1D1F] transition-colors">{t.footer.presentationLink}</Link>
                <Link href="/webinar" className="hover:text-[#1D1D1F] transition-colors">{locale === "ja" ? "無料ウェビナー" : "Free Webinar"}</Link>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold mb-3" style={{ color: "var(--lp-text-heading)" }}>{t.footer.contact}</p>
              <address className="flex flex-col gap-2 text-sm not-italic" style={{ color: "var(--lp-text-muted)" }}>
                <a href="mailto:rice@mottodigital.jp" className="flex items-center gap-2 hover:text-[#1D1D1F] transition-colors">
                  <Mail className="size-4" />
                  rice@mottodigital.jp
                </a>
                <a href="https://www.linkedin.com/in/ricelewis/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-[#1D1D1F] transition-colors">
                  <Linkedin className="size-4" />
                  LinkedIn
                </a>
                <p style={{ color: "var(--lp-text-muted)" }} className="mt-1">{t.footer.contactCta}</p>
              </address>
            </div>
          </div>
          <div className="pt-6" style={{ borderTop: "1px solid var(--lp-border)" }}>
            <h3 className="text-xs font-semibold mb-3 text-center" style={{ color: "var(--lp-text-heading)" }}>
              {t.footer.company.heading}
            </h3>
            <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-1.5 text-xs max-w-md mx-auto" style={{ color: "var(--lp-text-muted)" }}>
              <dt className="font-medium" style={{ color: "var(--lp-text-heading)" }}>{t.footer.company.nameLabel}</dt>
              <dd className="text-right">{t.footer.company.name}</dd>
              <dt className="font-medium" style={{ color: "var(--lp-text-heading)" }}>{t.footer.company.representativeLabel}</dt>
              <dd className="text-right">{t.footer.company.representative}</dd>
              <dt className="font-medium" style={{ color: "var(--lp-text-heading)" }}>{t.footer.company.locationLabel}</dt>
              <dd className="text-right">{t.footer.company.location}</dd>
              <dt className="font-medium" style={{ color: "var(--lp-text-heading)" }}>{t.footer.company.foundedLabel}</dt>
              <dd className="text-right">{t.footer.company.founded}</dd>
              <dt className="font-medium" style={{ color: "var(--lp-text-heading)" }}>{t.footer.company.businessLabel}</dt>
              <dd className="text-right">{t.footer.company.business}</dd>
              <dt className="font-medium" style={{ color: "var(--lp-text-heading)" }}>{t.footer.company.urlLabel}</dt>
              <dd className="text-right">
                <a href="https://mottodigital.jp" target="_blank" rel="noopener noreferrer" className="hover:text-[#1D1D1F] transition-colors">
                  {t.footer.company.url}
                </a>
              </dd>
            </dl>
          </div>
          <div className="mt-4 pt-4 text-center text-xs" style={{ borderTop: "1px solid var(--lp-border)", color: "var(--lp-text-muted)" }}>
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
