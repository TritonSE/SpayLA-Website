"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import Navbar from "../admin-navbar/admin-navbar";

import styles from "@/app/page.module.css";

export default function newslettersPage() {
  return (
    <ThemeProvider>
      <main className={styles.main} style={{ width: "100%", minHeight: "100vh" }}>
        <div className={styles.navbar}>
          <Navbar />
        </div>

        <div className={styles.content}> HELLO </div>
      </main>
    </ThemeProvider>
  );
}
