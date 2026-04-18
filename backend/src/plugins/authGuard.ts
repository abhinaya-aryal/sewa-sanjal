import Elysia, { InvalidCookieSignature } from "elysia";
import { Role } from "../../prisma/generated/enums";

export const authGuard = new Elysia().derive(
  { as: "scoped" },
  async ({ cookie, headers, set, jwt }) => {
    const tokenFromCookie = cookie.auth?.value;
    const tokenFromHeader = headers.authorization?.slice(7);

    const token = tokenFromCookie ?? tokenFromHeader;
    if (!token) {
      set.status = 401;
      throw new InvalidCookieSignature("auth", "Invalid cookie or token");
    }

    const payload = await jwt.verify(token);
    if (!payload) {
      set.status = 401;
      throw new InvalidCookieSignature("auth", "Invalid cookie or token");
    }

    return { user: payload as { userId: string; role: Role } };
  },
);
