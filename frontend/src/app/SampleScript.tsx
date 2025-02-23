import Image from "next/image";
import styles from "./SampleScript.module.css";

export default function SampleScript(): JSX.Element {
  return (
    <div className={styles.sampleScriptGrid}>
      <div className={styles.sampleScriptText}>
        <div className={styles.innerContainer}>
          <Image
            src="/community_support/phone_icon.svg"
            alt="Phone Icon"
            width={20}
            height={20}
            className={styles.icon}
          />
          <h2>Sample Script</h2>
          <p>
            "Hello my name is _______ and I want to leave a message for ______ regarding increasing
            funding for spay and neuter clinics in LA County".
          </p>
        </div>
      </div>
      <Image
        src="/community_support/dog.png"
        width={720}
        height={493}
        alt="Dog"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </div>
  );
}
