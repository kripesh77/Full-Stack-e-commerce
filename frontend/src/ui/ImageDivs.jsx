import { useRef } from "react";

function ImageDivs({ url, title }) {
  const spanRef = useRef(null);
  const spanRef1 = useRef(null);

  return (
    <div className="image-card" style={{ "--bg-image": `url(${url})` }}>
      <div
        className="image-card__background"
        style={{ backgroundImage: `url(${url})` }}
      ></div>
      <div className="image-card__content">
        <span ref={spanRef} className="image-card__title">
          {title}
        </span>
        <div ref={spanRef1} className="image-card__links">
          <span className="image-card__link">SHOP MEN</span>
          <span className="image-card__link">SHOP WOMEN</span>
        </div>
      </div>
    </div>
  );
}

export default ImageDivs;
