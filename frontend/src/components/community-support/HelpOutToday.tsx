import Image from "next/image";

import styles from "./HelpOutToday.module.css";

export default function HelpOutToday(): JSX.Element {
  return (
    <div className={styles.helpOutGrid}>
      <Image
        src="/community_support/phone_call.svg"
        alt="Phone Call and Typing"
        width={414}
        height={339.38}
      />
      <div className={styles.helpOutText}>
        <h2>Help out today!</h2>
        <p>
          Find your representative today and get started reaching out to local officials. By
          bringing up important concerns to your local government via calling, emailing, or
          messaging on social media, you can make a massive difference in our community.
        </p>
        <div className={styles.helpOutBottom}>
          <div className={styles.helpOutBottomLeft}>
            <p>Find your local representative at: </p>
            <p className={styles.helpOutUnderline}> neighborhoodinfo.lacity.gov</p>
          </div>
          <Image src="/community_support/paw.svg" alt="Paw Icon" width={66} height={66} />
        </div>
      </div>
    </div>
  );
}
