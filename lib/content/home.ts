import { siteConfig } from "@/lib/site";

export const homeContent = {
  hero: {
    eyebrow: "Nişantaşı · Güzellik Atölyesi",
    headline: ["Ciltte", "ışığı", "yeniden bul."],
    lead: "Bilimle şekillenen, dokunuşla tamamlanan premium bakım ritüelleri.",
    primaryCta: { label: "Randevu Al", href: "/#iletisim" },
    secondaryCta: { label: "Tedavileri Keşfet", href: "/#hizmetler" },
    index: "01",
    indexLabel: "Ritüel",
    scrollLabel: "Keşfet",
  },
  atelier: {
    id: "atelier",
    eyebrow: "Atölye",
    title: "Her ritüel, cildin kendi ritmine göre tasarlanır.",
    body: `${siteConfig.name}; modern dermatolojik yaklaşımı editorial bir sükûnetle buluşturur. İlk görüşmeden son dokunuşa kadar deneyim ölçülü, kişisel ve zamansızdır.`,
    detailLabel: "Yaklaşım",
    detail: "Teşhis · Protokol · Bakım · Takip",
    linkLabel: "Hizmetlere geç",
    linkHref: "/#hizmetler",
  },
} as const;
