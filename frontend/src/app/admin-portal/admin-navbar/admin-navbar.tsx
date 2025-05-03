import { TopNavigation } from "@tritonse/tse-constellation";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import styles from "@/components/navbar/Navbar.module.css";

const sections = [
  { id: "newsletter", label: "Edit Newsletter" },
  { id: "subscribe", label: "Subscribers" },
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
        <Link href="/admin-portal/newsletters">
          <img src="/logo.png" style={{ width: "278px" }} alt="SpayLA Logo" />
        </Link>
      }
      logoSrc="/logo.png"
      navItems={[
        {
          icon: "ic_cart",
          label: "Edit Newsletter",
          path: "/admin-portal/newsletters",
        },
        {
          icon: "ic_search",
          label: "Subscribers",
          path: "/admin-portal/subscribers",
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
