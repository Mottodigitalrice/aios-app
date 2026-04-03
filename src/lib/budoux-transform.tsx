import { type ReactNode } from "react";
import { loadDefaultJapaneseParser } from "budoux";

const parser = loadDefaultJapaneseParser();

/**
 * Segments a Japanese string into phrase-aware spans using BudouX.
 * Each phrase gets word-break: keep-all so the browser never breaks mid-word.
 */
export function segmentJapanese(text: string): ReactNode {
  // Skip if text is very short or doesn't contain Japanese characters
  if (text.length < 4) return text;
  if (!/[\u3000-\u9FFF\uF900-\uFAFF]/.test(text)) return text;

  // Handle explicit line breaks: split by \n, process each line, rejoin with <br />
  if (text.includes("\n")) {
    const lines = text.split("\n");
    return lines.map((line, lineIdx) => (
      <span key={`line-${lineIdx}`}>
        {lineIdx > 0 && <br />}
        {segmentJapanese(line)}
      </span>
    ));
  }

  const phrases = parser.parse(text);
  if (phrases.length <= 1) return text;

  // Each phrase is an inline-block: browser breaks BETWEEN them (like words)
  // but keeps each phrase together. max-width + overflow-wrap ensure that
  // if a single phrase exceeds container width, it still wraps gracefully.
  return phrases.map((phrase, i) => (
    <span
      key={i}
      style={{
        display: "inline-block",
        maxWidth: "100%",
        overflowWrap: "break-word",
      }}
    >
      {phrase}
    </span>
  ));
}

type TranslationValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | TranslationValue[]
  | { [key: string]: TranslationValue };

/**
 * Deep-wraps all string values in a translation object through BudouX.
 * Returns a new object where every string is replaced with a ReactNode
 * containing phrase-segmented spans.
 *
 * Usage:
 *   const t = locale === "ja" ? budouxWrap(jaDict.landing) : enDict.landing;
 */
export function budouxWrap<T extends Record<string, unknown>>(obj: T): T {
  const result: Record<string, unknown> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      result[key] = segmentJapanese(value);
    } else if (Array.isArray(value)) {
      result[key] = value.map((item) => {
        if (typeof item === "string") return segmentJapanese(item);
        if (item && typeof item === "object" && !Array.isArray(item)) {
          return budouxWrap(item as Record<string, unknown>);
        }
        return item;
      });
    } else if (value && typeof value === "object") {
      result[key] = budouxWrap(value as Record<string, unknown>);
    } else {
      result[key] = value;
    }
  }

  return result as T;
}
