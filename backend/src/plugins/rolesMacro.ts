import Elysia from "elysia";
import { Role } from "../../prisma/generated/enums";

export const rolesMacro = new Elysia().macro({
  roles: (allowedRoles: Role[]) => ({
    beforeHandle({ user, set }) {
      if (!user) {
        set.status = 401;
        throw new Error("Unauthorized");
      }

      if (!allowedRoles.includes(user.role)) {
        set.status = 403;
        throw new Error("Forbidden");
      }
    },
  }),
});
