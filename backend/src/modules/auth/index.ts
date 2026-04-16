import { Elysia, t } from "elysia";
import { UserPlainInputCreate } from "../../../prisma/prismabox/User";
import { login, registerUser } from "./service";

export const auth = new Elysia({
  prefix: "/auth",
  tags: ["Auth"],
})
  .post("/register", async ({ body }) => await registerUser(body), {
    body: UserPlainInputCreate,
  })
  .post(
    "/login/web",
    async ({ body, jwt, cookie }) => {
      const { webToken } = await login(jwt, body);
      cookie.auth.set({
        value: webToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 60,
      });

      return { message: "Web login successful", token: webToken };
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    },
  )
  .post(
    "/login/mobile",
    async ({ jwt, body }) => {
      const { mobileToken } = await login(jwt, body);
      return {
        accessToken: mobileToken,
        tokenType: "Bearer",
      };
    },
    {
      body: t.Object({
        email: t.String(),
        password: t.String(),
      }),
    },
  )
  .post("/logout", ({ cookie }) => {
    cookie.auth.set({ value: "", maxAge: 0 });
    return { ok: true };
  });
