import type { ReactNode } from "react";
import styles from "./Section.module.scss";

type SectionPadding = "none" | "sm" | "md" | "lg" | "xl";
type SectionTone = "ivory" | "cream" | "burgundy" | "charcoal" | "transparent";

type SectionProps = {
  children: ReactNode;
  id?: string;
  padding?: SectionPadding;
  tone?: SectionTone;
  className?: string;
  ariaLabelledBy?: string;
};

export function Section({
  children,
  id,
  padding = "lg",
  tone = "transparent",
  className,
  ariaLabelledBy,
}: SectionProps) {
  const classes = [
    styles.root,
    styles[`padding-${padding}`],
    styles[`tone-${tone}`],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section
      id={id}
      className={classes}
      aria-labelledby={ariaLabelledBy}
    >
      {children}
    </section>
  );
}
