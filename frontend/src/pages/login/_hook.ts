import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/src/services/api";

export const QUERY_KEYS = {
  user: ["user"],
  login: ["login"],
  logout: ["logout"],
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEYS.login,
    mutationFn: (body: any) =>
      apiClient("/auth/login/web", { data: body, method: "POST" }),
    onSuccess: () => {
      queryClient.resetQueries({ queryKey: QUERY_KEYS.user });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEYS.logout,
    mutationFn: () => apiClient("/auth/logout", { method: "POST" }),
    onSuccess: () => {
      queryClient.setQueryData(QUERY_KEYS.user, null);
      queryClient.clear();
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export const useUser = () => {
  return useQuery({
    queryKey: QUERY_KEYS.user,
    queryFn: () => apiClient("/users/me"),
    staleTime: Infinity,
    retry: false,
  });
};
