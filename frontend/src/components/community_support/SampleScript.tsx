import Image from "next/image";

import styles from "./SampleScript.module.css";

export default function SampleScript(): JSX.Element {
  return (
    <div className={styles.sampleScriptContainer}>
      <div className={styles.sampleScriptHeader}>
        <h2>
          Utilize these sample scripts when calling your local politician, or messaging them on
          social media, like Instagram!
        </h2>
      </div>

      <div className={styles.cardsContainer}>
        {/* Instagram Section */}
        <div className={styles.scriptSection}>
          {/* Instagram Script Card */}
          <div className={styles.scriptCard}>
            <div className={styles.scriptContent}>
              <div>
                <h3 className={styles.scriptTitle}>
                  Instagram Script
                  <Image
                    src="/community_support/instagram.png"
                    width={70}
                    height={70}
                    alt="Instagram Icon"
                    className={styles.socialIcon}
                  />
                </h3>
                <p className={styles.scriptIntro}>
                  Utilize this script when commenting under a politician&apos;s post or direct
                  message!
                </p>
              </div>
              <p className={styles.scriptText}>
                &quot;Hi [Politician&apos;s Handle], LA County needs more funding for low-cost spay
                and neuter programs! Increased access to these services means fewer homeless pets,
                lower shelter intake, and a healthier community. Please support funding for these
                vital programs!&quot;
              </p>
            </div>
          </div>

          {/* Phone Image with Orange Background */}
          <div className={styles.phoneImageContainer}>
            <div className={styles.orangeBackground}>
              <Image
                src="/community_support/orange_background.png"
                fill
                alt="Orange background"
                className={styles.orangeBackgroundImage}
              />
            </div>
            <div className={styles.phoneOverlay}>
              <Image
                src="/community_support/iphone_screen.png"
                width={400}
                height={400}
                alt="iPhone with Instagram"
                className={styles.phoneImage}
              />
            </div>
          </div>
        </div>

        {/* Facebook Section */}
        <div className={styles.scriptSection}>
          {/* Left Images Container */}
          <div className={styles.leftImagesContainer}>
            <div className={styles.blueCircleContainer}>
              <Image
                src="/community_support/blue_circle.png"
                width={194}
                height={194}
                alt="Blue Circle"
                className={styles.blueCircleImage}
              />
            </div>
            <div className={styles.phoneMacContainer}>
              <Image
                src="/community_support/phone_mac.png"
                width={220}
                height={220}
                alt="Phone and Mac"
                className={styles.phoneMacImage}
              />
            </div>
            <div className={styles.orangeGridContainer}>
              <Image
                src="/community_support/orange_grid.jpg"
                width={131}
                height={178}
                alt="Orange Grid"
                className={styles.orangeGridImage}
              />
            </div>
          </div>

          {/* Facebook Script Card */}
          <div className={styles.scriptCard}>
            <div className={styles.scriptContent}>
              <div>
                <h3 className={styles.scriptTitle}>
                  Facebook Script
                  <Image
                    src="/community_support/facebook.png"
                    width={70}
                    height={70}
                    alt="Facebook Icon"
                    className={styles.socialIcon}
                  />
                </h3>
                <p className={styles.scriptIntro}>
                  Utilize this script when commenting under a politician&apos;s post or direct
                  message!
                </p>
              </div>
              <p className={styles.scriptText}>
                &quot;Dear [Politician&apos;s Name], I&apos;m reaching out as a concerned community
                member to ask for your support in increasing funding for low-cost spay and neuter
                programs in LA County. These services help reduce pet homelessness, lower shelter
                euthanasia rates, and improve public health. Please take action to fund these
                critical programs and help protect our animals. Thank you!&quot;
              </p>
            </div>
          </div>
        </div>

        {/* Phone Script Section */}
        <div className={styles.scriptSection}>
          {/* Phone Script Card */}
          <div className={styles.scriptCard}>
            <div className={styles.scriptContent}>
              <div>
                <h3 className={styles.scriptTitle}>
                  Phone Script
                  <Image
                    src="/community_support/phone.png"
                    width={70}
                    height={70}
                    alt="Phone Icon"
                    className={styles.socialIcon}
                  />
                </h3>
                <p className={styles.scriptIntro}>
                  Utilize this script when calling your politician&apos;s office!
                </p>
              </div>
              <p className={styles.scriptText}>
                &quot;Hi, my name is [Your Name], and I&apos;m a resident of [Your City]. I&apos;m
                calling to express my support for increased funding for low-cost spay and neuter
                programs in LA County. These programs help reduce pet overpopulation, decrease
                shelter euthanasia rates, and support our community&apos;s public health. I urge you
                to prioritize funding for these essential services. Thank you for your time!&quot;
              </p>
            </div>
          </div>

          {/* Cat Image with Blue Background */}
          <div className={styles.catImageContainer}>
            <div className={styles.blueBackground}>
              <Image
                src="/community_support/blue_background.png"
                width={348}
                height={232}
                alt="Blue background"
                className={styles.blueBackgroundImage}
              />
            </div>
            <div className={styles.catOverlay}>
              <Image
                src="/community_support/kitten.svg"
                width={348}
                height={232}
                alt="Kitten"
                className={styles.catImage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
