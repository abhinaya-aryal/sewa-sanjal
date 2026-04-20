import Elysia from "elysia";
import { deleteUser, getAllUser, getUser } from "./service";
import { Role } from "../../../prisma/generated/enums";
import { guardMacro } from "../../plugins/guardMacro";

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
      return { id: user.userId, role: user.role };
    },
    { authGuard: true },
  )
  .patch(
    "/me",
    ({ user }) => {
      return `This action updates a #${user.userId} user`;
    },
    { authGuard: true },
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
