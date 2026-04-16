import Elysia, { t } from "elysia";
import { CategoryPlainInputCreate } from "../../../prisma/prismabox/Category";
import {
  assignCategoryToProvider,
  createCategory,
  getAllCategories,
  getProvidersByCategory,
  removeCategoryFromProvider,
} from "./service";

export const categories = new Elysia({
  prefix: "categories",
  tags: ["Categories"],
})

  .post(
    "/",
    ({ body }) => {
      return createCategory(body);
    },
    { body: CategoryPlainInputCreate },
  )
  .get("/", () => {
    return getAllCategories();
  })
  .delete("/:id/providers/:providerId", ({ params: { id, providerId } }) => {
    return removeCategoryFromProvider(id, providerId);
  })
  .post("/:id/providers/:providerId", ({ params: { id, providerId } }) => {
    return assignCategoryToProvider(id, providerId);
  })
  .get("/:slug/providers", ({ params: { slug } }) => {
    return getProvidersByCategory(slug);
  });
