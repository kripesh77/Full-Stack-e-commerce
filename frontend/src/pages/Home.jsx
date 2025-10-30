import { useGSAP } from "@gsap/react";
import { useMobile } from "../hooks/useMediaQuery";
import Button from "../ui/Button";
import LandingMain from "../ui/LandingMain";
import SecondMain from "../ui/SecondMain";
import SecondMainCarousal from "../ui/SecondMainCarousal";
import { useRef } from "react";
import { SplitText } from "gsap/SplitText";
import { useNavigate } from "react-router-dom";
import gsap from "gsap/all";
import transition from "../ui/transition";

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

  useGSAP(function () {
    splitText1.current = SplitText.create(
      ".landing-secondary__img1 .landing-secondary__img-text",
      {
        type: "chars",
        charsClass: "chars",
      },
    );

    // Wrapping each char in a span for splitText1
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

    // Wrapping each char in a span for splitText2
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

    // Wrapping each char in a span for splitText3
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
        type: "lines, words",
        linesClass: "lines",
        wordsClass: "words",
        charsClass: "chars",
      },
    );

    splitText6.current = SplitText.create(
      ".landing-secondary__img2 .landing-secondary__paragraph2",
      {
        type: "lines, words",
        linesClass: "lines",
        wordsClass: "words",
        charsClass: "chars",
      },
    );

    splitText7.current = SplitText.create(
      ".landing-secondary__img3 .landing-secondary__paragraph3",
      {
        type: "lines, words",
        linesClass: "lines",
        wordsClass: "words",
        charsClass: "chars",
      },
    );

    splitText8.current = SplitText.create(
      ".landing-secondary__img4 .landing-secondary__paragraph4",
      {
        type: "lines, words",
        linesClass: "lines",
        wordsClass: "words",
        charsClass: "chars",
      },
    );

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-secondary",
        scrub: 2,
        start: "top top",
        end: "+=1500%",
        pin: true,
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
        duration: 0.8,
        "--before-opacity1": 0.6,
      },
      "<",
    );

    tl.to(
      "body",
      {
        backgroundColor: "#0f0f0f",
        duration: 0.3,
      },
      "<",
    );

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
        delay: 1,
        duration: 0.5,
      },
    );

    tl.fromTo(
      ".landing-secondary__wrapper1",
      { scale: 0.98 },
      {
        scale: 0.8,
        autoAlpha: 0,
        rotateX: -30,
        duration: 0.5,
      },
      "<+=0.1",
    );

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
        delay: 1,
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
        scale: 0.8,
        autoAlpha: 0,
        rotateX: -30,
        duration: 0.5,
      },
      "<+=0.1",
    );

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
        delay: 1,
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
        scale: 0.8,
        autoAlpha: 0,
        rotateX: -30,
        duration: 0.5,
      },
      "<+=0.1",
    );

    tl.to({}, { duration: 1 });

    //wrapper1 content animations
    const tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-secondary__img1",
        start: "bottom+=270% top",
        toggleActions: "play none none reverse",
      },
    });

    tl1.fromTo(
      ".landing-secondary__img1 .landing-secondary__img-text .chars .char-span",
      { xPercent: 110 },
      {
        xPercent: 0,
        stagger: { amount: 0.1 },
        ease: "circ.inOut",
        duration: 1,
      },
    );

    tl1.fromTo(
      ".landing-secondary__img1 .landing-secondary__btn--primary",
      { autoAlpha: 0, xPercent: -10 },
      { autoAlpha: 1, xPercent: 0, ease: "circ.inOut" },
      "<",
    );

    tl1.fromTo(
      ".landing-secondary__img1 .landing-secondary__btn--secondary",
      { autoAlpha: 0, xPercent: 10 },
      { autoAlpha: 1, xPercent: 0, ease: "circ.inOut" },
      "<",
    );

    tl1.fromTo(
      splitText5.current.lines,
      { "--position": "100% 0%" },
      {
        "--position": "0% 0%",
        duration: 0.28,
        stagger: { amount: 0.14 },
        ease: "circ.inOut",
      },
      ">",
    );

    tl1.fromTo(
      splitText5.current.words,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.01 },
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

    // Wrapper2 content animations
    const tl2 = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-secondary__img2",
        start: "top+=430% top",
        toggleActions: "play none none reverse",
      },
    });

    tl2.fromTo(
      ".landing-secondary__img2 .landing-secondary__img-text .chars .char-span",
      { xPercent: 110 },
      {
        xPercent: 0,
        stagger: { amount: 0.1 },
        ease: "circ.inOut",
        duration: 1,
      },
    );

    tl2.fromTo(
      ".landing-secondary__img2 .landing-secondary__btn--primary",
      { autoAlpha: 0, xPercent: -10 },
      { autoAlpha: 1, xPercent: 0, ease: "circ.inOut" },
      "<",
    );

    tl2.fromTo(
      ".landing-secondary__img2 .landing-secondary__btn--secondary",
      { autoAlpha: 0, xPercent: 10 },
      { autoAlpha: 1, xPercent: 0, ease: "circ.inOut" },
      "<",
    );

    tl2.fromTo(
      splitText6.current.lines,
      { "--position": "100% 0%" },
      {
        "--position": "0% 0%",
        duration: 0.28,
        stagger: { amount: 0.14 },
        ease: "circ.inOut",
      },
      ">",
    );

    tl2.fromTo(
      splitText6.current.words,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.01 },
      ">",
    );

    tl2.to(
      splitText6.current.lines,
      {
        "--position": "-95% 0%",
        duration: 0.28,
        stagger: { amount: 0.14 },
        ease: "circ.inOut",
      },
      ">",
    );

    // Wrapper3 content animations
    const tl3 = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-secondary__img3",
        start: "top+=810% top",
        toggleActions: "play none none reverse",
      },
    });

    tl3.fromTo(
      ".landing-secondary__img3 .landing-secondary__img-text .chars .char-span",
      { xPercent: 110 },
      { xPercent: 0, ease: "circ.inOut", duration: 1 },
    );

    tl3.fromTo(
      ".landing-secondary__img3 .landing-secondary__btn--primary",
      { autoAlpha: 0, xPercent: -10 },
      { autoAlpha: 1, xPercent: 0, ease: "circ.inOut" },
      "<",
    );

    tl3.fromTo(
      splitText7.current.lines,
      { "--position": "100% 0%" },
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
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.01 },
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

    // Wrapper4 content animations
    const tl4 = gsap.timeline({
      scrollTrigger: {
        trigger: ".landing-secondary__img4",
        start: "top+=1180% top",
        toggleActions: "play none none reverse",
      },
    });

    tl4.fromTo(
      ".landing-secondary__img4 .landing-secondary__img-text .chars .char-span",
      { xPercent: 110 },
      {
        xPercent: 0,
        ease: "circ.inOut",
        stagger: { amount: 0.1 },
        duration: 1,
      },
    );

    tl4.fromTo(
      ".landing-secondary__img4 .landing-secondary__btn--secondary",
      { autoAlpha: 0, xPercent: -10 },
      { autoAlpha: 1, xPercent: 0, ease: "circ.inOut" },
      "<",
    );

    tl4.fromTo(
      splitText8.current.lines,
      { "--position": "100% 0%" },
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
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.01 },
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
  });

  return (
    <main>
      <LandingMain />
      {isMobile ? <SecondMainCarousal /> : <SecondMain />}
      <section className="landing-secondary">
        <div className="landing-secondary__wrapper landing-secondary__wrapper1">
          <div className="landing-secondary__img landing-secondary__img1">
            <h2 className="landing-secondary__img-text">Full Face</h2>
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

const HomePage = transition(Home);
HomePage.displayName = "Home";
export default HomePage;
