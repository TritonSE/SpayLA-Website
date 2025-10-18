"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import Navbar from "@/components/admin-navbar/AdminNavbar";

export default function NewslettersPage({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <main style={{ width: "100%", minHeight: "100vh", paddingTop: "120px", textAlign: "center" }}>
        <Navbar />
        {children}
      </main>
    </ThemeProvider>
  );
}
