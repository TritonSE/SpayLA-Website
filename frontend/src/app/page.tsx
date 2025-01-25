import Image from "next/image";
import styles from "@/app/page.module.css";
import HelpOutToday from "./HelpOutToday";

export default function Home() {
  return (
    <main className={styles.main}>
      <HelpOutToday />
    </main>
  );
}
