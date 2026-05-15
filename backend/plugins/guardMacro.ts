import Elysia, { status } from "elysia";
import { Role } from "../../prisma/generated/enums";
import { jwtPlugin } from "./jwt";

type AuthUser = {
  userId: string;
  role: Role;
};

export const guardMacro = new Elysia({ name: "authGuard" })
  .use(jwtPlugin)
  .macro({
    authGuard: (enabled: boolean) => ({
      async resolve({ cookie, headers, jwt }) {
        const tokenFromCookie = cookie.auth?.value;
        const tokenFromHeader = headers.authorization?.slice(7);

        const token = tokenFromCookie ?? tokenFromHeader;
        if (!token && enabled) {
          return status(401, "Invalid cookie or token");
        }

        const payload = await jwt.verify(token as string);
        if (!payload && enabled) {
          return status(401, "Invalid cookie or token");
        }

        return { user: payload as AuthUser };
      },
    }),
  })

  .macro({
    rolesGuard: (allowedRoles: Role[]) => ({
      authGuard: true,
      beforeHandle({ user }) {
        if (!user) {
          return status(401, "Unauthorized");
        }
        if (!allowedRoles.includes(user.role)) {
          return status(403, "FORBIDDEN");
        }
      },
    }),
  });
