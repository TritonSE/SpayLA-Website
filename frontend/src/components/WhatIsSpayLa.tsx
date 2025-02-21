"use client";

import React from "react";
import Image from "next/image";

// Update these imports to your actual file names
import catSilhouette from "./roundIcon.png";
import pawSilhouette from "./pawIcon.png";

export default function WhatIsSpayLA() {
  return (
    <section
      style={{
        width: "100%",
        backgroundColor: "#DFEBF3",
        position: "relative",
        padding: "6rem 2rem",
        overflow: "hidden",
      }}
    >
      {/* Heading */}
      <h2
        style={{
          fontSize: "2.5rem",
          marginBottom: "1.5rem",
          color: "#2d5177",
          textAlign: "center",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        What is Spay.LA?
      </h2>

      {/* Paragraph */}
      <p
        style={{
          fontSize: "1.5rem",
          maxWidth: "800px",
          margin: "0 auto",
          lineHeight: "1.6",
          color: "#333",
          textAlign: "center",
          fontFamily: "Open Sans, sans-serif",
        }}
      >
        Spay.LA aims to combat animal overpopulation by creating <b>available</b>, <br />{" "}
        <b>accessible</b>, and <b>affordable</b> spay and neuter clinics for the millions of pets{" "}
        <br /> and community cats in Los Angeles.
      </p>

      {/* Cat silhouette, bottom-right but slightly offset from the paw */}
      <div
        style={{
          position: "absolute",
          bottom: -40,
          right: 500, // Shift it left so it doesn't overlap the paw
          width: "120px",
          height: "80px",
        }}
      >
        <Image src={catSilhouette} alt="Cat Silhouette" fill style={{ objectFit: "contain" }} />
      </div>

      {/* Paw silhouette, anchored to the bottom-right corner */}
      <div
        style={{
          position: "absolute",
          bottom: -50,
          right: 300,
          width: "120px",
          height: "300px",
        }}
      >
        <Image src={pawSilhouette} alt="Paw Silhouette" fill style={{ objectFit: "contain" }} />
      </div>
    </section>
  );
}
