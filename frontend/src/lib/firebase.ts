import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import env from "@/util/env";

const firebaseConfig = env.NEXT_PUBLIC_FIREBASE_CONFIG;

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
