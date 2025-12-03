import { useQuery } from "@tanstack/react-query";
import { getOrderHistory } from "../../utils/apiOrder";

export default function useOrders(token) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["orders", token],
    queryFn: () => getOrderHistory(token),
    enabled: !!token,
    staleTime: 0,
  });


  return {
    orders: data?.data || [],
    isLoading,
    error,
  };
}
