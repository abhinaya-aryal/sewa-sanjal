import { apiClient } from "@services/api";
import { useQuery } from "@tanstack/react-query";

export type ProviderFilters = {
  category?: string;
  city?: string;
  verified?: boolean;
  search?: string;
};

export const QUERY_KEYS = {
  providers: "providers",
};

export const useProviders = (filters: ProviderFilters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.providers, filters],
    queryFn: () => apiClient("/providers", { query: filters }),
  });
};

export const useProvider = (id?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.providers, id],
    queryFn: () => apiClient(`/providers/${id}`),
    enabled: !!id,
  });
};
