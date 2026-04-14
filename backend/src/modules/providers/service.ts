import { NotFoundError } from "elysia";
import { prisma } from "../../../prisma";
import { Role } from "../../../prisma/generated/enums";

export async function createProvider(userId: string, data: any) {
  const existing = await prisma.provider.findUnique({
    where: { userId },
    select: { id: true },
  });

  if (existing) {
    throw new Error("Provider profile already exists for this user");
  }

  const provider = await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: userId },
      data: { role: Role.PROVIDER },
    });

    await tx.provider.create({
      data: {
        userId,
        bio: data.bio,
        documentUrl: data.documentUrl,
        location: data.location
          ? {
              ...data.location,
              city: data.location.city?.toLowerCase(),
            }
          : undefined,
        categories: data.categoryIds
          ? {
              connect: data?.categoryIds.map((id: string) => ({ id })),
            }
          : undefined,
      },
      include: { categories: true },
    });
  });

  return provider;
}

export async function getAllProviders(filters: {
  category?: string;
  city?: string;
  verified?: boolean;
}) {
  const providers = await prisma.provider.findMany({
    where: {
      isVerified: filters?.verified,
      categories: filters?.category
        ? { some: { id: filters?.category } }
        : undefined,
      location: filters.city
        ? { path: "$.city", equals: filters?.city?.toLowerCase() }
        : undefined,
    },
    include: { categories: true },
  });

  if (!providers) {
    throw new NotFoundError("Providers not found");
  }

  return providers;
}

export async function getProvider(id: string) {
  const provider = await prisma.provider.findUnique({
    where: { id },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          avatarUrl: true,
        },
      },
      categories: true,
      services: true,
    },
  });

  if (!provider) throw new NotFoundError("Provider not found");
  return provider;
}

export async function updateProvider(id: string, userId: string, data: any) {
  const provider = await prisma.provider.findUnique({ where: { id } });
  if (!provider) throw new NotFoundError("Provider not found");
  if (provider.userId !== userId) {
    throw new NotFoundError("User can update own provider profile only");
  }

  return await prisma.provider.update({
    where: { id },
    data: {
      bio: data.bio,
      location: data.location,
      categories: data.categoryIds
        ? { set: [], connect: data.categoryIds.map((id) => ({ id })) }
        : undefined,
    },
  });
}

export async function verifyProvider(id: string) {
  const provider = await prisma.provider.findUnique({ where: { id } });

  if (!provider) {
    throw new NotFoundError("Provider not found");
  }

  if (provider.isVerified) {
    return { message: "Provider already verified" };
  }

  return prisma.provider.update({
    where: { id },
    data: { isVerified: true },
  });
}
