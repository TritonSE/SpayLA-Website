import styles from "@/components/solution/accesibleClinics.module.css";

const AccesibleClinic: React.FC = () => {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <div className={styles.imageSection}>
          <img className={styles.image} alt="Accessible Clinics" src="/accesible_clinics.png" />
        </div>
        <div className={styles.textSection}>
          <h2 className={styles.heading}>Accessible Clinics</h2>
          <p className={styles.description}>
            By strategically placing 10 clinics across the city of LA, pet owners no longer have to
            experience long drives during rush hour traffic with a frightened pet.
          </p>
          <p className={styles.description}>
            {" "}
            Additionally, clinics will offer <strong>free transport vans</strong> for clients
            without private transportation.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccesibleClinic;
