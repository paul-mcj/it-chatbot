import { experimental_taintObjectReference } from "react";

/**
 * CUSTOM ERROR CLASS
 * Standardizes how you handle "Not Found" or "Unauthorized" across client projects.
 */
export class DataServiceError extends Error {
  constructor(public message: string, public status: number = 500) {
    super(message);
    this.name = "DataServiceError";
  }
}

/**
 * TAINTED DATA WRAPPER
 * A helper to fetch "Sensitive" things (like User Profiles or Settings).
 */
export async function getSecureConfig() {
  // In a real app, this might come from a DB or Process.env
  const config = {
    apiKey: process.env.CMS_API_TOKEN || "development-key",
    dbConnectionString: "postgresql://...", // VERY SENSITIVE
    siteName: "Client Project",
  };

  // 🛡️ SECURITY LOCK
  // We taint the whole config object. If you accidentally
  // pass 'config' to a Client Component, the app will crash safely.
  experimental_taintObjectReference(
    "SECURITY VIOLATION: Server-only configuration leaked to the client.",
    config
  );

  return config;
}

/**
 * GENERAL DATA FETCHING PATTERN
 * Use this for Relume mockups that need real data (e.g., Blog posts, Portfolio items).
 */
export async function fetchData<T>(endpoint: string): Promise<T> {
  const { apiKey } = await getSecureConfig();

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL}/api/${endpoint}`,
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // Cache for 1 hour by default
      }
    );

    if (!response.ok) {
      throw new DataServiceError(
        `Failed to fetch ${endpoint}`,
        response.status
      );
    }

    return await response.json();
  } catch (error) {
    console.error("DataService Error:", error);
    throw error;
  }
}
