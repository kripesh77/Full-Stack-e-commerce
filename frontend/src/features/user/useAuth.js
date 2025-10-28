import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin as signinApi, signup as signupApi } from "../../utils/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export function useAuth({ signin = false, signup = false }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setIsAuthenticatedUser } = useAuthContext();
  const result = useMutation({
    mutationFn: signin ? signinApi : signup && signupApi,
    onSuccess: (data) => {
      localStorage.setItem(
        "auth",
        JSON.stringify({ role: "user", token: data.token }),
      );
      queryClient.setQueryData(["user"], data.user);
      toast.success(`${signin ? "Signin successful" : "Signup successful"}`);
      setIsAuthenticatedUser(true);
      setTimeout(() => navigate("/products"), 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return result;
}
