import React from "react";
import GeorgeCat from "../george_cat_info/george_cat";

import styles from "@/components/solution/WhyNeuter.module.css";

const WhyNeuter: React.FC = () => {
  return (
    <section
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <GeorgeCat
        contentImage={"/george-cat/george_cat7.png"}
        clickable={false}
        positionProp={{ left: "22%", top: "60px", transform: "translateX(-50%)" }}
      ></GeorgeCat>

      <div className={styles.container}>
        <h2 className={styles.heading}>Why Neuter?</h2>
        <div className={styles.cardContainer}>
          {/* Card 1 */}
          <div className={styles.card}>
            <img src="card_1.png" alt="Euthanasia Rates" className={styles.cardImage} />
            <div className={styles.cardText} style={{ backgroundColor: "#FF8359" }}>
              <h3>Euthanasia rates</h3>
              <p>
                A short blurb that talks about euthanasia rates and how shelters will have to kill
                animals.
              </p>
              <a href="/">Read More</a>
            </div>
          </div>

          {/* Card 2 */}
          <div className={styles.card}>
            <img src="/card_2.png" alt="Animal Diseases" className={styles.cardImage} />
            <div className={styles.cardText} style={{ backgroundColor: "#2D5177" }}>
              <h3>Animal Diseases</h3>
              <p>
                A short blurb that talks about euthanasia rates and how shelters will have to kill
                animals.
              </p>
              <a href="/">Read More</a>
            </div>
          </div>

          {/* Card 3 */}
          <div className={styles.card}>
            <img src="/card_3.png" alt="Pet Health" className={styles.cardImage} />
            <div className={styles.cardText} style={{ backgroundColor: "#649DE0" }}>
              <h3>Pet Health</h3>
              <p>
                A short blurb that talks about euthanasia rates and how shelters will have to kill
                animals.
              </p>
              <a href="/">Read More</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNeuter;
