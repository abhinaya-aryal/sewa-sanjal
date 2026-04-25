import { prisma } from "../../../prisma";
import * as bcrypt from "bcrypt";
import { UserPlainInputCreate } from "../../../prisma/prismabox/User";
import { Static } from "elysia";
import { Role } from "@prisma/generated/enums";

export async function registerUser(body: Static<typeof UserPlainInputCreate>) {
  const existingEmail = await prisma.user.findUnique({
    where: { email: body.email },
    select: { id: true },
  });

  if (existingEmail) {
    throw new Error("Email already exists");
  }

  if (body.phone) {
    const existingPhone = await prisma.user.findUnique({
      where: { phone: body.phone },
      select: { id: true },
    });

    if (existingPhone) {
      throw new Error("Phone already exists");
    }
  }

  const hashedPassword = await bcrypt.hash(body.password, 12);
  const { password, ...rest } = body;

  if (body.role === Role.PROVIDER) {
    const provider = await prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          ...rest,
          password: hashedPassword,
        },
      });

      await tx.provider.create({
        data: {
          userId: user.id,
        },
      });
    });

    return provider;
  }

  return prisma.user.create({
    data: {
      ...rest,
      password: hashedPassword,
    },
    select: {
      name: true,
      email: true,
      phone: true,
      role: true,
      avatarUrl: true,
    },
  });
}

export async function login(jwt, body: { email: string; password: string }) {
  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isMatch = await bcrypt.compare(body.password, user.password);

  if (!isMatch) {
    throw new Error("Invalid credentials");
  }

  const webToken = await jwt.sign({
    userId: user.id,
    client: "web",
    role: user.role,
  });

  const mobileToken = await jwt.sign({
    userId: user.id,
    client: "mobile",
    role: user.role,
  });

  return { webToken, mobileToken };
}
