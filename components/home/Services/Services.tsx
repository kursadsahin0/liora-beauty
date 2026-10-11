"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
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
  getBookingHref,
  isSampleData,
  serviceCategories,
  servicesContent,
  type ServiceCategory,
} from "@/lib/content/services";
import { media } from "@/lib/media";
import styles from "./Services.module.scss";

function getServiceImage(category: ServiceCategory) {
  return media.services[category.imageKey];
}

export function Services() {
  const rootRef = useRef<HTMLElement>(null);
  const featured = serviceCategories.find((item) => item.featured);
  const catalog = serviceCategories.filter((item) => !item.featured);
  const [activeId, setActiveId] = useState(catalog[0]?.id ?? "");
  const active =
    catalog.find((item) => item.id === activeId) ?? catalog[0] ?? null;
  useGsapContext(rootRef, (reducedMotion) => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    const headerBits = gsap.utils.toArray<HTMLElement>(
      "[data-services='header']",
    );
    const title = root.querySelector<HTMLElement>("[data-services='title']");
    const featuredBits = gsap.utils.toArray<HTMLElement>(
      "[data-services='featured']",
    );
    const featuredImage = root.querySelector<HTMLElement>(
      "[data-services='featured-image']",
    );
    const rows = gsap.utils.toArray<HTMLElement>("[data-services='row']");
    const preview = root.querySelector<HTMLElement>(
      "[data-services='preview']",
    );

    const wordInners = title ? splitElementText(title, "words") : [];

    if (reducedMotion) {
      gsap.set(
        [headerBits, wordInners, featuredBits, featuredImage, rows, preview],
        {
          autoAlpha: 1,
          y: 0,
          yPercent: 0,
          clearProps: "clipPath,scale",
        },
      );
      return;
    }

    gsap.set(headerBits, { autoAlpha: 0, y: motion.reveal.yLabel });
    gsap.set(wordInners, { yPercent: 115 });
    gsap.set(featuredBits, { autoAlpha: 0, y: motion.reveal.ySubtle });
    gsap.set(rows, { autoAlpha: 0, y: motion.reveal.yLabel });
    if (preview) gsap.set(preview, { autoAlpha: 0, y: motion.reveal.ySubtle });
    if (featuredImage) {
      gsap.set(featuredImage, {
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

    if (featuredImage) {
      tl.to(
        featuredImage,
        {
          clipPath: "inset(0% 0 0 0)",
          scale: 1,
          duration: motion.duration.dramatic,
        },
        0.12,
      );
    }

    tl.to(
      featuredBits,
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.slow,
        stagger: motion.stagger.tight,
      },
      0.28,
    );

    tl.to(
      rows,
      {
        autoAlpha: 1,
        y: 0,
        duration: motion.duration.base,
        stagger: motion.stagger.tight,
        ease: motion.ease.outQuart,
      },
      0.4,
    );

    if (preview) {
      tl.to(
        preview,
        {
          autoAlpha: 1,
          y: 0,
          duration: motion.duration.slow,
        },
        0.45,
      );
    }
  }, []);

  return (
    <section
      ref={rootRef}
      id={servicesContent.id}
      className={styles.section}
      aria-labelledby="services-title"
    >
      <Container width="max">
        <header className={styles.header}>
          <div className={styles.intro}>
            <p
              className={`t-eyebrow ${styles.eyebrow}`}
              data-services="header"
            >
              {servicesContent.eyebrow}
            </p>
            <h2
              id="services-title"
              className={styles.title}
              data-services="title"
            >
              {servicesContent.title}
            </h2>
          </div>
          <div className={styles.copy}>
            <p className={`t-lead ${styles.lead}`} data-services="header">
              {servicesContent.lead}
            </p>
            {isSampleData ? (
              <p className={styles.sampleNote} data-services="header">
                {servicesContent.sampleNote}
              </p>
            ) : null}
          </div>
        </header>

        {featured ? (
          <article className={styles.featured} aria-labelledby="featured-service">
            <div
              className={styles.featuredMedia}
              data-services="featured-image"
            >
              <Image
                src={getServiceImage(featured).src}
                alt={getServiceImage(featured).alt}
                fill
                sizes="(max-width: 1024px) 100vw, 52vw"
                className={styles.featuredImage}
              />
            </div>

            <div className={styles.featuredCopy}>
              <div className={styles.featuredMeta} data-services="featured">
                <span className={styles.number}>{featured.number}</span>
                <span className={styles.duration}>{featured.duration}</span>
              </div>
              <h3
                id="featured-service"
                className={styles.featuredTitle}
                data-services="featured"
              >
                {featured.title}
              </h3>
              <p
                className={`t-body ${styles.featuredSummary}`}
                data-services="featured"
              >
                {featured.description}
              </p>
              <div className={styles.featuredActions} data-services="featured">
                <Button
                  href={getBookingHref(featured.id)}
                  variant="primary"
                  size="md"
                >
                  {servicesContent.bookingLabel}
                </Button>
                <Link
                  href={`/#fiyatlar`}
                  className={styles.textLink}
                >
                  Örnek fiyatlara bak
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className={styles.linkIcon}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </div>
          </article>
        ) : null}

        <div className={styles.catalog}>
          <div>
            <div className={styles.catalogHeader}>
              <p className="t-eyebrow">{servicesContent.indexLabel}</p>
            </div>

            <ul className={styles.list}>
              {catalog.map((item) => {
                const isActive = item.id === active?.id;
                return (
                  <li key={item.id}>
                    <button
                      id={`service-${item.id}`}
                      type="button"
                      aria-pressed={isActive}
                      aria-label={`${item.title}. ${item.summary}`}
                      className={`${styles.item} ${isActive ? styles.itemActive : ""}`}
                      data-services="row"
                      onMouseEnter={() => setActiveId(item.id)}
                      onFocus={() => setActiveId(item.id)}
                      onClick={() => setActiveId(item.id)}
                    >
                      <span className={styles.itemNumber}>{item.number}</span>
                      <span className={styles.itemBody}>
                        <span className={styles.itemTitle}>{item.title}</span>
                        <span className={styles.itemSummary}>{item.summary}</span>
                      </span>
                      <span className={styles.itemDuration}>{item.duration}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            {active ? (
              <div className={styles.mobileDetail}>
                <div className={styles.mobileMedia}>
                  <Image
                    src={getServiceImage(active).src}
                    alt={getServiceImage(active).alt}
                    fill
                    sizes="100vw"
                  />
                </div>
                <p className="t-small">{active.description}</p>
                <Link
                  href={getBookingHref(active.id)}
                  className={styles.textLink}
                >
                  {servicesContent.bookingLabel}
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className={styles.linkIcon}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            ) : null}
          </div>

          {active ? (
            <aside className={styles.preview} data-services="preview">
              <div className={styles.previewFrame}>
                <Image
                  key={active.id}
                  src={getServiceImage(active).src}
                  alt={getServiceImage(active).alt}
                  fill
                  sizes="40vw"
                  className={styles.previewImage}
                />
              </div>
              <div className={styles.previewCaption}>
                <p className={`t-eyebrow ${styles.eyebrow}`}>
                  {active.number} · {active.duration}
                </p>
                <p className={styles.previewTitle}>{active.title}</p>
                <p className="t-small">{active.description}</p>
                <Link
                  href={getBookingHref(active.id)}
                  className={styles.textLink}
                >
                  {servicesContent.bookingLabel}
                  <ArrowRight
                    size={16}
                    strokeWidth={1.5}
                    className={styles.linkIcon}
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </aside>
          ) : null}
        </div>
      </Container>
    </section>
  );
}
