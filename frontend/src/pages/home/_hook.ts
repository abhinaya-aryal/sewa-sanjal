import { api, edenHandler } from "@/src/services/api";
import { useQuery } from "@tanstack/react-query";

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
