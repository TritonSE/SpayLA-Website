"use client";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { useEffect, useRef, useState } from "react";

import styles from "./ProblemCarousel.module.css";

const TABS = ["Unaffordable Surgeries", "Unavailable Appointments", "Inaccessible Clinics"];

export default function ProblemCarousel() {
  const [emblaRef, emblaApi]: UseEmblaCarouselType = useEmblaCarousel({
    loop: false,
    containScroll: "trimSnaps", // keeps first and last slide tight
    slidesToScroll: 1,
    align: "start",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          console.log("✅ ProblemCarousel is in view!");
          const scrollY = window.scrollY;

          // Freeze scroll
          document.body.style.position = "fixed";
          document.body.style.top = `-${scrollY}px`;
          document.body.style.left = "0";
          document.body.style.right = "0";
          document.body.style.overflow = "hidden";
          document.body.style.width = "100%";

          // Unfreeze after 3 seconds
          setTimeout(() => {
            document.body.style.position = "";
            document.body.style.top = "";
            document.body.style.left = "";
            document.body.style.right = "";
            document.body.style.overflow = "";
            document.body.style.width = "";

            window.scrollTo(0, scrollY); // Restore previous scroll position
            sessionStorage.setItem("problemCarouselFrozen", "true");
            console.log("🆓 Scroll unfrozen and restored");
          }, 3000);

          observer.disconnect(); // Trigger only once
        } else {
          console.log("⛔ ProblemCarousel is out of view.");
        }
      },
      {
        threshold: 1, // 50% of component must be visible
      },
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, []);
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
        <div className={styles.carouselContainer} ref={containerRef}>
          <div className={styles.slide}>
            <div className={styles.slideCard}>
              <h2 className={styles.title}>Spay/neuter surgeries are too expensive to afford</h2>

              {/* Bottom Row: Split in Half */}
              <div className={styles.bottomContent}>
                {/* Left half */}
                <div className={styles.leftColumn}>
                  <p className={styles.slideParagraph}>
                    Today, commercial vet clinics cost between{" "}
                    <strong>$280 and $1800 per spay or neuter surgery</strong>, often being far too
                    expensive to afford.
                  </p>
                  <p className={styles.slideParagraph}>
                    These high prices can often{" "}
                    <strong>deter individuals from getting their pets spayed or neutered</strong>,
                    contributing to the overpopulation problem.
                  </p>
                  <div>
                    <img src="/catdog.png" alt="CatDog" />
                  </div>
                </div>

                {/* Right half */}
                <div className={styles.rightColumn}>
                  <img src="/bigdog.png" alt="Big Dog" />
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className={styles.slide}>
            <div className={styles.slideCard}>
              <h2 className={styles.title}>The spay/neuter appointment system is overwhelmed</h2>
              <div className={styles.bottomContent}>
                {/* Left half: text + cat image */}
                <div className={styles.leftColumn}>
                  <p className={styles.slideParagraph}>
                    The current spay/neuter system offers only a{" "}
                    <strong>fraction of the necessary services</strong> for meaningful impact on
                    animal overpopulation in Los Angeles.
                  </p>
                  <img src="/circleCat.png" alt="Circle Cat" className={styles.catImage} />
                </div>

                {/* Right half: photo of vet + dog */}
                <div className={styles.leftColumn}>
                  <img src="/happyDog.png" alt="Happy Dog" className={styles.vetDogImage} />
                  <p className={styles.slideParagraph}>
                    Spay/neuter appointments in Los Angeles are <strong>stretched thin</strong>{" "}
                    between nonprofit organizations, shelters without on-site clinics, and pet
                    owners in need, leaving even the most well-intentioned pet owners{" "}
                    <strong>left with few options.</strong>
                  </p>
                </div>
              </div>

              {/* Bottom paragraph, full width */}
            </div>
          </div>

          {/* Slide 3 */}
          <div className={styles.slide}>
            <div className={styles.slideCard}>
              <h2 className={styles.title}>
                Spay/neuter clinics are too far and difficult to reach
              </h2>
              <div className={styles.bottomContent}>
                {/* Left half: text + cat image */}
                <div className={styles.leftColumn}>
                  <p className={styles.slideParagraph}>
                    <strong>
                      The shortage of nearby low-cost clinics and pet-friendly transport options
                    </strong>{" "}
                    make accessing spay/neuter services difficult, with long, stressful commutes
                    during traffic hours being a major barrier for pet owners and their pets.
                  </p>
                  <img src="/subway.png" alt="Subway" />
                </div>

                {/* Right half: photo of vet + dog */}
                <div className={styles.leftColumn}>
                  <img src="cars.png" alt="Cars" className={styles.vetDogImage} />
                  <p className={styles.slideParagraph} style={{ width: "70%", marginTop: "20px" }}>
                    No pet owner wants to transport their frightened pet and hand them off to
                    veterinary staff for surgery.
                  </p>
                </div>
              </div>

              {/* Bottom paragraph, full width */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
