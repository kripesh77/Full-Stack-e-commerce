import ImageDivs from "./ImageDivs";

const info = {
  urls: ["1.avif", "2.avif", "3.avif", "4.jpg"],
  titles: ["Bike Helmet", "Bicycle Helmet", "Racing Helmet", "Accessories"],
};

function SecondMain() {
  return (
    <section className="second-main m-2.5">
      <div className={`grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4`}>
        {info.urls.map((url, i) => (
          <ImageDivs url={url} title={info.titles[i]} key={i} />
        ))}
      </div>
    </section>
  );
}

export default SecondMain;
