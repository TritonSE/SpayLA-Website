"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import styles from "@/app/page.module.css";
import Carousel from "@/components/Carousel";
import WhatIsSpayLA from "@/components/WhatIsSpayLa";
import Card1 from "@/components/card1";
import Card2 from "@/components/card2";
import Card3 from "@/components/card3";
import CommunitySupport from "@/components/community_support/CommunitySupport";
import MarketSection from "@/components/market_plan/marketSection";
import Navbar from "@/components/navbar/Navbar";
import Problem from "@/components/problem/Problem";
import ProblemCarousel from "@/components/problem/ProblemCarousel";
import Solution from "@/components/solution/Solution";
import WhyNeuter from "@/components/solution/WhyNeuter";

export default function Home() {
  return (
    <ThemeProvider>
      <main className={styles.main} style={{ width: "100%", minHeight: "100vh" }}>
        <div className={styles.navbar}>
          <Navbar />
        </div>

        <div className={styles.content}>
          <div id="landing" className="home">
            <Carousel>
              <Card1 />
              <Card2 />
              <Card3 />
            </Carousel>

            <WhatIsSpayLA />
          </div>
          {/* Problem Statement*/}
          <div id="problem">
            <Problem />
            <ProblemCarousel />
          </div>

          {/* Solution content */}
          <div id="solution">
            <Solution />
          </div>
          <div id="neuter">
            <WhyNeuter />
          </div>
          <div id="support">
            <CommunitySupport />
          </div>
          <div id="marketing">
            <MarketSection />
          </div>
        </div>
      </main>
    </ThemeProvider>
  );
}
