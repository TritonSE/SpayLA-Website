import AccesibleClinic from "@/components/solution/AccesibleClinics";
import AffordableSurgeries from "@/components/solution/AffordableSurgeries";
import Appointments from "@/components/solution/Appointments";
import Investment from "@/components/solution/Investment";
import Statement from "@/components/solution/Statement";

export default function Solution() {
  return (
    <div className="">
      <Statement />
      <Investment />
      <Appointments />
      <AccesibleClinic />
      <AffordableSurgeries />
    </div>
  );
}
