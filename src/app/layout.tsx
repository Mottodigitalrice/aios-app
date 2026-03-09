import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";
import { ClerkClientProvider } from "@/components/providers/clerk-provider";
import { ConvexClientProvider } from "@/components/providers/convex-provider";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
const notoSansJP = Noto_Sans_JP({ subsets: ["latin"], weight: ["300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: "AIOS — AI Operating System for Business | MOTTO Digital",
  description:
    "Build an AI Operating System for your business. Connected to your data, owned by you, locked into nobody. 6-month hands-on program by MOTTO Digital in Tokyo.",
  keywords: [
    "AI operating system",
    "AI consulting Japan",
    "AI agent development",
    "business automation Tokyo",
    "MOTTO Digital",
    "AIエージェント",
    "業務自動化",
    "AI導入支援",
  ],
  authors: [{ name: "Lewis Rice", url: "https://mottodigital.com" }],
  openGraph: {
    title: "AIOS — AI Operating System for Business",
    description:
      "Connected to your data. Owned by you. Locked into nobody. 6-month hands-on AI infrastructure program by MOTTO Digital.",
    type: "website",
    locale: "en_US",
    alternateLocale: "ja_JP",
    siteName: "MOTTO Digital",
  },
  twitter: {
    card: "summary_large_image",
    title: "AIOS — AI Operating System for Business",
    description:
      "Build an AI Operating System for your business. Connected to your data, owned by you, locked into nobody.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              name: "MOTTO Digital",
              description:
                "AI Operating System development for Japanese SMBs. 6-month hands-on program to build, deploy, and own your AI infrastructure.",
              url: "https://mottodigital.com",
              founder: {
                "@type": "Person",
                name: "Lewis Rice",
                jobTitle: "CEO",
              },
              areaServed: {
                "@type": "Country",
                name: "Japan",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Tokyo",
                addressCountry: "JP",
              },
              knowsLanguage: ["en", "ja"],
              serviceType: [
                "AI Consulting",
                "AI Agent Development",
                "Business Automation",
              ],
            }),
          }}
        />
      </head>
      <body className={`${inter.className} ${notoSansJP.className} antialiased`}>
        <ClerkClientProvider>
          <ConvexClientProvider>
            {children}
            <Toaster />
          </ConvexClientProvider>
        </ClerkClientProvider>
      </body>
    </html>
  );
}
