"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import Solution from "../components/solution/Solution";

import Navbar from "@/components/navbar/Navbar";
  
import HelpOutToday from "../components/community_support/HelpOutToday";
import SampleScript from "../components/community_support/SampleScript";
import SignPetition from "../components/community_support/SignPetition";

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
          <p>Why Neutering&nbsp;</p>
        </div>
        <div id="support">
           <HelpOutToday />
           <SampleScript />
           <SignPetition />
        </div>
        <div id="marketing">
          <p>Marketing Plan&nbsp;</p>
        </div>
      </main>
    </ThemeProvider>
  );
}
