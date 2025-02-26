import Image from "next/image";
import styles from "./SampleScript.module.css";

export default function SampleScript(): JSX.Element {
  return (
    <div className={styles.sampleScriptGrid}>
      <div className={styles.sampleScriptText}>
        <Image
          src="/community_support/phone_icon.svg"
          className={`${styles.icon}`}
          width={89}
          height={82.1}
          alt="Phone Icon"
        />
        <h2>Sample Script</h2>
        <p>
          "Hello my name is _______ and I want to leave a message for (Politican name) regarding the
          need to increase funding for spay and neuter clinics in LA county."
        </p>
      </div>
      <Image src="/community_support/dog.png" width={721} height={493} alt="Dog" />
    </div>
  );
}
