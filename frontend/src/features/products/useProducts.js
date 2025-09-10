import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../utils/products";

export function useProducts() {
  const { data, isPending } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return { data, isPending };
}
