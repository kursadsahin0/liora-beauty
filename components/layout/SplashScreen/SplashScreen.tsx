"use client";

import { useLayoutEffect, useState } from "react";
import { getPrefersReducedMotion } from "@/lib/animations/prefersReducedMotion";
import { siteConfig } from "@/lib/site";
import styles from "./SplashScreen.module.scss";

export function SplashScreen() {
  const [phase, setPhase] = useState<"show" | "exit" | "done">("show");

  useLayoutEffect(() => {
    const reduced = getPrefersReducedMotion();
    const holdMs = reduced ? 600 : 2400;
    const exitMs = reduced ? 250 : 800;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const exitTimer = window.setTimeout(() => setPhase("exit"), holdMs);
    const doneTimer = window.setTimeout(() => {
      document.body.style.overflow = previousOverflow;
      setPhase("done");
    }, holdMs + exitMs);

    return () => {
      window.clearTimeout(exitTimer);
      window.clearTimeout(doneTimer);
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={`${styles.splash} ${phase === "exit" ? styles.exiting : ""}`}
      role="status"
      aria-live="polite"
      aria-label={`${siteConfig.name} yükleniyor`}
    >
      <div className={styles.inner}>
        <p className={styles.eyebrow}>Güzellik Atölyesi</p>
        <p className={styles.brand}>
          <span className={styles.brandMark}>{siteConfig.name}</span>
          <span className={styles.brandDot} aria-hidden="true" />
        </p>
        <p className={styles.tagline}>{siteConfig.tagline}</p>
        <span className={styles.progress} aria-hidden="true" />
      </div>
    </div>
  );
}
