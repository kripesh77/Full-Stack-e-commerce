import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../../utils/apiProducts";

export function useProducts({ page = 1 }) {
  const { data, isPending } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts({ page }),
  });

  return { data, isPending };
}
