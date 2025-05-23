import GeorgeCat from "../george_cat_info/george_cat";

import styles from "./marketSection.module.css";

import { cardDetails } from "@/components/hovercard/carddetail";
import HoverCard from "@/components/hovercard/hovercard";

export default function MarketSection() {
  return (
    <section
      style={{
        width: "100%",
        position: "relative",
      }}
    >
      <GeorgeCat
        contentImage={"/george-cat/george_cat9.png"}
        clickable={false}
        positionProp={{ left: "115px", top: "70px" }}
      ></GeorgeCat>
      <div className={styles.sectionHeader}>
        <h1 className="sectionTitle">Marketing Plan</h1>
        <p className={styles.sectionDescription}>
          Here are several petitions that you can help sign to create further traction on
          legislation and proper funding for spay/neuter clinics.
        </p>
      </div>
      <div className={styles.grid}>
        {cardDetails.map((card) => (
          <HoverCard
            key={card.cardTitle}
            backgroundImage={card.backgroundImage}
            cardTitle={card.cardTitle}
            cardDescription={card.cardDescription}
            backgroundColor={card.backgroundColor}
          />
        ))}
      </div>
    </section>
  );
}
