# Liora — Güzellik Atölyesi

Premium güzellik salonu için tek sayfalık tanıtım ve randevu sitesi. Marka anlatısı, hizmetler, galeri, ekip, fiyatlar ve WhatsApp üzerinden randevu akışını bir araya getirir.

## Teknoloji

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **SCSS Modules** + tasarım token’ları (`styles/abstracts`)
- **GSAP** (scroll / reveal animasyonları)
- **lucide-react** (ikonlar)

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda [http://localhost:3000](http://localhost:3000) adresini açın.

### Diğer komutlar

```bash
npm run build   # üretim derlemesi
npm run start   # üretim sunucusu
npm run lint    # ESLint
```

## Proje yapısı

```text
app/                  # layout, ana sayfa, SEO (robots, sitemap, icon)
components/
  home/               # Hero, hikâye, hizmetler, galeri, ekip, fiyat, randevu…
  layout/             # Header, Footer, MobileDock, SiteShell
  ui/                 # Button, Container, Section
lib/
  site.ts             # salon adı, iletişim, navigasyon
  media.ts            # görsel kayıtları (URL / alt metin)
  booking.ts          # form doğrulama + WhatsApp mesajı
  content/            # metin içerikleri (örnek / gerçek)
  animations/         # GSAP yardımcılar
styles/               # global SCSS, token’lar, tipografi
```

## Lansman öncesi düzenleme

Örnek / placeholder veriler canlıya çıkmadan gerçek salon bilgileriyle değiştirilmelidir.

| Ne | Dosya |
| --- | --- |
| İsim, telefon, WhatsApp, adres, saatler, sosyal | `lib/site.ts` |
| Görseller (hero, galeri, ekip…) | `lib/media.ts` |
| Hikâye, galeri, ekip, yorumlar | `lib/content/brand.ts` |
| Hizmetler ve fiyatlar | `lib/content/services.ts` |
| Randevu formu metinleri | `lib/content/booking.ts` |
| Hero / atölye metinleri | `lib/content/home.ts` |
| Site URL (SEO, sitemap) | `lib/site.ts` → `url` |

`siteConfig.contact.isPlaceholder` gerçek iletişim bilgileri girildikten sonra `false` yapılmalıdır.

## Özellikler

- Editorial masaüstü düzeni + mobil uygulama benzeri alt dock
- WhatsApp randevu formu (`wa.me` yönlendirmesi)
- Galeri lightbox (klavye: Esc / ok tuşları)
- `prefers-reduced-motion` desteği
- Metadata, Open Graph, `robots.ts`, `sitemap.ts`, JSON-LD

## Notlar

- Görseller şu an Unsplash örnek URL’leridir; yerellerle değiştirmek için `lib/media.ts` yeterlidir.
- Geliştirmede görünen Next.js rozeti `next.config.ts` içinde `devIndicators: false` ile kapalıdır.
- Tarayıcı eklentileri (ör. ColorZilla) hydration uyarısı üretebilir; bu uygulama hatası değildir.

## Lisans

Private — tüm hakları saklıdır.
# deneme
