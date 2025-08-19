import gsap from "gsap";
import { useId, useRef } from "react";

function ImageDivs({ url, title }) {
  const spanRef = useRef(null);
  const spanRef1 = useRef(null);
  const uniqueId = useId(); // React 18+ hook for unique IDs
  const className = `img-div-${uniqueId.replace(/:/g, "")}`;

  function handleMouseEnter(e) {
    const tl = gsap.timeline();

    tl.to(spanRef.current, {
      y: "-110%",
      borderWidth: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });
    tl.to(
      e.currentTarget,
      {
        borderRadius: "30%",
        duration: 0.3,
        ease: "expo",
      },
      "<",
    );
    tl.to(
      spanRef1.current,
      {
        color: "white",
        y: "-50%",
        duration: 0.5,
        ease: "power2.inOut",
      },
      "<",
    );
  }

  function handleMouseLeave(e) {
    const tl = gsap.timeline();

    tl.to(spanRef.current, {
      y: 0,
      borderWidth: 1,
      ease: "power2.inOut",
    });
    tl.to(
      e.currentTarget,
      {
        borderRadius: "16px",
        duration: 0.5,
      },
      "<",
    );
    tl.to(
      spanRef1.current,
      {
        color: "transparent",
        y: 0,
        ease: "power2.inOut",
      },
      "<",
    );
  }

  return (
    <>
      <div
        className={`img-div relative aspect-[0.77] overflow-hidden rounded-2xl bg-black ${className}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div className="font-geo-regular relative z-2 flex size-full flex-col items-center justify-center gap-4 rounded-2xl pt-10 text-[13px] text-white uppercase">
          <span ref={spanRef} className="rounded-[20px] border-1 px-2 py-1">
            {title}
          </span>
          <div
            ref={spanRef1}
            className="flex flex-col gap-4 text-center text-transparent"
          >
            <span className="rounded-[20px] border-1 px-2 py-1">SHOP MEN</span>
            <span className="rounded-[20px] border-1 px-2 py-1">
              SHOP WOMEN
            </span>
          </div>
        </div>
      </div>
      <style>
        {`
          .${className}::after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-image: url("${url}");
            background-size: cover;
            background-position: center 70%;
            background-repeat: no-repeat;
            z-index: 1;
            border-radius: 16px;
            pointer-events: none;
            opacity: 0.7;
            display: block;
          }
          .${className} {
            position: relative;
            overflow: hidden;
          }
        `}
      </style>
    </>
  );
}

export default ImageDivs;
