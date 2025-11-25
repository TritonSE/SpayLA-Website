/* eslint-disable no-await-in-loop */
"use client";
import { Button } from "@tritonse/tse-constellation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useRef, useState } from "react";

import styles from "./page.module.css";

import type { Newsletter } from "@/api/newsletters";

import { createNewsletter, deleteNewsletter, getNewsletters } from "@/api/newsletters";
import Modal from "@/components/newsletters/modal";
import PreviewCard from "@/components/newsletters/previewCard";
import ToastNotification from "@/components/newsletters/toastNotification";
import { storage } from "@/lib/firebase";
import { generatePreviewFromUrl } from "@/util/utils";

type NewsletterPreview = {
  newsletter: Newsletter;
  previewUrl: string;
};

export default function NewslettersPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);
  const [newsletters, setNewsletters] = useState<NewsletterPreview[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);

    // Optional auto-dismiss:
    setTimeout(() => {
      setToastVisible(false);
    }, 3000);
  };

  // Load existing newsletters on mount
  useEffect(() => {
    const loadNewsletters = async () => {
      setLoading(true);

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

      setLoading(false);
    };

    void loadNewsletters();
  }, []);

  const handleButtonClick = () => {
    if (!isUploading) {
      fileInputRef.current?.click();
    }
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
          const previewUrl = await generatePreviewFromUrl(downloadURL);

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
        showToast(`${uploadedNewsletters.length} newsletter(s) uploaded successfully.`);
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
          {newsletters.map((item) => {
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
                  if (loading) return;

                  setLoading(true);

                  deleteNewsletter(item.newsletter._id)
                    .then(() => {
                      showToast("Newsletter deleted successfully.");

                      setNewsletters((prev) =>
                        prev.filter((n) => n.newsletter._id !== item.newsletter._id),
                      );
                    })
                    .catch((error) => {
                      console.error(error);
                      showToast(`Error deleting newsletter`);
                    })
                    .finally(() => {
                      setLoading(false);
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
