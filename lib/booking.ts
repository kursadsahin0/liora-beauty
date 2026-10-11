import { siteConfig } from "@/lib/site";

export type BookingInquiry = {
  name: string;
  phone: string;
  serviceId: string;
  serviceLabel: string;
  preferredDate: string;
  message: string;
};

export type BookingFieldErrors = Partial<
  Record<"name" | "phone" | "serviceId" | "preferredDate" | "form", string>
>;

const phonePattern = /^(\+?\d[\d\s()-]{8,})$/;

export function validateBookingInquiry(
  values: Omit<BookingInquiry, "serviceLabel"> & { serviceLabel?: string },
): BookingFieldErrors {
  const errors: BookingFieldErrors = {};

  if (!values.name.trim()) {
    errors.name = "Lütfen adınızı yazın.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Ad en az 2 karakter olmalıdır.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Lütfen telefon numaranızı yazın.";
  } else if (!phonePattern.test(values.phone.trim())) {
    errors.phone = "Geçerli bir telefon numarası girin.";
  }

  if (!values.serviceId) {
    errors.serviceId = "Lütfen bir hizmet seçin.";
  }

  if (values.preferredDate) {
    const selected = new Date(`${values.preferredDate}T12:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (Number.isNaN(selected.getTime())) {
      errors.preferredDate = "Geçerli bir tarih seçin.";
    } else if (selected < today) {
      errors.preferredDate = "Tercih edilen tarih bugünden önce olamaz.";
    }
  }

  return errors;
}

export function formatPreferredDate(value: string): string {
  if (!value) return "Belirtilmedi";
  const date = new Date(`${value}T12:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat(siteConfig.locale, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function buildWhatsAppAppointmentMessage(
  inquiry: BookingInquiry,
): string {
  const lines = [
    `Merhaba ${siteConfig.name},`,
    "",
    "Web sitesinden randevu talebi:",
    `• Ad: ${inquiry.name.trim()}`,
    `• Telefon: ${inquiry.phone.trim()}`,
    `• Hizmet: ${inquiry.serviceLabel}`,
    `• Tercih edilen tarih: ${formatPreferredDate(inquiry.preferredDate)}`,
  ];

  if (inquiry.message.trim()) {
    lines.push(`• Not: ${inquiry.message.trim()}`);
  }

  lines.push("", "Uygun bir saat için dönüş bekliyorum.");
  return lines.join("\n");
}

export function buildQuickWhatsAppMessage(serviceLabel?: string): string {
  const serviceLine = serviceLabel
    ? `Özellikle ${serviceLabel} için randevu almak istiyorum.`
    : "Randevu almak istiyorum.";

  return [
    `Merhaba ${siteConfig.name},`,
    "",
    serviceLine,
    "Uygun gün ve saatlerinizi paylaşabilir misiniz?",
  ].join("\n");
}
