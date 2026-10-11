const QUERY = "(prefers-reduced-motion: reduce)";

export function getPrefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia(QUERY).matches;
}

export function subscribePrefersReducedMotion(
  callback: (prefersReduced: boolean) => void,
): () => void {
  if (typeof window === "undefined") return () => undefined;

  const mediaQuery = window.matchMedia(QUERY);
  const handler = (event: MediaQueryListEvent) => {
    callback(event.matches);
  };

  mediaQuery.addEventListener("change", handler);
  callback(mediaQuery.matches);

  return () => mediaQuery.removeEventListener("change", handler);
}
