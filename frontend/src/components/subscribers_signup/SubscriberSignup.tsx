"use client";
import styles from "./SubscriberSignup.module.css";
import Image from "next/image";
import { useState, useEffect } from "react";

export default function SubscriberSignup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className={styles.subscriberContainer}>
      <div className={styles.signupSection}>
        <div className={styles.headerSection}>
          <Image
            src="/subcribers_singup/paw_icon.svg"
            alt="Paw Icon"
            width={isMobile ? 50 : 45}
            height={isMobile ? 50 : 41}
            className={styles.pawIcon}
          />
          <h2 className={styles.heading}>Helping Paws, One Email at a Time</h2>
        </div>
        {isMobile ? (
          <p className={styles.description}>
            Sign up for our newsletter to get the latest spay/neuter updates and ways you can help
            our furry friends!
          </p>
        ) : (
          <p className={styles.description}>
            Sign up for our newsletter to get the latest spay/neuter updates and ways you can help
            our furry friends!
          </p>
        )}
        <div className={styles.formContainer}>
          <div className={styles.inputGroup}>
            <label htmlFor="firstName" className={styles.inputLabel}>
              First Name*
            </label>
            <input
              type="text"
              id="firstName"
              placeholder="First Name"
              className={`${styles.inputField} ${styles.nameField}`}
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="lastName" className={styles.inputLabel}>
              Last Name*
            </label>
            <input
              type="text"
              id="lastName"
              placeholder="Last Name"
              className={`${styles.inputField} ${styles.nameField}`}
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="email" className={styles.inputLabel}>
              Email*
            </label>
            <input
              type="email"
              id="email"
              placeholder="Email address"
              className={`${styles.inputField} ${styles.emailField}`}
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <button className={styles.signupButton}>Sign Up</button>
        </div>
      </div>

      {!isMobile && (
        <div className={styles.contactSection}>
          <h2 className={styles.contactHeading}>Got questions? Interested in getting involved?</h2>

          <div className={styles.bottomContent}>
            <div className={styles.contactUsColumn}>
              <h3 className={styles.columnHeading}>Contact Us!</h3>
              <div className={styles.contactTable}>
                <div className={styles.contactRow}>
                  <span className={styles.contactLabel}>Email:</span>
                  <span className={styles.contactLabel}>Phone:</span>
                </div>
                <div className={styles.contactRow}>
                  <span className={styles.contactValue}>sample@gmail.com</span>
                  <span className={styles.contactValue}>123-456-7890</span>
                </div>
              </div>
            </div>

            <div className={styles.stayConnectedColumn}>
              <h3 className={styles.columnHeading}>Stay Connected!</h3>
              <div className={styles.socialContent}>
                <div className={styles.socialRow}>
                  <div className={styles.socialIconWrapper}>
                    <Image
                      src="/subcribers_singup/instagram_icon.svg"
                      alt="Instagram"
                      width={69}
                      height={69}
                      className={styles.socialIcon}
                    />
                  </div>
                  <div className={styles.socialTextColumn}>
                    <span className={styles.socialLabel}>Instagram:</span>
                    <span className={styles.socialHandle}>@spayla</span>
                  </div>
                </div>

                <div className={styles.socialRow}>
                  <div className={styles.socialIconWrapper}>
                    <Image
                      src="/subcribers_singup/facebook_icon.svg"
                      alt="Facebook"
                      width={69}
                      height={69}
                      className={styles.socialIcon}
                    />
                  </div>
                  <div className={styles.socialTextColumn}>
                    <span className={styles.socialLabel}>Facebook:</span>
                    <span className={styles.socialHandle}>@spayla</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.footer}>
            <div className={styles.footerContent}>
              <Image src="/subcribers_singup/tse_icon.svg" alt="TSE Icon" width={19} height={26} />
              <span>Built for free by Triton Software Engineering</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
