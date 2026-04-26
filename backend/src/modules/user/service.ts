import { NotFoundError, status } from "elysia";
import { prisma } from "../../../prisma";
import { createUploadLink, upload } from "@utils/upload";

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

export async function getCurrentUser(id: string) {
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

  if (!user) {
    return status("Not Found", { message: "User not found" });
  }

  const avatarUrl = createUploadLink(user.avatarUrl);

  return { ...user, avatarUrl };
}

export async function updateCurrentUser(
  id: string,
  body: { name?: string; avatar?: File; email?: string; phone?: string },
) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  const { avatar, ...rest } = body;

  let avatarUrl;
  if (avatar) {
    avatarUrl = await upload(avatar);
  }

  if (!user) {
    return status("Not Found", { message: "User not found" });
  }

  return await prisma.user.update({
    where: { id },
    data: { ...rest, avatarUrl: avatarUrl },
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
