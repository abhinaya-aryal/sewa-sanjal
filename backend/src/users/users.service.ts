import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateUserDto } from "./users.dto";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const passwordHash = await bcrypt.hash(data.password, 10);

    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data?.phone,
        role: data?.role,
        avatarUrl: data.avatarUrl,
        passwordHash,
      },
    });
  }

  async findAll() {
    return await this.prisma.user.findMany({
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

  async findOne(id: string) {
    return await this.prisma.user.findUnique({
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
  }

  update(id: string) {
    return `This action updates a #${id} user`;
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }
}
