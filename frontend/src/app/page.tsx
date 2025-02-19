"use client";
import Carousel from "@/components/Carousel";
import Card1 from "@/components/Card1";
import Card2 from "@/components/Card2";
import Card3 from "@/components/Card3";

export default function Home() {
  return (
    <main style={{ width: "100%", minHeight: "100vh" }}>
      <Carousel>
        <Card1 />
        <Card2 />
        <Card3 />
      </Carousel>
    </main>
  );
}
