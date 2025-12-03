//eslint-disable-next-line
import { motion, useIsPresent } from "framer-motion";
import { useMobile } from "../hooks/useMediaQuery";
import { useEffect } from "react";

//eslint-disable-next-line
const transition = (OgComponent) => {
  return () => {
    const isPresent = useIsPresent();
    
    useEffect(function(){
      document.querySelector("html").classList.add("is-loaded");
    }, []);
    
    useEffect(() => {
      if (!isPresent) {
        document.querySelector("html").classList.remove("is-loaded");
      }
    }, [isPresent]);
    
    const isMobile = useMobile();
    const divCount = isMobile ? 2 : 5;

    return (
      <>
        <OgComponent />

        {/* Slide-in animation with staggered divs */}
        <motion.div
          initial={false}
          exit={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000 }}
        >
          <div className="slide-in" data-exiting={!isPresent ? "true" : "false"}>
            {[...Array(divCount)].map((_, i) => (
              <div
                key={`slide-in-${i}`}
                className="slide-in-child"
                style={{
                  transitionDelay: `${(divCount - i) * 0.05}s`,
                }}
              />
            ))}
          </div>
        </motion.div>

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
