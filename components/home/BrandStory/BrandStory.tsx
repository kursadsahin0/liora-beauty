"use client";

import Image from "next/image";
import { useRef } from "react";
import { Container } from "@/components/ui/Container/Container";
import { useGsapContext } from "@/hooks/useGsapContext";
import {
  gsap,
  motion,
  registerGsapPlugins,
  splitElementText,
} from "@/lib/animations";
import { brandStoryContent, isBrandSampleData } from "@/lib/content/brand";
import { media } from "@/lib/media";
import styles from "./BrandStory.module.scss";

const content = brandStoryContent;

export function BrandStory() {
  const rootRef = useRef<HTMLElement>(null);

  useGsapContext(rootRef, (reducedMotion) => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    const header = gsap.utils.toArray<HTMLElement>("[data-story='header']");
    const title = root.querySelector<HTMLElement>("[data-story='title']");
    const body = gsap.utils.toArray<HTMLElement>("[data-story='body']");
    const pillars = gsap.utils.toArray<HTMLElement>("[data-story='pillar']");
    const image = root.querySelector<HTMLElement>("[data-story='image']");
    const words = title ? splitElementText(title, "words") : [];

    if (reducedMotion) {
      gsap.set([header, words, body, pillars, image], {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        clearProps: "clipPath,scale",
      });
      return;
    }

    gsap.set(header, { autoAlpha: 0, y: motion.reveal.yLabel });
    gsap.set(words, { yPercent: 115 });
    gsap.set(body, { autoAlpha: 0, y: motion.reveal.ySubtle });
    gsap.set(pillars, { autoAlpha: 0, y: motion.reveal.yLabel });
    if (image) {
      gsap.set(image, {
        clipPath: "inset(100% 0 0 0)",
        scale: motion.reveal.imageScale,
      });
    }

    const tl = gsap.timeline({
      defaults: { ease: motion.ease.outExpo },
      scrollTrigger: {
        trigger: root,
        start: motion.scroll.start,
        once: true,
      },
    });

    if (image) {
      tl.to(
        image,
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: motion.duration.dramatic,
        },
        0,
      );
    }

    tl.to(
      header,
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.base,
        ease: motion.ease.outQuart,
      },
      0.08,
    );

    tl.to(
      words,
      {
        yPercent: 0,
        duration: motion.duration.slow,
        stagger: motion.stagger.words,
      },
      0.14,
    );

    tl.to(
      body,
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.slow,
        stagger: motion.stagger.tight,
      },
      0.28,
    );

    tl.to(
      pillars,
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.base,
        stagger: motion.stagger.tight,
        ease: motion.ease.outQuart,
      },
      0.4,
    );
  }, []);

  return (
    <section
      ref={rootRef}
      id={content.id}
      className={styles.section}
      aria-labelledby="story-title"
    >
      <Container width="max" className={styles.inner}>
        <div className={styles.copy}>
          <p className={`t-eyebrow ${styles.eyebrow}`} data-story="header">
            {content.eyebrow}
          </p>
          <h2 id="story-title" className={styles.title} data-story="title">
            {content.title}
          </h2>
          <p className={`t-lead ${styles.lead}`} data-story="body">
            {content.lead}
          </p>
          {isBrandSampleData ? (
            <p className={styles.sampleNote} data-story="body">
              {content.sampleNote}
            </p>
          ) : null}
          <div className={styles.paragraphs}>
            {content.paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className={`t-body ${styles.paragraph}`}
                data-story="body"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <ul className={styles.pillars}>
            {content.pillars.map((pillar) => (
              <li
                key={pillar.label}
                className={styles.pillar}
                data-story="pillar"
              >
                <p className={styles.pillarLabel}>{pillar.label}</p>
                <p className={styles.pillarText}>{pillar.text}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.mediaCol}>
          <div className={styles.media} data-story="image">
            <Image
              src={media.story.src}
              alt={media.story.alt}
              fill
              sizes="(max-width: 1024px) 100vw, 48vw"
              className={styles.image}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
