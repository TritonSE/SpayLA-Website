"use client";

import Image from "next/image";
import { useState } from "react";

import styles from "./Auth.module.css"; // Adjust if your CSS is elsewhere

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      // Proceed with password reset
    } else {
      // Handle mismatch
    }
  };

  return (
    <div className={styles.container}>
      <Image src="/logo.png" alt="SpayLA Logo" width={380} height={100} className={styles.logo} />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="newPassword">
            New Password
          </label>
          <input
            name="newPassword"
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
            className={styles.input}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label} htmlFor="confirmPassword">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            className={styles.input}
          />
        </div>

        <button type="submit" className={styles.button}>
          Reset
        </button>
      </form>
    </div>
  );
}
