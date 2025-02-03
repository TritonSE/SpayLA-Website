import styles from "@/app/page.module.css";
import HoverCard from "@/components/hovercard/hovercard";
import { cardDetails } from "@/components/hovercard/carddetail";
// import globalstyle from "@/app/globals.css";

export default function Home() {
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
        {cardDetails.map((card, index) => (
          <HoverCard
            backgroundImage={card.backgroundImage}
            cardTitle={card.cardTitle}
            cardDescription={card.cardDescription}
            backgroundColor={card.backgroundColor}
            hoverColor={card.hoverColor}
          />
        ))}
      </div>
    </main>
  );
}
