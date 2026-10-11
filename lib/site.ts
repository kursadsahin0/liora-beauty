/**
 * Central salon configuration.
 * Replace placeholder contact values with the salon's real details before launch.
 */
export const siteConfig = {
  name: "Liora",
  tagline: "Zamansız güzellik ritüelleri",
  description:
    "Liora, modern bakım bilimi ile editorial bir estetiği buluşturan premium güzellik atölyesidir.",
  locale: "tr",
  copyrightYear: 2026,
  url: "https://liora.studio",
  contact: {
    /** Set true until real salon contact details are supplied. */
    isPlaceholder: true,
    email: "merhaba@liora.studio",
    phoneDisplay: "+90 212 000 00 00",
    /** Digits only, country code included — used by tel: links */
    phoneE164: "902120000000",
    /** Digits only, country code included — used by wa.me links */
    whatsappE164: "902120000000",
    addressLines: ["Nişantaşı", "İstanbul"],
    mapsUrl: "https://maps.google.com/?q=Nisantasi+Istanbul",
    mapsLabel: "Yol tarifi al",
    hours: [
      { days: "Pazartesi – Cumartesi", time: "10:00 – 19:00" },
      { days: "Pazar", time: "Randevu ile" },
    ],
  },
  nav: [
    { label: "Atölye", href: "/#hikaye" },
    { label: "Hizmetler", href: "/#hizmetler" },
    { label: "Galeri", href: "/#galeri" },
    { label: "Randevu", href: "/#iletisim" },
  ],
  /**
   * Add real profile URLs before launch.
   * Empty by default so the UI does not link to generic social homepages.
   */
  social: [] as ReadonlyArray<{ label: string; href: string }>,
} as const;

export type NavItem = (typeof siteConfig.nav)[number];

export function getTelHref(phoneE164 = siteConfig.contact.phoneE164): string {
  return `tel:+${phoneE164}`;
}

export function getWhatsAppHref(
  phoneE164 = siteConfig.contact.whatsappE164,
  message?: string,
): string {
  const base = `https://wa.me/${phoneE164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
