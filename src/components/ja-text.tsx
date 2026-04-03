"use client";

import { loadDefaultJapaneseParser } from "budoux";

const parser = loadDefaultJapaneseParser();

/**
 * JaText — wraps Japanese text in phrase-aware spans using BudouX.
 * Each phrase unit gets `word-break: keep-all` so the browser
 * never breaks mid-word in Japanese.
 *
 * Usage: <JaText>日本語のテキスト</JaText>
 * For non-Japanese or when locale is "en", renders children as-is.
 */
export function JaText({
  children,
  locale,
}: {
  children: string;
  locale?: "en" | "ja";
}) {
  // Skip processing for English text
  if (locale === "en") return <>{children}</>;

  const phrases = parser.parse(children);
  return (
    <>
      {phrases.map((phrase, i) => (
        <span
          key={i}
          style={{
            wordBreak: "keep-all",
            overflowWrap: "break-word",
          }}
        >
          {phrase}
        </span>
      ))}
    </>
  );
}
