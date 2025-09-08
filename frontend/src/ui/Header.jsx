import { memo } from "react";
import { Link } from "react-router";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { CiSearch } from "react-icons/ci";

function Header() {
  return (
    <header className={`header`}>
      <nav className="header__nav">
        <Head />
      </nav>
    </header>
  );
}

const Head = memo(function Head() {
  return (
    <div className="header__container">
      <div className="header__hamburger">
        <HiOutlineMenuAlt1 />
      </div>
      <div className="navigation__brand">
        <Link to="/">
          <span className="navigation__brand-primary">ALI</span>
          <span>SASTO</span>
        </Link>
      </div>
      <div className="navigation__menu font-geo-medium">
        <div className="navigation__item">
          <Link to="/about">
            <div className="navigation__div">
              <div className="navigation__link">
                <span className="navigation__link-text">MEN</span>
                <span className="navigation__link-hover">MEN</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="navigation__item">
          <Link to="/products">
            <div className="navigation__div">
              <div className="navigation__link">
                <span className="navigation__link-text">WOMEN</span>
                <span className="navigation__link-hover">WOMEN</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="navigation__item">
          <Link to="/products">
            <div className="navigation__div">
              <div className="navigation__link">
                <span className="navigation__link-text">NEW ARRIVALS</span>
                <span className="navigation__link-hover">NEW ARRIVALS</span>
              </div>
            </div>
          </Link>
        </div>
      </div>
      <div className="navigation__actions">
        <CiSearch />
      </div>
    </div>
  );
});

export default Header;
