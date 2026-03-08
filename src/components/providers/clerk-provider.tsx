"use client";

import { ReactNode } from "react";

// Auth disabled — all routes public
export function ClerkClientProvider({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
