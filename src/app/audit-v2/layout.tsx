import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Audit v2 | AIOS — Mottodigital",
  description:
    "Tell us your goals — we'll show you how AI gets you there. Two free tiers (5 or 15 min). Lewis personally reviews every submission.",
  alternates: {
    canonical: "https://aios.mottodigital.jp/audit-v2",
  },
  openGraph: {
    title: "AI Audit v2 | AIOS — Mottodigital",
    description:
      "Tell us your goals — we'll show you how AI gets you there. Two free tiers, personally reviewed by Lewis within 2 business days.",
  },
};

export default function AuditV2Layout({ children }: { children: React.ReactNode }) {
  return children;
}
