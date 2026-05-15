import { ADDRESSDATA } from "@modules/address/constant";

export async function getProvinces() {
  const provinces = ADDRESSDATA.map((province) => {
    return {
      id: province.id,
      name: province.name,
      area: province.area_sq_km,
      website: province.website,
      headquarter: province.headquarter,
    };
  });

  return provinces;
}

export async function getDistricts(provinceId: string) {
  const province = ADDRESSDATA.find((item) => item.id === provinceId);
  const district = province?.district_list.map((district) => {
    return {
      id: district.id,
      name: district.name,
      province: {
        name: province.name,
        id: province.id,
      },
      area: district.area_sq_km,
      website: district.website,
      headquarter: district.headquarter,
    };
  });

  return district;
}

export async function getLocals(districtId: string) {
  const districts = ADDRESSDATA.flatMap((province) => province.district_list);
  const district = districts.find((district) => district.id === districtId);
  return district?.municipality_list;
}
