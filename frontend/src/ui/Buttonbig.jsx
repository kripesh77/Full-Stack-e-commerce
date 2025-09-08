import Button from "./Button";
import { useRef } from "react";

function Buttonbig({ children, className = "" }) {
  const svgRef = useRef(null);
  return (
    <div className="button button--big">
      <Button className={className}>{children}</Button>
      <div className="button__icon">
        <svg ref={svgRef} viewBox="0 0 52 43" fill="none">
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
