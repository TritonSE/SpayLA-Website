"use client";

import React, { useState, useRef, useEffect } from "react";
import styles from "./Carousel.module.css";

interface CarouselProps {
  children: React.ReactNode[];
  width?: number; // Carousel width in pixels (default: 300)
}

const Carousel: React.FC<CarouselProps> = ({ children, width = 300 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slideWidth, setSlideWidth] = useState(width);
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
  }, [width]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % children.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? children.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className={styles.carouselContainer}>
      <div
        className={styles.innerWrapper}
        ref={wrapperRef}
        style={{ width: `${width}px` }} // fixed width defined by prop
      >
        <div
          className={styles.carouselInner}
          style={{
            transform: `translateX(-${currentIndex * slideWidth}px)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {React.Children.map(children, (child, index) => (
            <div className={styles.carouselItem} key={index}>
              {child}
            </div>
          ))}
        </div>
        {/* Navigation container for arrows and indicators */}
        <div className={styles.navButtons}>
          <button onClick={prevSlide} className={styles.navButton}>
            &#8592;
          </button>
          <div className={styles.indicators}>
            {React.Children.map(children, (child, index) => (
              <div
                key={index}
                className={`${styles.indicator} ${
                  index === currentIndex ? styles.active : ""
                }`}
              />
            ))}
          </div>
          <button onClick={nextSlide} className={styles.navButton}>
            &#8594;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
