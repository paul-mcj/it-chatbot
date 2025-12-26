import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  // Pull the base URL from an environment variable (e.g., VERCEL_URL or SITE_URL)
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://yourtemplate.com";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/", // Don't crawl API routes
        "/_next/", // Don't crawl internal Next.js files
        "/admin/", // Protect admin areas if you add them later
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
