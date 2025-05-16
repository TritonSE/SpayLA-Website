import React from "react";

import styles from "@/components/solution/affordableSuergies.module.css";

const AffordableSurgeries: React.FC = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.textSection}>
          <h2 className={styles.heading}>Affordable Surgeries</h2>
          <p className={styles.description}>
            Currently, procedures can range from $400 to $900. By adopting a high volume, low cost
            business model, Spay.LA can bring procedures prices down to just $50.
          </p>
          <p className={styles.description}>
            Additionally, we will offer a <strong>voucher program</strong> for low income families
            and their pets.
          </p>
        </div>
        <div className={styles.imageSection}>
          <img className={styles.image} alt="Affordable Surgeries" src="/circleCat.png"></img>
        </div>
      </div>
    </div>
  );
};

export default AffordableSurgeries;
