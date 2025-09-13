import { createContext, useEffect, useState } from "react";

const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
  const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(false);
  const [isAuthenticatedSeller, setIsAuthenticatedSeller] = useState(false);

  const isAuthenticated = isAuthenticatedUser || isAuthenticatedSeller;

  useEffect(() => {
    try {
      const a = localStorage.getItem("auth");
      if (!a) return;
      const auth = JSON.parse(a);
      if (auth.role === "user") setIsAuthenticatedUser(true);
      if (auth.role === "seller") setIsAuthenticatedSeller(true);
    } catch {
      console.warn("Invalid auth data in localStorage");
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isAuthenticatedUser,
        isAuthenticatedSeller,
        setIsAuthenticatedUser,
        setIsAuthenticatedSeller,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
