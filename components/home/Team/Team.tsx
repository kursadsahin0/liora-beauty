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
import {
  isBrandSampleData,
  teamContent,
  teamMembers,
} from "@/lib/content/brand";
import { media } from "@/lib/media";
import styles from "./Team.module.scss";

export function Team() {
  const rootRef = useRef<HTMLElement>(null);

  useGsapContext(rootRef, (reducedMotion) => {
    registerGsapPlugins();
    const root = rootRef.current;
    if (!root) return;

    const header = gsap.utils.toArray<HTMLElement>("[data-team='header']");
    const title = root.querySelector<HTMLElement>("[data-team='title']");
    const cards = gsap.utils.toArray<HTMLElement>("[data-team='card']");
    const portraits = gsap.utils.toArray<HTMLElement>(
      "[data-team='portrait']",
    );
    const words = title ? splitElementText(title, "words") : [];

    if (reducedMotion) {
      gsap.set([header, words, cards, portraits], {
        autoAlpha: 1,
        y: 0,
        yPercent: 0,
        clearProps: "clipPath,scale",
      });
      return;
    }

    gsap.set(header, { autoAlpha: 0, y: motion.reveal.yLabel });
    gsap.set(words, { yPercent: 115 });
    gsap.set(cards, { autoAlpha: 0, y: motion.reveal.ySubtle });
    gsap.set(portraits, {
      clipPath: "inset(100% 0 0 0)",
      scale: motion.reveal.imageScale,
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
      portraits,
      {
        clipPath: "inset(0% 0 0 0)",
        scale: 1,
        duration: motion.duration.dramatic,
        stagger: motion.stagger.base,
      },
      0.14,
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
      id={teamContent.id}
      className={styles.section}
      aria-labelledby="team-title"
    >
      <Container width="max">
        <header className={styles.header}>
          <p className={`t-eyebrow ${styles.eyebrow}`} data-team="header">
            {teamContent.eyebrow}
          </p>
          <h2 id="team-title" className={styles.title} data-team="title">
            {teamContent.title}
          </h2>
          <p className={`t-lead ${styles.lead}`} data-team="header">
            {teamContent.lead}
          </p>
          {isBrandSampleData ? (
            <p className={styles.sampleNote} data-team="header">
              <span className={styles.badge}>{teamContent.sampleBadge}</span>
              {teamContent.sampleNote}
            </p>
          ) : null}
        </header>

        <ul className={styles.list}>
          {teamMembers.map((member) => {
            const portrait = media.team[member.imageKey];
            return (
              <li key={member.id} className={styles.member} data-team="card">
                <div className={styles.portrait} data-team="portrait">
                  <Image
                    src={portrait.src}
                    alt={portrait.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className={styles.image}
                  />
                </div>
                <div className={styles.meta}>
                  <p className={styles.role}>{member.role}</p>
                  <h3 className={styles.name}>{member.name}</h3>
                  <p className={styles.focus}>{member.focus}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
