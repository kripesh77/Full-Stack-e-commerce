import { Link } from "react-router-dom";
import Buttonbig from "./Buttonbig";
import AnimatedLink from "./AnimatedLink";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function LandingMain() {
  const hoverRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      gsap.fromTo(
        ".hero__div-img",
        { yPercent: 0 },
        {
          yPercent: 100,
          scrollTrigger: {
            trigger: "html",
            start: "top top",
            scrub: true,
          },
        },
      );

      gsap.fromTo(
        ".hero__container",
        { yPercent: 0 },
        {
          yPercent: -50,
          scrollTrigger: {
            trigger: "html",
            start: "top top",
            scrub: true,
          },
        },
      );
    });

    // optional cleanup
    return () => mm.revert();
  }, []);

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
