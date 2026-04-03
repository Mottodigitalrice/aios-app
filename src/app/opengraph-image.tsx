import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "AIOS — Build an AI Team That Actually Works | MOTTO Digital";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #09090b 0%, #18181b 50%, #09090b 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle gradient accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "radial-gradient(ellipse at 30% 50%, rgba(99,102,241,0.15) 0%, transparent 60%)",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
            zIndex: 1,
          }}
        >
          {/* Logo mark */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginBottom: "8px",
            }}
          >
            <div
              style={{
                width: "48px",
                height: "48px",
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polygon points="12 2 2 7 12 12 22 7 12 2" />
                <polyline points="2 17 12 22 22 17" />
                <polyline points="2 12 12 17 22 12" />
              </svg>
            </div>
            <span style={{ fontSize: "28px", color: "#a1a1aa", fontWeight: 500 }}>
              MOTTO Digital
            </span>
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              color: "white",
              textAlign: "center",
              lineHeight: 1.1,
              maxWidth: "900px",
            }}
          >
            Build an AI Team
          </div>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              background: "linear-gradient(90deg, #6366f1, #8b5cf6, #6366f1)",
              backgroundClip: "text",
              color: "transparent",
              textAlign: "center",
              lineHeight: 1.1,
            }}
          >
            That Actually Works
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              textAlign: "center",
              maxWidth: "700px",
              lineHeight: 1.5,
              marginTop: "8px",
            }}
          >
            Stop being the bottleneck. You own everything.
          </div>

          {/* CTA hint */}
          <div
            style={{
              marginTop: "16px",
              padding: "12px 32px",
              background: "rgba(99,102,241,0.15)",
              border: "1px solid rgba(99,102,241,0.3)",
              borderRadius: "9999px",
              fontSize: "18px",
              color: "#a5b4fc",
              fontWeight: 500,
            }}
          >
            Agentic AI Audit — aios.mottodigital.jp
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
