import Solution from "../components/solution/Solution";

import WhyNeuter from "@/components/solution/WhyNeuter";
export default function Home() {
  return (
    <main>
      <div>
        <p>Navigation Bar&nbsp;</p>
      </div>
      <div>
        <p>Home Page and Landing&nbsp;</p>
      </div>
      <div>
        <p>Problem Statement&nbsp;</p>
      </div>
      <div>
        <Solution />
        <WhyNeuter />
      </div>
      <div>
        <p>Community Support&nbsp;</p>
      </div>
      <div>
        <p>Marketing Plan&nbsp;</p>
      </div>
    </main>
  );
}
