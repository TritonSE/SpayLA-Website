import styles from "@/app/page.module.css";
import HoverCard from "@/components/hovercard/hovercard";
import backgroundImage1 from "../assets/local.jpg";
export default function Home() {
  return (
    <main>
      <HoverCard
        backgroundImage={backgroundImage1.src}
        cardTitle="test"
        cardDescription="test"
        backgroundColor="rgb(168, 128, 128, 0.4)"
      />
    </main>
  );
}
