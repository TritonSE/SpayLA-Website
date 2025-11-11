import { get, handleAPIError, post } from "./requests";

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
    const response = await get("/api/subscribers");
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
    const data = (await response.json()) as { subscriber: Subscriber };
    return { success: true, data: data.subscriber };
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
