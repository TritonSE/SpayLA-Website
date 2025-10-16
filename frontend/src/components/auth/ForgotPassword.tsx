"use client";

import Image from "next/image";
import React, { useState } from "react";

import styles from "./Auth.module.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const isValid = email === "test@example.com"; // Dummy validation
    setEmailError(!isValid);
    if (isValid) {
      setSubmitted(true);
    }
  };

  return (
    <div className={styles.container}>
      <Image src="/logo.png" alt="SpayLA Logo" width={380} height={100} className={styles.logo} />

      {submitted ? (
        <div className={styles.successMessage}>A reset link has been sent to your email.</div>
      ) : (
        <>
          <div className={styles.instructionBox}>
            <p className={styles.instructions}>
              Forgot password? Enter email below to get a reset link.
            </p>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.inputGroup}>
              <input
                type="text"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (emailError) setEmailError(false);
                }}
                className={styles.input}
              />
              {emailError && <span className={styles.error}>* email not found</span>}
            </div>

            <button type="submit" className={styles.button}>
              Send Reset Link
            </button>
          </form>
        </>
      )}
    </div>
  );
}
