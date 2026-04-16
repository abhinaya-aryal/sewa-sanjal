import Elysia from "elysia";
import {
  createService,
  deleteService,
  getAllServices,
  getService,
  updateService,
} from "./service";
import {
  ServicePlainInputCreate,
  ServicePlainInputUpdate,
} from "../../../prisma/prismabox/Service";

export const services = new Elysia({ prefix: "services", tags: ["Services"] })
  .post(
    "/",
    ({ user, body }) => {
      return createService(user.userId, body);
    },
    { body: ServicePlainInputCreate },
  )
  .get("/", ({ query: { categoryId, providerId } }) => {
    return getAllServices({ categoryId, providerId });
  })
  .get(":id", ({ params: { id } }) => {
    return getService(id);
  })
  .patch(
    ":id",
    ({ user, body, params: { id } }) => {
      return updateService(id, user.userId, body);
    },
    { body: ServicePlainInputUpdate },
  )
  .delete(":id", ({ user, params: { id } }) => {
    return deleteService(id, user.userId);
  });
