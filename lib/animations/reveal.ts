import { gsap, registerGsapPlugins } from "./register";
import { motion } from "./motion";
import { getPrefersReducedMotion } from "./prefersReducedMotion";
import {
  revealBody,
  revealImageMask,
  revealLabel,
  revealWords,
  type ScrollBatchOptions,
} from "./scroll";

type RevealTarget = gsap.TweenTarget;

export type RevealOptions = {
  delay?: number;
  duration?: number;
  y?: number;
  stagger?: number;
  ease?: string;
};

export type ScrollRevealOptions = RevealOptions & {
  start?: string;
  once?: boolean;
};

function shouldSkipMotion(): boolean {
  return getPrefersReducedMotion();
}

/** Instantly show content when motion should be skipped. */
export function revealImmediately(targets: RevealTarget): void {
  registerGsapPlugins();
  gsap.set(targets, {
    autoAlpha: 1,
    y: 0,
    yPercent: 0,
    clearProps: "clipPath",
  });
}

/** Fade + rise entrance for typography or UI groups. */
export function fadeUp(
  targets: RevealTarget,
  options: RevealOptions = {},
): gsap.core.Tween | gsap.core.Timeline | null {
  registerGsapPlugins();

  if (shouldSkipMotion()) {
    revealImmediately(targets);
    return null;
  }

  const {
    delay = 0,
    duration = motion.duration.slow,
    y = motion.reveal.y,
    stagger = 0,
    ease = motion.ease.outExpo,
  } = options;

  return gsap.fromTo(
    targets,
    { autoAlpha: 0, y },
    {
      autoAlpha: 1,
      y: 0,
      delay,
      duration,
      stagger,
      ease,
      overwrite: "auto",
    },
  );
}

/** Staggered line-style reveal for heading groups. */
export function staggerLines(
  targets: RevealTarget,
  options: RevealOptions = {},
): gsap.core.Tween | null {
  return fadeUp(targets, {
    stagger: motion.stagger.base,
    y: motion.reveal.ySubtle,
    duration: motion.duration.slow,
    ...options,
  }) as gsap.core.Tween | null;
}

/** Clip-path image mask reveal (bottom-up editorial wipe). */
export function imageMaskReveal(
  targets: RevealTarget,
  options: RevealOptions = {},
): gsap.core.Tween | null {
  return revealImageMask(targets, {
    delay: options.delay,
    duration: options.duration,
  });
}

/** ScrollTrigger-powered section entrance. Returns cleanup. */
export function scrollFadeUp(
  trigger: Element | string,
  targets: RevealTarget,
  options: ScrollRevealOptions = {},
): () => void {
  const tween = revealBody(targets, {
    trigger,
    start: options.start,
    once: options.once,
    delay: options.delay,
    stagger: options.stagger,
    y: options.y,
  });

  return () => {
    tween?.scrollTrigger?.kill();
    tween?.kill();
  };
}

export {
  revealBody,
  revealImageMask,
  revealLabel,
  revealWords,
};
export type { ScrollBatchOptions };
