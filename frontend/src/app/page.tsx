"use client";

import { ThemeProvider, TopNavigation } from "@tritonse/tse-constellation";
import Link from "next/link";

import Solution from "../components/solution/Solution";

export default function Home() {
  return (
    <ThemeProvider>
      <main>
        <div className="navbar">
          <TopNavigation
            logoComponent={
              <a href="#landing">
                <img src="/logo.png" style={{ width: "278px" }} alt=""></img>
              </a>
            }
            logoSrc="/logo.png"
            navItems={[
              {
                icon: "ic_cart",
                label: "Who We Are",
                path: "#landing",
              },
              {
                icon: "ic_search",
                label: "Solution",
                path: "#solution",
              },
              {
                icon: "ic_settings",
                label: "Why Neutering?",
                path: "#neuter",
              },
              {
                icon: "ic_help",
                label: "Support",
                path: "#support",
              },
              {
                icon: "ic_help",
                label: "Marketing Plan",
                path: "#marketing",
              },
            ]}
            renderLink={(path, className, children, key) => (
              <Link key={key} href={path ?? ""} className={className}>
                {children}
              </Link>
            )}
            underlineClassName="underline"
            style={{ position: "fixed", top: 0, zIndex: 10 }}
          />
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
