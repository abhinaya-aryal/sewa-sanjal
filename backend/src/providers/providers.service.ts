import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Role } from "prisma/generated/enums";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateProviderDto, UpdateProviderDto } from "./providers.dto";

@Injectable()
export class ProvidersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, data: CreateProviderDto) {
    const existing = await this.prisma.provider.findUnique({
      where: { userId },
      select: { id: true },
    });

    if (existing) {
      throw new ConflictException(
        "Provider profile already exists for this user",
      );
    }

    await this.prisma.user.update({
      where: { id: userId },
      data: { role: Role.PROVIDER },
    });

    return await this.prisma.$transaction(async (tx) => {
      await tx.user.update({
        where: { id: userId },
        data: { role: Role.PROVIDER },
      });

      return await tx.provider.create({
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
                connect: data?.categoryIds.map((id) => ({ id })),
              }
            : undefined,
        },
        include: { categories: true },
      });
    });
  }

  async findAll(filters: {
    category?: string;
    city?: string;
    verified?: boolean;
  }) {
    return this.prisma.provider.findMany({
      where: {
        isVerified: filters.verified,
        categories: filters.category
          ? { some: { id: filters.category } }
          : undefined,
        location: filters.city
          ? { path: "$.city", equals: filters.city.toLowerCase() }
          : undefined,
      },
      include: {
        categories: true,
      },
    });
  }

  async findOne(id: string) {
    const provider = await this.prisma.provider.findUnique({
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

    if (!provider) throw new NotFoundException("Provider not found");
    return provider;
  }

  async update(id: string, userId: string, dto: UpdateProviderDto) {
    const provider = await this.prisma.provider.findUnique({ where: { id } });
    if (!provider) throw new NotFoundException();
    if (provider.userId !== userId) throw new ForbiddenException();

    return this.prisma.provider.update({
      where: { id },
      data: {
        bio: dto.bio,
        location: dto.location,
        categories: dto.categoryIds
          ? { set: [], connect: dto.categoryIds.map((id) => ({ id })) }
          : undefined,
      },
    });
  }

  async verify(id: string) {
    return this.prisma.provider.update({
      where: { id },
      data: { isVerified: true },
    });
  }
}
