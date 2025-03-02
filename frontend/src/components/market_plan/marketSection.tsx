import styles from "./marketSection.module.css";

import { cardDetails } from "@/components/hovercard/carddetail";
import HoverCard from "@/components/hovercard/hovercard";

export default function MarketSection() {
  return (
    <main>
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
    </main>
  );
}
