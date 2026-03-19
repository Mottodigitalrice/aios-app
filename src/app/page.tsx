"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin } from "lucide-react";
import { MobileNav } from "@/components/landing/mobile-nav";
import { FAQSection } from "@/components/landing/faq-section";
import { LanguageToggle } from "@/components/landing/language-toggle";

import HeroSection from "@/components/landing/sections/hero-section";
import ValuePropsSection from "@/components/landing/sections/value-props-section";
import BeforeAfterSection from "@/components/landing/sections/before-after-section";
import { BrainBodySection } from "@/components/landing/brain-body-section";
import AgenticTerminalSection from "@/components/landing/sections/agentic-terminal-section";
import SolutionSection from "@/components/landing/sections/solution-section";
import ProgramSection from "@/components/landing/sections/program-section";
import MidCtaSection from "@/components/landing/sections/mid-cta-section";
import ProofSection from "@/components/landing/sections/proof-section";
import BioSection from "@/components/landing/sections/bio-section";
import GuaranteeSection from "@/components/landing/sections/guarantee-section";
import PricingSection from "@/components/landing/sections/pricing-section";
import CtaSection from "@/components/landing/sections/cta-section";

import en from "@/lib/i18n/dictionaries/en";
import ja from "@/lib/i18n/dictionaries/ja";
import type { LandingT } from "@/components/landing/sections/types";

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
  const t = dictionaries[locale].landing as LandingT;

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
        {/* ━━ WHAT — The Problem & Outcome ━━━━━━━━━━━━━━━━━ */}

        {/* 1. Hero */}
        <HeroSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 2. Value Props (replaces PainSection) */}
        <ValuePropsSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 3. Before/After */}
        <BeforeAfterSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* ━━ HOW — How It Works ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* 4. Brain + Body (paradigm shift) */}
        <BrainBodySection locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 5. Agentic Terminal (the tools that make it possible) */}
        <AgenticTerminalSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 6. Solution — Pyramid (the model-agnostic stack you own) */}
        <SolutionSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 7. Program — 6-month roadmap */}
        <ProgramSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 8. Mid CTA — "Save Your Spot" nudge */}
        <MidCtaSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* ━━ WHO — Who's Doing It ━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* 9. Proof — Lewis's AIOS metrics + org chart */}
        <ProofSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 10. Bio — Company story, vision, ethical AI */}
        <BioSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 11. Guarantee */}
        <GuaranteeSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* ━━ CLOSE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}

        {/* 12. Pricing */}
        <PricingSection t={t} locale={locale} />
        <div className="h-px bg-gradient-to-r from-transparent via-[#E8E8ED] to-transparent" />

        {/* 13. FAQ */}
        <FAQSection locale={locale} />
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
          <div className="pt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-1 text-xs" style={{ borderTop: "1px solid var(--lp-border)", color: "var(--lp-text-muted)" }}>
            <span>{t.footer.company.representative}</span>
            <span className="hidden sm:inline" style={{ color: "var(--lp-border-visible)" }}>|</span>
            <span>{t.footer.company.location}</span>
            <span className="hidden sm:inline" style={{ color: "var(--lp-border-visible)" }}>|</span>
            <span>{t.footer.company.founded}</span>
          </div>
          <div className="mt-4 pt-4 text-center text-xs" style={{ borderTop: "1px solid var(--lp-border)", color: "var(--lp-text-muted)" }}>
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </div>
        </div>
      </footer>
    </div>
  );
}
