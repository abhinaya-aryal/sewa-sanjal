import { NotFoundError } from "elysia";
import { prisma } from "../../../prisma";

export async function getAllUser() {
  return await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      avatarUrl: true,
    },
  });
}

export async function getUser(id: string) {
  const user = await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      phone: true,
      avatarUrl: true,
    },
  });

  if (user) {
    return user;
  } else {
    throw new NotFoundError(`User with ${id} not found`);
  }
}

export async function deleteUser(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });
  if (user) {
    prisma.user.delete({ where: { id: user.id } });
  } else {
    throw new NotFoundError(`User with ${id} not found`);
  }
}
