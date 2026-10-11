/** Shared motion tokens — keep in sync with SCSS duration/easing tokens. */
export const motion = {
  duration: {
    instant: 0.12,
    fast: 0.22,
    base: 0.4,
    slow: 0.7,
    dramatic: 1.05,
  },
  ease: {
    outExpo: "power4.out",
    outQuart: "power3.out",
    inOutSoft: "power2.inOut",
    standard: "power2.out",
  },
  stagger: {
    tight: 0.05,
    base: 0.08,
    loose: 0.14,
    words: 0.035,
  },
  reveal: {
    y: 28,
    ySubtle: 16,
    yLabel: 10,
    clipInset: "100%",
    imageScale: 1.045,
  },
  parallax: {
    image: 10,
    ornament: 18,
  },
  scroll: {
    start: "top 80%",
    startEarly: "top 88%",
    startLate: "top 72%",
  },
} as const;

export type MotionConfig = typeof motion;
