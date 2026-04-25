import { useQuery } from "@tanstack/react-query";
import { api, edenHandler } from "@services/api";

const QUERY_KEYS = {
  user: ["user"],
};

export const useUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.user,
    queryFn: () => edenHandler(api.users.me.get()),
    staleTime: Infinity,
    retry: false,
  });
};
