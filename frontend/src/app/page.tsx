import Image from "next/image";
import styles from "@/app/page.module.css";
import HelpOutToday from "./HelpOutToday";
import SampleScript from "./SampleScript";
import CallPoliticians from "./CallPoliticians";

export default function Home() {
  return (
    <main className={styles.main}>
      <HelpOutToday />
      <SampleScript />
      <CallPoliticians />
    </main>
  );
}
