import Image from "next/image";
import styles from "./HelpOutToday.module.css";

export default function HelpOutToday() {
  return (
    <div className={styles.helpOutGrid}>
      <Image
        src="/community_support/two_cats.png"
        alt="Cat"
        className={styles.gridImage}
        width={300}
        height={200}
      />
      <div className={styles.helpOutText}>
        <h2>Help out today!</h2>
        <p>
          By calling city officials, signing petitions, and spreading the word to friends and
          family, you can make a massive difference in our community.
        </p>
        <Image 
          src="/community_support/speaker_icon.svg"
          alt="Speaker_Icon"
          className={styles.icon}
          width={300}
          height={200}
        />
        <Image
          src="/community_support/cat_icon.svg"
          alt="Icon"
          className={styles.icon}
          width={300}
          height={200}
        />
      </div>
    </div>
  );
}
