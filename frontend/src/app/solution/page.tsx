import Appointments from "@/components/solution/Appointments";
import Investment from "@/components/solution/Investment";
import Statement from "@/components/solution/Statement";
import AffordableSurgeries from "@/components/solution/affordableSurgeries";

export default function Solution() {
  return (
    <div>
      <Statement />
      <Investment />
      <Appointments />
      {/* <AffordableSurgeries /> */}
    </div>
  );
}
