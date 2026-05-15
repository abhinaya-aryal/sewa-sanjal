import { Contact, Mail, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import {
  NormalInput,
  ProfileImageInput,
  SelectInput,
  TextareaInput,
} from "@components/Forms";
import { Button } from "@components/Button";
import { useUpdateUser, useUser } from "@queries/user";
import Render from "@components/Render";
import { useDistrict, useLocal, useProvince } from "@queries/address";
import { useEffect, useState } from "react";
import { convertToDropdownOptions } from "@helpers/conversion";
import { createFileUrl } from "@helpers/createFileUrl";
import { UserUpdate } from "@shared/types/user";
import { District, Local, Province } from "@shared/types/address";

export default function Profile() {
  const { data: user } = useUser();
  const { data: provinces } = useProvince();

  const formMethods = useForm<UserUpdate>({
    defaultValues: {
      name: user?.name ?? "",
      phone: user?.phone ?? "",
      email: user?.email ?? "",
      province: user?.provider?.location?.province ?? undefined,
      district: user?.provicer?.location?.district ?? undefined,
      local: user?.provider?.location?.local ?? undefined,
      address: user?.provider?.location?.address ?? undefined,
      latitude: user?.provider?.location?.latitude ?? undefined,
      longitude: user?.provider?.location?.longitude ?? undefined,
      bio: user?.provider?.bio,
    },
  });

  const [selectedProvinceId, setSelectedProvinceId] = useState<
    string | undefined
  >(undefined);
  const [selectedDistrictId, setSelectedDistrictId] = useState<
    string | undefined
  >(undefined);
  const { data: districts } = useDistrict(selectedProvinceId);
  const { data: locals } = useLocal(selectedDistrictId);
  useEffect(() => {
    formMethods.setValue("district", undefined);
  }, [selectedProvinceId]);
  useEffect(() => {
    formMethods.setValue("local", undefined);
  }, [selectedDistrictId, selectedProvinceId]);

  const updateUser = useUpdateUser();

  const handleSubmit = (data: UserUpdate) => {
    updateUser.mutate(data);
  };

  return (
    <div className="bg-white w-full rounded-md p-5 gap-8">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <NormalInput
                name="name"
                label="Name"
                required
                icon={<User size={16} className="text-gray-400" />}
              />

              <NormalInput
                name="email"
                type="email"
                label="Email"
                required
                icon={<Mail size={16} className="text-gray-400" />}
              />

              <NormalInput
                name="phone"
                type="number"
                label="Contact"
                required
                icon={<Contact size={16} className="text-gray-400" />}
              />
            </div>
            <ProfileImageInput
              defaultImage={createFileUrl(user?.avatarUrl)}
              name="avatar"
              className={{ image: "w-60", container: "ml-auto" }}
            />
          </div>
          <Render
            when={Boolean(user?.role === "PROVIDER" || user?.role === "ADMIN")}
          >
            <div className="grid grid-cols-3 gap-x-4">
              <SelectInput
                name="province"
                options={convertToDropdownOptions<Province>(
                  provinces as Province[],
                  {
                    label: "name",
                    value: "name",
                    others: ["id"],
                  },
                )}
                label="Province"
                isClearable={false}
                required
                onChange={(_, selected) => {
                  setSelectedProvinceId(selected?.id);
                }}
              />
              <SelectInput
                name="district"
                options={convertToDropdownOptions<District>(
                  districts as District[],
                  {
                    label: "name",
                    value: "name",
                    others: ["id"],
                  },
                )}
                isClearable={false}
                label="District"
                required
                onChange={(_, selected) => {
                  setSelectedDistrictId(selected?.id);
                }}
              />
              <SelectInput
                name="local"
                options={convertToDropdownOptions<Local>(locals as Local[], {
                  label: "name",
                  value: "name",
                })}
                label="Local"
                required
                isClearable={false}
              />
              <NormalInput name="address" label="Tole/City" required />
              <NormalInput
                name="latitude"
                type="number"
                label="Latitude"
                required
              />
              <NormalInput
                name="longitude"
                type="number"
                label="Longitude"
                required
              />
            </div>

            <TextareaInput name="bio" rows={4} label="Bio" />
          </Render>
          <Button type="submit">Save Changes</Button>
        </form>
      </FormProvider>
    </div>
  );
}
