import Image from "next/image";
import styles from "./SampleScript.module.css";

export default function SampleScript() {
  return (
    <div className={styles.sampleScriptGrid}>
      <div className={styles.sampleScriptText}>
        <h2>
          Sample Script
          <Image
            src="/community_support/phone.svg"
            className={`${styles.icon}`}
            width={47}
            height={52.17}
            alt="Phone Icon"
          />
        </h2>
        <Image
          src="/community_support/yarn.svg"
          width={184}
          height={70.59}
          className={`${styles.icon} ${styles.stringIcon}`}
          alt="String Icon"
        />
        <p>
          Hello my name is _______ and I want to leave a message for ______ regarding increasing
          funding for spay and neuter clinics.
        </p>
      </div>
      <Image src="/community_support/dog.png" width={721} height={493} alt="Dog" />
    </div>
  );
}
