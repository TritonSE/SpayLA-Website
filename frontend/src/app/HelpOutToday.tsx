import Image from "next/image";
import styles from "./HelpOutToday.module.css";

export default function HelpOutToday(): JSX.Element {
  return (
    <div className={styles.helpOutGrid}>
      <Image
        src="/community_support/two_cats.png"
        alt="Cat"
        className={styles.gridImage}
        width={720}
        height={493}
      />
      <div className={styles.helpOutText}>
        <h2>
          Help out today!
          <Image
            src="/community_support/speaker_icon.svg"
            alt="Speaker Icon"
            className={`${styles.icon} ${styles.phoneIcon}`}
            width={40}
            height={40}
          />
        </h2>
        <p>
          By calling city officials, signing petitions, and spreading the word to
          friends and family, you can make a massive difference in our community.
        </p>
        <Image
          src="/community_support/cat_icon.svg"
          alt="Cat Icon"
          className={`${styles.icon} ${styles.catIcon}`}
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}
