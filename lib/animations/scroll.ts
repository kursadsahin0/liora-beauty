import { gsap, ScrollTrigger, registerGsapPlugins } from "./register";
import { motion } from "./motion";
import { getPrefersReducedMotion } from "./prefersReducedMotion";

export type MaskDirection = "up" | "down" | "left" | "right";

function clipFrom(direction: MaskDirection): string {
  switch (direction) {
    case "down":
      return "inset(0 0 100% 0)";
    case "left":
      return "inset(0 100% 0 0)";
    case "right":
      return "inset(0 0 0 100%)";
    case "up":
    default:
      return "inset(100% 0 0 0)";
  }
}

export type ScrollBatchOptions = {
  trigger?: Element | string;
  start?: string;
  once?: boolean;
  delay?: number;
};

/** Label / eyebrow: short rise, quick settle. */
export function revealLabel(
  targets: gsap.TweenTarget,
  options: ScrollBatchOptions = {},
): gsap.core.Tween | null {
  registerGsapPlugins();
  if (getPrefersReducedMotion()) {
    gsap.set(targets, { autoAlpha: 1, y: 0 });
    return null;
  }

  const {
    trigger,
    start = motion.scroll.start,
    once = true,
    delay = 0,
  } = options;

  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y: motion.reveal.yLabel },
    {
      autoAlpha: 1,
      y: 0,
      duration: motion.duration.base,
      delay,
      ease: motion.ease.outQuart,
      stagger: motion.stagger.tight,
      overwrite: "auto",
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            once,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          }
        : undefined,
    },
  );
}

/** Supporting copy / CTA groups. */
export function revealBody(
  targets: gsap.TweenTarget,
  options: ScrollBatchOptions & { stagger?: number; y?: number } = {},
): gsap.core.Tween | null {
  registerGsapPlugins();
  if (getPrefersReducedMotion()) {
    gsap.set(targets, { autoAlpha: 1, y: 0 });
    return null;
  }

  const {
    trigger,
    start = motion.scroll.start,
    once = true,
    delay = 0,
    stagger = motion.stagger.base,
    y = motion.reveal.ySubtle,
  } = options;

  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      duration: motion.duration.slow,
      delay,
      ease: motion.ease.outExpo,
      stagger,
      overwrite: "auto",
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            once,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          }
        : undefined,
    },
  );
}

/** Masked word/line inners (yPercent) for editorial headings. */
export function revealWords(
  targets: gsap.TweenTarget,
  options: ScrollBatchOptions & { stagger?: number } = {},
): gsap.core.Tween | null {
  registerGsapPlugins();
  if (getPrefersReducedMotion()) {
    gsap.set(targets, { yPercent: 0, autoAlpha: 1 });
    return null;
  }

  const {
    trigger,
    start = motion.scroll.start,
    once = true,
    delay = 0,
    stagger = motion.stagger.words,
  } = options;

  return gsap.fromTo(
    targets,
    { yPercent: 115, autoAlpha: 1 },
    {
      yPercent: 0,
      duration: motion.duration.slow,
      delay,
      ease: motion.ease.outExpo,
      stagger,
      overwrite: "auto",
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            once,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          }
        : undefined,
    },
  );
}

/** Clip-path image reveal with restrained scale. */
export function revealImageMask(
  target: gsap.TweenTarget,
  options: ScrollBatchOptions & {
    direction?: MaskDirection;
    scale?: number;
    duration?: number;
  } = {},
): gsap.core.Tween | null {
  registerGsapPlugins();
  if (getPrefersReducedMotion()) {
    gsap.set(target, { clearProps: "clipPath,scale" });
    return null;
  }

  const {
    trigger,
    start = motion.scroll.startLate,
    once = true,
    delay = 0,
    direction = "up",
    scale = motion.reveal.imageScale,
    duration = motion.duration.dramatic,
  } = options;

  return gsap.fromTo(
    target,
    {
      clipPath: clipFrom(direction),
      scale,
      transformOrigin: "50% 50%",
    },
    {
      clipPath: "inset(0% 0 0 0)",
      scale: 1,
      duration,
      delay,
      ease: motion.ease.outExpo,
      overwrite: "auto",
      scrollTrigger: trigger
        ? {
            trigger,
            start,
            once,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          }
        : undefined,
    },
  );
}

/**
 * Subtle scrubbed parallax — desktop + reduced-motion safe.
 * Returns a cleanup that kills the matchMedia instance.
 */
export function createParallax(
  target: gsap.TweenTarget,
  trigger: Element | string,
  options: { yPercent?: number; scrub?: boolean | number } = {},
): () => void {
  registerGsapPlugins();

  if (getPrefersReducedMotion()) {
    return () => undefined;
  }

  const { yPercent = motion.parallax.image, scrub = true } = options;
  const mm = gsap.matchMedia();

  mm.add("(min-width: 64rem)", () => {
    const tween = gsap.to(target, {
      yPercent,
      ease: "none",
      scrollTrigger: {
        trigger,
        start: "top bottom",
        end: "bottom top",
        scrub,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  });

  return () => mm.revert();
}

export function refreshScrollTriggers(): void {
  registerGsapPlugins();
  ScrollTrigger.refresh();
}
