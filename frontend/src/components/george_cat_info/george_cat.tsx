"use client";

import React, { useEffect, useRef, useState } from "react";

import styles from "./george_cat.module.css";

type georgecatProps = {
  contentImage: string;
  clickable: boolean;
  link?: string;
  positionProp: React.CSSProperties;
};

const GeorgeCat: React.FC<georgecatProps> = ({ contentImage, clickable, link, positionProp }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = () => {
    if (clickable && link) {
      window.location.href = link;
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        console.log("HERE");
      },
      { threshold: 0.1 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <div ref={ref} style={{ position: "absolute", ...positionProp }}>
      <button
        className={`${styles.popup} ${isVisible ? styles.visible : styles.hidden}`}
        onClick={handleClick}
      >
        <img style={{ height: 94.8653 }} src={contentImage} alt="Content" />
      </button>
    </div>
  );
};

export default GeorgeCat;

// function setIsVisible(isIntersecting: boolean) {
//   throw new Error("Function not implemented.");
// }
// function useEffect(arg0: () => () => void, arg1: never[]) {
//   throw new Error("Function not implemented.");
// }
