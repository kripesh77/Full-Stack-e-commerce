import { Link } from "react-router-dom";

function HeaderLogo({ classname }) {
  return (
    <div className={`${classname} header__logo`}>
      <Link to="/">ALISASTO</Link>
    </div>
  );
}

export default HeaderLogo;
