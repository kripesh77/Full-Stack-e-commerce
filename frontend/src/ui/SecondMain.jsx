import ImageDivs from "./ImageDivs";

const info = {
  urls: ["1.avif", "2.avif", "3.avif", "4.jpg"],
  titles: ["Bike Helmet", "Bicycle Helmet", "Racing Helmet", "Accessories"],
};

function SecondMain() {
  return (
    <section className="product-grid">
      <div className="product-grid__container">
        {info.urls.map((url, index) => (
          <ImageDivs key={index} url={url} title={info.titles[index]} />
        ))}
      </div>
    </section>
  );
}

export default SecondMain;
