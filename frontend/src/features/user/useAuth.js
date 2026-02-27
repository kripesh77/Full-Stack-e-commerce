import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin as signinApi, signup as signupApi } from "../../utils/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export function useAuth({ signin = false, signup = false }) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setIsAuthenticatedUser } = useAuthContext();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: signin ? signinApi : signup && signupApi,
    onSuccess: (data) => {
      localStorage.setItem(
        "auth",
        JSON.stringify({ role: "user", token: data.token }),
      );
      queryClient.setQueryData(["user"], data.user);
      setIsAuthenticatedUser(true);
      setTimeout(() => navigate("/products"), 500);
    },
  });

  const mutate = (data) =>
    toast.promise(mutateAsync(data), {
      loading: `signing ${signin ? "in" : "up"}...`,
      success: (data) =>
        data.message || `${signin ? "signin" : "signup"} successful`,
      error: (error) => error.message,
    });

  return { mutate, isPending };
}
