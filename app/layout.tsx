import type { Metadata, Viewport } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SITE } from "@/lib/site";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a1630",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} (AKA) — ${SITE.tagline}`,
    template: `%s | ${SITE.shortName} — ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: SITE.name,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "NGO",
  "@id": `${SITE.url}/#organization`,
  name: SITE.name,
  alternateName: SITE.shortName,
  url: SITE.url,
  logo: `${SITE.url}/images/logo.png`,
  email: SITE.email,
  description: SITE.description,
  areaServed: { "@type": "Country", name: "Australia" },
  address: { "@type": "PostalAddress", addressLocality: "Sydney", addressRegion: "NSW", addressCountry: "AU" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en-AU" className={`${poppins.variable} ${inter.variable}`}>
      <body>
        <a
          href="#main"
          className="bg-primary text-ink fixed top-3 left-3 z-[100] -translate-y-20 rounded-full px-5 py-3 text-sm font-medium focus:translate-y-0"
        >
          Skip to content
        </a>
        <div
          aria-hidden="true"
          className="scroll-progress bg-primary fixed inset-x-0 top-0 z-[70] h-[3px] origin-left"
        />
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </body>
    </html>
  );
}
