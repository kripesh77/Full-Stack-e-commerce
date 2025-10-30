//eslint-disable-next-line
import { motion } from "framer-motion";

//eslint-disable-next-line
const transition = (OgComponent) => {
  return () => (
    <>
      <OgComponent />

      {/* Slide-in animation with 5 staggered divs */}
      <div className="slide-in">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`slide-in-${i}`}
            className="slide-in-child"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{
              duration: 0.5,
              delay: (5 - i) * 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          />
        ))}
      </div>

      {/* Slide-out animation with 5 staggered divs */}
      <div className="slide-out">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`slide-out-${i}`}
            className="slide-out-child"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 0 }}
            transition={{
              duration: 0.5,
              delay: (5 - i) * 0.04 + 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          ></motion.div>
        ))}
      </div>
    </>
  );
};

export default transition;
