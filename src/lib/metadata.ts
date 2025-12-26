import { Metadata } from "next";

// 1. Centralize your site's constants for easy client handoff
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
  image = "/og-image.png", // Ensure this exists in /public
  icons = "/favicon.ico",
  noIndex = false,
}: MetadataProps = {}): Metadata {
  return {
    // 2. Title Template: If title is "About", it becomes "About | Client Web Name"
    title: title ? `${title} | ${SITE_CONFIG.name}` : SITE_CONFIG.name,
    description,
    openGraph: {
      title: title || SITE_CONFIG.name,
      description,
      url: "./", // Next.js resolves this relative to metadataBase
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title || SITE_CONFIG.name} social preview`,
        },
      ],
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
    // 3. metadataBase is crucial for resolving relative paths for OG images
    metadataBase: new URL(SITE_CONFIG.url),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    }),
  };
}
