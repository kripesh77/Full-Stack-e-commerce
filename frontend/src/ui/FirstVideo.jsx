import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

const TOTAL_FRAMES = 31;

const FirstVideo = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const [images, setImages] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Handle window resize to maintain aspect ratio while covering full width
  useEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.clientWidth;
      // const containerHeight = containerRef.current.clientHeight;

      // Calculate dimensions to cover full width while maintaining 16:9 aspect ratio
      const aspectRatio = 16 / 9;
      const width = containerWidth;
      const height = width / aspectRatio;

      setDimensions({ width, height });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    const frameImages = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new window.Image();
      img.src = `/frames/frame_${String(i).padStart(4, "0")}.jpg`;
      frameImages.push(img);
    }
    setImages(frameImages);
  }, []);

  useEffect(() => {
    if (images.length !== TOTAL_FRAMES || dimensions.width === 0) return;

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const scale = window.devicePixelRatio || 1;

    // Set internal canvas dimensions (for drawing)
    canvas.width = 1920 * scale;
    canvas.height = 1080 * scale;
    context.scale(scale, scale);

    // Set displayed canvas dimensions (CSS)
    canvas.style.width = `${dimensions.width}px`;
    canvas.style.height = `${dimensions.height}px`;

    const frameState = { frame: 0 };

    const render = () => {
      const img = images[Math.round(frameState.frame)];
      if (img && img.complete && img.naturalWidth > 0) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          img,
          0,
          0,
          canvas.width / scale,
          canvas.height / scale,
        );
      } else {
        context.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".first-vd-wrapper",
        start: "top top",
        end: "+=300% top",
        scrub: 2,
        pin: true,
      },
      onUpdate: render,
    });

    tl.to(".canvas-text", {
      opacity: 0,
      scale: "20 0",
      duration: 1,
      ease: "expo.out",
    });

    tl.to(
      "html",
      {
        backgroundColor: "#000",
        duration: 1,
      },
      "<+=0.3",
    );

    tl.to(
      ".second-main",
      {
        backgroundColor: "#000",
        duration: 0.1,
      },
      "<",
    );

    tl.to(
      ".first-vd-wrapper",
      {
        backgroundColor: "#000",
      },
      "<",
    );

    tl.to(
      containerRef.current,
      {
        opacity: 1,
      },
      "<+=0.2",
    );

    tl.to(
      frameState,
      {
        frame: TOTAL_FRAMES - 1,
        snap: "frame",
      },
      "<+=0.2",
    );

    render();
  }, [images, dimensions]);

  return (
    <section className="first-vd-wrapper relative overflow-hidden">
      <div className="canvas-text font-body absolute top-[20%] left-[50%] inline-block w-[100%] translate-x-[-50%] text-center text-2xl font-semibold text-black sm:text-3xl md:text-5xl lg:text-7xl">
        Explore our top helmets
      </div>
      <div ref={containerRef} className="h-dvh w-full opacity-0">
        <canvas
          ref={canvasRef}
          className="h-auto max-w-[99vw] rounded-2xl bg-black"
        ></canvas>
      </div>
    </section>
  );
};

export default FirstVideo;
