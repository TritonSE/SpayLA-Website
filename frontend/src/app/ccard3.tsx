import Image from "next/image";
import newcard3 from "./newcard3.png";
/*third carousel card*/

function Ccard3() {
  return (
    <div className="heroShot3">
      <Image src={newcard3} alt="New card 3" />
      <div className="hero3Child"></div>
      <div className="haveQuestionsParent">
        <b className="haveQuestionsContainer">
          <p className="haveQuestionsText">Have Questions?</p>
          <p className="haveQuestionsText">We're Here to Help</p>
        </b>
        <div className="letsWorkTogether">
          Lets work together! Reach out to explore partnership opportunities or more ways to support
          our mission.
        </div>
        <div className="contactUsButton">
          <div className="opacity">
            <div className="contactUsText">Contact Us</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Ccard3;
