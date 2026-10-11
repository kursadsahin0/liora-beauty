"use client";

import { useRef } from "react";
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
  groupPricesByCategory,
  isSampleData,
  pricingContent,
} from "@/lib/content/services";
import styles from "./Pricing.module.scss";

const groups = groupPricesByCategory();

export function Pricing() {
  const rootRef = useRef<HTMLElement>(null);

  useGsapContext(rootRef, (reducedMotion) => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    const headerBits = gsap.utils.toArray<HTMLElement>(
      "[data-pricing='header']",
    );
    const title = root.querySelector<HTMLElement>("[data-pricing='title']");
    const groupsEls = gsap.utils.toArray<HTMLElement>(
      "[data-pricing='group']",
    );
    const footerBits = gsap.utils.toArray<HTMLElement>(
      "[data-pricing='footer']",
    );
    const wordInners = title ? splitElementText(title, "words") : [];

    if (reducedMotion) {
      gsap.set([headerBits, wordInners, groupsEls, footerBits], {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
      });
      return;
    }

    gsap.set(headerBits, { autoAlpha: 0, y: motion.reveal.yLabel });
    gsap.set(wordInners, { yPercent: 115 });
    gsap.set(groupsEls, { autoAlpha: 0, y: motion.reveal.ySubtle });
    gsap.set(footerBits, { autoAlpha: 0, y: motion.reveal.yLabel });

    const tl = gsap.timeline({
      defaults: { ease: motion.ease.outExpo },
      scrollTrigger: {
        trigger: root,
        start: motion.scroll.start,
        once: true,
      },
    });

    tl.to(headerBits, {
      autoAlpha: 1,
      y: 0,
      duration: motion.duration.base,
      stagger: motion.stagger.tight,
      ease: motion.ease.outQuart,
    });

    tl.to(
      wordInners,
      {
        yPercent: 0,
        duration: motion.duration.slow,
        stagger: motion.stagger.words,
      },
      0.08,
    );

    tl.to(
      groupsEls,
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.slow,
        stagger: motion.stagger.base,
      },
      0.2,
    );

    tl.to(
      footerBits,
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.base,
        stagger: motion.stagger.tight,
        ease: motion.ease.outQuart,
      },
      "-=0.2",
    );
  }, []);

  return (
    <section
      ref={rootRef}
      id={pricingContent.id}
      className={styles.section}
      aria-labelledby="pricing-title"
    >
      <Container width="max">
        <header className={styles.header}>
          <div className={styles.intro}>
            <div className={styles.eyebrowRow} data-pricing="header">
              <p className={`t-eyebrow ${styles.eyebrow}`}>
                {pricingContent.eyebrow}
              </p>
              {isSampleData ? (
                <span className={styles.badge}>
                  {pricingContent.sampleBadge}
                </span>
              ) : null}
            </div>
            <h2
              id="pricing-title"
              className={styles.title}
              data-pricing="title"
            >
              {pricingContent.title}
            </h2>
          </div>
          <div className={styles.copy}>
            <p className={`t-lead ${styles.lead}`} data-pricing="header">
              {pricingContent.lead}
            </p>
            {isSampleData ? (
              <p className={styles.disclaimer} data-pricing="header">
                {pricingContent.sampleDisclaimer}
              </p>
            ) : null}
          </div>
        </header>

        <div className={styles.groups}>
          {groups.map((group) => (
            <section
              key={group.categoryId}
              className={styles.group}
              aria-labelledby={`price-group-${group.categoryId}`}
              data-pricing="group"
            >
              <h3
                id={`price-group-${group.categoryId}`}
                className={styles.groupTitle}
              >
                {group.title}
              </h3>
              <ul className={styles.table}>
                {group.items.map((item) => (
                  <li
                    key={item.id}
                    className={`${styles.row} ${
                      item.highlight ? styles.rowHighlight : ""
                    }`}
                  >
                    <p className={styles.name}>{item.name}</p>
                    <p className={styles.duration}>{item.duration}</p>
                    <p className={styles.price}>{item.priceLabel}</p>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className={styles.footer}>
          <p className={`t-body ${styles.ctaNote}`} data-pricing="footer">
            {pricingContent.ctaNote}
          </p>
          <div className={styles.ctaActions} data-pricing="footer">
            <Button href={pricingContent.ctaHref} variant="primary">
              {pricingContent.ctaLabel}
            </Button>
            <Button href="/#hizmetler" variant="secondary">
              Hizmetlere dön
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
