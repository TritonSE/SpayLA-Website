import React from "react";

import styles from "@/components/problem/Statement.module.css";

const Statement: React.FC = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.textSection}>
          <p className={styles.problem}>The Problem</p>
          <h2 className={styles.heading}>Animal Overpopulation</h2>
          <p className={styles.description}>
            Los Angeles has only{" "}
            <span style={{ fontWeight: "bold" }}>7 low-cost spay/neuter clinics</span> for <br />
            millions of stray animals and struggling pet owners who
            <br /> can no longer afford the high price of services.{" "}
            <span style={{ fontWeight: "bold" }}>
              This is
              <br /> not enough
            </span>{" "}
            to support the growing animal population.
          </p>
        </div>
        <div className={styles.imageSection}>
          <img className={styles.image} alt="Overpopulation" src="/overpopulation.svg"></img>
        </div>
      </div>
    </div>
  );
};

export default Statement;
