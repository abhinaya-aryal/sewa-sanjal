import {
  Controller,
  Get,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from "@nestjs/swagger";
import { Role } from "prisma/generated/enums";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { Roles } from "src/common/decorators/roles.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";
import { RolesGuard } from "src/common/guards/roles.guard";

import { UsersService } from "./users.service";

@ApiTags("Users")
@ApiBearerAuth("access-token")
@UseGuards(AuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: "List of users" })
  @ApiOkResponse({ description: "List of users" })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: "Info of logged in user" })
  @Get("me")
  getProfile(@CurrentUser() user: { id: string; role: string; name: string }) {
    return user;
  }

  @ApiOperation({ summary: "Update own info" })
  @Patch("me")
  update(@CurrentUser() user: { id: string }) {
    return this.usersService.update(user.id);
  }

  @ApiOperation({ summary: "Get user by ID" })
  @ApiParam({ name: "id", example: "cmjf730iv00005tqey30wdkmf" })
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
