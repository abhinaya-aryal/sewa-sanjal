import { NotFoundError } from "elysia";
import { prisma } from "../../../prisma";

export async function createService(userId: string, body: any) {
  const provider = await prisma.provider.findUnique({
    where: { userId: userId },
  });

  if (!provider) {
    throw new Error("Only providers can create services.");
  }

  return await prisma.service.create({
    data: {
      ...body,
      providerId: provider.id,
    },
  });
}

export async function getAllServices(filters: {
  categoryId?: string;
  providerId?: string;
}) {
  return await prisma.service.findMany({
    where: {
      categoryId: filters?.categoryId,
      providerId: filters?.providerId,
    },
    include: {
      categories: true,
      provider: true,
    },
  });
}

export async function getService(id: string) {
  const service = await prisma.service.findUnique({
    where: { id },
    include: {
      categories: true,
      provider: {
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
        },
      },
    },
  });

  if (!service) {
    throw new NotFoundError("Service not found");
  }

  return service;
}

export async function updateService(id: string, userId: string, body: any) {
  const service = await prisma.service.findUnique({
    where: { id },
    include: { provider: true },
  });

  if (!service) {
    throw new NotFoundError("Service not found");
  }

  if (service.provider.userId !== userId) {
    throw new NotFoundError("Not your service");
  }

  return await prisma.service.update({
    where: { id },
    data: body,
  });
}

export async function deleteService(id: string, userId: string) {
  const service = await prisma.service.findUnique({
    where: { id },
    include: { provider: true },
  });

  if (!service) {
    throw new NotFoundError("Service not found");
  }

  if (service.provider.userId !== userId) {
    throw new NotFoundError("Not your service");
  }

  await prisma.service.delete({ where: { id } });

  return { message: "Service deleted successfully" };
}
