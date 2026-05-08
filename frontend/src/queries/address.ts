import { apiClient } from "@services/api";
import { useQuery } from "@tanstack/react-query";

const QUERY_KEYS = {
  province: "provinces",
};

export const useProvince = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.province],
    queryFn: () => apiClient("/categories"),
  });
};
