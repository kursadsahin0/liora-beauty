"use client";

import Image from "next/image";
import { useRef } from "react";
import { Button } from "@/components/ui/Button/Button";
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
import { siteConfig } from "@/lib/site";
import styles from "./Hero.module.scss";

const content = homeContent.hero;

export function Hero() {
  const rootRef = useRef<HTMLElement>(null);

  useGsapContext(rootRef, (reducedMotion) => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    const label = root.querySelector<HTMLElement>("[data-hero='label']");
    const lineEls = gsap.utils.toArray<HTMLElement>("[data-hero='line']");
    const lead = root.querySelector<HTMLElement>("[data-hero='lead']");
    const actions = root.querySelector<HTMLElement>("[data-hero='actions']");
    const meta = root.querySelectorAll<HTMLElement>("[data-hero='meta']");
    const imageMask = root.querySelector<HTMLElement>("[data-hero='image']");
    const imageParallax = root.querySelector<HTMLElement>(
      "[data-hero='parallax']",
    );
    const ornament = root.querySelector<HTMLElement>("[data-hero='ornament']");
    const scrollDot = root.querySelector<HTMLElement>(
      "[data-hero='scroll-dot']",
    );

    const wordInners = lineEls.flatMap((line) =>
      splitElementText(line, "words"),
    );

    if (reducedMotion) {
      gsap.set([label, lead, actions, meta, wordInners, imageMask], {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        clearProps: "clipPath,scale",
      });
      return;
    }

    gsap.set(label, { autoAlpha: 0, y: motion.reveal.yLabel });
    gsap.set(wordInners, { yPercent: 115 });
    gsap.set([lead, actions, meta], { autoAlpha: 0, y: motion.reveal.ySubtle });

    if (imageMask) {
      gsap.set(imageMask, {
        clipPath: "inset(100% 0 0 0)",
        scale: motion.reveal.imageScale,
        transformOrigin: "50% 40%",
      });
    }

    const tl = gsap.timeline({
      defaults: { ease: motion.ease.outExpo },
    });

    if (imageMask) {
      tl.to(
        imageMask,
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: motion.duration.dramatic,
        },
        0.04,
      );
    }

    if (label) {
      tl.to(
        label,
        {
          autoAlpha: 1,
          y: 0,
          duration: motion.duration.base,
          ease: motion.ease.outQuart,
        },
        0.18,
      );
    }

    tl.to(
      wordInners,
      {
        yPercent: 0,
        duration: motion.duration.slow,
        stagger: motion.stagger.words,
      },
      0.28,
    );

    tl.to(
      [lead, actions],
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.slow,
        stagger: motion.stagger.tight,
      },
      "-=0.28",
    );

    tl.to(
      meta,
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.base,
        stagger: motion.stagger.tight,
        ease: motion.ease.outQuart,
      },
      "-=0.35",
    );

    if (scrollDot) {
      gsap.to(scrollDot, {
        y: 5,
        duration: 1.15,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        delay: 1.15,
      });
    }

    const cleanups: Array<() => void> = [];

    if (imageParallax) {
      cleanups.push(
        createParallax(imageParallax, root, {
          yPercent: motion.parallax.image,
          scrub: 0.65,
        }),
      );
    }

    if (ornament) {
      cleanups.push(
        createParallax(ornament, root, {
          yPercent: -motion.parallax.ornament,
          scrub: 0.8,
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
      className={styles.hero}
      aria-labelledby="hero-heading"
    >
      <span
        className={styles.ornament}
        data-hero="ornament"
        aria-hidden="true"
      >
        *
      </span>

      <div className={styles.layout}>
        <div className={styles.copyPane}>
          <div className={styles.copy}>
            <p
              className={`t-eyebrow ${styles.eyebrow}`}
              data-hero="label"
            >
              {content.eyebrow}
            </p>

            <h1
              id="hero-heading"
              className={styles.headline}
              aria-label={content.headline.join(" ")}
            >
              {content.headline.map((line, index) => (
                <span
                  key={line}
                  className={`${styles.line} ${
                    index === content.headline.length - 1
                      ? styles.lineAccent
                      : ""
                  }`}
                  data-hero="line"
                >
                  {line}
                </span>
              ))}
            </h1>

            <p className={`t-lead ${styles.lead}`} data-hero="lead">
              {content.lead}
            </p>

            <div className={styles.actions} data-hero="actions">
              <Button
                href={content.primaryCta.href}
                variant="primary"
                size="lg"
              >
                {content.primaryCta.label}
              </Button>
              <Button
                href={content.secondaryCta.href}
                variant="secondary"
                size="lg"
              >
                {content.secondaryCta.label}
              </Button>
            </div>
          </div>

          <div className={styles.footerBar} data-hero="meta">
            <p className={`t-eyebrow ${styles.metaLabel}`}>
              {siteConfig.name} Atölye
            </p>

            <a
              href={`#${homeContent.atelier.id}`}
              className={styles.scrollHint}
            >
              <span className={styles.scrollGlyph} aria-hidden="true">
                <span className={styles.scrollDot} data-hero="scroll-dot" />
              </span>
              {content.scrollLabel}
            </a>
          </div>
        </div>

        <div className={styles.mediaPane}>
          <div className={styles.mediaFrame} data-hero="image">
            <div className={styles.mediaParallax} data-hero="parallax">
              <Image
                src={media.hero.src}
                alt={media.hero.alt}
                fill
                preload
                quality={85}
                sizes="(max-width: 1024px) 100vw, 55vw"
                className={styles.image}
              />
              <div className={styles.veil} aria-hidden="true" />
            </div>
          </div>

          <div className={styles.mediaCaption} data-hero="meta">
            <span className={styles.mediaIndex}>{content.index}</span>
            <span className={styles.mediaLabel}>{content.indexLabel}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
