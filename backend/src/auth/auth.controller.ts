import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Res,
} from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import type { Response } from "express";

import { LoginDto, RegisterUserDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@ApiTags("Auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Register user account" })
  @Post("register")
  register(@Body() data: RegisterUserDto) {
    return this.authService.register(data);
  }

  @ApiOperation({ summary: "Login to the app through web app" })
  @HttpCode(HttpStatus.OK)
  @Post("login/web")
  async webLogin(
    @Body() loginData: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { webToken } = await this.authService.logIn(
      loginData.email,
      loginData.password,
    );

    res.cookie("accessToken", webToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 15 * 60 * 1000,
    });

    return { message: "Web login successful" };
  }

  @ApiOperation({ summary: "Login to the app through mobile apps" })
  @HttpCode(HttpStatus.OK)
  @Post("login/mobile")
  async mobileLogin(@Body() data: LoginDto) {
    const { mobileToken } = await this.authService.logIn(
      data.email,
      data.password,
    );

    return {
      accessToken: mobileToken,
      tokenType: "Bearer",
    };
  }
}
