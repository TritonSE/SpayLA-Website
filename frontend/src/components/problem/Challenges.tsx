import React from "react";

import styles from "@/components/problem/Challenges.module.css";

const Challenges: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <h2 className={styles.heading}>The 3 Main Challenges</h2>
        {/* Card 1 */}
        <div className={styles.card}>
          <div className={styles.cardText} style={{ backgroundColor: "#FF8359" }}>
            <img
              src="cash_coin.svg"
              alt="cash_coin"
              className={styles.cardImage}
              style={{ paddingTop: "50px", marginBottom: "20px" }}
            />
            <h3>Unaffordable Surgery</h3>
            <p>
              It is law to spay/neuter your pets, but spay/neuter{" "}
              <span style={{ fontWeight: "bold" }}>
                costs have surged to $300-$1800 per surgery
              </span>
              .
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <div className={styles.cardText} style={{ backgroundColor: "#2D5177" }}>
            <img
              src="/clinic.svg"
              alt="clinic"
              className={styles.cardImage}
              style={{ paddingTop: "50px", marginBottom: "20px" }}
            />
            <h3>Low Clinic Availability</h3>
            <p>
              <span style={{ fontWeight: "bold" }}>Overwhelmed low-cost clinics</span> and{" "}
              <span style={{ fontWeight: "bold" }}>restricted clinic hours</span> leave many
              families unable to access essential services for their pets.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className={styles.card}>
          <div className={styles.cardText} style={{ backgroundColor: "#2877D2" }}>
            <img
              src="/car.svg"
              alt="car"
              className={styles.cardImage}
              style={{ paddingTop: "30px", marginBottom: "20px" }}
            />
            <h3>Lack Of Accessibility</h3>
            <p>
              <span style={{ fontWeight: 650 }}>Long drives during rush hours</span> and{" "}
              <span style={{ fontWeight: "bold" }}>lack of pet- friendly transport</span> are
              <br />
              barriers for pet owners, making the process stressful and often inaccessible.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenges;
