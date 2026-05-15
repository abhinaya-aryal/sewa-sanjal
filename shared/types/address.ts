export type Province = {
  name: string;
  id: string;
  area: string;
  website: string;
  headquarter: string;
};

export type District = Province & {
  province: {
    id: string;
    name: string;
  };
};

export type Local = Pick<Province, "id" | "name" | "website"> & {
  level: string;
  wards: string;
  area_sq_km: string;
};
