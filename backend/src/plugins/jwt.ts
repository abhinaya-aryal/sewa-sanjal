import { jwt } from "@elysiajs/jwt";
import Elysia from "elysia";

export const jwtPlugin = new Elysia().use(
  jwt({
    name: "jwt",
    secret: process.env.JWT_SECRET as string,
    exp: "7d",
  }),
);
