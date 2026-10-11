import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

/** Idempotent GSAP + ScrollTrigger registration for client environments. */
export function registerGsapPlugins(): typeof gsap {
  if (typeof window === "undefined") return gsap;

  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }

  return gsap;
}

export { gsap, ScrollTrigger };
