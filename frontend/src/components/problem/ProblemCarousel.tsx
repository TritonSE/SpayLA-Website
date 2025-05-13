"use client";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { useEffect, useState } from "react";

import styles from "./ProblemCarousel.module.css";

const TABS = ["Unaffordable Surgeries", "Unavailable Appointments", "Inaccessible Clinics"];

export default function ProblemCarousel() {
  const [emblaRef, emblaApi]: UseEmblaCarouselType = useEmblaCarousel({
    loop: false,
    containScroll: "trimSnaps", // keeps first and last slide tight
    slidesToScroll: 1,
    align: "center",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
    };
    emblaApi.on("select", onSelect);
    onSelect();
  }, [emblaApi]);

  const scrollTo = (index: number) => {
    emblaApi?.scrollTo(index);
  };

  return (
    <div className={styles.outerWrapper}>
      <div className={styles.tabsWrapper}>
        <div className={styles.tabs}>
          {TABS.map((label, i) => (
            <button
              key={i}
              onClick={() => {
                scrollTo(i);
              }}
              className={`${styles.tab} ${selectedIndex === i ? styles.active : ""}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.carousel} ref={emblaRef}>
        <div className={styles.carouselContainer}>
          <div className={styles.slide}>
            <div className={styles.slideCard}>
              <h2 className={styles.title}>Spay/neuter surgeries are too expensive to afford</h2>

              {/* Bottom Row: Split in Half */}
              <div className={styles.bottomContent}>
                {/* Left half */}
                <div className={styles.leftColumn}>
                  <p>
                    Today, commercial vet clinics cost between{" "}
                    <strong>$280 and $1800 per spay or neuter surgery</strong>, often being far too
                    expensive to afford.
                  </p>
                  <p>
                    These high prices can often{" "}
                    <strong>deter individuals from getting their pets spayed or neutered</strong>,
                    contributing to the overpopulation problem.
                  </p>
                  <div>
                    <img src="/catdog.png" alt="CatDog" />
                  </div>
                </div>

                {/* Right half */}
                <div className={styles.rightImage}>
                  <img src="/bigdog.png" alt="Big Dog" className={styles.dogImage} />
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className={styles.slide}>
            <div className={styles.slidePlaceholder}>Slide 2: Unavailable Appointments</div>
          </div>

          {/* Slide 3 */}
          <div className={styles.slide}>
            <div className={styles.slidePlaceholder}>Slide 3: Inaccessible Clinics</div>
          </div>
        </div>
      </div>
    </div>
  );
}
