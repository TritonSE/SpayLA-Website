"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

import styles from "./Auth.module.css";

export default function PasswordResetSuccess() {
  const router = useRouter();

  const handleLoginRedirect = () => {
    router.push("/login");
  };

  return (
    <div className={styles.container}>
      <Image src="/logo.png" alt="SpayLA Logo" width={380} height={100} className={styles.logo} />
      <p className={styles.successText}>
        Your password has been successfully <br /> changed.
      </p>
      <button className={styles.button} onClick={handleLoginRedirect}>
        Login
      </button>
    </div>
  );
}
