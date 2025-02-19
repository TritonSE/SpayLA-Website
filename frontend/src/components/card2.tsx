"use client";
import Image from "next/image";
import newcard2 from "./newcard2.png"; // Update path as needed

export default function Card2() {
  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      <Image
        src={newcard2}
        alt="card2"
        fill
        style={{ objectFit: "cover" }}
        priority
      />

      {/* Same gradient overlay, if needed */}
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
          Together, We Can
          <br />
          Make a Difference
        </b>
        <div style={{ fontSize: "22px" }}>
          You can make a difference! Whether it&apos;s calling city officials, signing petitions,
          or spreading awareness, every action helps.
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
          <div style={{ color: "#fff", fontWeight: 600 }}>
            Ways to support
          </div>
        </div>
      </div>
    </div>
  );
}
