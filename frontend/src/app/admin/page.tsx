/* eslint-disable no-await-in-loop */
"use client";
import { Button } from "@tritonse/tse-constellation";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useEffect, useState } from "react";

import styles from "./page.module.css";

import type { Newsletter } from "@/api/newsletters";

import { createNewsletter, deleteNewsletter, getNewsletters } from "@/api/newsletters";
import Modal from "@/components/newsletters/modal";
import PreviewCard from "@/components/newsletters/previewCard";
import ToastNotification from "@/components/newsletters/toastNotification";
import UploadModal from "@/components/newsletters/uploadModal";
import { storage } from "@/lib/firebase";
import { generatePreviewFromUrl } from "@/util/utils";

export default function NewslettersPage() {
  const [loading, setLoading] = useState(false);
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

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
            const preview = await generatePreviewFromUrl(newsletter.fileLink);
            return { ...newsletter, preview };
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
      setUploadModalOpen(true);
    }
  };

  const processFiles = async (dateIso: string, files: File[]) => {
    if (files.length === 0) return;

    setIsUploading(true);

    try {
      const uploadedNewsletters: Newsletter[] = [];

      for (const file of files) {
        try {
          // Upload file to Firebase Storage
          const timestamp = Date.now();
          const fileName = `newsletters/${timestamp}_${file.name}`;
          const storageRef = ref(storage, fileName);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);

          // Create newsletter record in backend using provided date
          const newsletterData = {
            date: dateIso,
            fileLink: downloadURL,
          };

          const result = await createNewsletter(newsletterData);

          if (!result.success) {
            showToast(`Error uploading ${file.name}: ${result.error}`);
            continue;
          }

          // Generate preview
          const preview = await generatePreviewFromUrl(downloadURL);

          uploadedNewsletters.push({ ...result.data, preview });
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

        {/* Upload modal handles file selection + date */}
        <UploadModal
          isOpen={uploadModalOpen}
          onClose={() => setUploadModalOpen(false)}
          onSubmit={async (dateIso, files) => {
            await processFiles(dateIso, files);
          }}
          disabled={isUploading}
        />

        <div className={styles.grid}>
          {newsletters.map((item) => {
            const date = new Date(item.date);
            const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;

            return (
              <PreviewCard
                key={item._id}
                date={formattedDate}
                onPreview={() => {
                  openModal(item.preview || "/demo-newsletter.png");
                }}
                onDelete={() => {
                  if (loading) return;

                  setLoading(true);

                  deleteNewsletter(item._id)
                    .then(() => {
                      showToast("Newsletter deleted successfully.");

                      setNewsletters((prev) => prev.filter((n) => n._id !== item._id));
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
                  src={item.preview || "/demo-newsletter.png"}
                  alt={`newsletter-${item._id}`}
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
