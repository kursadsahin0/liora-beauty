/**
 * Sample treatment & pricing data for Liora.
 * Replace titles, copy, durations, and price labels with salon-provided values.
 * All monetary figures are placeholders — marked via `isSampleData`.
 */

export const isSampleData = true;

export type ServiceCategory = {
  id: string;
  number: string;
  title: string;
  summary: string;
  description: string;
  duration: string;
  imageKey: ServiceImageKey;
  featured?: boolean;
};

export type ServiceImageKey =
  | "skin"
  | "laser"
  | "brows"
  | "nails"
  | "makeup"
  | "packages";

export type PriceItem = {
  id: string;
  categoryId: string;
  name: string;
  duration: string;
  /** Display string only — not a live commerce price */
  priceLabel: string;
  highlight?: boolean;
};

export const servicesContent = {
  id: "hizmetler",
  eyebrow: "Hizmetler",
  title: "Cilt, doku ve ifade için seçilmiş ritüeller.",
  lead: "Her kategori, teşhis sonrası kişiselleştirilen protokollerle sunulur. Aşağıdaki içerikler örnek sunum içindir.",
  sampleNote: "Örnek hizmet kataloğu — nihai menü salon onayıyla güncellenecektir.",
  bookingHref: "/#iletisim",
  bookingLabel: "Bu tedavi için randevu",
  indexLabel: "Katalog",
} as const;

/** Deep-link into the booking form with a preselected service. */
export function getBookingHref(serviceId?: string): string {
  if (!serviceId) return "/#iletisim";
  return `/?hizmet=${encodeURIComponent(serviceId)}#iletisim`;
}

export const serviceCategories: ServiceCategory[] = [
  {
    id: "cilt-bakimi",
    number: "01",
    title: "Cilt bakımı",
    summary: "Teşhis odaklı, ölçülü ve sürdürülebilir bakım protokolleri.",
    description:
      "Cilt tipine göre şekillenen derin temizlik, nemlendirme ve bariyer güçlendirme ritüelleri. İlk seans değerlendirme içerir.",
    duration: "60–90 dk",
    imageKey: "skin",
    featured: true,
  },
  {
    id: "lazer-epilasyon",
    number: "02",
    title: "Lazer epilasyon",
    summary: "Hassas bölgeler için kontrollü, konforlu seans planı.",
    description:
      "Cilt ve kıl tipine göre ayarlanan protokollerle, düzenli aralıklarla ilerleyen bir epilasyon deneyimi.",
    duration: "20–60 dk",
    imageKey: "laser",
  },
  {
    id: "kas-kirpik",
    number: "03",
    title: "Kaş ve kirpik uygulamaları",
    summary: "Yüz hatlarını dengeleyen doğal form ve renk çalışmaları.",
    description:
      "Kaş tasarımı, laminasyon ve kirpik lifting uygulamalarıyla bakımlı, yumuşak bir ifade.",
    duration: "45–75 dk",
    imageKey: "brows",
  },
  {
    id: "manikur-pedikur",
    number: "04",
    title: "Manikür ve pedikür",
    summary: "El ve ayak sağlığını öne çıkaran sakin bakım ritüelleri.",
    description:
      "Şekillendirme, bakım ve uzun süre dayanan ojelerle temiz, rafine bir bitiş.",
    duration: "45–80 dk",
    imageKey: "nails",
  },
  {
    id: "kalici-makyaj",
    number: "05",
    title: "Kalıcı makyaj",
    summary: "Yüz oranlarına uyumlu, doğal ve zamansız pigment çalışmaları.",
    description:
      "Kaş, eyeliner ve dudak uygulamalarında ölçülü renk seçimi ve iyileşme takibi.",
    duration: "90–150 dk",
    imageKey: "makeup",
  },
  {
    id: "bakim-paketleri",
    number: "06",
    title: "Profesyonel bakım paketleri",
    summary: "Sezonluk ihtiyaçlara göre bir araya getirilmiş bütüncül programlar.",
    description:
      "Cilt, epilasyon ve ifade bakımlarını birleştiren paketler; düzenli takip ile planlanır.",
    duration: "Programa göre",
    imageKey: "packages",
  },
];

export const pricingContent = {
  id: "fiyatlar",
  eyebrow: "Fiyatlandırma",
  title: "Şeffaf, sakin ve anlaşılır bir menü.",
  lead: "Süreler ve tutarlar örnek veridir. Gerçek fiyatlar cilt analizi ve seçilen protokole göre netleşir.",
  sampleBadge: "Örnek fiyatlar",
  sampleDisclaimer:
    "Bu listedeki tüm tutarlar yer tutucudur. Salon fiyat listesi sağlandığında buradaki değerler birebir değiştirilebilir.",
  ctaLabel: "Ücretsiz ön görüşme planla",
  ctaHref: "/#iletisim",
  ctaNote: "İlk değerlendirme görüşmesi ile size uygun protokolü birlikte belirleriz.",
} as const;

export const priceItems: PriceItem[] = [
  {
    id: "skin-classic",
    categoryId: "cilt-bakimi",
    name: "Klasik cilt bakımı",
    duration: "60 dk",
    priceLabel: "Örnek · ₺2.400",
  },
  {
    id: "skin-deep",
    categoryId: "cilt-bakimi",
    name: "Derin temizleme bakımı",
    duration: "75 dk",
    priceLabel: "Örnek · ₺3.100",
    highlight: true,
  },
  {
    id: "laser-session",
    categoryId: "lazer-epilasyon",
    name: "Lazer epilasyon seansı",
    duration: "30–45 dk",
    priceLabel: "Örnek · ₺1.800",
  },
  {
    id: "brow-design",
    categoryId: "kas-kirpik",
    name: "Kaş tasarımı & şekillendirme",
    duration: "45 dk",
    priceLabel: "Örnek · ₺1.200",
  },
  {
    id: "lash-lift",
    categoryId: "kas-kirpik",
    name: "Kirpik lifting",
    duration: "60 dk",
    priceLabel: "Örnek · ₺1.900",
  },
  {
    id: "mani",
    categoryId: "manikur-pedikur",
    name: "Spa manikür",
    duration: "50 dk",
    priceLabel: "Örnek · ₺950",
  },
  {
    id: "pedi",
    categoryId: "manikur-pedikur",
    name: "Spa pedikür",
    duration: "60 dk",
    priceLabel: "Örnek · ₺1.150",
  },
  {
    id: "pm-brows",
    categoryId: "kalici-makyaj",
    name: "Kalıcı kaş uygulaması",
    duration: "120 dk",
    priceLabel: "Örnek · ₺6.500",
    highlight: true,
  },
  {
    id: "package-season",
    categoryId: "bakim-paketleri",
    name: "Sezonluk bakım paketi",
    duration: "4 seans",
    priceLabel: "Örnek · ₺9.800",
  },
];

export function getCategoryTitle(categoryId: string): string {
  return (
    serviceCategories.find((item) => item.id === categoryId)?.title ?? categoryId
  );
}

export function groupPricesByCategory(items: PriceItem[] = priceItems) {
  const order = serviceCategories.map((category) => category.id);
  const groups = new Map<string, PriceItem[]>();

  for (const item of items) {
    const list = groups.get(item.categoryId) ?? [];
    list.push(item);
    groups.set(item.categoryId, list);
  }

  return order
    .filter((id) => groups.has(id))
    .map((id) => ({
      categoryId: id,
      title: getCategoryTitle(id),
      items: groups.get(id) ?? [],
    }));
}
