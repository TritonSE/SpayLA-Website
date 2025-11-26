"use client";
import { Button } from "@tritonse/tse-constellation";
import { useEffect, useState } from "react";

import styles from "./page.module.css";

import type { Newsletter } from "@/api/newsletters";

import { createNewsletter, deleteNewsletter, getNewsletters } from "@/api/newsletters";
import Modal from "@/components/newsletters/modal";
import PreviewCard from "@/components/newsletters/previewCard";
import ToastNotification from "@/components/newsletters/toastNotification";
import UploadModal from "@/components/newsletters/uploadModal";
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

  const processFile = async (dateIso: string, file: File | null) => {
    if (!file) return;

    setIsUploading(true);

    try {
      const res = await createNewsletter({ date: dateIso, file });

      if (!res.success) {
        return showToast(`Error uploading file: ${res.error}`);
      }

      const created = res.data;
      const preview = await generatePreviewFromUrl(created.fileLink);

      setNewsletters((prev) => [{ ...created, preview }, ...prev]);

      showToast(`Newsletter uploaded successfully.`);
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
          onSubmit={async (dateIso, file) => {
            await processFile(dateIso, file ?? null);
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
