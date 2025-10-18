import "dotenv/config";
import { cleanEnv, num, str, url } from "envalid";

export const env = cleanEnv(process.env, {
  MONGO_URI: str(),
  FRONTEND_ORIGIN: url(),
  PORT: num({ default: 8000 }),
});
