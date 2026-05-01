import { Elysia, status, t } from "elysia";
import { UserPlainInputCreate } from "../../../prisma/prismabox/User";
import { login, registerUser } from "./service";
import { jwtPlugin } from "../../plugins/jwt";

export const auth = new Elysia({
  prefix: "/auth",
  tags: ["Auth"],
})
  .use(jwtPlugin)

  // TODO: Allow any string in phone number
  // Normalize the phone no
  // Check for empty value
  // IF empty then null
  // Check for 10 digit validation
  .post("/register", async ({ body }) => await registerUser(body), {
    body: t.Object({
      ...UserPlainInputCreate.properties,
      phone: t.Optional(
        t.Union([t.String({ minLength: 10, maxLength: 10 }), t.Literal("")]),
      ),
    }),
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
    return status(200, { message: "Logged out successfully" });
  })

  .post("/refresh", async ({ cookie }) => {
    const refreshTokenValue = cookie?.refreshToken?.value;

    if (!refreshTokenValue) {
      return status("Unauthorized", "Refresh token is not provided");
    }
  });
