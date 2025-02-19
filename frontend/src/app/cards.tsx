import Image from "next/image";
import card1 from "./card1.png";

function Card() {
  return (
    <div className="card">
      <Image src={card1} alt="Card 1" />
      <div className="rectangle"></div>
      <div className="overlayParent">
        <b className="overlay">
          <p className="oerlayText">Too Many Animals,</p>
          <p className="overlayText">Not Enough Homes</p>
        </b>
        <div className="letsAdvocateContainer">
          <span>Let's advocate for </span>
          <b>available</b>
          <span>,</span>
          <b>accessible</b>
          <span>, and </span>
          <b>affordable</b>
          <span> spay and neuter clinics to reduce overpopulation</span>
        </div>
        <div className="learnMoreButton">
          <div className="opacity">
            <div className="learnMoreText">Learn why we spay and neuter</div>
          </div>
        </div>
      </div>
      <div className="vector1">
        <div className="frame1" />
        <div className="frameInner" />
      </div>
    </div>
  );
}

export default Card;
