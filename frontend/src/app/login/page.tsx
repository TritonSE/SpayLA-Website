"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import SignIn from "@/components/auth/Login";
import { useAuth } from "@/contexts/AuthContext";

export default function Login() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (user) {
      router.replace("/admin");
    }
  }, [loading, user]);

  return <SignIn />;
}
