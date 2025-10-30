"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import { AuthProvider } from "@/contexts/AuthContext";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>{children}</AuthProvider>
    </ThemeProvider>
  );
}
