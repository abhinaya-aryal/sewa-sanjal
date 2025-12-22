import { Role } from "prisma/generated/enums";

export interface JwtUser {
  id: string;
  role: Role;
  name: string;
  iat?: number;
  exp?: number;
}
