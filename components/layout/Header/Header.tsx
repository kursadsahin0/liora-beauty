"use client";

import Link from "next/link";
import { ChevronRight, Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button/Button";
import { Container } from "@/components/ui/Container/Container";
import styles from "./Header.module.scss";

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelId = useId();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    if (!panel) return;

    const focusables = [
      ...panel.querySelectorAll<HTMLElement>(FOCUSABLE),
    ].filter((el) => !el.hasAttribute("disabled"));
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    first?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || focusables.length === 0) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const onResize = () => {
      if (window.matchMedia("(min-width: 64rem)").matches) {
        setOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const close = () => setOpen(false);

  const headerClass = [
    styles.header,
    scrolled || open ? styles.scrolled : "",
    open ? styles.menuOpen : "",
  ]
    .filter(Boolean)
    .join(" ");

  const panelClass = [
    styles.mobilePanel,
    open ? styles.mobilePanelOpen : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={headerClass}>
        <Container width="max" className={styles.inner}>
          <Link href="/" className={styles.brand} onClick={close}>
            <span className={styles.brandMark}>{siteConfig.name}</span>
            <span className={styles.brandDot} aria-hidden="true" />
          </Link>

          <nav className={styles.nav} aria-label="Ana navigasyon">
            {siteConfig.nav.map((item) => (
              <Link key={item.href} href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ))}
          </nav>

          <div className={styles.actions}>
            <div className={styles.ctaDesktop}>
              <Button href="/#iletisim" variant="primary" size="sm">
                Randevu Al
              </Button>
            </div>

            <button
              ref={toggleRef}
              type="button"
              className={styles.menuToggle}
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? (
                <X size={22} strokeWidth={1.5} />
              ) : (
                <Menu size={22} strokeWidth={1.5} />
              )}
            </button>
          </div>
        </Container>
      </header>

      <div
        ref={panelRef}
        id={panelId}
        className={panelClass}
        aria-hidden={!open}
        {...(!open ? { inert: true } : {})}
      >
        <nav className={styles.mobileNav} aria-label="Mobil navigasyon">
          <p className={styles.mobileNavLabel}>Menü</p>
          <ul className={styles.mobileList}>
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={styles.mobileLink}
                  onClick={close}
                >
                  <span>{item.label}</span>
                  <ChevronRight size={18} strokeWidth={1.75} aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.mobileMeta}>
            <p>{siteConfig.contact.phoneDisplay}</p>
            <p>{siteConfig.contact.addressLines.join(", ")}</p>
          </div>
          <Button
            href="/#iletisim"
            variant="primary"
            className={styles.mobileCta}
            onClick={close}
          >
            Randevu Al
          </Button>
        </nav>
      </div>
    </>
  );
}
