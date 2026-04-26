import { Mail } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { FormInput, ProfileImageInput } from "@components/Forms";

export default function Profile() {
  const formMethods = useForm();

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
          <div className="bg-white w-full rounded-md p-5">
            <FormProvider {...formMethods}>
              <FormInput
                name="name"
                label="Name"
                required
                icon={<Mail size={16} className="text-gray-400" />}
              />

              <ProfileImageInput
                name="avatar"
                label="Profile Picture"
                className={{ image: "w-60" }}
              />
            </FormProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
