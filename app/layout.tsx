import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Caveat, Figtree } from "next/font/google";
import { site } from "@/content/site";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin", "latin-ext"],
  variable: "--font-bricolage",
  display: "swap",
  axes: ["opsz"],
});

const figtree = Figtree({
  subsets: ["latin", "latin-ext"],
  variable: "--font-figtree",
  display: "swap",
});

// Handwritten accent only (short notes). Cyrillic is needed for "Привет!".
const caveat = Caveat({
  subsets: ["latin", "latin-ext", "cyrillic"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["500"],
});

const title = "Językownia | Języki, matematyka i korepetycje - Konstantynów Łódzki";
const description =
  "Językownia w Konstantynowie Łódzkim: angielski, niemiecki, rosyjski, polski i matematyka. Zajęcia indywidualne i w małych grupach, wsparcie dla klas 1–3 oraz przygotowanie do egzaminu ósmoklasisty i matury.";

export const metadata: Metadata = {
  metadataBase: site.url ? new URL(site.url) : undefined,
  title,
  description,
  alternates: site.url ? { canonical: "/" } : undefined,
  openGraph: {
    type: "website",
    locale: "pl_PL",
    siteName: site.name,
    title,
    description,
    images: [{ url: "/images/hero-jezykownia.jpg", width: 1983, height: 793, alt: "Biurko do nauki w Językowni" }],
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#f9f8f2",
};

function structuredData() {
  return {
    "@context": "https://schema.org",
    "@type": ["EducationalOrganization", "LocalBusiness"],
    name: site.name,
    description,
    telephone: site.phone.e164,
    ...(site.url ? { url: site.url, image: new URL("/images/hero-jezykownia.jpg", site.url).toString() } : {}),
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      postalCode: site.address.postalCode,
      addressLocality: site.address.city,
      addressRegion: site.address.region,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "City", name: site.address.city },
    openingHoursSpecification: site.hours
      .filter((h) => h.opens)
      .map((h) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: h.days, opens: h.opens, closes: h.closes })),
    knowsAbout: ["Język angielski", "Język niemiecki", "Język rosyjski", "Język polski", "Matematyka", "Egzamin ósmoklasisty", "Matura"],
    ...(site.facebookUrl ? { sameAs: [site.facebookUrl] } : {}),
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className={`${bricolage.variable} ${figtree.variable} ${caveat.variable}`}>
      <body>
        <a
          href="#main"
          className="fixed left-4 top-3 z-50 -translate-y-24 rounded-full bg-forest px-5 py-3 font-display font-semibold text-paper transition-transform focus:translate-y-0"
        >
          Przejdź do treści
        </a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()).replace(/</g, "\\u003c") }}
        />
      </body>
    </html>
  );
}
