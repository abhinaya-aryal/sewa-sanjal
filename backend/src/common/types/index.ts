export interface JwtUser {
  sub: string;
  client: "web" | "mobile";
  iat: number;
  exp: number;
}
