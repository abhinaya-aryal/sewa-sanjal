import { api, edenHandler } from "@services/api";
import { useMutation } from "@tanstack/react-query";

const QUERY_KEYS = {
  service: "services",
};

export const useCreateService = () => {
  return useMutation({
    mutationKey: [QUERY_KEYS.service],
    mutationFn: ({ body }) => edenHandler(api.services.post(body)),
  });
};
