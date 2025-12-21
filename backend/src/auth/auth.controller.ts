import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { LoginDto, RegisterUserDto } from "./auth.dto";
import { AuthService } from "./auth.service";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: "Register user account" })
  @Post("register")
  register(@Body() data: RegisterUserDto) {
    return this.authService.register(data);
  }

  @ApiOperation({ summary: "Login to the app" })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  login(@Body() loginData: LoginDto) {
    return this.authService.logIn(loginData.email, loginData.password);
  }
}
