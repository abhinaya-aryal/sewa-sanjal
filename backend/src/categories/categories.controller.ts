import { Body, Controller, Get, Post, UseGuards, Param } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation, ApiParam } from "@nestjs/swagger";
import { AuthGuard } from "src/common/guards/auth.guard";

import { CreateCategoryDto } from "./categories.dto";
import { CategoriesService } from "./categories.service";

@ApiBearerAuth("access-token")
@UseGuards(AuthGuard)
@Controller("categories")
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiOperation({ summary: "Create a category" })
  @Post()
  create(@Body() data: CreateCategoryDto) {
    return this.categoriesService.create(data);
  }

  @ApiOperation({ summary: "List of categories" })
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @ApiOperation({
    summary: "Assign category to provider",
  })
  @ApiParam({
    name: "providerId",
    required: true,
    example: "cmje5zmtk00009pqewhgd5eob",
  })
  @ApiParam({
    name: "categoryId",
    required: true,
    example: "cmjdqoiop00009pqe67mjvj51",
  })
  @Post(":categoryId/providers/:providerId")
  assign(
    @Param("providerId") providerId: string,
    @Param("categoryId") categoryId: string,
  ) {
    return this.categoriesService.assignToProvider(providerId, categoryId);
  }

  @ApiOperation({ summary: "Remove category from provider" })
  @ApiParam({
    name: "providerId",
    example: "cmje5zmtk00009pqewhgd5eob",
  })
  @ApiParam({
    name: "categoryId",
    example: "cmjdqoiop00009pqe67mjvj51",
  })
  @Post(":categoryId/providers/:providerId/remove")
  remove(
    @Param("providerId") providerId: string,
    @Param("categoryId") categoryId: string,
  ) {
    return this.categoriesService.removeFromProvider(providerId, categoryId);
  }

  @ApiOperation({ summary: "Get providers by category slug" })
  @ApiParam({ name: "slug", example: "electrician" })
  @Get(":slug/providers")
  providersByCategory(@Param("slug") slug: string) {
    return this.categoriesService.providersByCategory(slug);
  }
}
