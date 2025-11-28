import { cert, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

import { env } from "../env";

const app = initializeApp({
  credential: cert(env.FIREBASE_SERVICE_ACCOUNT_KEY),
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
});

const auth = getAuth(app);

const storage = getStorage(app);

export { app, auth, storage };
