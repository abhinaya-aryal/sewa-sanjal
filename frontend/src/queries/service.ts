import { apiClient } from "@services/api";
import { useMutation } from "@tanstack/react-query";

const QUERY_KEYS = {
  service: "services",
};

export const useCreateService = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.service],
    mutationFn: ({ body }) =>
      apiClient("/services", { method: "POST", data: body }),
  });
};
