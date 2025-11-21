import { Link } from "react-router-dom";
import Buttonbig from "./Buttonbig";
import AnimatedLink from "./AnimatedLink";
import {  useRef, useState, memo } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
//eslint-disable-next-line
import { motion } from "framer-motion";
import { useMobile } from "../hooks/useMediaQuery";

function LandingMain() {
  const hoverRef = useRef(null);
  const isMobile = useMobile();

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
            {isMobile ? (
              <h1 className="hero__title" >Gear Up With Confidence</h1>
            ) : (
              <MaskText />
            )}
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

const MaskText = memo(function MaskText() {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const wrapperRef = useRef(null);

  const handleMouseMove = (e) => {
    if (wrapperRef.current) {
      const rect = wrapperRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left + 200, // Adding padding offset
        y: e.clientY - rect.top + 200, // Adding padding offset
      });
    }
  };
  const size = isHovered ? 200 : 0;
  return (
    <div
      ref={wrapperRef}
      className="hero__title-wrapper"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="mask"
        animate={{
          WebkitMaskPosition: `${mousePosition.x - size / 2}px ${mousePosition.y - size / 2}px`,
          WebkitMaskSize: `${size}px`,
        }}
        transition={{ type: "tween", ease: "easeOut", duration: 0.2 }}
      >
        <h1 className="mask__title">What? Waiting for a crash?</h1>
      </motion.div>
      <h1 className="hero__title hero__title--base noselect">Gear Up With Confidence</h1>
    </div>
  );
});

export default LandingMain;
