"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

interface TidyCalEmbedProps {
  path?: string;
}

export function TidyCalEmbed({ path = "rice/ai" }: TidyCalEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if script is already loaded
    const existingScript = document.querySelector(
      'script[src="https://asset-tidycal.b-cdn.net/js/embed.js"]'
    );

    if (existingScript) {
      // Script already exists — TidyCal should render into the data-path div
      setLoading(false);
      return;
    }

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
      // Clean up script on unmount
      try {
        document.body.removeChild(script);
      } catch {
        // Script may have already been removed
      }
    };
  }, []);

  // Hide loading state after a timeout regardless (TidyCal may render without triggering onload)
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 5000);
    return () => clearTimeout(timeout);
  }, []);

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
