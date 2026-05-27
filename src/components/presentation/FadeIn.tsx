"use client";

/* ============ Fade In Wrapper ============ */

export function FadeIn({ show, children }: { show: boolean; children: React.ReactNode }) {
  return (
    <div
      className={`transition-all duration-500 ease-out ${
        show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 h-0 overflow-hidden"
      }`}
    >
      {children}
    </div>
  );
}
