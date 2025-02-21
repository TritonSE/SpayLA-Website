"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Carousel.module.css";

interface CarouselProps {
  children: React.ReactNode[];
}

const Carousel: React.FC<CarouselProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (wrapperRef.current) {
        setSlideWidth(wrapperRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % React.Children.count(children));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? React.Children.count(children) - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.carouselContainer}>
      <div className={styles.innerWrapper} ref={wrapperRef}>
        <div
          className={styles.carouselInner}
          style={{ transform: `translateX(-${currentIndex * slideWidth}px)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div
              className={styles.carouselItem}
              key={index}
              style={{ minWidth: slideWidth }}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Navigation: arrows + indicators */}
        <div className={styles.navButtons}>
          <button onClick={prevSlide} className={styles.navButton}>
            &lt;
          </button>
          <div className={styles.indicators}>
            {React.Children.map(children, (_child, i) => (
              <div
                key={i}
                className={`${styles.indicator} ${i === currentIndex ? styles.active : ""}`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className={styles.navButton}>
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
