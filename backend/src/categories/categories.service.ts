import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateCategoryDto } from "./categories.dto";

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    return await this.prisma.category.create({ data });
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

  async providerByCategory(categorySlug: string) {
    const category = await this.prisma.category.findUnique({
      where: { slug: categorySlug },
      include: {
        providers: {
          include: {
            user: true,
            categories: true,
          },
        },
      },
    });

    if (!category) throw new NotFoundException("Category not found");

    return category.providers;
  }
}
