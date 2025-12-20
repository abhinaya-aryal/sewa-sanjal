import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";
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
}
