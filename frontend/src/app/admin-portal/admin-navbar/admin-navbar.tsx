"use client";

import { TopNavigation } from "@tritonse/tse-constellation";
import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./admin-navbar.module.css"; // Adjust path as needed

const Navbar: React.FC = () => {
  const pathname = usePathname();

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
            pathname === path ? styles.active : styles.inactive
          }`}
          style={{ fontSize: "20px" }}
        >
          {children}
        </Link>
      )}
      underlineClassName={styles.underline}
      style={{
        position: "fixed",
        top: 0,
        zIndex: 10,
        height: "80px",
        paddingRight: "142px",
        paddingLeft: "144px",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    />
  );
};

export default Navbar;
