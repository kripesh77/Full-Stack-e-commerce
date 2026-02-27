import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrRemoveCart } from "../../utils/apiCart";
import toast from "react-hot-toast";

function useMutateCart() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useMutation({
    mutationFn: addOrRemoveCart,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
  });

  const mutate = (data) =>
    toast.promise(mutateAsync(data), {
      loading: "loading...",
      success: (data) => data.message,
      error: (error) => error.message,
    });

  return { mutate, isPending };
}

export default useMutateCart;
