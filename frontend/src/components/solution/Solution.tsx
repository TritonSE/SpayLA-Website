import Appointments from "@/components/solution/Appointments";
import Investment from "@/components/solution/Investment";
import Statement from "@/components/solution/Statement";
import AccesibleClinic from "@/components/solution/accesibleClinics";
import AffordableSurgeries from "@/components/solution/affordableSurgeries";

export default function Solution() {
  return (
    <div>
      <Statement />
      <Investment />
      <Appointments />
      <AccesibleClinic />
      <AffordableSurgeries />
    </div>
  );
}
