import Elysia, { t } from "elysia";
import {
  createAvailabilityForProvider,
  getAvailabilityOfProvider,
  updateAvailabilityOfProvider,
} from "./service";
import {
  AvailabilityPlainInputCreate,
  AvailabilityPlainInputUpdate,
} from "../../../prisma/prismabox/Availability";
import { removeCategoryFromProvider } from "../categories/service";

export const availabilities = new Elysia({
  prefix: "/providers/:id/availabilities",
  tags: ["Availabilities"],
})
  .post(
    "/",
    ({ params: { id }, body }) => {
      return createAvailabilityForProvider(id, body);
    },
    { body: AvailabilityPlainInputCreate },
  )
  .get("/", ({ params: { id } }) => {
    return getAvailabilityOfProvider(id);
  })
  .patch(
    "/:availabilityId",
    ({ params: { id, availabilityId }, body }) => {
      return updateAvailabilityOfProvider(availabilityId, id, body);
    },
    {
      body: AvailabilityPlainInputUpdate,
      params: t.Object({ id: t.String(), availabilityId: t.String() }),
    },
  )
  .delete("/:availabilityId", ({ params: { id, availabilityId } }) => {
    return removeCategoryFromProvider(availabilityId, id);
  });
