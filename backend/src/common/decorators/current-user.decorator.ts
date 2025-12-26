import {
  createParamDecorator,
  ExecutionContext,
  UnauthorizedException,
} from "@nestjs/common";
import { Request } from "express";

import { JwtUser } from "../types";

export const CurrentUser = createParamDecorator(
  (data: keyof JwtUser | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user;

    if (!user) throw new UnauthorizedException();

    return data ? user[data] : user;
  },
);
