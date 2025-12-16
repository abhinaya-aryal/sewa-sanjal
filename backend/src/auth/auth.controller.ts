import { Controller, Post, Body, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

import { LoginDto } from "./auth.dto";
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
}
