import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

function ImageDivs({ url, title, index }) {
  const spanRef = useRef(null);
  const spanRef1 = useRef(null);

  useGSAP(function () {
    gsap.fromTo(
      ".image-card__background",
      { yPercent: 0 },
      {
        yPercent: 10,
        scrollTrigger: {
          trigger: "html",
          start: "top top",
          scrub: 1.2,
        },
      },
    );
  });

  return (
    <div className="image-card" style={{ "--bg-image": `url(${url})` }}>
      <div
        className="image-card__background"
        style={{ backgroundImage: `url(${url})`, scale: 1.1 }}
        data-speed="0.9"
      ></div>
      <div className="image-card__content">
        <span ref={spanRef} className="image-card__title">
          {title}
        </span>
        <div
          ref={spanRef1}
          className="image-card__links"
          style={index === 3 ? { flexDirection: "column-reverse" } : {}}
        >
          {index !== 3 ? (
            <span className="image-card__link">SHOP MEN</span>
          ) : (
            <span>&nbsp;</span>
          )}
          {index !== 2 ? (
            <span className="image-card__link">SHOP WOMEN</span>
          ) : (
            <span className="image-cart__link">&nbsp;</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default ImageDivs;
