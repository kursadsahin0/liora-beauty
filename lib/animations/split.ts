export type SplitMode = "words" | "lines";

type SplitOptions = {
  wordClass?: string;
  innerClass?: string;
  lineClass?: string;
};

/**
 * Wraps plain text nodes into animatable word/line spans.
 * Idempotent: skips elements that already contain split markup.
 */
export function splitElementText(
  element: HTMLElement,
  mode: SplitMode = "words",
  options: SplitOptions = {},
): HTMLElement[] {
  if (element.dataset.split === mode) {
    return Array.from(
      element.querySelectorAll<HTMLElement>(
        mode === "words" ? "[data-split-inner]" : "[data-split-line-inner]",
      ),
    );
  }

  const text = element.textContent?.trim() ?? "";
  if (!text) return [];

  const {
    wordClass = "split-word",
    innerClass = "split-word-inner",
    lineClass = "split-line",
  } = options;

  element.setAttribute("aria-label", text);
  element.dataset.split = mode;
  element.textContent = "";

  if (mode === "lines") {
    const line = document.createElement("span");
    line.className = lineClass;
    line.dataset.splitLine = "";
    line.setAttribute("aria-hidden", "true");

    const inner = document.createElement("span");
    inner.className = innerClass;
    inner.dataset.splitLineInner = "";
    inner.textContent = text;
    line.appendChild(inner);
    element.appendChild(line);
    return [inner];
  }

  const parts = text.split(/(\s+)/);
  const inners: HTMLElement[] = [];

  parts.forEach((part) => {
    if (!part) return;

    if (/^\s+$/.test(part)) {
      element.appendChild(document.createTextNode(part));
      return;
    }

    const word = document.createElement("span");
    word.className = wordClass;
    word.dataset.splitWord = "";
    word.setAttribute("aria-hidden", "true");

    const inner = document.createElement("span");
    inner.className = innerClass;
    inner.dataset.splitInner = "";
    inner.textContent = part;

    word.appendChild(inner);
    element.appendChild(word);
    inners.push(inner);
  });

  return inners;
}

export function splitAll(
  elements: ArrayLike<HTMLElement>,
  mode: SplitMode = "words",
): HTMLElement[] {
  return Array.from(elements).flatMap((el) => splitElementText(el, mode));
}
