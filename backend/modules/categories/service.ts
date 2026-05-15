import { NotFoundError } from "elysia";
import { prisma } from "@prisma/index";

export async function createCategory(data: any) {
  const existingName = await prisma.category.findUnique({
    where: { name: data.name },
    select: { id: true },
  });

  if (existingName) {
    throw new Error("Category with this name already exists");
  }

  const existingSlug = await prisma.category.findUnique({
    where: { slug: data.slug },
    select: { id: true },
  });

  if (existingSlug) {
    throw new Error("Category with this slug already exists");
  }

  return await prisma.category.create({
    data: {
      ...data,
      name: data.name.trim(),
      slug: data.slug.trim().toLowerCase(),
    },
  });
}

export async function getAllCategories() {
  return await prisma.category.findMany({ orderBy: { name: "asc" } });
}

export async function assignCategoryToProvider(id: string, providerId: string) {
  return await prisma.provider.update({
    where: { id: providerId },
    data: {
      categories: {
        connect: { id },
      },
    },
    include: {
      categories: true,
    },
  });
}

export async function removeCategoryFromProvider(
  id: string,
  providerId: string,
) {
  return await prisma.provider.update({
    where: { id: providerId },
    data: {
      categories: {
        disconnect: { id },
      },
    },
    include: {
      categories: true,
    },
  });
}

export async function getProvidersByCategory(slug: string) {
  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      providers: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
              phone: true,
              avatarUrl: true,
            },
          },
          categories: true,
        },
      },
    },
  });

  if (!category) {
    throw new NotFoundError("Category not found");
  }

  return category.providers;
}
