import styles from "@/app/page.module.css";
import HoverCard from "@/components/hovercard/hovercard";
import backgroundImage1 from "../assets/market_plan/local_orgs.jpg";
import { cardDetails } from "@/components/hovercard/carddetail";

export default function Home() {
  return (
    <main>
      <div className={styles.grid}>
        {cardDetails.map((card, index) => (
          <HoverCard
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
