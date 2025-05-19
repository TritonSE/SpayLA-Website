"use client";

import React from "react";

import styles from "./george_cat.module.css";

type georgecatProps = {
  contentImage: string;
  clickable: boolean;
  link?: string;
  positionProp: React.CSSProperties;
};

const GeorgeCat: React.FC<georgecatProps> = ({ contentImage, clickable, link, positionProp }) => {
  const handleClick = () => {
    if (clickable && link) {
      window.location.href = link;
    }
  };
  return (
    <button
      className={styles.popup}
      onClick={handleClick}
      style={{ position: "absolute", ...positionProp }}
    >
      <img src={contentImage} alt="Content"></img>
    </button>
  );
};

export default GeorgeCat;
