"use client";

import Link from "next/link";
import { useRef } from "react";
import { Container } from "@/components/ui/Container/Container";
import { useGsapContext } from "@/hooks/useGsapContext";
import { gsap, motion, registerGsapPlugins } from "@/lib/animations";
import { getTelHref, siteConfig } from "@/lib/site";
import styles from "./Footer.module.scss";

export function Footer() {
  const rootRef = useRef<HTMLElement>(null);

  useGsapContext(rootRef, (reducedMotion) => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    const labels = gsap.utils.toArray<HTMLElement>("[data-footer='label']");
    const blocks = gsap.utils.toArray<HTMLElement>("[data-footer='block']");

    if (reducedMotion) {
      gsap.set([labels, blocks], { autoAlpha: 1, y: 0 });
      return;
    }

    gsap.set(labels, { autoAlpha: 0, y: motion.reveal.yLabel });
    gsap.set(blocks, { autoAlpha: 0, y: motion.reveal.yLabel });

    gsap
      .timeline({
        defaults: { ease: motion.ease.outQuart },
        scrollTrigger: {
          trigger: root,
          start: motion.scroll.startEarly,
          once: true,
          toggleActions: "play none none none",
        },
      })
      .to(labels, {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.base,
        stagger: motion.stagger.tight,
      })
      .to(
        blocks,
        {
          autoAlpha: 1,
          y: 0,
          duration: motion.duration.base,
          stagger: motion.stagger.tight,
        },
        0.06,
      );
  }, []);

  return (
    <footer ref={rootRef} className={styles.footer}>
      <Container width="max">
        <div className={styles.grid}>
          <div className={styles.brandBlock} data-footer="block">
            <p className={styles.brand}>{siteConfig.name}</p>
            <p className={`t-small ${styles.tagline}`}>
              {siteConfig.description}
            </p>
          </div>

          <div className={styles.explore} data-footer="block">
            <p className={styles.columnTitle} data-footer="label">
              Keşfet
            </p>
            <ul className={styles.list}>
              {siteConfig.nav.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.contact} data-footer="block">
            <p className={styles.columnTitle} data-footer="label">
              İletişim
            </p>
            <ul className={styles.list}>
              <li>
                <a href={getTelHref()} className={styles.link}>
                  {siteConfig.contact.phoneDisplay}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className={styles.link}
                >
                  {siteConfig.contact.email}
                </a>
              </li>
              <li>
                <span className={styles.address}>
                  {siteConfig.contact.addressLines.join(", ")}
                </span>
              </li>
              {siteConfig.social.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={styles.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.meta} data-footer="block">
          <p className={styles.copy}>
            © {siteConfig.copyrightYear} {siteConfig.name}
          </p>
          <p className={`${styles.copy} ${styles.metaTagline}`}>
            {siteConfig.tagline}
          </p>
        </div>
      </Container>
    </footer>
  );
}
