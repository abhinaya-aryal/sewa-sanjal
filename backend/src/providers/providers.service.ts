import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateProviderDto, UpdateProviderDto } from "./providers.dto";

@Injectable()
export class ProvidersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, role: string, data: CreateProviderDto) {
    if (role !== "PROVIDER")
      throw new ForbiddenException(
        "Only providers can create provider profile",
      );

    return this.prisma.provider.create({
      data: {
        userId,
        bio: data.bio,
        documentUrl: data.documentUrl,
        location: data.location,
        categories: data.categoryIds
          ? {
              connect: data?.categoryIds.map((id) => ({ id })),
            }
          : undefined,
      },
      include: { categories: true },
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
          ? { path: "$.city", equals: filters.city }
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
        user: true,
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
