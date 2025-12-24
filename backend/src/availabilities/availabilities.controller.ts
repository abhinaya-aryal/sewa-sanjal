import {
  Controller,
  Post,
  Body,
  Param,
  UseGuards,
  Get,
  Patch,
  Delete,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { Role } from "prisma/generated/enums";
import { Roles } from "src/common/decorators/roles.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

import {
  CreateAvailabilityDto,
  UpdateAvailabilityDto,
} from "./availabilities.dto";
import { AvailabilitiesService } from "./availabilities.service";

@ApiTags("Availabilities")
@ApiBearerAuth("access-token")
@UseGuards(AuthGuard)
@Controller("providers/:providerId/availabilities")
export class AvailabilitiesController {
  constructor(private readonly availabilitiesService: AvailabilitiesService) {}

  @ApiOperation({
    summary: "Add provider availability",
    description: "Only providers can create a new availability",
  })
  @ApiParam({ name: "providerId", example: "cmjf76wxk00006dqe4or0st9v" })
  @UseGuards(RolesGuard)
  @Roles(Role.PROVIDER)
  @Post()
  create(
    @Param("providerId") providerId: string,
    @Body() data: CreateAvailabilityDto,
  ) {
    return this.availabilitiesService.create(providerId, data);
  }

  @ApiOperation({ summary: "Get all the availabilities by providerId" })
  @ApiParam({ name: "providerId", example: "cmjf76wxk00006dqe4or0st9v" })
  @Get()
  findByProvider(@Param("providerId") providerId: string) {
    return this.availabilitiesService.findByProvider(providerId);
  }

  @ApiOperation({
    summary: "Update the availability",
    description: "Only owner can update his/her availability.",
  })
  @ApiParam({ name: "providerId", example: "cmjf76wxk00006dqe4or0st9v" })
  @ApiParam({ name: "id", example: "cmjiflw9x000083pk46v1gdnb" })
  @UseGuards(RolesGuard)
  @Roles(Role.PROVIDER)
  @Patch(":id")
  update(
    @Param("providerId") providerId: string,
    @Param("id") id: string,
    @Body() data: UpdateAvailabilityDto,
  ) {
    return this.availabilitiesService.update(id, providerId, data);
  }

  @ApiOperation({
    summary: "Delete the availability",
    description: "Only owner can delete his/her availability.",
  })
  @ApiParam({ name: "providerId", example: "cmjf76wxk00006dqe4or0st9v" })
  @ApiParam({ name: "id", example: "cmjiflw9x000083pk46v1gdnb" })
  @Delete(":id")
  remove(@Param("providerId") providerId: string, @Param("id") id: string) {
    return this.availabilitiesService.remove(id, providerId);
  }
}
