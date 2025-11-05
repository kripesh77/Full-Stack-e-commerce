import { Swiper, SwiperSlide } from "swiper/react";
import CarouselCard from "./CarouselCard";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-cards";

// import required modules
import { EffectCards } from "swiper/modules";

const cardData = [
  { url: "/1d.png", title: "FULL FACE" },
  { url: "/2b.png", title: "MODULAR" },
  { url: "/3.jpg", title: "MEN" },
  { url: "/3a.jpg", title: "WOMEN" },
];

export default function App() {
  return (
    <>
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="mySwiper"
      >
        {cardData.map((card, index) => (
          <SwiperSlide key={index}>
            {({ isActive }) => (
              <CarouselCard
                index={index}
                url={card.url}
                title={card.title}
                isActive={isActive}
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}
