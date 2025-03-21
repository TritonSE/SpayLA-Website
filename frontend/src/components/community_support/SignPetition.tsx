import Image from "next/image";

import styles from "./SignPetition.module.css";

export default function HelpOutToday(): JSX.Element {
  return (
    <div className={styles.signPetitionGrid}>
      <Image
        src="/community_support/cat_image.svg"
        alt="Phone Call and Typing"
        width={482}
        height={271.13}
      />
      <div className={styles.signPetitionText}>
        <h2>Sign Petitions</h2>
        <p>
          Check through the list of petitions and sign to show your support for local spay and
          neuter funding!
        </p>
        <div className={styles.signPetitionBottom}>
          <div className={styles.signPetitionBottomLeft}>
            <p>Find petitions at:</p>
            <a href="https://www.change.org/p/demand-los-angeles-allocate-funds-for-high-volume-low-cost-spay-neuter-clinics?recruiter=1366015288&recruited_by_id=42e36e90-f017-11ef-9c19-7525f92045e3&utm_source=share-social&utm_campaign=starter_onboarding_share_flow&utm_medium=copylink">
              funding demands for spay/neuter clinics
            </a>
          </div>
          <Image src="/community_support/paw.svg" alt="Paw Icon" width={66} height={66} />
        </div>
      </div>
    </div>
  );
}
