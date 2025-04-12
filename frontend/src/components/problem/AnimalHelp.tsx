"use client";

import styles from "@/components/problem/AnimalHelp.module.css";

const AnimalHelp: React.FC = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.textSection}>
          <h2 className={styles.heading}>Animals Need Our Help!</h2>
          <p className={styles.description}>
            The severe shortage of low-cost spay/neuter clinics, combined with <br />
            these 3 challenges highlight an urgent need for{" "}
            <span style={{ fontWeight: "bold" }}> affordable, available,</span> and{" "}
            <span style={{ fontWeight: "bold" }}>accessible</span> solutions to control animal
            overpopulation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AnimalHelp;
