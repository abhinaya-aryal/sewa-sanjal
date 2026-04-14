import { NotFoundError } from "elysia";
import { prisma } from "../../../prisma";

export async function createAvailabilityForProvider(
  providerId: string,
  data: any,
) {
  return await prisma.availability.create({
    data: {
      ...data,
      providerId,
    },
  });
}

export async function getAvailabilityOfProvider(providerId: string) {
  return await prisma.availability.findMany({
    where: { providerId },
    orderBy: [{ dayOfWeek: "asc" }, { startTime: "asc" }],
  });
}

export async function updateAvailabilityOfProvider(
  id: string,
  providerId: string,
  data: any,
) {
  const availability = await prisma.availability.findUnique({
    where: { id },
  });

  if (!availability) {
    throw new NotFoundError("Availability not found");
  }

  if (availability.providerId !== providerId) {
    throw new Error("You cannot modify this availability");
  }

  return await prisma.availability.update({ where: { id }, data });
}

export async function removeAvailabilityOfProvider(
  id: string,
  providerId: string,
) {
  const availability = await prisma.availability.findUnique({
    where: { id },
  });

  if (!availability) {
    throw new NotFoundError("Availability already deleted");
  }

  if (availability.providerId !== providerId) {
    throw new Error("You cannot delete this availability");
  }

  return await prisma.availability.delete({ where: { id } });
}
