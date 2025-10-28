import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { getProducts } from "../../utils/apiProducts";

export function useProducts({ page = 1 }) {
  const queryClient = useQueryClient();

  const { data, isPending, isFetching, isError, error } = useQuery({
    queryKey: ["products", page],
    queryFn: () => getProducts({ page }),
    staleTime: 0, // Data is immediately stale to ensure fresh fetch on page change
    gcTime: 10 * 60 * 1000, // Keep unused data in cache for 10 minutes
    retry: 2, // Retry failed requests twice
    refetchOnMount: true, // Always refetch when component mounts
  });

  // Prefetch next and previous pages for smoother navigation
  useEffect(() => {
    const hasNext = data?.data?.hasNext;
    const hasPrev = data?.data?.hasPrev;

    // Prefetch next page if it exists
    if (hasNext) {
      queryClient.prefetchQuery({
        queryKey: ["products", page + 1],
        queryFn: () => getProducts({ page: page + 1 }),
        staleTime: 5 * 60 * 1000,
      });
    }

    // Prefetch previous page if it exists
    if (hasPrev && page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["products", page - 1],
        queryFn: () => getProducts({ page: page - 1 }),
        staleTime: 5 * 60 * 1000,
      });
    }
  }, [page, data, queryClient]);

  return { data, isPending, isFetching, isError, error };
}
