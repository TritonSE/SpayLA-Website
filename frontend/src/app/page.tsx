import Image from "next/image";
import styles from "@/app/page.module.css";
import HelpOutToday from "./HelpOutToday";
import SampleScript from "./SampleScript";

import Solution from "../components/solution/Solution";
export default function Home() {
  return (
    <main>
      <div>
        <p>Navigation Bar&nbsp;</p>
      </div>
      <div>
        <p>Home Page and Landing&nbsp;</p>
      </div>
      <div>
        <p>Problem Statement&nbsp;</p>
      </div>
      <div>
        <Solution />
      </div>
      <div>
        <p>Community Support&nbsp;</p>
      </div>
      <div>
        <p>Marketing Plan&nbsp;</p>
      </div>
    </main>
  );
}
