//eslint-disable-next-line
import { motion, useIsPresent } from "framer-motion";
import { useMobile } from "../hooks/useMediaQuery";
import { useEffect } from "react";
import gsap from "gsap";

//eslint-disable-next-line
const transition = (OgComponent) => {
  return () => {
    const isMobile = useMobile();
    const divCount = isMobile ? 2 : 5;
    const isPresent = useIsPresent(); // Track if component is entering or exiting

    useEffect(() => {
      const spinner = document.querySelector(".c-loader_spinner");
      if (!spinner) return;

      if (!isPresent) {
        // while component is exiting (slide-in phase) - scaling spinner up
        gsap.to(spinner, {
          scaleY: 1,
          duration: 0,
          delay: 0.5,
          ease: "power2.out",
        });
      } else {
        // while component is entering (slide-out phase) - scaling spinner down
        gsap.to(spinner, {
          scaleY: 0,
          duration: 0.5,
          ease: "power2.inOut",
        });
      }
    }, [isPresent]);

    return (
      <>
        <OgComponent />

        {/* Slide-in animation with staggered divs */}
        <div className="slide-in">
          {[...Array(divCount)].map((_, i) => (
            <motion.div
              key={`slide-in-${i}`}
              className="slide-in-child"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 1 }}
              transition={{
                duration: 0.8,
                delay: (divCount - i) * 0.05,
                ease: [0.68, -0.6, 0.32, 1.6],
              }}
            />
          ))}
        </div>

        {/* Slide-out animation with staggered divs */}
        <div className="slide-out">
          {[...Array(divCount)].map((_, i) => (
            <motion.div
              key={`slide-out-${i}`}
              className="slide-out-child"
              initial={{ scaleY: 1 }}
              animate={{ scaleY: 0 }}
              exit={{ scaleY: 0 }}
              transition={{
                duration: 0.8,
                delay: (divCount - i) * 0.05 + 0.2,
                ease: [0.68, -0.6, 0.32, 1.6],
              }}
            ></motion.div>
          ))}
        </div>
      </>
    );
  };
};

export default transition;
