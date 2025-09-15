import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";

export function useAuthContext() {
  return useContext(AuthContext);
}
