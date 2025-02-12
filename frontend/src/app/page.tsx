import Carousel from "@/components/Carousel";

export default function Home() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Carousel width={800}>
        <div
          style={{
            background: "#e0e0e0",
            padding: "2rem",
            textAlign: "center",
            height: "200px",
          }}
        >
          Slide 1
        </div>
        <div
          style={{
            background: "#c0c0c0",
            padding: "2rem",
            textAlign: "center",
            height: "200px",
          }}
        >
          Slide 2
        </div>
        <div
          style={{
            background: "#a0a0a0",
            padding: "2rem",
            textAlign: "center",
            height: "200px",
          }}
        >
          Slide 3
        </div>
      </Carousel>
    </main>
  );
}
