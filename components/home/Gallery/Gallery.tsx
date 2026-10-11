"use client";

import Image from "next/image";
import { X } from "lucide-react";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { Container } from "@/components/ui/Container/Container";
import { useGsapContext } from "@/hooks/useGsapContext";
import {
  gsap,
  motion,
  registerGsapPlugins,
  splitElementText,
} from "@/lib/animations";
import {
  galleryContent,
  galleryItems,
  type GalleryItem,
} from "@/lib/content/brand";
import { media } from "@/lib/media";
import styles from "./Gallery.module.scss";

function getImage(item: GalleryItem) {
  return media.gallery[item.imageKey];
}

function spanClass(span: GalleryItem["span"]) {
  if (span === "tall") return styles.spanTall;
  if (span === "wide") return styles.spanWide;
  return styles.spanSquare;
}

export function Gallery() {
  const rootRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocusRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const active = activeIndex === null ? null : galleryItems[activeIndex];

  const closeLightbox = useCallback(() => {
    setActiveIndex(null);
    lastFocusRef.current?.focus();
  }, []);

  const openLightbox = (index: number, trigger: HTMLElement) => {
    lastFocusRef.current = trigger;
    setActiveIndex(index);
  };

  useEffect(() => {
    if (activeIndex === null) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const dialog = closeRef.current?.closest('[role="dialog"]');
    const focusables = dialog
      ? [
          ...dialog.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
          ),
        ]
      : [];
    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeLightbox();
        return;
      }
      if (event.key === "ArrowRight") {
        setActiveIndex((current) =>
          current === null ? 0 : (current + 1) % galleryItems.length,
        );
      }
      if (event.key === "ArrowLeft") {
        setActiveIndex((current) =>
          current === null
            ? 0
            : (current - 1 + galleryItems.length) % galleryItems.length,
        );
      }
      if (event.key === "Tab" && focusables.length > 0) {
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex, closeLightbox]);

  useGsapContext(rootRef, (reducedMotion) => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    const header = gsap.utils.toArray<HTMLElement>("[data-gallery='header']");
    const title = root.querySelector<HTMLElement>("[data-gallery='title']");
    const tiles = gsap.utils.toArray<HTMLElement>("[data-gallery='tile']");
    const words = title ? splitElementText(title, "words") : [];

    if (reducedMotion) {
      gsap.set([header, words, tiles], {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        clearProps: "clipPath,scale",
      });
      return;
    }

    gsap.set(header, { autoAlpha: 0, y: motion.reveal.yLabel });
    gsap.set(words, { yPercent: 115 });
    gsap.set(tiles, {
      autoAlpha: 0,
      y: motion.reveal.ySubtle,
      clipPath: "inset(100% 0 0 0)",
    });

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
      tiles,
      {
        autoAlpha: 1,
        y: 0,
        clipPath: "inset(0% 0 0 0)",
        duration: motion.duration.slow,
        stagger: 0.07,
      },
      0.18,
    );
  }, []);

  return (
    <section
      ref={rootRef}
      id={galleryContent.id}
      className={styles.section}
      aria-labelledby="gallery-title"
    >
      <Container width="max">
        <div className={styles.grid}>
          <div
            className={`${styles.introTile} ${styles.spanTall}`}
            data-gallery="tile"
          >
            <p className={`t-eyebrow ${styles.eyebrow}`} data-gallery="header">
              {galleryContent.eyebrow}
            </p>
            <h2
              id="gallery-title"
              className={styles.title}
              data-gallery="title"
            >
              {galleryContent.title}
            </h2>
          </div>

          {galleryItems.map((item, index) => {
            const image = getImage(item);
            return (
              <button
                key={item.id}
                type="button"
                className={`${styles.item} ${spanClass(item.span)}`}
                data-gallery="tile"
                aria-label={`${item.caption} — büyüt`}
                onClick={(event) => openLightbox(index, event.currentTarget)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
                  className={styles.image}
                />
                <span className={styles.caption}>{item.caption}</span>
              </button>
            );
          })}
        </div>
      </Container>

      {active ? (
        <div
          className={styles.lightbox}
          role="presentation"
          onClick={closeLightbox}
        >
          <div
            className={styles.lightboxDialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              ref={closeRef}
              type="button"
              className={styles.lightboxClose}
              aria-label="Galeriyi kapat"
              onClick={closeLightbox}
            >
              <X size={20} strokeWidth={1.5} />
            </button>

            <figure className={styles.lightboxFigure}>
              <Image
                src={getImage(active).src}
                alt={getImage(active).alt}
                fill
                sizes="90vw"
              />
            </figure>
            <p id={titleId} className={styles.lightboxCaption}>
              {active.caption}
            </p>

            <div className={styles.lightboxNav}>
              <button
                type="button"
                className={styles.lightboxButton}
                onClick={() =>
                  setActiveIndex((current) =>
                    current === null
                      ? 0
                      : (current - 1 + galleryItems.length) %
                        galleryItems.length,
                  )
                }
              >
                Önceki
              </button>
              <button
                type="button"
                className={styles.lightboxButton}
                onClick={() =>
                  setActiveIndex((current) =>
                    current === null
                      ? 0
                      : (current + 1) % galleryItems.length,
                  )
                }
              >
                Sonraki
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
