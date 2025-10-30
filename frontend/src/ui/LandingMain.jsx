import { Link } from "react-router-dom";
import Buttonbig from "./Buttonbig";
import AnimatedLink from "./AnimatedLink";
import { useRef } from "react";

function LandingMain() {
  const hoverRef = useRef(null);

  return (
    <section className="hero">
      <div className="hero__div">
        <div className="hero__div-img" data-speed="clamp(0.5)">
          <div className="hero__container">
            <h1 className="hero__title">Gear Up With Confidence</h1>
            <Link to="/products" ref={hoverRef}>
              <Buttonbig>
                <Link to="/products">
                  <AnimatedLink text="SHOP NOW" hoverTriggerRef={hoverRef} />
                </Link>
              </Buttonbig>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LandingMain;
