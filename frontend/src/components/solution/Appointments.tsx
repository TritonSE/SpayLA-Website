import React from "react";
import styles from "@/components/solution/appointments.module.css";

const Appointments: React.FC = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.textSection}>
          <h2 className={styles.heading}>Available Appointments</h2>
          <p className={styles.description}>
            By operating 5 days a week with day and night shifts,
            <br /> Spay.LA can perform almost
            <span style={{ fontWeight: "bold" }}> triple the surgeries</span> of <br /> other
            clinics in LA.
            <br />
            <br />
            This means more surgeries and less time waiting for <br /> an available appointment.
          </p>
        </div>
        <div className={styles.graphSection}>
          <p className={styles.graphTitle}>Surgeries Per Year</p>
        </div>
      </div>
    </div>
  );
};

export default Appointments;
