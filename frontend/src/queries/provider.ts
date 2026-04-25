import { api, edenHandler } from "@services/api";
import { useQuery } from "@tanstack/react-query";

export type ProviderFilters = {
  category?: string;
  city?: string;
  verified?: boolean;
};

export const QUERY_KEYS = {
  providers: "providers",
};

export const useProviders = (filters: ProviderFilters) => {
  return useQuery({
    queryKey: [QUERY_KEYS.providers, filters],
    queryFn: () => edenHandler(api.providers.get({ query: filters })),
  });
};
