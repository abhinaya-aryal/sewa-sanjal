import Elysia, { t } from "elysia";
import {
  createProvider,
  getAllProviders,
  getProvider,
  updateProvider,
  verifyProvider,
} from "./service";
import {
  ProviderPlainInputCreate,
  ProviderPlainInputUpdate,
} from "../../../prisma/prismabox/Provider";
import { guardMacro } from "../../plugins/guardMacro";
import { Role } from "../../../prisma/generated/enums";

export const providers = new Elysia({
  prefix: "/providers",
  tags: ["Providers"],
})
  .use(guardMacro)

  .post(
    "/",
    ({ user, body }) => {
      return createProvider(user.userId, body);
    },
    {
      body: ProviderPlainInputCreate,
      authGuard: true,
    },
  )

  .get(
    ":id",
    ({ params: { id } }) => {
      return getProvider(id);
    },
    { params: t.Object({ id: t.String() }) },
  )

  .get(
    "/",
    ({ query: { category, city, verified, search } }) => {
      return getAllProviders({ category, city, verified, search });
    },
    {
      query: t.Object({
        category: t.Optional(t.String()),
        city: t.Optional(t.String()),
        verified: t.Optional(t.Boolean()),
        search: t.Optional(t.String()),
      }),
    },
  )

  .patch(
    ":id",
    ({ params: { id }, user, body }) => {
      return updateProvider(id, user.userId, body);
    },
    {
      params: t.Object({ id: t.String() }),
      body: ProviderPlainInputUpdate,
      authGuard: true,
    },
  )

  .post(
    ":id/verify",
    ({ params: { id } }) => {
      return verifyProvider(id);
    },
    { rolesGuard: [Role.ADMIN] },
  );
