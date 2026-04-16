import { Elysia } from "elysia";
import { jwtPlugin } from "./plugins/jwt";
import { errorHandler } from "./plugins/errorHandler";
import { authGuard } from "./plugins/authGuard";
import { auth } from "./modules/auth";
import { user } from "./modules/user";
import { services } from "./modules/services";
import { providers } from "./modules/providers";
import { categories } from "./modules/categories";
import { availabilities } from "./modules/availabilities";
import { openApi } from "./plugins/openApi";

const app = new Elysia()
  .use(openApi)
  .use(errorHandler)
  .use(jwtPlugin)
  // Public routes (no auth required)
  .use(auth)
  // Protected routes group
  .group("", (app) =>
    app
      .use(authGuard)
      .use(user)
      .use(services)
      .use(providers)
      .use(categories)
      .use(availabilities),
  )
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
