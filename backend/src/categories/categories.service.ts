import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateCategoryDto } from "./categories.dto";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    const existingName = await this.prisma.category.findUnique({
      where: { name: data.name },
      select: { id: true },
    });
    if (existingName) {
      throw new ConflictException({
        field: "name",
        message: "Category with this name already exists",
      });
    }

    const existingSlug = await this.prisma.category.findUnique({
      where: { slug: data.slug },
      select: { id: true },
    });
    if (existingSlug) {
      throw new ConflictException({
        field: "slug",
        message: "Category with this slug already exists",
      });
    }

    return await this.prisma.category.create({
      data: {
        ...data,
        name: data.name.trim(),
        slug: data.slug.trim().toLowerCase(),
      },
    });
  }

  async findAll() {
    return await this.prisma.category.findMany({ orderBy: { name: "asc" } });
  }

  async assignToProvider(providerId: string, categoryId: string) {
    return await this.prisma.provider.update({
      where: { id: providerId },
      data: {
        categories: {
          connect: { id: categoryId },
        },
      },
      include: {
        categories: true,
      },
    });
  }

  async removeFromProvider(providerId: string, categoryId: string) {
    return await this.prisma.provider.update({
      where: { id: providerId },
      data: {
        categories: {
          disconnect: { id: categoryId },
        },
      },
      include: {
        categories: true,
      },
    });
  }

  async providersByCategory(categorySlug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug: categorySlug },
      include: {
        providers: {
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
            categories: true,
          },
        },
      },
    });

    if (!category) throw new NotFoundException("Category not found");

    return category.providers;
  }
}
