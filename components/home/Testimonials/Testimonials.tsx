"use client";

import { useRef } from "react";
import { Container } from "@/components/ui/Container/Container";
import { useGsapContext } from "@/hooks/useGsapContext";
import {
  gsap,
  motion,
  registerGsapPlugins,
  splitElementText,
} from "@/lib/animations";
import {
  isBrandSampleData,
  testimonials,
  testimonialsContent,
} from "@/lib/content/brand";
import styles from "./Testimonials.module.scss";

export function Testimonials() {
  const rootRef = useRef<HTMLElement>(null);

  useGsapContext(rootRef, (reducedMotion) => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    const header = gsap.utils.toArray<HTMLElement>(
      "[data-testimonials='header']",
    );
    const title = root.querySelector<HTMLElement>(
      "[data-testimonials='title']",
    );
    const cards = gsap.utils.toArray<HTMLElement>(
      "[data-testimonials='card']",
    );
    const words = title ? splitElementText(title, "words") : [];

    if (reducedMotion) {
      gsap.set([header, words, cards], {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
      });
      return;
    }

    gsap.set(header, { autoAlpha: 0, y: motion.reveal.yLabel });
    gsap.set(words, { yPercent: 115 });
    gsap.set(cards, { autoAlpha: 0, y: motion.reveal.ySubtle });

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
      cards,
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.slow,
        stagger: motion.stagger.base,
      },
      0.22,
    );
  }, []);

  return (
    <section
      ref={rootRef}
      id={testimonialsContent.id}
      className={styles.section}
      aria-labelledby="testimonials-title"
    >
      <Container width="max">
        <header className={styles.header}>
          <div className={styles.intro}>
            <div className={styles.eyebrowRow} data-testimonials="header">
              <p className={`t-eyebrow ${styles.eyebrow}`}>
                {testimonialsContent.eyebrow}
              </p>
              {isBrandSampleData ? (
                <span className={styles.badge}>
                  {testimonialsContent.sampleBadge}
                </span>
              ) : null}
            </div>
            <h2
              id="testimonials-title"
              className={styles.title}
              data-testimonials="title"
            >
              {testimonialsContent.title}
            </h2>
          </div>
          <div className={styles.copy}>
            <p className={`t-lead ${styles.lead}`} data-testimonials="header">
              {testimonialsContent.lead}
            </p>
            {isBrandSampleData ? (
              <p className={styles.sampleNote} data-testimonials="header">
                {testimonialsContent.sampleNote}
              </p>
            ) : null}
          </div>
        </header>

        <ul className={styles.list}>
          {testimonials.map((item) => (
            <li
              key={item.id}
              className={styles.item}
              data-testimonials="card"
            >
              <span className={styles.mark} aria-hidden="true">
                “
              </span>
              <blockquote className={styles.quote}>
                <p>{item.quote}</p>
              </blockquote>
              <footer className={styles.attribution}>{item.attribution}</footer>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
