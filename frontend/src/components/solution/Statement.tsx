import Image from "next/image";

import styles from "@/components/solution/statement.module.css";
export default function Statement() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.vectorContainer}>
          <Image
            src="/solution_vector.svg" // Ensure the SVG is inside the `public/` folder
            alt="Solution Vector"
            width={100} // Set the desired width
            height={100} // Set the desired height
            className={styles.svgImage} // Optional for styling
          />
          <div className={styles.textSection}>
            <h3 className={styles.subheading}>Our Solution</h3>
            <h2 className={styles.heading}>
              Overpopulation
              <br /> Solved in 18 Months
            </h2>
            <p className={styles.description}>
              By creating 10 low-cost, high-volume, affordable spay/neuter clinics across the city,
              we can perform 300,000 operations per year and reach a stray population stasis in just
              18 months.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
