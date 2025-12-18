import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from "@nestjs/common";
import { ApiBearerAuth, ApiOperation } from "@nestjs/swagger";

import { LoginDto } from "./auth.dto";
import { AuthGuard } from "./auth.guard";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Login to the app" })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() loginData: LoginDto) {
    return this.authService.logIn(loginData.email, loginData.password);
  }

  @ApiOperation({ summary: "getProfile route" })
  @ApiBearerAuth("access-token")
  @UseGuards(AuthGuard)
  @Get("me")
  getProfile(@Request() req) {
    return req.user;
  }
}
