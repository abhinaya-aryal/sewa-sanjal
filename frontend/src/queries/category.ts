import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@services/api";

export const QUERY_KEYS = {
  popularCategories: ["popularCategories"],
};

export const usePopularCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.popularCategories,
    queryFn: () => apiClient("/categories"),
    staleTime: Infinity,
  });
};
