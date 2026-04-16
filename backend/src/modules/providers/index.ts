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

export const providers = new Elysia({
  prefix: "/providers",
  tags: ["Providers"],
})
  .post(
    "/",
    ({ user, body }) => {
      return createProvider(user.userId, body);
    },
    {
      body: ProviderPlainInputCreate,
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
    ({ query: { category, city, verified } }) => {
      return getAllProviders({ category, city, verified });
    },
    {
      query: t.Object({
        category: t.Optional(t.String()),
        city: t.Optional(t.String()),
        verified: t.Optional(t.Boolean()),
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
    },
  )
  .post(":id/verify", ({ params: { id } }) => {
    return verifyProvider(id);
  });
