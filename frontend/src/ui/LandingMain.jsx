import { Link } from "react-router";
import Buttonbig from "./Buttonbig";

function LandingMain() {
  return (
    <section className="hero">
      <div className="hero__div">
        <div className="hero__container">
          <span className="hero__title">Your Safety, Our Mission</span>
          <Link to="products">
            <Buttonbig>SHOP NOW</Buttonbig>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default LandingMain;
