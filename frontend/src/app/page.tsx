"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import Carousel from "@/components/Carousel";
import Card1 from "@/components/card1";
import Card2 from "@/components/card2";
import Card3 from "@/components/card3";
import WhatIsSpayLA from "@/components/WhatIsSpayLa";

import Solution from "@/components/solution/Solution";
import CommunitySupport from "@/components/community_support/CommunitySupport";
import MarketSection from "@/components/market_plan/marketSection";
import Navbar from "@/components/navbar/Navbar";
import WhyNeuter from "@/components/solution/WhyNeuter";

export default function Home() {
  return (
    <ThemeProvider>
      <main style={{ width: "100%", minHeight: "100vh" }}>
        <div className="navbar">
          <Navbar />
        </div>

        <div className="home">
          <Carousel>
            <Card1 />
            <Card2 />
            <Card3 />
          </Carousel>

          <WhatIsSpayLA />
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
      </main>
    </ThemeProvider>
  );
}
