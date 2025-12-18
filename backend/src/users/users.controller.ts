import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOkResponse, ApiOperation } from "@nestjs/swagger";
import { AuthGuard } from "src/auth/auth.guard";

import { CreateUserDto } from "./users.dto";
import { UsersService } from "./users.service";

@ApiBearerAuth("access-token")
@UseGuards(AuthGuard)
@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: "Create a new user",
  })
  @Post()
  create(@Body() userData: CreateUserDto) {
    return this.usersService.create(userData);
  }

  @ApiOperation({ summary: "List of users" })
  @ApiOkResponse({ description: "List of users" })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.usersService.findOne(id);
  }

  @Patch(":id")
  update(@Param("id") id: string) {
    return this.usersService.update(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.usersService.remove(id);
  }
}
