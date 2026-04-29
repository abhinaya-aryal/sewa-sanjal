import Elysia from "elysia";
import {
  deleteUser,
  getAllUser,
  getCurrentUser,
  getUser,
  updateCurrentUser,
} from "./service";
import { Role } from "../../../prisma/generated/enums";
import { guardMacro } from "../../plugins/guardMacro";
import { UserPlainInputUpdate } from "@prisma/prismabox/User";
import { t } from "elysia";

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
      return updateCurrentUser(user.userId, body);
    },
    {
      authGuard: true,
      body: t.Object({
        ...UserPlainInputUpdate.properties,
        avatar: t.Optional(t.File()),
      }),
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
