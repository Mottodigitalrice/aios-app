import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign Up | AIOS Program — Mottodigital",
  description:
    "Sign up for the AIOS 6-month program. Build your AI operating system with hands-on guidance. Group cohort or corporate build — you choose.",
  alternates: {
    canonical: "https://aios.mottodigital.jp/signup",
  },
  openGraph: {
    title: "Sign Up | AIOS Program — Mottodigital",
    description:
      "Sign up for the AIOS 6-month program. Build your AI operating system with hands-on guidance. Group cohort or corporate build — you choose.",
  },
};

export default function SignupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
