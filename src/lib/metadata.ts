import { Metadata } from "next";

// centralize your site's constants for easy client handoff
export const SITE_CONFIG = {
  name: "Client Web Name",
  description: "High-end digital experiences built with precision.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  twitterHandle: "@client_handle",
};

interface MetadataProps {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
}

export function constructMetadata({
  title,
  description = SITE_CONFIG.description,
  image = "/og-image.png",
  icons = "/favicon.ico",
  noIndex = false,
}: MetadataProps = {}): Metadata {
  return {
    // Uses the %s template so sub-pages just need to provide "About"
    title: {
      default: title || SITE_CONFIG.name,
      template: `%s | ${SITE_CONFIG.name}`,
    },
    description,
    keywords: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "High-end Web Design", // Add default keywords for your fleet
    ],
    authors: [{ name: "Your Name/Agency" }],
    creator: "Your Name/Agency",

    // Crucial for SEO health
    alternates: {
      canonical: "/",
    },

    openGraph: {
      title: title || SITE_CONFIG.name,
      description,
      url: "./",
      siteName: SITE_CONFIG.name,
      images: [{ url: image, width: 1200, height: 630, alt: "Preview" }],
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title: title || SITE_CONFIG.name,
      description,
      images: [image],
      creator: SITE_CONFIG.twitterHandle,
    },

    icons,
    metadataBase: new URL(SITE_CONFIG.url),
    manifest: "/site.webmanifest", // Good for PWA/Mobile support

    // Enhanced Robots logic
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}
