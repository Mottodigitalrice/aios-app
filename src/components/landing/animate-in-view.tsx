"use client";

import { useState, useEffect } from "react";
import { useInView } from "@/hooks/use-in-view";
import type { ReactNode } from "react";

function usePrefersReducedMotion() {
  const [prefersReduced, setPrefersReduced] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return prefersReduced;
}

interface AnimateInViewProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: "div" | "section";
  style?: React.CSSProperties;
}

export function AnimateInView({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
  style: externalStyle,
}: AnimateInViewProps) {
  const [ref, isInView] = useInView<HTMLDivElement>({ threshold: 0.05, rootMargin: "0px 0px 200px 0px" });
  const prefersReduced = usePrefersReducedMotion();

  // Content is ALWAYS visible (opacity starts at 1).
  // Animation is a subtle enhancement: slight translate + very light opacity lift.
  const animated = isInView || prefersReduced;

  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: animated ? 1 : 0.85,
        transform: animated ? "translateY(0)" : "translateY(12px)",
        transition: prefersReduced
          ? "none"
          : `opacity 0.35s ease-out ${delay}ms, transform 0.35s ease-out ${delay}ms`,
        willChange: prefersReduced ? "auto" : "opacity, transform",
        ...externalStyle,
      }}
    >
      {children}
    </Tag>
  );
}

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  end,
  suffix = "",
  prefix = "",
  duration = 1500,
  className,
}: CountUpProps) {
  const [ref, isInView] = useInView<HTMLSpanElement>({ threshold: 0.3 });
  const prefersReduced = usePrefersReducedMotion();

  return (
    <span ref={ref} className={className}>
      {prefersReduced ? (
        `${prefix}${end}${suffix}`
      ) : isInView ? (
        <CountUpInner
          end={end}
          suffix={suffix}
          prefix={prefix}
          duration={duration}
        />
      ) : (
        `${prefix}0${suffix}`
      )}
    </span>
  );
}

function CountUpInner({
  end,
  suffix,
  prefix,
  duration,
}: {
  end: number;
  suffix: string;
  prefix: string;
  duration: number;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let frame: number;

    function animate(timestamp: number) {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * end));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    }

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [end, duration]);

  return (
    <>
      {prefix}
      {count}
      {suffix}
    </>
  );
}
