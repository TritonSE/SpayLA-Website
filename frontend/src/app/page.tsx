"use client";

import { ThemeProvider } from "@tritonse/tse-constellation";

import Solution from "../components/solution/Solution";

import Navbar from "@/components/navbar/Navbar";

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
          <p>Community Support&nbsp;</p>
        </div>
        <div id="marketing">
          <p>Marketing Plan&nbsp;</p>
        </div>
      </main>
    </ThemeProvider>
  );
}
