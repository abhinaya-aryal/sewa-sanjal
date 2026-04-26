import { Contact, Mail, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput, ProfileImageInput } from "@components/Forms";
import { Button } from "@components/Button";
import { UpdateUserBody, useUpdateUser, useUser } from "@queries/user";

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
    updateUser.mutate(data, {
      onSuccess: () => {
        console.log("User update successfully");
      },
      onError: () => {
        console.log("Something went wrong. Please try again");
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-row gap-8">
          <div className="w-64 bg-white p-5 rounded-lg border border-gray-200 shadow-sm sticky top-48">
            <div className="mb-6">
              <div className="space-y-1">
                <button
                  className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors bg-primary-50 text-primary-700 font-medium hover:bg-gray-50 cursor-pointer`}
                >
                  Profile
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white w-full rounded-md p-5 gap-8">
            <FormProvider {...formMethods}>
              <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
                <div className="grid grid-cols-3 gap-8">
                  <div className="col-span-2">
                    <FormInput
                      name="name"
                      label="Name"
                      required
                      icon={<User size={16} className="text-gray-400" />}
                    />

                    <FormInput
                      name="email"
                      type="email"
                      label="Email"
                      required
                      icon={<Mail size={16} className="text-gray-400" />}
                    />

                    <FormInput
                      name="phone"
                      type="number"
                      label="Contact"
                      required
                      icon={<Contact size={16} className="text-gray-400" />}
                    />
                  </div>
                  <ProfileImageInput
                    defaultImage={user?.avatarUrl}
                    name="avatar"
                    className={{ image: "w-60", container: "ml-auto" }}
                  />
                </div>

                <Button type="submit">Save Changes</Button>
              </form>
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
