import React from "react";

import styles from "./previewCard.module.css";

type previewCardProps = {
  //   filepath: string;
  date: string;
  children?: React.ReactNode;
};

const PreviewCard: React.FC<previewCardProps> = ({ date, children }) => {
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.thumbnail}>
          <button className={styles.previewButton}>Preview</button>
          {children}
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.date}>{date} Newsletter</div>
          <button className={styles.discardButton}>
            <img className={styles.icon} src="/discardIcon.svg" alt=""></img>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
