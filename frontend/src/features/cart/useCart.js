import { useQuery } from "@tanstack/react-query";
import { getCarts } from "../../utils/apiCart";

function useCart(token) {
  const result = useQuery({
    queryKey: ["cart", token],
    queryFn: () => getCarts({ token }),
    enabled: !!token, // query runs only if token is enabled
    retry: false,
  });

  return result;
}

export default useCart;
