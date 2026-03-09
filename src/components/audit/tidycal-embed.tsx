"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface TidyCalEmbedProps {
  path?: string;
}

function isTidyCalLoaded() {
  return typeof document !== "undefined" &&
    !!document.querySelector('script[src="https://asset-tidycal.b-cdn.net/js/embed.js"]');
}

export function TidyCalEmbed({ path = "rice/ai" }: TidyCalEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(() => !isTidyCalLoaded());

  useEffect(() => {
    // Script already loaded — nothing to do
    if (isTidyCalLoaded()) return;

    const script = document.createElement("script");
    script.src = "https://asset-tidycal.b-cdn.net/js/embed.js";
    script.async = true;

    script.onload = () => {
      setLoading(false);
    };

    script.onerror = () => {
      setLoading(false);
    };

    document.body.appendChild(script);

    return () => {
      try {
        document.body.removeChild(script);
      } catch {
        // Script may have already been removed
      }
    };
  }, []);

  // Fallback: hide loading after timeout (TidyCal may render without triggering onload)
  useEffect(() => {
    if (!loading) return;
    const timeout = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, [loading]);

  return (
    <div
      ref={containerRef}
      className="relative rounded-xl overflow-hidden border border-zinc-800 bg-white min-h-[400px]"
    >
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/80 z-10">
          <Loader2 className="size-6 text-indigo-400 animate-spin" />
        </div>
      )}
      <div className="tidycal-embed" data-path={path} />
    </div>
  );
}
