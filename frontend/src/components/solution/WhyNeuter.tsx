import styles from "@/components/solution/WhyNeuter.module.css";

const WhyNeuter: React.FC = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Why Neuter?</h2>
      <div className={styles.cardContainer}>
        {/* Card 1 */}
        <div className={styles.card}>
          <img src="/card_1.png" alt="Euthanasia Rates" className={styles.cardImage} />
          <div className={styles.cardText} style={{ backgroundColor: "#FF8359" }}>
            <h3>Euthanasia rates</h3>
            <p>
              The cruel reality of animal overcrowding at the 6 Los Angeles City Shelters and a 72%
              increase in euthanasia rates don’t need to be “business as usual”. With adequate
              access to low cost spay/neuter services we can lower euthanasia rates and save animal
              lives.
            </p>
          </div>
        </div>

        {/* Card 2 */}
        <div className={styles.card}>
          <img src="/card_2.png" alt="Animal Diseases" className={styles.cardImage} />
          <div className={styles.cardText} style={{ backgroundColor: "#2D5177" }}>
            <h3>Animal Diseases</h3>
            <p>
              Spaying helps prevent uterine infections and breast cancer, which is fatal in about
              50% of dogs and 90% of cats.
            </p>
            <p>
              Neutering males can also prevent testicular cancer when done before six months of age.
            </p>
          </div>
        </div>

        {/* Card 3 */}
        <div className={styles.card}>
          <img src="/card_3.png" alt="Pet Health" className={styles.cardImage} />
          <div className={styles.cardText} style={{ backgroundColor: "#649DE0" }}>
            <h3>Pet Health</h3>
            <p>
              Thousands of stray animals die on Los Angeles streets each month. Starvation, disease
              and injuries affect a community’s quality of life. Unneutered dogs are 3 times more
              likely to bite or initiate a dog fight. 10% of all traffic accidents are caused by
              animals in the road.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyNeuter;
