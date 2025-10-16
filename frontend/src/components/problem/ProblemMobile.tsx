"use client";
import Image from "next/image";

import styles from "./ProblemMobile.module.css";

export default function ProblemMobile() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.overpopulationSection}>
        <p className={styles.label}>The Problem</p>
        <h2 className={styles.problemTitle}>Animal Overpopulation</h2>

        <p className={styles.problemText}>
          There are only <strong>7 low-cost spay/neuter clinics</strong> for millions of street
          cats, stray dogs and families who can no longer afford the high price of services.
        </p>

        <p className={styles.problemText}>
          <strong>This is not enough</strong> to support the rapidly growing population of animals
          in Los Angeles.
        </p>

        <Image
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
          src="/overpopulation.svg"
          alt="overpopulation"
          width={240}
          height={240}
          className={styles.catGrid}
        />
      </div>

      {/* Section 1 */}
      <div className={styles.section}>
        <div className={styles.labelWithIcon}>
          <Image
            src="/dollar-circle.svg" // put the correct icon path
            alt="Cost Icon"
            width={20}
            height={20}
            className={styles.icon}
          />
          <h3 className={styles.label}>Unaffordable Surgeries</h3>
        </div>
        <h2 className={styles.headline}>Spay/neuter surgeries are too expensive to afford</h2>
        <p className={styles.paragraph}>
          Today, commercial vet clinics cost between <strong>$280 and $1800 per surgery</strong>,
          often being too expensive to afford.
        </p>
        <p className={styles.paragraph}>
          These high prices deter individuals from getting their pets spayed or neutered, worsening
          overpopulation.
        </p>
        <Image src="/bigdog.png" alt="BigDog" width={200} height={200} className={styles.image} />
        <Image
          src="/catDog.png"
          alt="Cat and Dog Row"
          width={280}
          height={120}
          className={styles.image}
        />
      </div>

      {/* Section 2 */}
      <div className={styles.section}>
        <div className={styles.labelWithIcon}>
          <Image
            src="/label_hospital.svg" // put the correct icon path
            alt="Cost Icon"
            width={20}
            height={20}
            className={styles.icon}
          />

          <h3 className={styles.label}>Unavailable Appointments</h3>
        </div>
        <h2 className={styles.headline}>The spay/neuter appointment system is overwhelmed</h2>
        <p className={styles.paragraph}>
          The current spay/neuter system offers only a{" "}
          <strong>fraction of the necessary services</strong> for meaningful impact on animal
          overpopulation in Los Angeles.
        </p>
        <p className={styles.paragraph}>
          Spay/neuter appointments in Los Angeles are stretched thin between nonprofit
          organizations, shelters without on-site clinics, and pet owners in need, leaving even the
          most well-intentioned pet owners <strong>left with few options</strong>.
        </p>
        <Image
          src="/circleCat.png"
          alt="Cat with graphics"
          width={200}
          height={200}
          className={styles.image}
        />
        <Image
          src="/happyDog.png"
          alt="Happy Dog"
          width={260}
          height={180}
          className={styles.image}
        />
      </div>

      {/* Section 3 */}
      <div className={styles.section}>
        <div className={styles.labelWithIcon}>
          <Image
            src="/label_car.svg" // put the correct icon path
            alt="Cost Icon"
            width={20}
            height={20}
            className={styles.icon}
          />
          <h3 className={styles.label}>Inaccessible Clinics</h3>
        </div>
        <h2 className={styles.headline}>Spay/neuter clinics are too far and difficult to reach</h2>
        <p className={styles.paragraph}>
          The <strong>shortage of nearby low-cost clinics and pet-friendly transport</strong>{" "}
          options make accessing spay/neuter services difficult, with long, stressful commutes
          during traffic hours being a major barrier for pet owners and their pets.
        </p>
        <p className={styles.paragraph}>
          No pet owner wants to transport their frightened pet and hand them off to veterinary staff
          for surgery.
        </p>
        <Image src="/cars.png" alt="Cars" width={250} height={250} className={styles.image} />
        <Image
          src="/subway.png"
          alt="Dog and Vet"
          width={260}
          height={120}
          className={styles.image}
        />
      </div>

      {/* Final CTA */}
      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Animals Need Our Help!</h2>
        <p className={styles.ctaText}>
          The severe shortage of low-cost spay/neuter clinics, combined with these 3 challenges
          highlight an urgent need for affordable, available, and accessible solutions to control
          animal overpopulation.
        </p>
      </div>
    </div>
  );
}
