import { Elysia } from "elysia";
import { auth } from "./modules/auth";
import { user } from "./modules/user";
import { services } from "./modules/services";
import { providers } from "./modules/providers";
import { categories } from "./modules/categories";
import { availabilities } from "./modules/availabilities";
import { openApi } from "./plugins/openApi";
import cors from "@elysiajs/cors";
import staticPlugin from "@elysia/static";
import { error } from "@plugins/error";
import { normalize } from "@plugins/normalize";

const app = new Elysia({ allowUnsafeValidationDetails: true })
  .use(cors())
  .use(openApi)
  .use(error)
  .use(normalize)
  .use(auth)
  .use(user)
  .use(services)
  .use(providers)
  .use(categories)
  .use(availabilities)
  .use(staticPlugin())
  .listen(4000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);

export type Api = typeof app;
