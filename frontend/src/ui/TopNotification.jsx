import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

function TopNotification() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(".animated-span", {
      x: "-100%",
      repeat: -1,
      duration: 2,
      ease: "none",
    });
  });
  return (
    <div
      ref={containerRef}
      className="px-6 text-[10px] leading-8 tracking-wider md:text-xs text-white bg-black font-text "
    >
      <div className="overflow-x-hidden whitespace-nowrap fade-edges">
        <span className="animated-span inline-block">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
        <span className="animated-span inline-block">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
        <span className="animated-span inline-block">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
        <span className="animated-span inline-block">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
        <span className="animated-span inline-block">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
        <span className="animated-span inline-block">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
        <span className="animated-span inline-block">
          Free Shipping On Orders Over $75. Easy Returns.
        </span>
      </div>
    </div>
  );
}

export default TopNotification;
