import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

function TopNotification() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.to(".animated-span", {
      x: "-100%",
      repeat: -1,
      duration: 10,
      ease: "none",
    });
  });
  return (
    <div
      ref={containerRef}
      className="font-geo-bold bg-black px-6 text-[10px] leading-8 tracking-wider text-white md:text-xs"
    >
      <div className="fade-edges overflow-x-hidden whitespace-nowrap">
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
