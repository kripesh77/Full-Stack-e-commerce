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
              duration: 0.8,
              delay: (5 - i) * 0.05,
              ease: [0.68, -0.6, 0.32, 1.6],
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
              duration: 0.8,
              delay: (5 - i) * 0.05 + 0.2,
              ease: [0.68, -0.6, 0.32, 1.6],
            }}
          ></motion.div>
        ))}
      </div>
    </>
  );
};

export default transition;
