import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

function TopNotification() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(".notification__text", {
      x: "-100%",
      repeat: -1,
      duration: 10,
      ease: "none",
    });
  });
  return (
    <div ref={containerRef} className="notification">
      <div className="notification__container">
        <span className="notification__text">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
        <span className="notification__text">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
        <span className="notification__text">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
        <span className="notification__text">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
        <span className="notification__text">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
        <span className="notification__text">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
        <span className="notification__text">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
      </div>
    </div>
  );
}

export default TopNotification;
