import Image from "next/image";
import newcard from "./newcard2.png";
/*rename some of the old compnents like rectangle and the buttons*/

function Ccard2() {
  return (
    <div className="heroShot2">
      <div className="hero4">
        <Image src={newcard} alt="New card 1" />
        <div className="rectangleContainer"></div>
        <div className="togetherWeParent">
          <b className="togetherWeContainer">
            <p className="togetherWeText">Together, We Can</p>
            <p className="togetherWeText">Make a Difference</p>
          </b>
          <div className="advocateContainer">
            You can make a difference! Whether it's calling city officials, signing petitions, or
            spreading awareness, every action helps.
          </div>
          <div className="waysToSupportButton">
            <div className="waysToSupportText">Ways to support</div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Ccard2;
