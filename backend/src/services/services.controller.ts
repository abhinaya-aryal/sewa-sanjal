import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from "@nestjs/swagger";
import { Role } from "prisma/generated/enums";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";
import type { JwtUser } from "src/common/types";

import { CreateServiceDto } from "./services.dto";
import { ServicesService } from "./services.service";

@ApiTags("Services")
@ApiBearerAuth("access-token")
@UseGuards(AuthGuard)
@Controller("services")
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @ApiOperation({
    summary: "Create a new service",
    description: "Only providers can create a new service",
  })
  @UseGuards(RolesGuard)
  @Roles(Role.PROVIDER)
  @Post()
  create(@CurrentUser() user: JwtUser, @Body() data: CreateServiceDto) {
    return this.servicesService.create(user.id, data);
  }

  @ApiOperation({ summary: "List all the services" })
  @ApiQuery({ name: "categoryId", required: false })
  @ApiQuery({ name: "providerId", required: false })
  @Get()
  findAll(
    @Query("categoryId") categoryId?: string,
    @Query("providerId") providerId?: string,
  ) {
    return this.servicesService.findAll({ categoryId, providerId });
  }

  @ApiOperation({ summary: "Info of the specific service" })
  @ApiParam({ name: "id", example: "cmjfdzlyf0002g9qenmpp03et" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.servicesService.findOne(id);
  }
}
