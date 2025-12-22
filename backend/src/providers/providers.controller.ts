import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
} from "@nestjs/swagger";
import { Role } from "prisma/generated/enums";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

import { CreateProviderDto, UpdateProviderDto } from "./providers.dto";
import { ProvidersService } from "./providers.service";

@ApiBearerAuth("access-token")
@UseGuards(AuthGuard)
@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @ApiOperation({ summary: "User requests to become a service provider" })
  @Post()
  create(@CurrentUser() user: { id: string }, @Body() data: CreateProviderDto) {
    return this.providersService.create(user.id, data);
  }

  @ApiOperation({ summary: "Get Provider by id" })
  @ApiParam({
    name: "id",
    example: "cmjf76wxk00006dqe4or0st9v",
  })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.providersService.findOne(id);
  }

  @Get()
  @ApiQuery({ name: "category", required: false, description: "Category Id" })
  @ApiQuery({ name: "city", required: false })
  @ApiQuery({ name: "verified", required: false })
  findAll(
    @Query("category") category?: string,
    @Query("city") city?: string,
    @Query("verified") verified?: string,
  ) {
    return this.providersService.findAll({
      category,
      city,
      verified: verified ? verified === "true" : undefined,
    });
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @CurrentUser() user: { id: string },
    @Body() dto: UpdateProviderDto,
  ) {
    return this.providersService.update(id, user.id, dto);
  }

  @ApiOperation({ summary: "Verify the provider by admin" })
  @ApiParam({
    name: "id",
    example: "cmje5zmtk00009pqewhgd5eob",
  })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post(":id/verify")
  verify(@Param("id") id: string) {
    return this.providersService.verify(id);
  }
}
