import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@services/api";
import { UserUpdate } from "@shared/types/user";
import { User } from "@prisma/generated/client";

const QUERY_KEYS = {
  user: ["user"],
};

export const useUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.user,
    queryFn: () => apiClient<User>("/users/me"),
    staleTime: Infinity,
    retry: false,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEYS.user,
    mutationFn: (body: UserUpdate) => {
      return apiClient("/users/me", { method: "PATCH", data: body });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user });
    },
  });
};
