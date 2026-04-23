import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, edenHandler } from "@/src/services/api";

export const QUERY_KEYS = {
  user: ["user"],
  login: ["login"],
  logout: ["logout"],
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEYS.login,
    mutationFn: (body) => edenHandler(api.auth.login.web.post(body)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user });
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
    mutationFn: () => edenHandler(api.auth.logout.post()),
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
    queryFn: () => edenHandler(api.users.me.get()),
    staleTime: Infinity,
    retry: false,
  });
};
