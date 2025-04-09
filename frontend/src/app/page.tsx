"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import Solution from "../components/solution/Solution";

import CommunitySupport from "@/components/community_support/CommunitySupport";
import MarketSection from "@/components/market_plan/marketSection";
import Navbar from "@/components/navbar/Navbar";
import WhyNeuter from "@/components/solution/WhyNeuter";

export default function Home() {
  return (
    <ThemeProvider>
      <main>
        <div className="navbar">
          <Navbar></Navbar>
        </div>
        <div id="landing">
          <p>Home Page and Landing&nbsp;</p>
        </div>
        <div>
          <p>Problem Statement&nbsp;</p>
        </div>
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
