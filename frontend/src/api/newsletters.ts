import { get, handleAPIError, httpDelete, post } from "./requests";

import type { APIResult } from "./requests";

export type Newsletter = {
  _id: string;
  date: string;
  fileLink: string;
  filePath?: string;
  originalName?: string;
  createdAt: string;
  updatedAt: string;

  // not persistent
  preview?: string;
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
export type CreateNewsletterInput = {
  date: string;
  file: File;
};

export async function createNewsletter(
  input: CreateNewsletterInput,
): Promise<APIResult<Newsletter>> {
  try {
    const fd = new FormData();
    fd.append("date", input.date);
    fd.append("file", input.file, input.file.name);

    const response = await post("/api/newsletters", fd, {}, true);
    const data = (await response.json()) as Newsletter;
    return { success: true, data };
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function deleteNewsletter(id: string): Promise<APIResult<null>> {
  try {
    await httpDelete(`/api/newsletters/${id}`, {}, {}, true);

    return { success: true, data: null };
  } catch (error) {
    return handleAPIError(error);
  }
}
