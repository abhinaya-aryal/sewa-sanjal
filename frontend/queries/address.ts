import { apiClient } from "@services/api";
import { useQuery } from "@tanstack/react-query";
import { Province } from "@type/address";

const QUERY_KEYS = {
  province: "provinces",
  district: "districts",
  local: "local",
};

export const useProvince = () => {
  return useQuery({
    queryKey: [QUERY_KEYS.province],
    queryFn: () => apiClient<Province>("/address/provinces"),
    staleTime: Infinity,
  });
};

export const useDistrict = (provinceId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.district, provinceId],
    queryFn: () => apiClient(`/address/districts/${provinceId}`),
    enabled: !!provinceId,
  });
};

export const useLocal = (districtId?: string) => {
  return useQuery({
    queryKey: [QUERY_KEYS.local, districtId],
    queryFn: () => apiClient(`/address/local/${districtId}`),
    enabled: !!districtId,
  });
};
