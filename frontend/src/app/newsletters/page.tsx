"use client";
import { Button } from "@tritonse/tse-constellation";
import * as pdfjsLib from "pdfjs-dist";
import { useRef, useState } from "react";

import styles from "./page.module.css";

import Modal from "@/components/newsletters/modal";
import PreviewCard from "@/components/newsletters/previewCard";

pdfjsLib.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";

export default function Newsletters() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewData, setPreviewData] = useState<string[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
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

  const processFiles = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files ?? []);

    const previewPromises = files.map(async (file) => {
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
          return null;
        }

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;
        return canvas.toDataURL("image/png");
      } else if (file.type.startsWith("image/")) {
        return URL.createObjectURL(file);
      }

      return null; // skip unsupported file types
    });

    const results = await Promise.all(previewPromises);
    const validResults = results.filter((url): url is string => !!url); // filter out nulls

    setPreviewData((prev) => [...prev, ...validResults]);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    void processFiles(event);
  };

  const openModal = (url: string) => {
    setModalImageUrl(url);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setModalImageUrl(null);
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
          multiple
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />

        <div className={styles.grid}>
          {previewData.map((url, idx) => (
            <PreviewCard
              key={idx}
              date={`Uploaded File ${idx + 1}`}
              onPreview={() => {
                openModal(url);
              }}
            >
              <img src={url} alt={`preview-${idx}`} style={{ width: "100%" }} />
            </PreviewCard>
          ))}
        </div>
      </div>

      {modalImageUrl && <Modal isOpen={modalOpen} onClose={closeModal} imageUrl={modalImageUrl} />}
    </main>
  );
}
