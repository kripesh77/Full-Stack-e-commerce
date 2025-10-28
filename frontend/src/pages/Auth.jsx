import { Outlet } from "react-router-dom";
import HeaderLogo from "../ui/HeaderLogo";
import AuthLinks from "../features/user/AuthLinks";

function Auth() {
  return (
    <div className="auth">
      <div className="auth__container">
        <AuthLinks />
        <div className="auth__container--div">
          <main>
            <HeaderLogo classname="auth-navigation__brand" />
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default Auth;
