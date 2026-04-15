import Elysia from "elysia";
import { deleteUser, getAllUser, getUser } from "./service";

export const user = new Elysia({ prefix: "/users" })
  .get("/", () => {
    return getAllUser();
  })
  .get("/me", ({ user }) => {
    return { id: user.userId, role: user.role };
  })
  .patch("/me", ({ user }) => {
    return `This action updates a #${user.userId} user`;
  })
  .get("/:id", ({ params: { id } }) => {
    return getUser(id);
  })
  .delete("/:id", ({ params: { id } }) => {
    return deleteUser(id);
  });
