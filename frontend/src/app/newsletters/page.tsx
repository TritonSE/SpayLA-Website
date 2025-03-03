"use client";

import { Button } from "@tritonse/tse-constellation";

import styles from "./page.module.css";

import PreviewCard from "@/components/newsletters/previewCard";

export default function Newsletters() {
  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Edit Newsletter</h1>
        <Button></Button>
        <div className={styles.grid}>
          {Array.from({ length: 8 }, (_, index) => (
            <PreviewCard key={index} date="3/01/2025"></PreviewCard>
          ))}
        </div>
      </div>
    </main>
  );
}
