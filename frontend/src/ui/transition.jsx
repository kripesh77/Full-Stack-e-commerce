//eslint-disable-next-line
import { motion, useIsPresent } from "framer-motion";
import { useMobile } from "../hooks/useMediaQuery";
import { useEffect } from "react";

//eslint-disable-next-line
const transition = (OgComponent) => {
  return () => {
    useEffect(function(){
      document.querySelector("html").classList.add("is-loaded");
    }, []);
    const isMobile = useMobile();
    const divCount = isMobile ? 2 : 5;

    // Handler to remove .is-loaded when slide-in starts (page exit)
    const handleSlideInEnd = () => {
      document.querySelector("html").classList.remove("is-loaded");
    };

    // Handler to add .is-loaded when slide-out starts (page enter)
    // const handleSlideOutStart = () => {
    //   document.querySelector("html").classList.add("is-loaded");
    // };

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
                duration: 0.3,
                delay: (divCount - i) * 0.05,
                ease: [0.215, 0.61, 0.355, 1],
              }}
              onAnimationStart={(definition) => {
                // Only trigger on exit animation (when scaleY becomes 1)
                if (definition.scaleY === 1 && i === 0) {
                  handleSlideInEnd();
                }
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
                duration: 0.3,
                delay: (divCount - i) * 0.05 + 0.3,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            ></motion.div>
          ))}
        </div>
      </>
    );
  };
};

export default transition;
