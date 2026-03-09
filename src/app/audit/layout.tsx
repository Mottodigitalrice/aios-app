import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Free AI Audit | AIOS — MOTTO Digital",
  description:
    "Get a free, personalized AI readiness assessment for your business. Discover automation opportunities and receive a custom implementation roadmap.",
  alternates: {
    canonical: "https://aios.mottodigital.jp/audit",
  },
  openGraph: {
    title: "Free AI Audit | AIOS — MOTTO Digital",
    description:
      "Get a free, personalized AI readiness assessment for your business. Discover automation opportunities and receive a custom implementation roadmap.",
  },
};

export default function AuditLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
