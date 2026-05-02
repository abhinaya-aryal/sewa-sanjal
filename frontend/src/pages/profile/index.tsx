import { Contact, Mail, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { Input, ProfileImageInput, TextareaInput } from "@components/Forms";
import { Button } from "@components/Button";
import { UpdateUserBody, useUpdateUser, useUser } from "@queries/user";
import Render from "@components/Render";
import { createFileUrl } from "@utils/createFileUrl";

export default function Profile() {
  const { data: user } = useUser();

  const formMethods = useForm({
    defaultValues: {
      name: user?.name,
      phone: user?.phone,
      email: user?.email,
    },
  });

  const updateUser = useUpdateUser();

  const handleSubmit = (data: UpdateUserBody) => {
    updateUser.mutate(data);
  };

  return (
    <div className="bg-white w-full rounded-md p-5 gap-8">
      <FormProvider {...formMethods}>
        <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-2">
              <Input
                name="name"
                label="Name"
                required
                icon={<User size={16} className="text-gray-400" />}
              />

              <Input
                name="email"
                type="email"
                label="Email"
                required
                icon={<Mail size={16} className="text-gray-400" />}
              />

              <Input
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
            <TextareaInput name="bio" rows={4} label="Bio" />
          </Render>
          <Button type="submit">Save Changes</Button>
        </form>
      </FormProvider>
    </div>
  );
}
