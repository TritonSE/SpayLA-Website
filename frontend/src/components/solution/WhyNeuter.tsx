import React from "react";
import styles from "@/components/solution/WhyNeuter.module.css";

const WhyNeuter: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Why Neuter?</h2>
      <div className={styles.cardContainer}>
        {/* Card 1 */}
        <div className={styles.card}>
          <img
            src="card_1.png"
            alt="Euthanasia Rates"
            className={styles.cardImage}
          />
          <div className={styles.cardText} style={{ backgroundColor: "#FF8359" }}>
            <h3>Euthanasia rates</h3>
            <p>
              A short blurb that talks about euthanasia rates and how shelters will have to kill
              animals.
            </p>
            <a href="#">Read More</a>
          </div>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <img
            src="/card_2.png"
            alt="Animal Diseases"
            className={styles.cardImage}
          />
          <div className={styles.cardText} style={{ backgroundColor: "#2D5177" }}>
            <h3>Animal Diseases</h3>
            <p>
              A short blurb that talks about euthanasia rates and how shelters will have to kill
              animals.
            </p>
            <a href="#">Read More</a>
          </div>
        </div>

        {/* Card 3 */}
        <div className={styles.card}>
          <img
            src="/card_3.png"
            alt="Pet Health"
            className={styles.cardImage}
          />
          <div className={styles.cardText} style={{ backgroundColor: "#649DE0" }}>
            <h3>Pet Health</h3>
            <p>
              A short blurb that talks about euthanasia rates and how shelters will have to kill
              animals.
            </p>
            <a href="#">Read More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyNeuter;
