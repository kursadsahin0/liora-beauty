"use client";

import { useLayoutEffect, useEffect, type ReactNode } from "react";
import {
  registerGsapPlugins,
  refreshScrollTriggers,
  ScrollTrigger,
} from "@/lib/animations";
import {
  getPrefersReducedMotion,
  subscribePrefersReducedMotion,
} from "@/lib/animations/prefersReducedMotion";

type MotionProviderProps = {
  children: ReactNode;
};

/**
 * Boots GSAP before child layout effects, exposes motion flags,
 * and keeps ScrollTrigger measurements in sync with the viewport.
 */
export function MotionProvider({ children }: MotionProviderProps) {
  useLayoutEffect(() => {
    registerGsapPlugins();
    const root = document.documentElement;
    root.dataset.motion = "ready";
    root.dataset.reducedMotion = String(getPrefersReducedMotion());

    return () => {
      delete root.dataset.motion;
    };
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    const applyReduced = (value: boolean) => {
      root.dataset.reducedMotion = String(value);
      if (value) {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      } else {
        refreshScrollTriggers();
      }
    };

    const unsubscribe = subscribePrefersReducedMotion(applyReduced);

    let resizeTimer = 0;
    const onResize = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        refreshScrollTriggers();
      }, 120);
    };

    window.addEventListener("resize", onResize, { passive: true });

    return () => {
      unsubscribe();
      window.removeEventListener("resize", onResize);
      window.clearTimeout(resizeTimer);
    };
  }, []);

  return children;
}
