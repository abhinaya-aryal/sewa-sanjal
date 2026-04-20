import Elysia from "elysia";
import { CategoryPlainInputCreate } from "../../../prisma/prismabox/Category";
import {
  assignCategoryToProvider,
  createCategory,
  getAllCategories,
  getProvidersByCategory,
  removeCategoryFromProvider,
} from "./service";
import { guardMacro } from "../../plugins/guardMacro";
import { Role } from "../../../prisma/generated/enums";

export const categories = new Elysia({
  prefix: "categories",
  tags: ["Categories"],
})

  .use(guardMacro)

  .post(
    "/",
    ({ body }) => {
      return createCategory(body);
    },
    { body: CategoryPlainInputCreate, rolesGuard: [Role.ADMIN] },
  )

  .get("/", () => {
    return getAllCategories();
  })

  .delete(
    "/:id/providers/:providerId",
    ({ params: { id, providerId } }) => {
      return removeCategoryFromProvider(id, providerId);
    },
    { authGuard: true },
  )

  .post("/:id/providers/:providerId", ({ params: { id, providerId } }) => {
    return assignCategoryToProvider(id, providerId);
  })

  .get(
    "/:slug/providers",
    ({ params: { slug } }) => {
      return getProvidersByCategory(slug);
    },
    { authGuard: true },
  );
