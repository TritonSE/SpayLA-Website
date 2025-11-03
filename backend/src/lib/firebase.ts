import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

import { env } from "../env";

const app = initializeApp({
  credential: cert(env.FIREBASE_SERVICE_ACCOUNT_KEY),
});

const auth = getAuth(app);

export { app, auth };
