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
import { guardMacro } from "../../plugins/guardMacro";
import { Role } from "../../../prisma/generated/enums";

export const availabilities = new Elysia({
  prefix: "/providers/:id/availabilities",
  tags: ["Availabilities"],
})

  .use(guardMacro)

  .post(
    "/",
    ({ params: { id }, body }) => {
      return createAvailabilityForProvider(id, body);
    },
    { body: AvailabilityPlainInputCreate, rolesGuard: [Role.PROVIDER] },
  )

  .get(
    "/",
    ({ params: { id } }) => {
      return getAvailabilityOfProvider(id);
    },
    { authGuard: true },
  )

  .patch(
    "/:availabilityId",
    ({ params: { id, availabilityId }, body }) => {
      return updateAvailabilityOfProvider(availabilityId, id, body);
    },
    {
      body: AvailabilityPlainInputUpdate,
      params: t.Object({ id: t.String(), availabilityId: t.String() }),
      rolesGuard: [Role.PROVIDER],
    },
  )

  .delete(
    "/:availabilityId",
    ({ params: { id, availabilityId } }) => {
      return removeCategoryFromProvider(availabilityId, id);
    },
    { rolesGuard: [Role.PROVIDER] },
  );
