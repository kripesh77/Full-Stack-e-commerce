export default function CarouselCard({ url, title, isActive, index }) {
  return (
    <div
      className={`carousel-card ${isActive ? "carousel-card--active" : ""}`}
      style={{
        "--bg-image": `url(${url})`,
      }}
    >
      <div
        className="carousel-card__background"
        style={{ backgroundImage: `url(${url})`, scale: isActive ? 1.15 : 1 }}
      ></div>
      <div className="carousel-card__content">
        <span className="carousel-card__title">{title}</span>
        <div
          className="carousel-card__links"
          style={
            index >= 2 && isActive
              ? {
                  transform: "translateY(-100%)",
                }
              : {}
          }
        >
          {index === 3 || <span className="carousel-card__link">SHOP MEN</span>}
          {index === 2 || (
            <span className="carousel-card__link">SHOP WOMEN</span>
          )}
        </div>
      </div>
    </div>
  );
}
