import "dotenv/config";
import { cleanEnv, json, num, str, url } from "envalid";

import type { AppOptions } from "firebase-admin";

export const env = cleanEnv(process.env, {
  MONGO_URI: str(),
  FRONTEND_ORIGIN: url(),
  PORT: num({ default: 8000 }),
  FIREBASE_SERVICE_ACCOUNT_KEY: json<AppOptions>(),
});
