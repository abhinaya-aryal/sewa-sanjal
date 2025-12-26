import { JwtUser } from ".";

declare global {
  namespace Express {
    interface Request {
      user?: JwtUser & {
        sub: string;
        client: "web" | "mobile";
      };
    }
  }
}

export {};
