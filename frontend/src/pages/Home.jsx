import { useGSAP } from "@gsap/react";
import { useMobile } from "../hooks/useMediaQuery";
import Button from "../ui/Button";
import LandingMain from "../ui/LandingMain";
import SecondMain from "../ui/SecondMain";
import SecondMainCarousal from "../ui/SecondMainCarousal";
import { useRef, useEffect } from "react";
import { SplitText } from "gsap/SplitText";
import { useNavigate } from "react-router-dom";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import gsap from "gsap/all";

function Home() {
  const isMobile = useMobile();
  const navigate = useNavigate();
  const splitText1 = useRef(null);
  const splitText2 = useRef(null);
  const splitText3 = useRef(null);
  const splitText4 = useRef(null);
  const splitText5 = useRef(null);
  const splitText6 = useRef(null);
  const splitText7 = useRef(null);
  const splitText8 = useRef(null);

  // Force scroll to top when Home page mounts
  useEffect(() => {
    const smoother = ScrollSmoother.get();
    if (smoother) {
      smoother.scrollTo(0, false); // false = instant, no animation
    } else {
      window.scrollTo(0, 0);
    }
  }, []);

  useGSAP(function () {
    splitText1.current = SplitText.create(
      ".landing-secondary__img1 .landing-secondary__img-text",
      {
        type: "chars",
        charsClass: "chars",
      },
    );

    // Wrap each char in a span for splitText1
    splitText1.current.chars.forEach((char) => {
      const span = document.createElement("span");
      span.className = "char-span";
      span.textContent = char.textContent;
      char.textContent = "";
      char.appendChild(span);
    });

    splitText2.current = SplitText.create(
      ".landing-secondary__img2 .landing-secondary__img-text",
      {
        type: "chars",
        charsClass: "chars",
      },
    );

    // Wrap each char in a span for splitText2
    splitText2.current.chars.forEach((char) => {
      const span = document.createElement("span");
      span.className = "char-span";
      span.textContent = char.textContent;
      char.textContent = "";
      char.appendChild(span);
    });

    splitText3.current = SplitText.create(
      ".landing-secondary__img3 .landing-secondary__img-text",
      {
        type: "chars",
        charsClass: "chars",
      },
    );

    // Wrap each char in a span for splitText3
    splitText3.current.chars.forEach((char) => {
      const span = document.createElement("span");
      span.className = "char-span";
      span.textContent = char.textContent;
      char.textContent = "";
      char.appendChild(span);
    });

    splitText4.current = SplitText.create(
      ".landing-secondary__img4 .landing-secondary__img-text",
      {
        type: "chars",
        charsClass: "chars",
      },
    );

    // Wrap each char in a span for splitText3
    splitText4.current.chars.forEach((char) => {
      const span = document.createElement("span");
      span.className = "char-span";
      span.textContent = char.textContent;
      char.textContent = "";
      char.appendChild(span);
    });

    splitText5.current = SplitText.create(
      ".landing-secondary__img1 .landing-secondary__paragraph1",
      {
        type: "lines words chars",
        linesClass: "lines",
        wordsClass: "words",
        charsClass: "chars",
      },
    );

    splitText6.current = SplitText.create(
      ".landing-secondary__img2 .landing-secondary__paragraph2",
      {
        type: "lines words chars",
        linesClass: "lines",
        wordsClass: "words",
        charsClass: "chars",
      },
    );

    splitText7.current = SplitText.create(
      ".landing-secondary__img3 .landing-secondary__paragraph3",
      {
        type: "lines words chars",
        linesClass: "lines",
        wordsClass: "words",
        charsClass: "chars",
      },
    );

    splitText8.current = SplitText.create(
      ".landing-secondary__img4 .landing-secondary__paragraph4",
      {
        type: "lines words chars",
        linesClass: "lines",
        wordsClass: "words",
        charsClass: "chars",
      },
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-secondary",
        scrub: 1,
        start: "top top",
        end: "+=2000%",
        ease: "power2.out",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        markers: true,
      },
    });

    tl.fromTo(
      ".landing-secondary__wrapper1",
      {
        scale: 0.4,
        "--wrapper1-scale": 0.7,
        borderRadius: 500,
        "--before-opacity1": 0,
      },
      {
        scale: 0.98,
        "--wrapper1-scale": 0.98,
        borderRadius: 32,
        duration: 1,
        "--before-opacity1": 0.6,
      },
      "<",
    );

    tl.to(
      "body",
      {
        backgroundColor: "#2D2926",
        duration: 0.5,
      },
      "<",
    );

    // Add a label where independent timeline should trigger
    tl.addLabel("tl1Start", ">+=1");

    // Create independent timeline (no ScrollTrigger yet)
    const tl1 = gsap.timeline({ paused: true });

    tl1.fromTo(
      ".landing-secondary__img1 .landing-secondary__img-text .chars .char-span",
      {
        xPercent: 110,
      },
      {
        xPercent: 0,
        ease: "circ.inOut",
        stagger: { amount: 0.2 },
        duration: 2,
      },
      "<",
    );

    tl1.fromTo(
      ".landing-secondary__img1 .landing-secondary__btn--primary",
      {
        autoAlpha: 0,
        xPercent: -10,
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: "circ.inOut",
      },
      "<",
    );

    tl1.fromTo(
      ".landing-secondary__img1 .landing-secondary__btn--secondary",
      {
        autoAlpha: 0,
        xPercent: 10,
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: "circ.inOut",
      },
      "<",
    );

    tl1.fromTo(
      splitText5.current.lines,
      {
        "--position": "100% 0%",
      },
      {
        "--position": "0% 0%",
        duration: 0.28,
        stagger: { amount: 0.14 },
        ease: "circ.inOut",
      },
      ">+=100%",
    );

    tl1.fromTo(
      splitText5.current.words,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.01,
      },
      ">",
    );

    tl1.to(
      splitText5.current.lines,
      {
        "--position": "-95% 0%",
        duration: 0.28,
        delay: 0.1,
        stagger: { amount: 0.14 },
        ease: "circ.inOut",
      },
      ">",
    );

    // tl.to({}, { duration: 1 });

    tl.fromTo(
      ".landing-secondary__wrapper2",
      {
        yPercent: 0,
        scale: 1,
        "--wrapper2-scale": 0.7,
      },
      {
        yPercent: -100,
        scale: 0.98,
        "--wrapper2-scale": 1,
        delay: 1.5,
        duration: 0.5,
      },
    );

    tl.fromTo(
      ".landing-secondary__wrapper1",
      { scale: 0.98 },
      {
        scale: 0.9,
        autoAlpha: 0,
        rotateX: -30,
        // transformOrigin: "50% 100%",
        duration: 0.5,
      },
      "<+=0.1",
    );

    tl.addLabel("tl2Start", ">+=0.5");

    const tl2 = gsap.timeline({ paused: true });

    tl2.fromTo(
      ".landing-secondary__img2 .landing-secondary__img-text .chars .char-span",
      {
        xPercent: 110,
      },
      {
        xPercent: 0,
        stagger: { amount: 0.2 },
        ease: "circ.inOut",
        duration: 2,
      },
      "<",
    );

    tl2.fromTo(
      ".landing-secondary__img2 .landing-secondary__btn--primary",
      {
        autoAlpha: 0,
        xPercent: -10,
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: "circ.inOut",
      },
      "<",
    );

    tl2.fromTo(
      ".landing-secondary__img2 .landing-secondary__btn--secondary",
      {
        autoAlpha: 0,
        xPercent: 10,
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: "circ.inOut",
      },
      "<",
    );

    tl2.fromTo(
      splitText6.current.lines,
      {
        "--position": "100% 0%",
      },
      {
        "--position": "0% 0%",
        duration: 0.28,
        stagger: { amount: 0.14 },
        ease: "circ.inOut",
      },
      ">+=100%",
    );

    tl2.fromTo(
      splitText6.current.words,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.01,
      },
      ">",
    );

    tl2.to(
      splitText6.current.lines,
      {
        "--position": "-95% 0%",
        duration: 0.28,
        delay: 0.1,
        stagger: { amount: 0.14 },
        ease: "circ.inOut",
      },
      ">",
    );

    // tl.to({}, { duration: 1 });

    tl.fromTo(
      ".landing-secondary__wrapper3",
      {
        yPercent: -100,
        scale: 1,
        "--wrapper3-scale": 0.7,
      },
      {
        "--wrapper3-scale": 1,
        yPercent: -200,
        scale: 0.98,
        delay: 1.5,
        duration: 0.5,
      },
    );

    tl.to(
      ".landing-secondary__wrapper3",
      {
        scale: 0.98,
        borderRadius: 32,
        duration: 0.5,
      },
      "<",
    );

    tl.fromTo(
      ".landing-secondary__wrapper2",
      { scale: 0.98 },
      {
        scale: 0.9,
        autoAlpha: 0,
        rotateX: -30,
        // transformOrigin: "50% 100%",
        duration: 0.5,
      },
      "<+=0.1",
    );

    tl.addLabel("tl3Start", ">+=0.5");

    const tl3 = gsap.timeline({ paused: true });

    tl3.fromTo(
      ".landing-secondary__img3 .landing-secondary__img-text .chars .char-span",
      {
        xPercent: 110,
      },
      {
        xPercent: 0,
        ease: "circ.inOut",
        duration: 1,
      },
      "<",
    );

    tl3.fromTo(
      ".landing-secondary__img3 .landing-secondary__btn--primary",
      {
        autoAlpha: 0,
        xPercent: -10,
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: "circ.inOut",
      },
      "<",
    );

    tl3.fromTo(
      splitText7.current.lines,
      {
        "--position": "100% 0%",
      },
      {
        "--position": "0% 0%",
        duration: 0.28,
        stagger: { amount: 0.14 },
        ease: "circ.inOut",
      },
      ">",
    );

    tl3.fromTo(
      splitText7.current.words,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.01,
      },
      ">",
    );

    tl3.to(
      splitText7.current.lines,
      {
        "--position": "-95% 0%",
        duration: 0.28,
        delay: 0.1,
        stagger: { amount: 0.14 },
        ease: "circ.inOut",
      },
      ">",
    );

    // tl.to({}, { duration: 1 });

    tl.fromTo(
      ".landing-secondary__wrapper4",
      {
        yPercent: -200,
        scale: 1,
        "--wrapper4-scale": 0.7,
      },
      {
        "--wrapper4-scale": 1,
        yPercent: -300,
        scale: 0.98,
        delay: 1.5,
        duration: 0.5,
      },
    );

    tl.to(
      ".landing-secondary__wrapper4",
      {
        scale: 0.98,
        borderRadius: 32,
        duration: 0.5,
      },
      "<",
    );

    tl.fromTo(
      ".landing-secondary__wrapper3",
      { scale: 0.98 },
      {
        scale: 0.9,
        autoAlpha: 0,
        rotateX: -30,
        // transformOrigin: "50% 100%",
        duration: 0.5,
      },
      "<+=0.1",
    );

    tl.addLabel("tl4Start", ">+=0.5");

    const tl4 = gsap.timeline({ paused: true });

    tl4.fromTo(
      ".landing-secondary__img4 .landing-secondary__img-text .chars .char-span",
      {
        xPercent: 110,
      },
      {
        xPercent: 0,
        stagger: { amount: 0.2 },
        ease: "circ.inOut",
        duration: 1,
      },
      ">+=0.5",
    );

    tl4.fromTo(
      ".landing-secondary__img4 .landing-secondary__btn--secondary",
      {
        autoAlpha: 0,
        xPercent: 10,
      },
      {
        autoAlpha: 1,
        xPercent: 0,
        ease: "circ.inOut",
      },
      "<",
    );

    tl4.fromTo(
      splitText8.current.lines,
      {
        "--position": "100% 0%",
      },
      {
        "--position": "0% 0%",
        duration: 0.28,
        stagger: { amount: 0.14 },
        ease: "circ.inOut",
      },
      ">",
    );

    tl4.fromTo(
      splitText8.current.words,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        duration: 0.01,
      },
      ">",
    );

    tl4.to(
      splitText8.current.lines,
      {
        "--position": "-95% 0%",
        duration: 0.28,
        delay: 0.1,
        stagger: { amount: 0.14 },
        ease: "circ.inOut",
      },
      ">",
    );

    tl.to({}, { duration: 1 });

    // Set up onUpdate callback to control all independent timelines
    tl.scrollTrigger.vars.onUpdate = (self) => {
      // Handle tl1
      const labelTime1 = tl.labels.tl1Start;
      const labelProgress1 = labelTime1 / tl.duration();

      if (self.progress >= labelProgress1 && self.direction === 1) {
        if (tl1.progress() === 0) tl1.play();
      } else if (self.progress < labelProgress1 && self.direction === -1) {
        if (tl1.progress() > 0) tl1.reverse();
      }

      // Handle tl2
      const labelTime2 = tl.labels.tl2Start;
      const labelProgress2 = labelTime2 / tl.duration();

      if (self.progress >= labelProgress2 && self.direction === 1) {
        if (tl2.progress() === 0) tl2.play();
      } else if (self.progress < labelProgress2 && self.direction === -1) {
        if (tl2.progress() > 0) tl2.reverse();
      }

      // Handle tl3
      const labelTime3 = tl.labels.tl3Start;
      const labelProgress3 = labelTime3 / tl.duration();

      if (self.progress >= labelProgress3 && self.direction === 1) {
        if (tl3.progress() === 0) tl3.play();
      } else if (self.progress < labelProgress3 && self.direction === -1) {
        if (tl3.progress() > 0) tl3.reverse();
      }

      // Handle tl4
      const labelTime4 = tl.labels.tl4Start;
      const labelProgress4 = labelTime4 / tl.duration();

      if (self.progress >= labelProgress4 && self.direction === 1) {
        if (tl4.progress() === 0) tl4.play();
      } else if (self.progress < labelProgress4 && self.direction === -1) {
        if (tl4.progress() > 0) tl4.reverse();
      }
    };
  });

  return (
    <main>
      <LandingMain />
      {isMobile ? <SecondMainCarousal /> : <SecondMain />}
      <section className="landing-secondary">
        <div className="landing-secondary__wrapper landing-secondary__wrapper1">
          <div className="landing-secondary__img landing-secondary__img1">
            <h2 className="landing-secondary__img-text">FULL FACE</h2>
            <p className="landing-secondary__paragraph landing-secondary__paragraph1">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
              dignissimos voluptates illum nemo id labore
            </p>
            <div className="landing-secondary__btn-wrapper">
              <Button
                className="landing-secondary__btn landing-secondary__btn--primary"
                onClick={() => navigate("/products")}
              >
                shop men
              </Button>
              <Button className="landing-secondary__btn landing-secondary__btn--secondary">
                shop women
              </Button>
            </div>
          </div>
        </div>
        <div className="landing-secondary__wrapper landing-secondary__wrapper2">
          <div className="landing-secondary__img-second landing-secondary__img2">
            <h2 className="landing-secondary__img-text">modular</h2>
            <p className="landing-secondary__paragraph landing-secondary__paragraph2">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
              dignissimos voluptates illum nemo id labore
            </p>
            <div className="landing-secondary__btn-wrapper">
              <Button
                className="landing-secondary__btn landing-secondary__btn--primary"
                onClick={() => navigate("/products")}
              >
                shop men
              </Button>
              <Button className="landing-secondary__btn landing-secondary__btn--secondary">
                shop women
              </Button>
            </div>
          </div>
        </div>
        <div className="landing-secondary__wrapper landing-secondary__wrapper3">
          <div className="landing-secondary__img-third landing-secondary__img3">
            <h2 className="landing-secondary__img-text">MEN</h2>
            <p className="landing-secondary__paragraph landing-secondary__paragraph3">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
              dignissimos voluptates illum nemo id labore
            </p>
            <div className="landing-secondary__btn-wrapper">
              <Button
                className="landing-secondary__btn landing-secondary__btn--primary"
                onClick={() => navigate("/products")}
              >
                shop men
              </Button>
            </div>
          </div>
        </div>
        <div className="landing-secondary__wrapper landing-secondary__wrapper4">
          <div className="landing-secondary__img-fourth landing-secondary__img4">
            <h2 className="landing-secondary__img-text">WOMEN</h2>
            <p className="landing-secondary__paragraph landing-secondary__paragraph4">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
              dignissimos voluptates illum nemo id labore
            </p>
            <div className="landing-secondary__btn-wrapper">
              <Button className="landing-secondary__btn landing-secondary__btn--secondary">
                shop women
              </Button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
