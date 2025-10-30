import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "./firebase";

import type { User } from "firebase/auth";

type ResponseError = {
  field: "email" | "password" | "general";
  message: string;
};

type FirebaseResponse =
  | {
      success: true;
      user: User;
      error?: undefined;
    }
  | {
      success: false;
      error: ResponseError;
      user?: undefined;
    };

/* Returns user, or string error message if an error occurred.  */
export async function login(email: string, password: string): Promise<FirebaseResponse> {
  try {
    const userCreds = await signInWithEmailAndPassword(auth, email, password);

    return {
      success: true,
      user: userCreds.user,
    };
  } catch (error) {
    const err = {
      field: "general",
      message: "An unknown error occurred.",
    } as ResponseError;

    if (!(error instanceof FirebaseError)) {
      return {
        success: false,
        error: err,
      };
    }

    if (error.code === "auth/user-not-found") {
      err.field = "email";
      err.message = "No user found with this email.";
    } else if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password") {
      err.field = "password";
      err.message = "Invalid credentials.";
    }

    return {
      success: false,
      error: err,
    };
  }
}

export async function logout() {
  await auth.signOut();
}
