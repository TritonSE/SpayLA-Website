import styles from "./CallPoliticians.module.css";

export default function CallPoliticians() {
  return (
    <div className={styles.callPoliticiansContainer}>
      <h1 className={styles.title}>Call your local politicians!</h1>
      <p className={styles.subtitle}>
        By calling local politicians, we can help get many important issues in the forefront of
        politician's agendas and budgets.
      </p>
      <div className={styles.politicianRow}>
        {[...Array(4)].map((_, index) => (
          <div key={index} className={styles.politicianCard}>
            <div className={styles.circle}></div>
            <div className={styles.politicianInfo}>
              <div className={styles.politicianName}>John Smith</div>
              <div className={styles.politicianDetails}>
                District 46 Representative
                <br />
                123-456-7890
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
