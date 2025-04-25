"use client";
import Image from "next/image";

import newcard3 from "./carousel_3.png"; // Update path as needed

export default function Card3() {
  return (
    <div style={{ position: "relative", width: "100%", height: "600px" }}>
      <Image src={newcard3} alt="card3" fill style={{ objectFit: "cover" }} priority />

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
          Have Questions?
          <br />
          We&apos;re Here to Help
        </b>
        <div style={{ fontSize: "22px" }}>
          Email us at <b>FIX@Spay.LA</b> or call <b> (818) 718-4800</b> for assistance <br />
          with low-cost spay/neuter services, questions, and inquiries.
        </div>
        <a
          href = "#support"
          style={{
            borderRadius: "4px",
            backgroundColor: "#ff8359",
            height: "48.5px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "20.22px",
            cursor: "pointer",
            width: "200px",
            padding: "0 1rem",
          }}
        >
          <div style={{ color: "#fff", fontWeight: 600 }}>Contact Us</div>
        </a>
      </div>
    </div>
  );
}
