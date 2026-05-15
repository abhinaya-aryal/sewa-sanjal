import Elysia from "elysia";
import {
  deleteUser,
  getAllUser,
  getCurrentUser,
  getUser,
  updateCurrentUser,
} from "./service";
import { guardMacro } from "../../plugins/guardMacro";
import { UserPlainInputUpdate } from "@prisma/prismabox/User";
import { ProviderPlainInputUpdate } from "@prisma/prismabox/Provider";
import { t } from "elysia";
import { Role } from "@prisma/generated/enums";

export const UserUpdate = t.Object({
  ...UserPlainInputUpdate.properties,
  ...ProviderPlainInputUpdate.properties,
  avatar: t.Optional(t.File()),
  province: t.Optional(t.String()),
  local: t.Optional(t.String()),
  district: t.Optional(t.String()),
  address: t.Optional(t.String()),
  latitude: t.Optional(t.String()),
  longitude: t.Optional(t.String()),
});

export const user = new Elysia({ prefix: "/users", tags: ["Users"] })
  .use(guardMacro)

  .get(
    "/",
    () => {
      return getAllUser();
    },
    { authGuard: true },
  )

  .get(
    "/me",
    ({ user }) => {
      return getCurrentUser(user.userId);
    },
    { authGuard: true },
  )

  .patch(
    "/me",
    ({ user, body }) => {
      return updateCurrentUser(user, body);
    },
    {
      authGuard: true,
      body: UserUpdate,
    },
  )

  .get(
    "/:id",
    ({ params: { id } }) => {
      return getUser(id);
    },
    { rolesGuard: [Role.ADMIN] },
  )

  .delete(
    "/:id",
    ({ params: { id } }) => {
      return deleteUser(id);
    },
    { authGuard: true },
  );
