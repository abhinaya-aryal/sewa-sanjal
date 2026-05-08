import { apiClient } from "@services/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const QUERY_KEYS = {
  register: ["register"],
  login: ["login"],
  user: ["user"],
  logout: ["logout"],
};

export const useRegister = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: QUERY_KEYS.register,
    mutationFn: (body) =>
      apiClient("/auth/register", { data: body, method: "POST" }),
    onSuccess: () => {
      navigate("/login");
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEYS.login,
    mutationFn: (body) =>
      apiClient("/auth/login/web", { data: body, method: "POST" }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user });
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
