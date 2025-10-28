import ImageDivs from "./ImageDivs";

const info = {
  urls: ["1d.png", "2b.png", "3.jpg", "3a.jpg"],
  titles: ["FULL FACE", "modular", "men", "women"],
};

function SecondMain() {
  return (
    <section className="product-grid">
      <div className="product-grid__container">
        {info.urls.map((url, index) => (
          <ImageDivs
            key={url}
            url={url}
            title={info.titles[index]}
            index={index}
          />
        ))}
      </div>
    </section>
  );
}

export default SecondMain;
