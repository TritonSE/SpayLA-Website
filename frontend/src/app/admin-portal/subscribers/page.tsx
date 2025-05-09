"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import Navbar from "../admin-navbar/admin-navbar";

export default function SubscribersPage() {
  return (
    <ThemeProvider>
      <main style={{ width: "100%", minHeight: "100vh", paddingTop: "120px", textAlign: "center" }}>
        <Navbar />
        <h1 style={{ fontSize: "40px", color: "#2d5177" }}>Subscribers Page</h1>
        <p style={{ color: "black" }}>
          This is where you can view or manage newsletter subscribers.
        </p>
      </main>
    </ThemeProvider>
  );
}
