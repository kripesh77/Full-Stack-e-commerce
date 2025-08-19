import gsap from "gsap";
import Button from "./Button";
import { useRef } from "react";

function Buttonbig({ children, className = "" }) {
  const svgRef = useRef(null);
  return (
    <div
      className="button relative z-2 grid w-fit cursor-pointer grid-flow-col items-center gap-1 rounded-full bg-white md:mr-6"
      onMouseEnter={() => {
        gsap.to(svgRef.current, {
          rotate: "35deg",
          duration: 0.2,
        });
      }}
      onMouseLeave={() => {
        gsap.to(svgRef.current, {
          rotate: "0",
          duration: 0.2,
        });
      }}
    >
      <Button
        className={`space-[44px] flex justify-end py-2 pl-4 ${className}`}
      >
        {children}
      </Button>
      <div className="overflow-hidden">
        <svg
          ref={svgRef}
          viewBox="0 0 52 43"
          fill="none"
          className="box-content h-5 w-5 scale-90 rounded-full bg-black p-3 text-white"
        >
          <path
            d="M0.775823 37.8686L4.1886 42.7085L43.9453 14.675L40.6173 33.9547L46.4679 34.9684L51.5177 5.71225L22.2644 0.643612L21.2545 6.4948L40.5325 9.83504L0.775823 37.8686Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default Buttonbig;
