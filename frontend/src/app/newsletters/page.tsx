"use client";
import { Button } from "@tritonse/tse-constellation";
import * as pdfjsLib from "pdfjs-dist";
import { ChangeEvent, useRef, useState } from "react";

import styles from "./page.module.css";

import PreviewCard from "@/components/newsletters/previewCard";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export default function Newsletters() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click(); // Triggers the hidden file input
  };
  const readFileAsArrayBuffer = (file: File): Promise<ArrayBuffer> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result as ArrayBuffer);
      };
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
  };
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    void processFile(event);
  };
  const processFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (file.type === "application/pdf") {
      const arrayBuffer = await readFileAsArrayBuffer(file);
      const typedarray = new Uint8Array(arrayBuffer);
      const pdf = await pdfjsLib.getDocument(typedarray).promise;
      const page = await pdf.getPage(1);

      const viewport = page.getViewport({ scale: 2 });
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      if (!context) {
        console.error("Failed to get 2D context");
        return;
      }
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      await page.render({ canvasContext: context, viewport }).promise;
      const imageUrl = canvas.toDataURL("image/png");
      setPreviewImage(imageUrl);
    } else if (file.type.startsWith("image/")) {
      const imageUrl = URL.createObjectURL(file);
      setPreviewImage(imageUrl);
    }
  };

  return (
    <main className={styles.page}>
      <div className={styles.content}>
        <h1 className={styles.title}>Edit Newsletter</h1>
        <Button className={styles.upload} leadingIcon="ic_upload" onClick={handleButtonClick}>
          Upload PDF/Image
        </Button>
        <input
          type="file"
          accept=".pdf,image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }} // Hide this component
        />
        <div className={styles.grid}>
          {/* Conditionally show preview card if file is uploaded */}
          {previewImage && (
            <PreviewCard date="Uploaded File">
              <img src={previewImage} alt="Preview" style={{ width: "100%", height: "auto" }} />
            </PreviewCard>
          )}

          {/* Filler cards for layout/testing */}
          {Array.from({ length: 7 }, (_, index) => (
            <PreviewCard key={index} date="3/01/2025" />
          ))}
        </div>
      </div>
    </main>
  );
}
