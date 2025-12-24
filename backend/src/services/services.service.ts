import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateServiceDto, UpdateServiceDto } from "./services.dto";

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async create(providerUserId: string, data: CreateServiceDto) {
    const provider = await this.prisma.provider.findUnique({
      where: { userId: providerUserId },
    });

    if (!provider) {
      throw new ForbiddenException("Only providers can create services");
    }

    return this.prisma.service.create({
      data: {
        ...data,
        providerId: provider.id,
      },
    });
  }

  async findAll(filters: { categoryId?: string; providerId?: string }) {
    return this.prisma.service.findMany({
      where: {
        categoryId: filters.categoryId,
        providerId: filters.providerId,
      },
      include: {
        categories: true,
        provider: true,
      },
    });
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: {
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
        categories: true,
      },
    });

    if (!service) {
      throw new NotFoundException("Service not found");
    }

    return service;
  }

  async update(id: string, userId: string, data: UpdateServiceDto) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { provider: true },
    });

    if (!service) throw new NotFoundException("Service not found");

    if (service.provider.userId !== userId) {
      throw new ForbiddenException("Not your service");
    }

    return this.prisma.service.update({
      where: { id },
      data: data,
    });
  }

  async remove(id: string, userId: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
      include: { provider: true },
    });

    if (!service) {
      throw new NotFoundException("Service not found");
    }

    if (service.provider.userId !== userId) {
      throw new ForbiddenException("Not your service");
    }

    await this.prisma.service.delete({ where: { id } });

    return { message: "Service deleted successfully" };
  }
}
