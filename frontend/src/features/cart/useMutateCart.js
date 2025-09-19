import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addOrRemoveCart } from "../../utils/apiCart";
import toast from "react-hot-toast";

function useMutateCart() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addOrRemoveCart,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries({
        queryKey: ["cart"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
}

export default useMutateCart;
