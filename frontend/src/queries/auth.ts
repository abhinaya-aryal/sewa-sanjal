import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { edenHandler, api } from "@services/api";
import { Treaty } from "@elysiajs/eden";

export type RegisterBody = Treaty.Data<typeof api.auth.register.post>;

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
    mutationFn: (body: RegisterBody) =>
      edenHandler(api.auth.register.post(body)),
    onSuccess: () => {
      navigate("/login");
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: QUERY_KEYS.login,
    mutationFn: (body) => edenHandler(api.auth.login.web.post(body)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.user });
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
