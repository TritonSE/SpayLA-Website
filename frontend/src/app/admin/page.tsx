"use client";
import { Button } from "@tritonse/tse-constellation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";

import styles from "./page.module.css";

import type { Newsletter } from "@/api/newsletters";

import { createNewsletter, getNewsletters } from "@/api/newsletters";
import Modal from "@/components/newsletters/modal";
import PreviewCard from "@/components/newsletters/previewCard";
import ToastNotification from "@/components/newsletters/toastNotification";
import { storage } from "@/lib/firebase";

// Minimal types to use with pdfjs-dist dynamic import
type PdfViewport = { width: number; height: number };
type PdfPage = {
  getViewport: (opts: { scale: number }) => PdfViewport;
  render: (args: { canvasContext: CanvasRenderingContext2D; viewport: PdfViewport }) => {
    promise: Promise<void>;
  };
};
type PdfDocument = { getPage: (n: number) => Promise<PdfPage> };
type PdfJsModule = {
  getDocument: (src: Uint8Array | ArrayBuffer | string) => { promise: Promise<PdfDocument> };
  GlobalWorkerOptions: { workerSrc: string };
};

// Cache for pdfjs module once dynamically loaded on the client
let pdfjsLibRef: PdfJsModule | null = null;

type NewsletterPreview = {
  newsletter: Newsletter;
  previewUrl: string;
};

export default function NewslettersPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [newsletters, setNewsletters] = useState<NewsletterPreview[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const noop = () => {
    // no operation
  };

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [undoCallback, setUndoCallback] = useState<() => void>(() => noop);

  const showToast = (message: string, undo?: () => void) => {
    setToastMessage(message);
    setUndoCallback(() => undo ?? noop);
    setToastVisible(true);

    // Optional auto-dismiss:
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  const generatePreviewFromUrl = async (url: string): Promise<string> => {
    if (url.toLowerCase().includes(".pdf")) {
      try {
        if (!pdfjsLibRef) {
          const mod = (await import("pdfjs-dist")) as unknown as PdfJsModule;
          pdfjsLibRef = mod;
          pdfjsLibRef.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
        }

        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        const typedarray = new Uint8Array(arrayBuffer);

        const pdf = await pdfjsLibRef.getDocument(typedarray).promise;
        const page = await pdf.getPage(1);
        const viewport = page.getViewport({ scale: 2 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        if (!context) return url;

        canvas.width = viewport.width;
        canvas.height = viewport.height;
        await page.render({ canvasContext: context, viewport }).promise;
        return canvas.toDataURL("image/png");
      } catch {
        return "/demo-newsletter.png";
      }
    }
    return url;
  };

  // Load existing newsletters on mount
  useEffect(() => {
    const loadNewsletters = async () => {
      const result = await getNewsletters();
      if (result.success) {
        const previews = await Promise.all(
          result.data.map(async (newsletter) => {
            const previewUrl = await generatePreviewFromUrl(newsletter.fileLink);
            return { newsletter, previewUrl };
          }),
        );
        setNewsletters(previews);
      } else {
        showToast(`Error loading newsletters: ${result.error}`);
      }
    };

    void loadNewsletters();
  }, []);

  const handleButtonClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
  };

  const readFileAsArrayBuffer = async (file: File): Promise<ArrayBuffer> => {
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
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadedNewsletters: NewsletterPreview[] = [];

      for (const file of files) {
        try {
          // Upload file to Firebase Storage
          const timestamp = Date.now();
          const fileName = `newsletters/${timestamp}_${file.name}`;
          const storageRef = ref(storage, fileName);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);

          // Create newsletter record in backend
          const newsletterData = {
            date: new Date().toISOString(),
            fileLink: downloadURL,
          };

          const result = await createNewsletter(newsletterData);

          if (!result.success) {
            showToast(`Error uploading ${file.name}: ${result.error}`);
            continue;
          }

          // Generate preview
          let previewUrl: string;
          if (file.type === "application/pdf") {
            if (!pdfjsLibRef) {
              const mod = (await import("pdfjs-dist")) as unknown as PdfJsModule;
              pdfjsLibRef = mod;
              pdfjsLibRef.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.js";
            }

            const arrayBuffer = await readFileAsArrayBuffer(file);
            const typedarray = new Uint8Array(arrayBuffer);
            const pdf = await pdfjsLibRef.getDocument(typedarray).promise;
            const page = await pdf.getPage(1);
            const viewport = page.getViewport({ scale: 2 });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");

            if (!context) {
              previewUrl = downloadURL;
            } else {
              canvas.width = viewport.width;
              canvas.height = viewport.height;
              await page.render({ canvasContext: context, viewport }).promise;
              previewUrl = canvas.toDataURL("image/png");
            }
          } else {
            previewUrl = URL.createObjectURL(file);
          }

          uploadedNewsletters.push({
            newsletter: result.data,
            previewUrl,
          });
        } catch (error) {
          if (error instanceof Error) {
            showToast(`Error uploading ${file.name}: ${error.message}`);
          } else {
            showToast(`Error uploading ${file.name}`);
          }
        }
      }

      if (uploadedNewsletters.length > 0) {
        setNewsletters((prev) => [...uploadedNewsletters, ...prev]);
        showToast(`${uploadedNewsletters.length} newsletter(s) uploaded successfully.`, () => {
          // Undo: remove uploaded newsletters
          setNewsletters((prev) =>
            prev.filter(
              (n) => !uploadedNewsletters.some((u) => u.newsletter._id === n.newsletter._id),
            ),
          );
        });
      }
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    void processFiles(event);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
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

        <ToastNotification
          show={toastVisible}
          message={toastMessage}
          onUndo={undoCallback}
          onRequestClose={() => {
            setToastVisible(false);
          }}
        />

        <Button
          className={styles.upload}
          leadingIcon="ic_upload"
          onClick={handleButtonClick}
          disabled={isUploading}
        >
          {isUploading ? "Uploading..." : "Upload PDF/Image"}
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
          {newsletters.map((item, idx) => {
            const date = new Date(item.newsletter.date);
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

            return (
              <PreviewCard
                key={item.newsletter._id}
                date={formattedDate}
                onPreview={() => {
                  openModal(item.previewUrl);
                }}
                onDelete={() => {
                  const deleted = item;
                  setNewsletters((prev) =>
                    prev.filter((n) => n.newsletter._id !== item.newsletter._id),
                  );

                  showToast("Newsletter deleted successfully.", () => {
                    // re-insert the deleted item at the same position
                    setNewsletters((prev) => {
                      const updated = [...prev];
                      updated.splice(idx, 0, deleted);
                      return updated;
                    });
                  });
                }}
              >
                <img
                  src={item.previewUrl}
                  alt={`newsletter-${item.newsletter._id}`}
                  style={{ width: "100%" }}
                />
              </PreviewCard>
            );
          })}
        </div>
      </div>

      {modalImageUrl && <Modal isOpen={modalOpen} onClose={closeModal} imageUrl={modalImageUrl} />}
    </main>
  );
}
