import Elysia from "elysia";
import {
  createService,
  deleteService,
  getAllServices,
  getService,
  updateService,
} from "./service";
import { guardMacro } from "../../plugins/guardMacro";
import {
  ServicePlainInputCreate,
  ServicePlainInputUpdate,
} from "@prisma/prismabox/Service";
import { Role } from "@prisma/generated/enums";

export const services = new Elysia({ prefix: "services", tags: ["Services"] })

  .use(guardMacro)

  .post(
    "/",
    ({ user, body }) => {
      return createService(user.userId, body);
    },
    { body: ServicePlainInputCreate, rolesGuard: [Role.PROVIDER] },
  )

  .get(
    "/",
    ({ query: { categoryId, providerId } }) => {
      return getAllServices({ categoryId, providerId });
    },
    { authGuard: true },
  )

  .get(":id", ({ params: { id } }) => {
    return getService(id);
  })

  .patch(
    ":id",
    ({ user, body, params: { id } }) => {
      return updateService(id, user.userId, body);
    },
    { body: ServicePlainInputUpdate, authGuard: true },
  )

  .delete(
    ":id",
    ({ user, params: { id } }) => {
      return deleteService(id, user.userId);
    },
    { authGuard: true },
  );
