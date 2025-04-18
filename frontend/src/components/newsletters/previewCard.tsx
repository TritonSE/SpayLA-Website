import React from "react";
import { useState } from "react";

import styles from "./previewCard.module.css";

type previewCardProps = {
  //   filepath: string;
  onPreview: () => void;
  date: string;
  children?: React.ReactNode;
};

const PreviewCard: React.FC<previewCardProps> = ({ onPreview, date, children }) => {
  const [isHovered, setIsHovered] = useState(false); //
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <div className={styles.thumbnail}>
          {/* <button className={styles.previewButton}>Preview</button> */}
          <button className={styles.previewButton} onClick={onPreview}>
            Preview
          </button>
          {children}
        </div>
        <div className={styles.cardFooter}>
          <div className={styles.date}>{date} Newsletter</div>
          <button
            className={styles.discardButton}
            onMouseEnter={() => {
              setIsHovered(true);
            }} //
            onMouseLeave={() => {
              setIsHovered(false);
            }} //
          >
            <img
              className={styles.icon}
              src={isHovered ? "/selected_trash.svg" : "/discardIcon.svg"}
              alt="" //
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
