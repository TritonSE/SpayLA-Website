import React from "react";

import GeorgeCat from "../george_cat_info/george_cat";

import styles from "@/components/problem/Statement.module.css";

const Statement: React.FC = () => {
  return (
    <section
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <GeorgeCat
        contentImage={"/george-cat/george_cat2.png"}
        clickable={false}
        positionProp={{ left: "50%", top: "57px", transform: "translateX(-50%)" }}
      ></GeorgeCat>
      <div className={styles.outerContainer}>
        <div className={styles.innerContainer}>
          <div className={styles.textSection}>
            <p className={styles.problem}>The Problem</p>
            <h2 className={styles.heading}>Animal Overpopulation</h2>
            <p className={styles.description}>
              There are only{" "}
              <span style={{ fontWeight: "bold" }}> 7 low-cost spay/neuter clinics</span> for
              millions
              <br />
              of street cats, stray dogs and families who can no longer
              <br /> afford the high price of services.
              <br />
              <br />
              <span style={{ fontWeight: "bold" }}>This is not enough</span> to support the rapidly
              growing <br />
              population of animals in Los Angeles.
            </p>
          </div>
          <div className={styles.imageSection}>
            <img className={styles.image} alt="Overpopulation" src="/overpopulation.svg"></img>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Statement;
