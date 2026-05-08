import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@services/api";

const QUERY_KEYS = {
  user: ["user"],
};

export const useUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.user,
    queryFn: () => apiClient("/users/me"),
    staleTime: Infinity,
    retry: false,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEYS.user,
    mutationFn: (body) => edenHandler(api.users.me.patch(body)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user });
    },
  });
};
