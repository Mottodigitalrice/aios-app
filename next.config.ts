import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  basePath: process.env.NEXT_BASE_PATH || "",
  output: process.env.NEXT_OUTPUT === "standalone" ? "standalone" : undefined,
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "inline",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
    ],
  },
};

export default nextConfig;
