import { useState } from "react";

import styles from "./previewCard.module.css";

type previewCardProps = {
  onPreview: () => void;
  onDelete: () => void;
  date: string;
  children?: React.ReactNode;
};

const PreviewCard: React.FC<previewCardProps> = ({ onPreview, onDelete, date, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div className={styles.card}>
      <div className={styles.content}>
        <button className={styles.thumbnail} onClick={onPreview}>
          {children}
        </button>
        <div className={styles.cardFooter}>
          <div className={styles.date}>{date} Newsletter</div>
          <button
            className={styles.discardButton}
            onClick={onDelete}
            onMouseEnter={() => {
              setIsHovered(true);
            }}
            onMouseLeave={() => {
              setIsHovered(false);
            }}
          >
            <img
              className={styles.icon}
              src={isHovered ? "/selected_trash.svg" : "/discardIcon.svg"}
              alt=""
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;
