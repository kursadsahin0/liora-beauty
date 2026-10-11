"use client";

import { MessageCircle, Phone } from "lucide-react";
import {
  FormEvent,
  startTransition,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import { useGsapContext } from "@/hooks/useGsapContext";
import {
  gsap,
  motion,
  registerGsapPlugins,
  splitElementText,
} from "@/lib/animations";
import {
  buildQuickWhatsAppMessage,
  buildWhatsAppAppointmentMessage,
  validateBookingInquiry,
  type BookingFieldErrors,
} from "@/lib/booking";
import { bookingContent } from "@/lib/content/booking";
import { serviceCategories } from "@/lib/content/services";
import {
  getTelHref,
  getWhatsAppHref,
  siteConfig,
} from "@/lib/site";
import styles from "./BookingContact.module.scss";

type FormState = {
  name: string;
  phone: string;
  serviceId: string;
  preferredDate: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  phone: "",
  serviceId: "",
  preferredDate: "",
  message: "",
};

export function BookingContact() {
  const rootRef = useRef<HTMLElement>(null);
  const formId = useId();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [errors, setErrors] = useState<BookingFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [whatsAppUrl, setWhatsAppUrl] = useState<string | null>(null);

  const serviceOptions = useMemo(
    () =>
      serviceCategories.map((item) => ({
        id: item.id,
        label: item.title,
      })),
    [],
  );

  const selectedServiceLabel =
    serviceOptions.find((item) => item.id === form.serviceId)?.label ?? "";

  const quickWhatsAppHref = getWhatsAppHref(
    siteConfig.contact.whatsappE164,
    buildQuickWhatsAppMessage(selectedServiceLabel || undefined),
  );
  const telHref = getTelHref();

  useEffect(() => {
    const serviceFromQuery = new URLSearchParams(window.location.search).get(
      "hizmet",
    );
    if (!serviceFromQuery) return;
    if (!serviceOptions.some((item) => item.id === serviceFromQuery)) return;

    startTransition(() => {
      setForm((current) =>
        current.serviceId === serviceFromQuery
          ? current
          : { ...current, serviceId: serviceFromQuery },
      );
    });
  }, [serviceOptions]);

  useGsapContext(rootRef, (reducedMotion) => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    const header = gsap.utils.toArray<HTMLElement>("[data-booking='header']");
    const title = root.querySelector<HTMLElement>("[data-booking='title']");
    const panel = gsap.utils.toArray<HTMLElement>("[data-booking='panel']");
    const details = gsap.utils.toArray<HTMLElement>("[data-booking='detail']");
    const words = title ? splitElementText(title, "words") : [];

    if (reducedMotion) {
      gsap.set([header, words, panel, details], {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
      });
      return;
    }

    gsap.set(header, { autoAlpha: 0, y: motion.reveal.yLabel });
    gsap.set(words, { yPercent: 115 });
    gsap.set(panel, { autoAlpha: 0, y: motion.reveal.ySubtle });
    gsap.set(details, { autoAlpha: 0, y: motion.reveal.yLabel });

    const tl = gsap.timeline({
      defaults: { ease: motion.ease.outExpo },
      scrollTrigger: {
        trigger: root,
        start: motion.scroll.start,
        once: true,
      },
    });

    tl.to(header, {
      autoAlpha: 1,
      y: 0,
      duration: motion.duration.base,
      stagger: motion.stagger.tight,
      ease: motion.ease.outQuart,
    });

    tl.to(
      words,
      {
        yPercent: 0,
        duration: motion.duration.slow,
        stagger: motion.stagger.words,
      },
      0.08,
    );

    tl.to(
      panel,
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.slow,
      },
      0.2,
    );

    tl.to(
      details,
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.base,
        stagger: motion.stagger.tight,
        ease: motion.ease.outQuart,
      },
      0.32,
    );
  }, []);

  const updateField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      if (!current[key as keyof BookingFieldErrors] && !current.form) {
        return current;
      }
      const next = { ...current };
      delete next[key as keyof BookingFieldErrors];
      delete next.form;
      return next;
    });
    if (status === "submitted") {
      setStatus("idle");
      setWhatsAppUrl(null);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validateBookingInquiry(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = Object.keys(nextErrors)[0];
      const field = document.getElementById(`${formId}-${firstInvalid}`);
      field?.focus();
      return;
    }

    const inquiry = {
      ...form,
      serviceLabel: selectedServiceLabel,
    };

    const message = buildWhatsAppAppointmentMessage(inquiry);
    const href = getWhatsAppHref(siteConfig.contact.whatsappE164, message);

    setWhatsAppUrl(href);
    setStatus("submitted");
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const fieldClass = (key: keyof BookingFieldErrors) =>
    `${styles.field} ${errors[key] ? styles.fieldError : ""}`;

  return (
    <section
      ref={rootRef}
      id={bookingContent.id}
      className={styles.section}
      aria-labelledby="booking-title"
    >
      <Container width="max" className={styles.inner}>
        <div className={styles.intro}>
          <p className={`t-eyebrow ${styles.eyebrow}`} data-booking="header">
            {bookingContent.eyebrow}
          </p>
          <h2
            id="booking-title"
            className={styles.title}
            data-booking="title"
          >
            {bookingContent.title}
          </h2>
          <p className={`t-lead ${styles.lead}`} data-booking="header">
            {bookingContent.lead}
          </p>
          {siteConfig.contact.isPlaceholder ? (
            <p className={styles.placeholderNote} data-booking="header">
              {bookingContent.placeholderNote}
            </p>
          ) : null}

          <div className={styles.quickActions} data-booking="header">
            <a
              href={quickWhatsAppHref}
              className={`${styles.quickAction} ${styles.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} strokeWidth={1.5} aria-hidden="true" />
              {bookingContent.whatsappLabel}
            </a>
            <a href={telHref} className={`${styles.quickAction} ${styles.call}`}>
              <Phone size={18} strokeWidth={1.5} aria-hidden="true" />
              {bookingContent.phoneLabel}
            </a>
          </div>
        </div>

        <div className={styles.panel} data-booking="panel">
          {status === "submitted" && whatsAppUrl ? (
            <div className={styles.success} role="status" aria-live="polite">
              <h3 className={styles.successTitle}>
                {bookingContent.successTitle}
              </h3>
              <p className={styles.successBody}>{bookingContent.successBody}</p>
              <div className={styles.successActions}>
                <Button
                  href={whatsAppUrl}
                  variant="primary"
                  className={styles.submit}
                >
                  {bookingContent.openWhatsAppAgain}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className={styles.submit}
                  onClick={() => {
                    setStatus("idle");
                    setWhatsAppUrl(null);
                    setForm(emptyForm);
                    setErrors({});
                  }}
                >
                  {bookingContent.resetLabel}
                </Button>
              </div>
            </div>
          ) : (
            <>
              <h3 className={styles.formTitle}>{bookingContent.formTitle}</h3>
              <p className={styles.formLead}>{bookingContent.formLead}</p>

              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                {errors.form ? (
                  <p className={styles.formError} role="alert">
                    {errors.form}
                  </p>
                ) : null}

                <div className={fieldClass("name")}>
                  <label className={styles.label} htmlFor={`${formId}-name`}>
                    {bookingContent.fields.name.label}
                  </label>
                  <input
                    id={`${formId}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    className={styles.input}
                    placeholder={bookingContent.fields.name.placeholder}
                    value={form.name}
                    onChange={(event) => updateField("name", event.target.value)}
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={
                      errors.name ? `${formId}-name-error` : undefined
                    }
                  />
                  {errors.name ? (
                    <p
                      id={`${formId}-name-error`}
                      className={styles.error}
                      role="alert"
                    >
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div className={fieldClass("phone")}>
                  <label className={styles.label} htmlFor={`${formId}-phone`}>
                    {bookingContent.fields.phone.label}
                  </label>
                  <input
                    id={`${formId}-phone`}
                    name="phone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    className={styles.input}
                    placeholder={bookingContent.fields.phone.placeholder}
                    value={form.phone}
                    onChange={(event) => updateField("phone", event.target.value)}
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={
                      errors.phone ? `${formId}-phone-error` : undefined
                    }
                  />
                  {errors.phone ? (
                    <p
                      id={`${formId}-phone-error`}
                      className={styles.error}
                      role="alert"
                    >
                      {errors.phone}
                    </p>
                  ) : null}
                </div>

                <div className={fieldClass("serviceId")}>
                  <label
                    className={styles.label}
                    htmlFor={`${formId}-serviceId`}
                  >
                    {bookingContent.fields.service.label}
                  </label>
                  <select
                    id={`${formId}-serviceId`}
                    name="serviceId"
                    required
                    className={styles.select}
                    value={form.serviceId}
                    onChange={(event) =>
                      updateField("serviceId", event.target.value)
                    }
                    aria-invalid={Boolean(errors.serviceId)}
                    aria-describedby={
                      errors.serviceId ? `${formId}-serviceId-error` : undefined
                    }
                  >
                    <option value="">
                      {bookingContent.fields.service.placeholder}
                    </option>
                    {serviceOptions.map((option) => (
                      <option key={option.id} value={option.id}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {errors.serviceId ? (
                    <p
                      id={`${formId}-serviceId-error`}
                      className={styles.error}
                      role="alert"
                    >
                      {errors.serviceId}
                    </p>
                  ) : null}
                </div>

                <div className={fieldClass("preferredDate")}>
                  <div className={styles.labelRow}>
                    <label
                      className={styles.label}
                      htmlFor={`${formId}-preferredDate`}
                    >
                      {bookingContent.fields.date.label}
                    </label>
                    <span className={styles.hint}>
                      {bookingContent.fields.date.hint}
                    </span>
                  </div>
                  <input
                    id={`${formId}-preferredDate`}
                    name="preferredDate"
                    type="date"
                    className={styles.input}
                    value={form.preferredDate}
                    onChange={(event) =>
                      updateField("preferredDate", event.target.value)
                    }
                    aria-invalid={Boolean(errors.preferredDate)}
                    aria-describedby={
                      errors.preferredDate
                        ? `${formId}-preferredDate-error`
                        : undefined
                    }
                  />
                  {errors.preferredDate ? (
                    <p
                      id={`${formId}-preferredDate-error`}
                      className={styles.error}
                      role="alert"
                    >
                      {errors.preferredDate}
                    </p>
                  ) : null}
                </div>

                <div className={styles.field}>
                  <div className={styles.labelRow}>
                    <label
                      className={styles.label}
                      htmlFor={`${formId}-message`}
                    >
                      {bookingContent.fields.message.label}
                    </label>
                    <span className={styles.hint}>
                      {bookingContent.fields.message.hint}
                    </span>
                  </div>
                  <textarea
                    id={`${formId}-message`}
                    name="message"
                    className={styles.textarea}
                    placeholder={bookingContent.fields.message.placeholder}
                    value={form.message}
                    onChange={(event) =>
                      updateField("message", event.target.value)
                    }
                  />
                </div>

                <Button type="submit" variant="primary" className={styles.submit}>
                  {bookingContent.submitLabel}
                </Button>
              </form>
            </>
          )}
        </div>

        <div className={styles.details}>
          <div className={styles.detailBlock} data-booking="detail">
            <p className={styles.detailLabel}>{bookingContent.addressLabel}</p>
            <p className={styles.detailText}>
              {siteConfig.contact.addressLines.join(", ")}
            </p>
            <a
              href={siteConfig.contact.mapsUrl}
              className={styles.detailLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookingContent.mapsLabel}
            </a>
          </div>

          <div
            className={`${styles.detailBlock} ${styles.detailPhones}`}
            data-booking="detail"
          >
            <p className={styles.detailLabel}>Telefon</p>
            <a href={telHref} className={styles.detailLink}>
              {siteConfig.contact.phoneDisplay}
            </a>
            <p className={`${styles.detailLabel} ${styles.detailLabelSpaced}`}>
              WhatsApp
            </p>
            <a
              href={quickWhatsAppHref}
              className={styles.detailLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              {siteConfig.contact.phoneDisplay}
            </a>
          </div>

          <div className={styles.detailBlock} data-booking="detail">
            <p className={styles.detailLabel}>{bookingContent.hoursLabel}</p>
            <div className={styles.hoursList}>
              {siteConfig.contact.hours.map((slot) => (
                <p key={slot.days} className={styles.hoursRow}>
                  <span className={styles.hoursDays}>{slot.days}</span>
                  <span>{slot.time}</span>
                </p>
              ))}
            </div>
          </div>

          <div
            className={`${styles.detailBlock} ${styles.detailSocial}`}
            data-booking="detail"
          >
            <p className={styles.detailLabel}>{bookingContent.socialLabel}</p>
            <div className={styles.socialList}>
              {siteConfig.social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className={styles.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`mailto:${siteConfig.contact.email}`}
                className={styles.socialLink}
              >
                E-posta
              </a>
            </div>
            {siteConfig.social.length === 0 && siteConfig.contact.isPlaceholder ? (
              <p className={styles.socialHint}>
                Sosyal profil bağlantıları lansman öncesi eklenecektir.
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
