import Elysia, { t } from "elysia";
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
        name: t.Optional(t.String()),
        avatar: t.Optional(t.Nullable(t.File())),
        email: t.Optional(t.String()),
        phone: t.Optional(t.Nullable(t.String())),
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
