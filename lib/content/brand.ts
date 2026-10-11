/**
 * Brand story, gallery, team, and testimonial sample content.
 * Replace with salon-approved copy, portraits, and genuine reviews.
 * Do not treat names, quotes, or imagery as verified real-world claims.
 */

export const isBrandSampleData = true;

export const brandStoryContent = {
  id: "hikaye",
  eyebrow: "Hikaye",
  title: "Güzelliği abartmadan, özenle ele alırız.",
  lead: "Liora’da bakım; teşhis, dokunuş ve sükûnetin dengesiyle ilerler. Aşağıdaki metin örnek bir marka anlatısıdır.",
  paragraphs: [
    "Her misafiri aynı protokolle karşılamayız. Önce cildi dinler, ihtiyaçları netleştirir, ardından ölçülü bir ritüel tasarlarız.",
    "Amacımız geçici bir parlaklık değil; cildin kendi dengesine yaklaşmasına alan açmaktır. Ürün seçimi, teknik ve tempo bu doğrultuda şekillenir.",
    "Atölye atmosferi sakin, hijyen standartları ise tavizsiz tutulur. Deneyim, ilk karşılama anından veda edişe kadar tutarlı bir özenle akar.",
  ],
  pillars: [
    { label: "Yaklaşım", text: "Teşhis öncelikli, kişiye özel protokoller" },
    { label: "Standart", text: "Temizlik, şeffaflık ve kontrollü uygulamalar" },
    { label: "Deneyim", text: "Sakin tempo, net iletişim, ölçülü sonuç" },
  ],
  sampleNote:
    "Örnek marka anlatısı — salonun gerçek hikâyesi ve standartları buraya işlenecektir.",
  imageKey: "story" as const,
} as const;

export type GalleryItem = {
  id: string;
  imageKey: GalleryImageKey;
  caption: string;
  span: "tall" | "wide" | "square";
};

export type GalleryImageKey =
  | "g1"
  | "g2"
  | "g3"
  | "g4"
  | "g5"
  | "g6";

export const galleryContent = {
  id: "galeri",
  eyebrow: "Galeri",
  title: "Işık, doku ve mekân.",
} as const;

export const galleryItems: GalleryItem[] = [
  {
    id: "g1",
    imageKey: "g1",
    caption: "Yumuşak ışıkta cilt bakımı detayı",
    span: "wide",
  },
  {
    id: "g2",
    imageKey: "g2",
    caption: "Sakin tedavi odası atmosferi",
    span: "square",
  },
  {
    id: "g3",
    imageKey: "g3",
    caption: "Bakım ürünleri ve düzenli çalışma alanı",
    span: "square",
  },
  {
    id: "g4",
    imageKey: "g4",
    caption: "Kaş ve ifade bakımı hazırlığı",
    span: "square",
  },
  {
    id: "g5",
    imageKey: "g5",
    caption: "Salon iç mekânında sakin bir köşe",
    span: "square",
  },
  {
    id: "g6",
    imageKey: "g6",
    caption: "Spa dokunuşlu rahatlama anı",
    span: "square",
  },
];

export type TeamMember = {
  id: string;
  name: string;
  role: string;
  focus: string;
  imageKey: TeamImageKey;
};

export type TeamImageKey = "t1" | "t2" | "t3";

export const teamContent = {
  id: "ekip",
  eyebrow: "Ekip",
  title: "Bakımı yürüten uzmanlar.",
  lead: "Her protokol, alanında deneyimli uzmanlar tarafından planlanır ve uygulanır.",
  sampleBadge: "Örnek profiller",
  sampleNote:
    "İsimler, unvanlar ve fotoğraflar kurgusal örneklerdir; gerçek personel bilgisi değildir.",
} as const;

export const teamMembers: TeamMember[] = [
  {
    id: "t1",
    name: "Profil A",
    role: "Cilt bakımı uzmanı",
    focus: "Teşhis, bariyer onarımı, nem protokolleri",
    imageKey: "t1",
  },
  {
    id: "t2",
    name: "Profil B",
    role: "İfade & kaş uzmanı",
    focus: "Kaş tasarımı, laminasyon, doğal form",
    imageKey: "t2",
  },
  {
    id: "t3",
    name: "Profil C",
    role: "Misafir deneyimi danışmanı",
    focus: "Karşılama, randevu planı, takip",
    imageKey: "t3",
  },
];

export type Testimonial = {
  id: string;
  quote: string;
  attribution: string;
};

export const testimonialsContent = {
  id: "yorumlar",
  eyebrow: "Yorumlar",
  title: "Misafir deneyiminden notlar.",
  lead: "Aşağıdaki alıntılar örnek metinlerdir. Doğrulanmış müşteri yorumu olarak sunulmazlar.",
  sampleBadge: "Örnek yorumlar",
  sampleNote:
    "Gerçek müşteri geri bildirimleri sağlandığında bu bölümdeki metinler değiştirilecektir.",
} as const;

export const testimonials: Testimonial[] = [
  {
    id: "r1",
    quote:
      "Seans boyunca tempo hiç aceleci değildi. Her adım anlatıldı, cildim günlerce dengeli kaldı.",
    attribution: "Örnek yorum · Misafir A",
  },
  {
    id: "r2",
    quote:
      "Ortam sakin, iletişim net. Abartısız bir sonuç istedim; tam olarak o çizgide ilerlendi.",
    attribution: "Örnek yorum · Misafir B",
  },
  {
    id: "r3",
    quote:
      "Randevu öncesi beklentilerim soruldu, sonrasında da kısa bir bakım önerisi paylaşıldı. Güven veren bir deneyimdi.",
    attribution: "Örnek yorum · Misafir C",
  },
];
