// Verified business facts. Keep this the single source of truth.
// Anything not listed here needs client confirmation before it goes on the site.

const address = {
  street: "Sadowa 12B",
  postalCode: "95-050",
  city: "Konstantynów Łódzki",
  region: "łódzkie",
  country: "PL",
};

const mapsQuery = `Językownia, ${address.street}, ${address.postalCode} ${address.city}`;

export const site = {
  name: "Językownia",
  address,
  phone: {
    display: "574 930 108",
    displayIntl: "+48 574 930 108",
    href: "tel:+48574930108",
    e164: "+48574930108",
  },
  googleRating: "5,0",
  hours: [
    { label: "Poniedziałek – piątek", short: "Pn–Pt", opens: "08:00", closes: "21:00", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"] },
    { label: "Sobota", short: "Sobota", opens: "08:00", closes: "14:00", days: ["Saturday"] },
    { label: "Niedziela", short: "Niedziela", opens: null, closes: null, days: ["Sunday"] },
  ],
  /** Public site URL, set via NEXT_PUBLIC_SITE_URL once the domain is known. */
  url: process.env.NEXT_PUBLIC_SITE_URL || null,
  /** Official Facebook profile supplied by the client. Rendered in the footer and contact section. */
  facebookUrl: "https://www.facebook.com/p/Językownia-100030755752514/" as string | null,
  /** Search and directions links built from the verified address (no place ID needed). */
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
  directionsUrl: `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(mapsQuery)}`,
  mapEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`,
} as const;

export const nav = [
  { href: "#oferta", label: "Oferta" },
  { href: "#dla-kogo", label: "Dla kogo" },
  { href: "#egzaminy", label: "Egzaminy" },
  { href: "#opinie", label: "Opinie" },
  { href: "#faq", label: "FAQ" },
  { href: "#kontakt", label: "Kontakt" },
] as const;
