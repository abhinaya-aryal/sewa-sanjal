import {
  Body,
  Controller,
  Post,
  Get,
  Patch,
  Param,
  Query,
} from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { CreateProviderDto, UpdateProviderDto } from "./providers.dto";
import { ProvidersService } from "./providers.service";

@Controller("providers")
export class ProvidersController {
  constructor(private readonly providersService: ProvidersService) {}

  @ApiOperation({ summary: "Create a provider service" })
  @Post()
  create(
    // @CurrentUser() user: { id: string; role: string },
    @Body() dto: CreateProviderDto,
  ) {
    // return this.providersService.create(user.id, user.role, dto);
    return this.providersService.create(
      "cmihkx70b00000tpdp006tqig",
      "CUSTOMER",
      dto,
    );
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.providersService.findOne(id);
  }

  @Get()
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
    // @CurrentUser() user: { id: string },
    @Body() dto: UpdateProviderDto,
  ) {
    // return this.providersService.update(id, user.id, dto);
    return this.providersService.update(id, "cmihkx70b00000tpdp006tqig", dto);
  }

  @Post(":id/verify")
  verify(@Param("id") id: string) {
    return this.providersService.verify(id);
  }
}
