import { Button } from "@components/Button";
import { Input, TextareaInput } from "@components/Forms";
import { Modal } from "@components/Modal";
import { useCreateService } from "@queries/service";
import { Activity, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function ProfileService() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const formMethods = useForm();

  const createService = useCreateService();
  const handleSubmit = (data) => {
    createService.mutate(
      {
        body: {
          ...data,
          price: Number.parseInt(data.price),
        },
      },
      {
        onSuccess: () => setIsModalOpen(false),
      },
    );
  };

  return (
    <>
      <div className="bg-white w-full rounded-md p-5 gap-8 flex flex-row justify-between">
        <div>My Services</div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          Add Service
        </Button>
      </div>

      <Activity mode={isModalOpen ? "visible" : "hidden"}>
        <Modal
          onClose={() => setIsModalOpen(false)}
          className={{ wrapper: "w-3xl" }}
        >
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(handleSubmit)}>
              <Input name="title" label="Title" required />
              <TextareaInput name="description" rows={4} label="Description" />
              <div className="flex flex-row gap-3">
                <Input
                  name="durationMin"
                  label="Duration (Minutes)"
                  required
                  type="number"
                />
                <Input name="price" label="Price" required type="number" />
              </div>
              <Button type="submit" className="ml-auto">
                Save
              </Button>
            </form>
          </FormProvider>
        </Modal>
      </Activity>
    </>
  );
}
