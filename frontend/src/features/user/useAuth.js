import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signin as signinApi } from "../../utils/apiAuth";
import toast from "react-hot-toast";

export function useAuth() {
  const queryClient = useQueryClient();
  const result = useMutation({
    mutationFn: signinApi,
    onSuccess: (data) => {
      localStorage.setItem(
        "auth",
        JSON.stringify({ role: "user", token: data.token }),
      );
      queryClient.setQueryData(["user"], data.user);
      toast.success("Signin successful");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return result;
}
