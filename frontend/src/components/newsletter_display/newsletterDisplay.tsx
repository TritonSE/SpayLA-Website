import { Button } from "@tritonse/tse-constellation";
import { useState } from "react";

import Modal from "../newsletters/modal";

import styles from "./newsletterDisplay.module.css";

export default function NewsletterDisplay() {
  const allNewsletters = [
    { date: "2025-01-01", title: "01/01/2025 Newsletter", url: "some_url_1" },
    { date: "2024-12-15", title: "12/15/2024 Newsletter", url: "some_url_2" },
    { date: "2024-11-10", title: "11/10/2024 Newsletter", url: "some_url_3" },
    { date: "2024-08-20", title: "08/20/2024 Newsletter", url: "some_url_4" },
    { date: "2024-07-01", title: "07/01/2024 Newsletter", url: "some_url_5" },
    { date: "2024-04-15", title: "04/15/2024 Newsletter", url: "some_url_6" },
  ];

  const [filterRange, setFilterRange] = useState<"6months" | "1year">("6months");
  const [currentPage, setCurrentPage] = useState(1);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);

  const openModal = (url: string) => {
    setModalImageUrl(url);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
    setModalImageUrl(null);
  };

  //   const goPreviousPage = () => {};

  //   const goNextPage = () => {};

  const getFilteredNewsletters = () => {
    const now = new Date();
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(now.getMonth() - 6);

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(now.getFullYear() - 1);

    if (filterRange === "6months") {
      return allNewsletters
        .filter((nl) => new Date(nl.date) >= sixMonthsAgo)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else {
      return allNewsletters
        .filter((nl) => {
          const date = new Date(nl.date);
          return date >= oneYearAgo && date < sixMonthsAgo;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }
  };

  const filteredNewsletters = getFilteredNewsletters();
  const newslettersPerPage = 3;
  const totalPages = Math.ceil(filteredNewsletters.length / newslettersPerPage);
  const startIdx = (currentPage - 1) * newslettersPerPage;
  const currentNewsletters = filteredNewsletters.slice(startIdx, startIdx + newslettersPerPage);

  return (
    <main>
      <div className={styles.section}>
        <div className={styles.latest}>
          <div className={styles.header}>
            <div className={styles.latestTitle}>Latest News</div>
            <p className={styles.description}>Check out our most recent newsletter below!</p>
          </div>

          <div className={styles.previewCard}>
            <button
              className={styles.thumbnail}
              onClick={() => {
                openModal("some url");
              }}
            >
              <img src={"some url"} alt="url" style={{ width: "100%" }} />
            </button>
          </div>
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
                {currentNewsletters.map((newsletter, index) => (
                  <Button
                    key={index}
                    className={styles.newsletterView}
                    onClick={() => {
                      openModal(newsletter.url);
                    }}
                  >
                    {newsletter.title}
                  </Button>
                ))}
              </div>
            </div>
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
          </div>
        </div>
      </div>

      {modalImageUrl && <Modal isOpen={modalOpen} onClose={closeModal} imageUrl={modalImageUrl} />}
    </main>
  );
}
