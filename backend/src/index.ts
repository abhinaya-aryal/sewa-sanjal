import { Elysia, InvalidCookieSignature } from "elysia";
import { openapi } from "@elysiajs/openapi";
import { auth } from "./modules/auth";
import { user } from "./modules/user";
import { jwtPlugin } from "./plugins/jwt";
import { services } from "./modules/services";
import { providers } from "./modules/providers";
import { categories } from "./modules/categories";
import { availabilities } from "./modules/availabilities";

const app = new Elysia()
  .use(openapi())
  .onError(({ error, code }) => {
    return {
      error: error instanceof Error ? error.message : "Internal Server Error",
      code,
    };
  })
  .use(jwtPlugin)
  .use(auth)
  .derive(async ({ cookie: { auth }, headers, set, jwt }) => {
    const tokenFromCookie = auth?.value;
    const tokenFromHeader = headers.authorization?.slice(7);

    const token = tokenFromCookie ?? tokenFromHeader;
    if (!token) {
      set.status = 401;
      throw new InvalidCookieSignature("auth", "Invalid cookie.");
    }

    const payload = await jwt.verify(token as string);

    if (!payload) {
      set.status = 401;
      throw new InvalidCookieSignature("auth", "Invalid cookie");
    }

    return { user: payload };
  })
  .use(user)
  .use(services)
  .use(providers)
  .use(categories)
  .use(availabilities)
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
