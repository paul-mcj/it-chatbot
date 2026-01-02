import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    unoptimized: true,
  },

  async headers() {
    if (process.env.NODE_ENV === "development") return [];

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;",
              "img-src 'self' blob: data: https://images.remoteutil.com https://images.unsplash.com https://assets-global.website-files.com;",
              "font-src 'self' data: https://fonts.gstatic.com;",
              "object-src 'none';",
              "base-uri 'self';",
              "form-action 'self';",
              "frame-ancestors 'none';",
              "upgrade-insecure-requests;",
            ].join(" "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
