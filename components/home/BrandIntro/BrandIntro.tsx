"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Container } from "@/components/ui/Container/Container";
import { useGsapContext } from "@/hooks/useGsapContext";
import {
  createParallax,
  gsap,
  motion,
  registerGsapPlugins,
  splitElementText,
} from "@/lib/animations";
import { homeContent } from "@/lib/content/home";
import { media } from "@/lib/media";
import styles from "./BrandIntro.module.scss";

const content = homeContent.atelier;

export function BrandIntro() {
  const rootRef = useRef<HTMLElement>(null);

  useGsapContext(rootRef, (reducedMotion) => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    const labels = gsap.utils.toArray<HTMLElement>("[data-intro='label']");
    const title = root.querySelector<HTMLElement>("[data-intro='title']");
    const bodyGroup = gsap.utils.toArray<HTMLElement>("[data-intro='body']");
    const imageMask = root.querySelector<HTMLElement>("[data-intro='image']");
    const imageParallax = root.querySelector<HTMLElement>(
      "[data-intro='parallax']",
    );

    const wordInners = title ? splitElementText(title, "words") : [];

    if (reducedMotion) {
      gsap.set([labels, bodyGroup, wordInners, imageMask], {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        clearProps: "clipPath,scale",
      });
      return;
    }

    gsap.set(labels, { autoAlpha: 0, y: motion.reveal.yLabel });
    gsap.set(wordInners, { yPercent: 115 });
    gsap.set(bodyGroup, { autoAlpha: 0, y: motion.reveal.ySubtle });

    if (imageMask) {
      gsap.set(imageMask, {
        clipPath: "inset(100% 0 0 0)",
        scale: motion.reveal.imageScale,
        transformOrigin: "50% 50%",
      });
    }

    const tl = gsap.timeline({
      defaults: { ease: motion.ease.outExpo },
      scrollTrigger: {
        trigger: root,
        start: motion.scroll.start,
        once: true,
        toggleActions: "play none none none",
      },
    });

    if (imageMask) {
      tl.to(
        imageMask,
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: motion.duration.dramatic,
        },
        0,
      );
    }

    tl.to(
      labels,
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.base,
        stagger: motion.stagger.tight,
        ease: motion.ease.outQuart,
      },
      0.08,
    );

    tl.to(
      wordInners,
      {
        yPercent: 0,
        duration: motion.duration.slow,
        stagger: motion.stagger.words,
      },
      0.16,
    );

    tl.to(
      bodyGroup,
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.slow,
        stagger: motion.stagger.base,
      },
      0.28,
    );

    const cleanups: Array<() => void> = [];

    if (imageParallax) {
      cleanups.push(
        createParallax(imageParallax, root, {
          yPercent: 8,
          scrub: 0.7,
        }),
      );
    }

    return () => {
      cleanups.forEach((fn) => fn());
    };
  }, []);

  return (
    <section
      ref={rootRef}
      id={content.id}
      className={styles.section}
      aria-labelledby="atelier-title"
      data-reveal-section
    >
      <Container width="max" className={styles.inner}>
        <div className={styles.copy}>
          <p className={`t-eyebrow ${styles.eyebrow}`} data-intro="label">
            {content.eyebrow}
          </p>
          <h2 id="atelier-title" className={styles.title} data-intro="title">
            {content.title}
          </h2>
          <p className={`t-body ${styles.body}`} data-intro="body">
            {content.body}
          </p>
          <Link
            href={content.linkHref}
            className={styles.link}
            data-intro="body"
          >
            <span>{content.linkLabel}</span>
            <ArrowRight
              size={16}
              strokeWidth={1.5}
              aria-hidden="true"
              className={styles.linkIcon}
            />
          </Link>
        </div>

        <aside className={styles.aside}>
          <div className={styles.detail}>
            <p className={`t-eyebrow ${styles.detailLabel}`} data-intro="label">
              {content.detailLabel}
            </p>
            <p className={styles.detailText} data-intro="body">
              {content.detail}
            </p>
          </div>

          <div className={styles.media} data-intro="image">
            <div className={styles.mediaParallax} data-intro="parallax">
              <Image
                src={media.atelier.src}
                alt={media.atelier.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 36vw"
                className={styles.image}
              />
            </div>
          </div>
        </aside>
      </Container>
    </section>
  );
}
