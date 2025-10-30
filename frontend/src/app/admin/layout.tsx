"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import Navbar from "@/components/admin-navbar/AdminNavbar";
import Protected from "@/components/auth/Protected";
import { AuthProvider } from "@/contexts/AuthContext";

export default function AdminPage({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Protected>
          <main
            style={{ width: "100%", minHeight: "100vh", paddingTop: "120px", textAlign: "center" }}
          >
            <Navbar />
            {children}
          </main>
        </Protected>
      </AuthProvider>
    </ThemeProvider>
  );
}
