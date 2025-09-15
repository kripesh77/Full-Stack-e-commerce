import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin as signinApi } from "../../utils/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../hooks/useAuthContext";

export function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setIsAuthenticatedUser } = useAuthContext();
  const result = useMutation({
    mutationFn: signinApi,
    onSuccess: (data) => {
      localStorage.setItem(
        "auth",
        JSON.stringify({ role: "user", token: data.token }),
      );
      queryClient.setQueryData(["user"], data.user);
      toast.success("Signin successful");
      setIsAuthenticatedUser(true);
      setTimeout(() => navigate("/products"), 1000);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return result;
}
