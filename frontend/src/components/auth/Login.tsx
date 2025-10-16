// SignIn.tsx
"use client";

import Image from "next/image";
import React, { useState } from "react";

import styles from "./Auth.module.css";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Dummy validation
    setEmailError(email !== "test@example.com");
    setPasswordError(password !== "password123");
  };

  return (
    <div className={styles.container}>
      <Image src="/logo.png" alt="SpayLA Logo" width={380} height={150} className={styles.logo} />

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <input
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className={styles.input}
          />
          {emailError && <span className={styles.error}>* wrong email</span>}
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className={styles.input}
          />
          {passwordError && <span className={styles.error}>* wrong password</span>}
          <div className={styles.forgotWrapper}>
            <a href="/forgot-password" className={styles.forgotLink}>
              Forgot password?
            </a>
          </div>
        </div>

        <button type="submit" className={styles.button}>
          Sign In
        </button>
      </form>
    </div>
  );
}
