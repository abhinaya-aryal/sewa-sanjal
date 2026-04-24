import { api, edenHandler } from "@/src/services/api";
import { useMutation } from "@tanstack/react-query";
import { RegisterBody } from "./_types";
import { useNavigate } from "react-router-dom";

const QUERY_KEYS = {
  register: ["register"],
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
