import { get, handleAPIError, post } from "./requests";

import type { APIResult } from "./requests";

export type CreateNewsletterData = {
  date: string; // ISO 8601 format
  fileLink: string; // Firebase storage URL
};

export type Newsletter = {
  _id: string;
  date: string;
  fileLink: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * Fetches all newsletters from the backend, sorted by date (newest first)
 */
export async function getNewsletters(): Promise<APIResult<Newsletter[]>> {
  try {
    const response = await get("/api/newsletters", {}, false);
    const data = (await response.json()) as Newsletter[];
    return { success: true, data };
  } catch (e) {
    return handleAPIError(e);
  }
}

/**
 * Creates a new newsletter record in the database
 * @param newsletterData The newsletter data including date and Firebase file link
 * @returns The created newsletter
 */
export async function createNewsletter(
  newsletterData: CreateNewsletterData,
): Promise<APIResult<Newsletter>> {
  try {
    const response = await post("/api/newsletters", newsletterData, {}, true);
    const data = (await response.json()) as Newsletter;
    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      const match = /\{.*\}/.exec(error.message);
      if (match) {
        try {
          const errorJson = JSON.parse(match[0]) as { error?: string };
          if (errorJson.error) {
            return { success: false, error: errorJson.error };
          }
        } catch (_) {}
      }
    }
    return handleAPIError(error);
  }
}

