import React from "react";
import styles from "./hovercard.module.css";

interface hovercardProps {
  backgroundImage: string;
  cardTitle: string;
  cardDescription: string;
  backgroundColor: string;
}

const HoverCard: React.FC<hovercardProps> = ({
  backgroundImage,
  cardTitle,
  cardDescription,
  backgroundColor,
}) => {
  const cardStyle: React.CSSProperties = {
    background: `linear-gradient(${backgroundColor}, ${backgroundColor}), url(${backgroundImage})`,
    backgroundSize: "cover",
  };

  return (
    <div className={styles.card} style={cardStyle}>
      <h1 className={styles.cardTitle}>{cardTitle}</h1>
      <p className={styles.cardDescription}>{cardDescription}</p>
    </div>
  );
};

export default HoverCard;
