import { useRef, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow } from "swiper/modules";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import { useGSAP } from "@gsap/react";

const info = {
  urls: ["1.png", "2.png", "3.jpg", "4.jpg"],
  titles: ["FULL FACE", "modular", "men", "women"],
};

function CarouselCard({ url, title, isActive, isInView, index }) {
  const spanRef = useRef(null);
  const spanRef1 = useRef(null);
  const cardRef = useRef(null);

  useGSAP(() => {
    if (!spanRef.current || !spanRef1.current) return;

    if (isActive && isInView) {
      // Animate the card elements when it becomes active and in view
      gsap.to(spanRef.current, {
        y: "0%",
        borderColor: "transparent",
        duration: 0.4,
        ease: "power2.out",
      });

      gsap.to(spanRef1.current.children, {
        y: "0%",
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });
    } else {
      // Reset animation when not active or not in view
      gsap.set(spanRef.current, { y: "100%", borderColor: "#fff" });
      gsap.set(spanRef1.current.children, {
        y: "100%",
        opacity: 0,
      });
    }
  }, [isActive, isInView]);

  return (
    <div
      ref={cardRef}
      className={`carousel-card ${isActive && isInView ? "carousel-card--active" : ""}`}
      style={{
        "--bg-image": `url(${url})`,
        paddingLeft: `${index === 0 ? "10px" : ""}`,
      }}
    >
      <div
        className="carousel-card__background"
        style={{ backgroundImage: `url(${url})`, scale: 1.1 }}
        data-speed="0.9"
      ></div>
      <div className="carousel-card__content">
        <span ref={spanRef} className="carousel-card__title">
          {title}
        </span>
        <div ref={spanRef1} className="carousel-card__links">
          <span className="carousel-card__link">SHOP MEN</span>
          <span className="carousel-card__link">SHOP WOMEN</span>
        </div>
      </div>
    </div>
  );
}

function SecondMainCarousal() {
  const swiperRef = useRef(null);
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!carouselRef.current) return;

    const timer = setTimeout(() => {
      const scrollTrigger = ScrollTrigger.create({
        trigger: carouselRef.current,
        start: "top 80%",
        end: "bottom 20%",
        onEnter() {
          setIsInView(true);
        },
        onLeave() {
          setIsInView(false);
        },
        onEnterBack() {
          setIsInView(true);
        },
        onLeaveBack() {
          setIsInView(false);
        },
      });

      return () => {
        scrollTrigger.kill();
      };
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.activeIndex);
  };

  const handleSwiperInit = (swiper) => {
    swiperRef.current = swiper;
  };

  return (
    <section ref={carouselRef} className="carousel-section">
      <div className="carousel-container">
        <Swiper
          modules={[EffectCoverflow]}
          spaceBetween={10}
          slidesPerView={1.5}
          centeredSlides={true}
          centeredSlidesBounds={true}
          effect="coverflow"
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 0,
            slideShadows: false,
          }}
          onSwiper={handleSwiperInit}
          onSlideChange={handleSlideChange}
          className="main-carousel"
        >
          {info.urls.map((url, index) => (
            <SwiperSlide key={index}>
              <CarouselCard
                url={url}
                title={info.titles[index]}
                isActive={activeIndex === index}
                isInView={isInView}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}

export default SecondMainCarousal;
