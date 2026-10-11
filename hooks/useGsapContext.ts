"use client";

import { useLayoutEffect, type DependencyList, type RefObject } from "react";
import {
  gsap,
  registerGsapPlugins,
  refreshScrollTriggers,
} from "@/lib/animations";
import { getPrefersReducedMotion } from "@/lib/animations/prefersReducedMotion";

type GsapContextCallback = (reducedMotion: boolean) => void | (() => void);

/**
 * Scoped GSAP context tied to a container ref.
 * Supports an optional extra cleanup return from the callback
 * (e.g. matchMedia / parallax helpers).
 */
export function useGsapContext(
  scope: RefObject<HTMLElement | null>,
  callback: GsapContextCallback,
  deps: DependencyList = [],
): void {
  useLayoutEffect(() => {
    registerGsapPlugins();
    const element = scope.current;
    if (!element) return;

    const reducedMotion = getPrefersReducedMotion();
    let extraCleanup: void | (() => void);

    const ctx = gsap.context(() => {
      extraCleanup = callback(reducedMotion);
    }, element);

    const raf = window.requestAnimationFrame(() => {
      refreshScrollTriggers();
    });

    // Second pass after fonts/images settle layout measurements
    const raf2 = window.requestAnimationFrame(() => {
      refreshScrollTriggers();
    });

    return () => {
      window.cancelAnimationFrame(raf);
      window.cancelAnimationFrame(raf2);
      extraCleanup?.();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- caller controls deps
  }, deps);
}
