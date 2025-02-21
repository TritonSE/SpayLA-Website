"use client";
import Image from "next/image";
import newcard1 from "./newcard1.png"; // Update path as needed

export default function Card1() {
  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      {/* Full background image */}
      <Image src={newcard1} alt="card1" fill style={{ objectFit: "cover" }} priority />

      {/* The left gradient (width=950px, height=600px) exactly as in your original code */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "950px",
          height: "600px",
          background: `
            linear-gradient(
              90deg,
              #2d5177 36.5%,
              rgba(58, 104, 153, 0.67) 76.5%,
              rgba(84, 150, 221, 0)
            )
          `,
        }}
      />

      {/* The text overlay, matching your second screenshot’s wording */}
      <div
        style={{
          position: "absolute",
          top: "126px",
          left: "89px",
          width: "715px",
          display: "flex",
          flexDirection: "column",
          gap: "38px",
          color: "#fff",
          fontFamily: "Montserrat, sans-serif",
        }}
      >
        <b style={{ fontSize: "45px", lineHeight: "150%", letterSpacing: "0.02em" }}>
          Too Many Animals,
          <br />
          Not Enough Homes
        </b>
        <div style={{ fontSize: "22px" }}>
          Let’s advocate for <b>available</b>, <b>accessible</b>, and <b>affordable</b> spay and
          neuter clinics to reduce overpopulation in Los Angeles.
        </div>
        <div
          style={{
            borderRadius: "4px",
            backgroundColor: "#ff8359",
            height: "48.5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20.22px",
            cursor: "pointer",
            width: "auto",
            padding: "0 1rem",
          }}
        >
          <div 
          style={{ color: "#fff", fontWeight: 600 }}>
            Learn why we spay and neuter
            </div>
        </div>
      </div>
    </div>
  );
}
