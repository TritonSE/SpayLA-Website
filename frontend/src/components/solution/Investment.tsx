import React from "react";
import styles from "@/components/solution/investment.module.css";

const Investment: React.FC = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.budgetSection}>
          <span className={styles.percentage}>00.06%</span>
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
