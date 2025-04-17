import { TopNavigation } from "@tritonse/tse-constellation";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import styles from "@/components/navbar/Navbar.module.css";

const sections = [
  { id: "landing", label: "Who We Are" },
  { id: "solution", label: "Solution" },
  { id: "neuter", label: "Why Neutering?" },
  { id: "support", label: "Support" },
  { id: "marketing", label: "Marketing Plan" },
];

const Navbar: React.FC = () => {
  const [activeNav, setActiveNav] = useState<string | null>(null);

  const handleNavClick = (label: string) => {
    setActiveNav((prev) => (prev === label ? null : label));
    console.log("Active: ", activeNav);
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollOffset = 120; // navbar height + buffer

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section) {
          const rect = section.getBoundingClientRect();

          // Check if the section is near the top of the viewport
          if (rect.top <= scrollOffset) {
            const newHash = `#${sections[i].id}`;
            if (window.location.hash !== newHash) {
              history.replaceState(null, "", newHash);
            }
            setActiveNav(sections[i].label);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <TopNavigation
      logoComponent={
        <a
          href="#landing"
          onClick={(e) => {
            e.preventDefault();
            const el = document.getElementById("landing");
            if (el) {
              window.scrollTo({
                top: el.offsetTop - 106, // navbar offset
                behavior: "smooth",
              });
            }
            setActiveNav("Who We Are");
          }}
        >
          <img src="/logo.png" style={{ width: "278px" }} alt="SpayLA Logo" />
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
          onClick={(e) => {
            e.preventDefault();
            const id = path?.replace("#", "");
            const el = document.getElementById(id ?? "");
            if (el) {
              window.scrollTo({
                top: el.offsetTop - 106, // Adjust to match navbar height
                behavior: "smooth",
              });
            }
            handleNavClick(key as string);
          }}
        >
          {children}
        </Link>
      )}
      underlineClassName={styles.underline}
      style={{
        position: "fixed",
        top: 0,
        zIndex: 10,
        height: "106px",
        paddingRight: "106px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    />
  );
};

export default Navbar;
