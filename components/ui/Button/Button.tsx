import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./Button.module.scss";

type ButtonVariant = "primary" | "secondary" | "ghost" | "light";
type ButtonSize = "sm" | "md" | "lg";

type SharedProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type ButtonAsButton = SharedProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> & {
    href?: undefined;
  };

type ButtonAsLink = SharedProps & {
  href: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

function classNames(
  variant: ButtonVariant,
  size: ButtonSize,
  className?: string,
) {
  return [styles.root, styles[variant], styles[size], className]
    .filter(Boolean)
    .join(" ");
}

export function Button(props: ButtonProps) {
  if ("href" in props && props.href) {
    const {
      children,
      variant = "primary",
      size = "md",
      className,
      href,
      target,
      rel,
      onClick,
    } = props;
    const isExternal = href.startsWith("http");

    return (
      <Link
        href={href}
        className={classNames(variant, size, className)}
        target={target ?? (isExternal ? "_blank" : undefined)}
        rel={rel ?? (isExternal ? "noopener noreferrer" : undefined)}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  const {
    children,
    variant = "primary",
    size = "md",
    className,
    type = "button",
    ...rest
  } = props as ButtonAsButton;

  return (
    <button
      type={type}
      className={classNames(variant, size, className)}
      {...rest}
    >
      {children}
    </button>
  );
}
