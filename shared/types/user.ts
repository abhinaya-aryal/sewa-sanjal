import { UserUpdate } from "@modules/user";

export type AuthUser = {
  userId: string;
  role: "ADMIN" | "CUSTOMER" | "PROVIDER";
};

export type UserUpdate = (typeof UserUpdate)["static"];
