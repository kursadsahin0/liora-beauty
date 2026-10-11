"use client";

import Link from "next/link";
import {
  CalendarDays,
  Home,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { getWhatsAppHref, siteConfig } from "@/lib/site";
import styles from "./MobileDock.module.scss";

type DockItem = {
  id: string;
  label: string;
  href: string;
  icon: typeof Home;
  primary?: boolean;
  external?: boolean;
};

const items: DockItem[] = [
  {
    id: "home",
    label: "Ana Sayfa",
    href: "/#",
    icon: Home,
  },
  {
    id: "services",
    label: "Hizmetler",
    href: "/#hizmetler",
    icon: Sparkles,
  },
  {
    id: "booking",
    label: "Randevu",
    href: "/#iletisim",
    icon: CalendarDays,
    primary: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: getWhatsAppHref(
      siteConfig.contact.whatsappE164,
      "Merhaba, randevu hakkında bilgi almak istiyorum.",
    ),
    icon: MessageCircle,
    external: true,
  },
];

export function MobileDock() {
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY < 96) {
        setActive("home");
        return;
      }

      const markers: Array<{ id: string; active: string }> = [
        { id: "hizmetler", active: "services" },
        { id: "galeri", active: "services" },
        { id: "fiyatlar", active: "services" },
        { id: "iletisim", active: "booking" },
      ];

      const y = window.scrollY + window.innerHeight * 0.28;
      let next = "home";

      for (const marker of markers) {
        const el = document.getElementById(marker.id);
        if (el && el.offsetTop <= y) next = marker.active;
      }

      setActive(next);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav className={styles.dock} aria-label="Mobil hızlı erişim">
      <ul className={styles.list}>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = !item.external && active === item.id;
          const className = [
            styles.item,
            item.primary ? styles.itemPrimary : "",
            isActive ? styles.itemActive : "",
          ]
            .filter(Boolean)
            .join(" ");

          const content = (
            <>
              <Icon size={20} strokeWidth={1.75} aria-hidden="true" />
              <span>{item.label}</span>
            </>
          );

          return (
            <li key={item.id}>
              {item.external ? (
                <a
                  href={item.href}
                  className={className}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {content}
                </a>
              ) : (
                <Link href={item.href} className={className}>
                  {content}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
