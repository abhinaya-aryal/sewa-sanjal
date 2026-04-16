import openapi from "@elysiajs/openapi";
import Elysia from "elysia";

export const openApi = new Elysia().use(
  openapi({
    documentation: {
      tags: [
        { name: "Auth", description: "Authentication endpoints" },
        { name: "Users", description: "User endpoints" },
        { name: "Services", description: "Services endpoints" },
        { name: "Providers", description: "Providers endpoints" },
        { name: "Categories", description: "Categories endpoints" },
        { name: "Availabilities", description: "Availabilities endpoints" },
      ],
    },
  }),
);
