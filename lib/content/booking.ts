import { siteConfig } from "@/lib/site";

export const bookingContent = {
  id: "iletisim",
  eyebrow: "Randevu",
  title: "Randevunuzu nazikçe planlayalım.",
  lead: "WhatsApp üzerinden hızlıca yazın, arayın veya formu doldurup talebinizi iletin. Form gönderimi, salonun WhatsApp hattına yönlendirilir.",
  whatsappLabel: "WhatsApp ile randevu",
  phoneLabel: "Telefonla ara",
  formTitle: "Randevu talep formu",
  formLead:
    "Alanları doldurduktan sonra WhatsApp açılır ve talebiniz hazır mesaj olarak iletilir. Bu sitede ayrı bir sunucu gönderimi yoktur.",
  submitLabel: "WhatsApp ile gönder",
  successTitle: "Talebiniz WhatsApp’a aktarıldı",
  successBody:
    "WhatsApp penceresi açıldıysa mesajı göndererek talebinizi tamamlayın. Açılmadıysa aşağıdaki bağlantıyı kullanın.",
  openWhatsAppAgain: "WhatsApp mesajını aç",
  resetLabel: "Yeni talep oluştur",
  placeholderNote:
    "İletişim bilgileri yapılandırma dosyasından yönetilir. Lansman öncesi gerçek salon bilgileriyle güncellenmelidir.",
  fields: {
    name: { label: "Ad Soyad", placeholder: "Adınız" },
    phone: { label: "Telefon", placeholder: "05xx xxx xx xx" },
    service: { label: "Tercih edilen hizmet", placeholder: "Hizmet seçin" },
    date: { label: "Tercih edilen tarih", hint: "Opsiyonel" },
    message: {
      label: "Mesajınız",
      placeholder: "Varsa eklemek istediğiniz bir not",
      hint: "Opsiyonel",
    },
  },
  contactTitle: "İletişim",
  hoursLabel: "Çalışma saatleri",
  addressLabel: "Adres",
  socialLabel: "Sosyal",
  mapsLabel: siteConfig.contact.mapsLabel,
} as const;
