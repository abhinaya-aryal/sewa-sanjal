import { NotFoundError, status } from "elysia";
import { UserUpdateInput } from "@prisma/generated/models";
import { prisma } from "@prisma/index";
import { AuthUser } from "@shared/types/user";
import { uploadFile } from "@utils/file";
import { Role } from "@prisma/generated/enums";

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
      provider: true,
    },
  });

  if (!user) {
    return status("Not Found", { message: "User not found" });
  }

  return user;
}

export async function updateCurrentUser(
  currentUser: AuthUser,
  body: UserUpdateInput & { avatar?: File | null },
) {
  const user = await prisma.user.findUnique({
    where: { id: currentUser.userId },
  });

  if (!user) {
    return status("Not Found", { message: "User not found" });
  }

  const { avatar, phone, name, email, ...rest } = body;

  if (phone) {
    const existingPhone = await prisma.user.findUnique({
      where: {
        phone,
        NOT: {
          id: currentUser.userId,
        },
      },
    });

    if (existingPhone) {
      throw status("Conflict", "Phone no. already exists in the system");
    }
  }

  let avatarUrl = undefined;
  if (avatar) {
    avatarUrl = await uploadFile(avatar, user?.avatarUrl);
  }

  const updatedUser = await prisma.$transaction(async (tx) => {
    await tx.user.update({
      where: { id: currentUser.userId },
      data: { phone, avatarUrl: avatarUrl, name, email },
    });

    if (currentUser.role === Role.PROVIDER) {
      const { province, local, district, address, latitude, longitude, bio } =
        rest;
      console.log(province);
      return await tx.provider.update({
        where: { userId: currentUser.userId },
        data: {
          location: { province, local, district, address, latitude, longitude },
          bio,
        },
      });
    }
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
