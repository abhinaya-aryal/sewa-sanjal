import { NotFoundError, status } from "elysia";
import { prisma } from "../../../prisma";
import { UserUpdateInput } from "@prisma/generated/models";
import { uploadFile } from "@utils/file";

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

  return user;
}

export async function updateCurrentUser(
  id: string,
  body: UserUpdateInput & { avatar?: File | null },
) {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) {
    return status("Not Found", { message: "User not found" });
  }

  const { avatar, bio, phone, ...rest } = body;

  if (phone) {
    const existingPhone = await prisma.user.findUnique({
      where: {
        phone,
        NOT: {
          id: id,
        },
      },
    });

    if (existingPhone) {
      throw status("Conflict", "Phone no. already exists in the system");
    }
  }

  let avatarUrl;
  if (avatar) {
    avatarUrl = await uploadFile(avatar, user?.avatarUrl);
  }

  const updatedUser = await prisma.user.update({
    where: { id },
    data: { ...rest, phone, avatarUrl: avatarUrl },
  });

  return updatedUser;
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
