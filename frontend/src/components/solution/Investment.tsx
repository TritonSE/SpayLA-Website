"use client";
import React, { useEffect, useState, useRef } from "react";
import styles from "@/components/solution/investment.module.css";

const Investment: React.FC = () => {
  const [percentage, setPercentage] = useState("100.00%");
  const [hasAnimated, setHasAnimated] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          startAnimation();
          observer.disconnect(); // Stop observing after animation starts
        }
      },
      { threshold: 0.5 }, // Trigger when 50% of the section is visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated]);

  const startAnimation = () => {
    let currentValue = 100;
    const finalValue = 0.06;
    const step = (currentValue - finalValue) / 55; // 🔹 Slower decrease
    let lastTime = performance.now();

    const updatePercentage = (timestamp: number) => {
      const deltaTime = timestamp - lastTime;

      if (deltaTime > 40) {
        // 🔹 Smooth updates (~25 FPS)
        lastTime = timestamp;
        currentValue -= step;
        const displayValue = currentValue.toFixed(2);

        setPercentage(displayValue + "%");

        if (currentValue > finalValue + 0.001) {
          requestAnimationFrame(updatePercentage);
        } else {
          setPercentage("00.06%"); // Ensure final value is correct
        }
      } else {
        requestAnimationFrame(updatePercentage);
      }
    };

    requestAnimationFrame(updatePercentage);
  };
  return (
    <div ref={containerRef} className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.budgetSection}>
          <span className={styles.percentage}>{percentage}</span>
          <p className={styles.subtitle}>of LA’s annual budget</p>
        </div>
        <div className={styles.textSection}>
          <h2 className={styles.heading}>Small Investment, Major Impact</h2>
          <p className={styles.description}>
            10 fully operational spay/neuter clinics will cost an estimated <br />
            $8 million initial investment. This is just 00.06% of LA’s $12.9 <br />
            billion annual budget.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Investment;
