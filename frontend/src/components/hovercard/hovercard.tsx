"use client";
import React from "react";
import styles from "./hovercard.module.css";

interface hovercardProps {
  backgroundImage: string;
  cardTitle: string;
  cardDescription: string;
  backgroundColor: string;
  hoverColor: string;
}

const HoverCard: React.FC<hovercardProps> = ({
  backgroundImage,
  cardTitle,
  cardDescription,
  backgroundColor,
  hoverColor,
}) => {
  const backgroundProp = `linear-gradient(${backgroundColor}, ${backgroundColor}), url(${backgroundImage})`;
  const backgroundHover = `linear-gradient(${hoverColor}, ${backgroundColor}), url(${backgroundImage})`;
  const cardStyle: React.CSSProperties = {
    background: `linear-gradient(${backgroundColor}, ${backgroundColor}), url(${backgroundImage})`,
    backgroundSize: "cover",
  };

  return (
    <div
      className={styles.card}
      style={cardStyle}
      onMouseEnter={(e) => (
        (e.currentTarget.style.background = backgroundHover),
        (e.currentTarget.style.backgroundSize = "cover")
      )}
      onMouseLeave={(e) => (
        (e.currentTarget.style.background = backgroundProp),
        (e.currentTarget.style.backgroundSize = "cover")
      )}
    >
      <h1 className={styles.cardTitle}>{cardTitle}</h1>
      <p className={styles.cardDescription}>{cardDescription}</p>
    </div>
  );
};

export default HoverCard;
