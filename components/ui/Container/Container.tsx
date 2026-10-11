import type { ElementType, ReactNode } from "react";
import styles from "./Container.module.scss";

type ContainerWidth = "wide" | "max" | "content" | "narrow" | "full";

type ContainerProps = {
  children: ReactNode;
  width?: ContainerWidth;
  as?: ElementType;
  className?: string;
  id?: string;
};

export function Container({
  children,
  width = "wide",
  as: Tag = "div",
  className,
  id,
}: ContainerProps) {
  const classes = [styles.root, styles[width], className]
    .filter(Boolean)
    .join(" ");

  return (
    <Tag id={id} className={classes}>
      {children}
    </Tag>
  );
}
