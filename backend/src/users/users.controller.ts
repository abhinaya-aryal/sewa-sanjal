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
} from "@nestjs/swagger";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { AuthGuard } from "src/common/guards/auth.guard";

import { UsersService } from "./users.service";

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
  @ApiParam({ name: "id", example: "cmij1etlp000081nx22jk80w2" })
  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
