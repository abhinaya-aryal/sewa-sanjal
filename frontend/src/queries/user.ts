import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { api, edenHandler } from "@services/api";
import { Treaty } from "@elysiajs/eden";

export type UpdateUserBody = Treaty.Data<typeof api.users.me.patch>;

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

export const useUpdateUser = () => {
  const queryCLient = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEYS.user,
    mutationFn: (body: UpdateUserBody) => edenHandler(api.users.me.patch(body)),
    onSuccess: () => {
      queryCLient.invalidateQueries({ queryKey: QUERY_KEYS.user });
    },
  });
};
