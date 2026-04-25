import { useQuery } from "@tanstack/react-query";
import { api, edenHandler } from "@services/api";

export const QUERY_KEYS = {
  popularCategories: ["popularCategories"],
};

export const usePopularCategories = () => {
  return useQuery({
    queryKey: QUERY_KEYS.popularCategories,
    queryFn: () => edenHandler(api.categories.get()),
    staleTime: Infinity,
  });
};
