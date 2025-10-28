import { NavLink } from "react-router-dom";

function AuthLinks() {
  return (
    <div className="auth-links">
      <NavLink to="/auth/signin" className="auth-links__item">
        Signin
      </NavLink>
      <NavLink to="/auth/signup" className="auth-links__item">
        Signup
      </NavLink>
    </div>
  );
}

export default AuthLinks;
