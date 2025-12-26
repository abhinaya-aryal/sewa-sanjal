import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwt: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const cookieToken = request.cookies?.accessToken;
    const headerToken = this.extractTokenFromHeader(request);

    if (!cookieToken && !headerToken) {
      throw new UnauthorizedException("No token provided!");
    }

    const tokenSource = cookieToken ? "cookie" : "header";
    const token = cookieToken ?? headerToken;

    try {
      const payload = await this.jwt.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });

      if (tokenSource === "cookie" && payload.client !== "web") {
        throw new UnauthorizedException("Invalid web token");
      }

      if (tokenSource === "header" && payload.client !== "mobile") {
        throw new UnauthorizedException("Invalid mobile token");
      }

      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException("Invalid token");
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
