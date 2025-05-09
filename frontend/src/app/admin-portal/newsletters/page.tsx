"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import Navbar from "../admin-navbar/admin-navbar";

export default function NewslettersPage() {
  return (
    <ThemeProvider>
      <main style={{ width: "100%", minHeight: "100vh", paddingTop: "120px", textAlign: "center" }}>
        <Navbar />
        <h1 style={{ fontSize: "40px", color: "#2d5177" }}>Newsletters Page</h1>
        <p style={{ color: "black" }}>This is where you can view or manage newsletters.</p>
      </main>
    </ThemeProvider>
  );
}
