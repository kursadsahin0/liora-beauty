/**
 * Central image registry — swap remote URLs for local assets later
 * without touching component markup.
 */
export const media = {
  hero: {
    src: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=1800&q=80",
    alt: "Yumuşak ışıkta makyaj ve cilt bakımı editorial portresi",
    width: 1440,
    height: 1800,
  },
  atelier: {
    src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=80",
    alt: "Sakin bir bakım ortamında cilt bakımı ritüeli",
    width: 1120,
    height: 1400,
  },
  story: {
    src: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?auto=format&fit=crop&w=1600&q=80",
    alt: "Sakin ışıkta cilt bakımı uygulanan editorial portre",
    width: 1280,
    height: 1600,
  },
  services: {
    skin: {
      src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1400&q=80",
      alt: "Cilt bakımı sırasında yumuşak dokunuş ve serum uygulaması",
      width: 1120,
      height: 1400,
    },
    laser: {
      src: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=1400&q=80",
      alt: "Klinik ortamda kontrollü lazer epilasyon seansı",
      width: 1120,
      height: 1400,
    },
    brows: {
      src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1400&q=80",
      alt: "Kaş ve kirpik bakımı için hazırlanan çalışma masası",
      width: 1120,
      height: 1400,
    },
    nails: {
      src: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=1400&q=80",
      alt: "Rafine manikür detayı ve bakımlı eller",
      width: 1120,
      height: 1400,
    },
    makeup: {
      src: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?auto=format&fit=crop&w=1400&q=80",
      alt: "Kalıcı makyaj ve güzellik uygulaması editorial portresi",
      width: 1120,
      height: 1400,
    },
    packages: {
      src: "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1400&q=80",
      alt: "Spa ortamında bütüncül bakım ve rahatlama atmosferi",
      width: 1120,
      height: 1400,
    },
  },
  gallery: {
    g1: {
      src: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=1200&q=80",
      alt: "Mum ışığında sakin spa ve cilt bakımı atmosferi",
      width: 960,
      height: 1200,
    },
    g2: {
      src: "https://images.unsplash.com/photo-1745327883290-1e9c6447b938?auto=format&fit=crop&w=1600&q=80",
      alt: "Modern tedavi odasında hazırlanmış bakım yatağı",
      width: 1600,
      height: 1000,
    },
    g3: {
      src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=1200&q=80",
      alt: "Yakın planda cilt bakımı serum uygulaması",
      width: 1200,
      height: 1200,
    },
    g4: {
      src: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
      alt: "Makyaj ve kaş bakımı için düzenlenmiş ürünler",
      width: 1200,
      height: 1200,
    },
    g5: {
      src: "https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?auto=format&fit=crop&w=1200&q=80",
      alt: "Minimalist güzellik salonu bekleme alanı",
      width: 960,
      height: 1200,
    },
    g6: {
      src: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=1600&q=80",
      alt: "Rahatlatıcı spa masajı ve bakım anı",
      width: 1600,
      height: 1000,
    },
  },
  team: {
    t1: {
      src: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=1000&q=80",
      alt: "Örnek ekip profili için portre fotoğrafı",
      width: 800,
      height: 1000,
    },
    t2: {
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=1000&q=80",
      alt: "Örnek ekip profili için portre fotoğrafı",
      width: 800,
      height: 1000,
    },
    t3: {
      src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=1000&q=80",
      alt: "Örnek ekip profili için portre fotoğrafı",
      width: 800,
      height: 1000,
    },
  },
} as const;
