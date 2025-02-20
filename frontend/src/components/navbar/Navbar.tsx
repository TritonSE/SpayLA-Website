import { TopNavigation } from "@tritonse/tse-constellation";
import Link from "next/link";
import React, { useState } from "react";

import styles from "@/components/navbar/Navbar.module.css";

const Navbar: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string | null>(null);

  const handleNavClick = (label: string) => {
    setActiveNav((prev) => (prev === label ? null : label));
    console.log("Active: ", activeNav);
  };

  return (
    <TopNavigation
      logoComponent={
        <a href="#landing">
          <img src="/logo.png" style={{ width: "278px" }} alt="" />
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
        <Link
          key={key}
          href={path ?? ""}
          className={`${className} ${styles.underline} ${
            activeNav === key ? styles.active : styles.inactive
          }`}
          onClick={() => {
            console.log("Key: ", key);
            handleNavClick(key as string);
          }}
        >
          {children}
        </Link>
      )}
      underlineClassName={styles.underline}
      style={{ position: "fixed", top: 0, zIndex: 10 }}
    />
  );
};

export default Navbar;
