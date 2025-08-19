import gsap from "gsap";
import { memo, useEffect, useState } from "react";
import { Link } from "react-router";

function Header() {
  const [scrollDirection, setScrollDirection] = useState("down");
  const [lastScrollY, setLastScrollY] = useState(0);
  const up = scrollDirection === "up";

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection("down");
      } else {
        setScrollDirection("up");
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <header
      className={`${up ? "fixed top-5 right-5 left-5 z-50" : "absolute top-13 right-5 left-5 z-50"} ${lastScrollY < 28 && "absolute top-13 duration-100"}`}
    >
      <nav>
        <Head />
      </nav>
    </header>
  );
}

function handleMouseEnter(e) {
  const tl = gsap.timeline();
  tl.to(e.currentTarget.firstElementChild, { y: "-100%", duration: 0.3 });
  tl.to(
    e.currentTarget.lastElementChild,
    {
      y: "-100%",
      duration: 0.3,
    },
    "<",
  );
}

function handleMouseLeave(e) {
  const tl = gsap.timeline();
  tl.to(e.currentTarget.firstElementChild, {
    y: "0%",
    duration: 0.2,
  });
  tl.to(
    e.currentTarget.lastElementChild,
    {
      y: "0%",
      duration: 0.2,
    },
    "<",
  );
}

const Head = memo(function Head() {
  return (
    <div
      className={`font-geo-medium mx-auto h-12 max-w-[1920px] rounded-xl bg-white px-2.5 text-[12px] shadow lg:px-5`}
    >
      <div className="mx-2 grid h-full grid-cols-3">
        <div className="font-rockybilly flex items-center text-[10px]">
          <Link to="/">
            <span className="text-blue-600">Ali</span>
            <span>Sasto</span>
          </Link>
        </div>
        <div className="navbar flex justify-center gap-8 tracking-wider">
          <div className="flex items-center">
            <Link to="/about" className="">
              <div
                className="navlinks relative overflow-y-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="inline-block">MEN</span>
                <br />
                <span className="absolute top-[100%]">MEN</span>
              </div>
            </Link>
          </div>
          <div className="relative flex items-center">
            <Link to="/products" className="">
              <div
                className="navlinks relative overflow-y-hidden"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="inline-block">WOMEN</span>
                <br />
                <span className="absolute top-[100%]">WOMEN</span>
              </div>
            </Link>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
});

export default Header;
