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

  const { mutateAsync, isPending: isUpdating } = useMutation({
    mutationFn: updateUserDataApi,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
    },
  });

  const updateUser = (data) =>
    toast.promise(mutateAsync(data), {
      loading: "updating...",
      success: "user account successfully updated",
      error: (err) => err.message,
    });

  return { updateUser, isUpdating };
}

export function useUpdatePassword() {
  const { mutateAsync, isPending: isUpdatingPassword } = useMutation({
    mutationFn: updateUserPasswordApi,
  });

  const updatePassword = (data) =>
    toast.promise(mutateAsync(data), {
      loading: "updating...",
      success: "password updated successfully",
      error: (err) => err.message,
    });

  return { updatePassword, isUpdatingPassword };
}
