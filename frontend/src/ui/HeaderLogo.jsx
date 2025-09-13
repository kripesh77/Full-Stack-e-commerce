import { Link } from "react-router";

function HeaderLogo({ classname }) {
  return (
    <div className={classname}>
      <Link to="/">ALISASTO</Link>
    </div>
  );
}

export default HeaderLogo;
