import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

import { LoginDto } from "./auth.dto";
import { AuthService } from "./auth.service";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { AuthGuard } from "../common/guards/auth.guard";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Login to the app" })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() loginData: LoginDto) {
    console.log(loginData);
    return this.authService.logIn(loginData.email, loginData.password);
  }

  @ApiOperation({ summary: "getProfile route" })
  @ApiBearerAuth("access-token")
  @UseGuards(AuthGuard)
  @Get("me")
  getProfile(@CurrentUser() user: { id: string; role: string; name: string }) {
    return user;
  }
}
