import { Button } from "@tritonse/tse-constellation";
import { useState } from "react";

import Modal from "../newsletters/modal";

import styles from "./newsletterDisplay.module.css";

export default function NewsletterDisplay() {
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
        <div className={styles.previous}>
          <div className={styles.header}>
            <div className={styles.previousTitle}>In Case You Missed It,</div>
            <p className={styles.description}>Catch up on our previous newsletters below!</p>
          </div>
          <div className={styles.content}>
            <div className={styles.timeSelect}>
              <Button className={styles.sixMonth}>Past 6 months</Button>
              <Button className={styles.year}>Past year</Button>
            </div>
            <div className={styles.newsletterList}>
              <Button className={styles.newsletterView}> </Button>
            </div>
          </div>
          <div className={styles.pageSelector}>
            <Button className={styles.button}>
              <img src="/leftArrow.svg" alt="leftArrow"></img>
            </Button>
            <Button className={styles.button}>
              <img src="/rightArrow.svg" alt="rightArrow"></img>
            </Button>
          </div>
        </div>
      </div>

      {modalImageUrl && <Modal isOpen={modalOpen} onClose={closeModal} imageUrl={modalImageUrl} />}
    </main>
  );
}
