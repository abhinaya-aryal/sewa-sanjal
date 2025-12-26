import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";

import { RegisterUserDto } from "./auth.dto";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async register(data: RegisterUserDto) {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: data.email },
      select: { id: true },
    });
    if (existingEmail) {
      throw new ConflictException({
        feild: "email",
        message: "Email already exists",
      });
    }

    if (data.phone) {
      const existingPhone = await this.prisma.user.findUnique({
        where: { phone: data.phone },
        select: { id: true },
      });

      if (existingPhone) {
        throw new ConflictException({
          field: "phone",
          message: "Phone number already exists",
        });
      }
    }

    const passwordHash = await bcrypt.hash(data.password, 10);

    return await this.prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data?.phone,
        role: data?.role,
        avatarUrl: data.avatarUrl,
        passwordHash,
      },
      select: {
        name: true,
        email: true,
        phone: true,
        role: true,
        avatarUrl: true,
      },
    });
  }

  async logIn(email: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException("Invalid Credentials");
    }

    const webToken = await this.jwt.signAsync(
      {
        sub: user.id,
        client: "web",
      },
      { expiresIn: "15m" },
    );

    const mobileToken = await this.jwt.signAsync(
      { sub: user.id, client: "mobile" },
      { expiresIn: "30d" },
    );

    return {
      webToken,
      mobileToken,
    };
  }
}
