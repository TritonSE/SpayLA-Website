import { get, handleAPIError, httpDelete, post } from "./requests";

import type { APIResult } from "./requests";

export type CreateSubscriberData = {
  name: string;
  email: string;
};

type Subscriber = {
  _id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
};

export async function getSubscribers(): Promise<APIResult<Subscriber[]>> {
  try {
    const response = await get("/api/subscribers", {}, true);
    const data = (await response.json()) as Subscriber[];
    return { success: true, data };
  } catch (e) {
    return handleAPIError(e);
  }
}
export async function createSubscriber(
  subscriberData: CreateSubscriberData,
): Promise<APIResult<Subscriber>> {
  try {
    const response = await post("/api/subscribers", subscriberData);
    const data = (await response.json()) as Subscriber;
    return { success: true, data };
  } catch (error) {
    if (error instanceof Error) {
      const match = /\{.*\}/.exec(error.message);
      if (match) {
        try {
          const errorJson = JSON.parse(match[0]) as { message?: string };
          if (errorJson.message) {
            return { success: false, error: errorJson.message };
          }
        } catch (_) {}
      }
    }
    return handleAPIError(error);
  }
}

export async function deleteSubscribers(ids: string[]): Promise<APIResult<{ message: string }>> {
  try {
    const response = await httpDelete("/api/subscribers", { ids }, {}, true);
    if (response.status === 204) {
      return { success: true, data: { message: "Subscriber(s) deleted successfully." } };
    }
    const data = (await response.json()) as { message: string };
    return { success: true, data };
  } catch (e) {
    return handleAPIError(e);
  }
}
