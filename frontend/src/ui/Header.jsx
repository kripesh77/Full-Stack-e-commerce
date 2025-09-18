import { memo } from "react";
import { Link } from "react-router";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { IoBagOutline, IoSearchOutline } from "react-icons/io5";
import { GoPerson } from "react-icons/go";
import HeaderLogo from "./HeaderLogo";
import CartCounter from "../features/cart/CartCounter";
import { useAuthContext } from "../hooks/useAuthContext";

function Header() {
  return (
    <header className="header">
      <nav className="header__nav">
        <Head />
      </nav>
    </header>
  );
}

const Head = memo(function Head() {
  const { isAuthenticated } = useAuthContext();
  return (
    <div className="header__container">
      <div className="header__hamburger">
        <HiOutlineMenuAlt1 />
      </div>
      <HeaderLogo classname="navigation__brand " />
      <div className="navigation__menu font-geo-medium">
        <HeaderNavigationItem to="/products" text="MEN" />
        <HeaderNavigationItem to="/products" text="WOMEN" />
        <HeaderNavigationItem to="/products" text="NEW ARRIVALS" />
      </div>
      <div className="navigation__actions">
        <IoSearchOutline title="Search" />
        <Link to="/auth">
          <GoPerson title="Account" />
        </Link>
        <Link to="/cart" className="navigation__cart">
          <IoBagOutline size={18} title="View Cart" />
          {isAuthenticated && <CartCounter />}
        </Link>
      </div>
    </div>
  );
});

function HeaderNavigationItem({ text, to }) {
  return (
    <div className="navigation__item">
      <Link to={to}>
        <div className="navigation__div">
          <div className="navigation__link">
            <span className="navigation__link-text">{text}</span>
            <span className="navigation__link-hover">{text}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default Header;
