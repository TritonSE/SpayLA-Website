import { Button } from "@tritonse/tse-constellation";
import { useEffect, useState } from "react";

import styles from "./newsletterDisplay.module.css";

import { getNewsletters } from "@/api/newsletters";
import Modal from "@/components/newsletters/modal";

import type { Newsletter } from "@/api/newsletters";

export default function NewsletterDisplay() {
  const [allNewsletters, setAllNewsletters] = useState<Newsletter[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterRange, setFilterRange] = useState<"6months" | "1year">("6months");
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  // Fetch newsletters from API on mount
  useEffect(() => {
    const loadNewsletters = async () => {
      setLoading(true);
      const result = await getNewsletters();
      if (result.success) {
        setAllNewsletters(result.data);
      } else {
        console.error("Error loading newsletters:", result.error);
      }
      setLoading(false);
    };

    void loadNewsletters();
  }, []);

  const openModal = (url: string) => {
    setModalImageUrl(url);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalImageUrl(null);
  };

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  };

  // Get the latest newsletter (first in the already-sorted array from backend)
  const latestNewsletter = allNewsletters.length > 0 ? allNewsletters[0] : null;

  const getFilteredNewsletters = () => {
    if (allNewsletters.length === 0) return [];

    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    // Exclude the latest newsletter from the filtered list
    const previousNewsletters = allNewsletters.slice(1);

    if (filterRange === "6months") {
      return previousNewsletters.filter((nl) => new Date(nl.date) >= sixMonthsAgo);
    } else {
      return previousNewsletters.filter((nl) => {
        const date = new Date(nl.date);
        return date >= oneYearAgo && date < sixMonthsAgo;
      });
    }
  };

  const filteredNewsletters = getFilteredNewsletters();
  const newslettersPerPage = 3;
  const totalPages = Math.ceil(filteredNewsletters.length / newslettersPerPage);
  const startIdx = (currentPage - 1) * newslettersPerPage;
  const currentNewsletters = filteredNewsletters.slice(startIdx, startIdx + newslettersPerPage);

  if (loading) {
    return (
      <main>
        <div className={styles.section}>
          <div className={styles.sectionContent}>
            <div className={styles.latest}>
              <div className={styles.header}>
                <div className={styles.latestTitle}>Latest News</div>
                <p className={styles.description}>Loading newsletters...</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className={styles.section}>
        <div className={styles.sectionContent}>
          <div className={styles.latest}>
            <div className={styles.header}>
              <div className={styles.latestTitle}>Latest News</div>
              <p className={styles.description}>Check out our most recent newsletter below!</p>
            </div>

            {latestNewsletter ? (
              <div className={styles.previewCard}>
                <button
                  className={styles.thumbnail}
                  onClick={() => {
                    openModal(latestNewsletter.fileLink);
                  }}
                >
                  <img src={latestNewsletter.fileLink} alt="Latest Newsletter" style={{ width: "100%" }} />
                </button>
              </div>
            ) : (
              <p className={styles.description}>No newsletters available yet.</p>
            )}
          </div>
          <div className={styles.rightSection}>
            <div className={styles.previous}>
              <div className={styles.header}>
                <div className={styles.previousTitle}>In Case You Missed It,</div>
                <p className={styles.description}>Catch up on our previous newsletters below!</p>
              </div>
              <div className={styles.content}>
                <div className={styles.timeSelect}>
                  <Button
                    className={`${styles.timespan} ${filterRange === "6months" ? styles.active : ""}`}
                    onClick={() => {
                      setFilterRange("6months");
                      setCurrentPage(1);
                    }}
                  >
                    Past 6 months
                  </Button>
                  <Button
                    className={`${styles.timespan} ${filterRange === "1year" ? styles.active : ""}`}
                    onClick={() => {
                      setFilterRange("1year");
                      setCurrentPage(1);
                    }}
                  >
                    Past year
                  </Button>
                </div>
                <div className={styles.newsletterList}>
                  {currentNewsletters.length > 0 ? (
                    currentNewsletters.map((newsletter) => (
                      <Button
                        key={newsletter._id}
                        className={styles.newsletterView}
                        onClick={() => {
                          openModal(newsletter.fileLink);
                        }}
                      >
                        {formatDate(newsletter.date)} Newsletter
                      </Button>
                    ))
                  ) : (
                    <p className={styles.description}>No newsletters found for this time period.</p>
                  )}
                </div>
              </div>
              {totalPages > 0 && (
                <div className={styles.pageSelector}>
                  <Button
                    className={`${styles.pageButton} ${currentPage === 1 ? styles.disabledButton : ""}`}
                    disabled={currentPage === 1}
                    onClick={() => {
                      setCurrentPage((p) => p - 1);
                    }}
                  >
                    <img src="/leftArrow.svg" alt="leftArrow" />
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => (
                    <Button
                      key={i}
                      className={`${styles.button} ${currentPage === i + 1 ? styles.activePage : ""}`}
                      onClick={() => {
                        setCurrentPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </Button>
                  ))}
                  <Button
                    className={`${styles.pageButton} ${currentPage === totalPages ? styles.disabledButton : ""}`}
                    disabled={currentPage === totalPages}
                    onClick={() => {
                      setCurrentPage((p) => p + 1);
                    }}
                  >
                    <img src="/rightArrow.svg" alt="rightArrow" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {modalImageUrl && <Modal isOpen={modalOpen} onClose={closeModal} imageUrl={modalImageUrl} />}
    </main>
  );
}
