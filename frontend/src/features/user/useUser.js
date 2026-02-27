import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getCurrentUser,
  updateUserData as updateUserDataApi,
  updateUserPassword as updateUserPasswordApi,
} from "../../utils/apiAuth";
import toast from "react-hot-toast";

export function useUser() {
  const {
    isLoading,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    retry: false,
  });

  return { isLoading, user, error };
}

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateUserDataApi,
    onSuccess: ({ user }) => {
      toast.success("User account successfully updated");
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => toast.error(err.message),
  });

  return { updateUser, isUpdating };
}

export function useUpdatePassword() {
  const { mutate: updatePassword, isPending: isUpdatingPassword } = useMutation({
    mutationFn: updateUserPasswordApi,
    onSuccess: () => {
      toast.success("Password updated successfully");
    },
    onError: (err) => toast.error(err.message),
  });

  return { updatePassword, isUpdatingPassword };
}
