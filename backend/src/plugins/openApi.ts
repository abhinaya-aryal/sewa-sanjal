import openapi from "@elysiajs/openapi";
import Elysia from "elysia";

export const openApi = new Elysia().use(
  openapi({
    documentation: {
      info: {
        title: "Elysia API",
        description: "A modular REST API with authentication built with Elysia",
        version: "1.0.0",
        contact: {
          name: "API Support",
          email: "aryalabhinaya343@gmail.com",
        },
      },
      components: {
        securitySchemes: {
          cookieAuth: {
            type: "apiKey",
            in: "cookie",
            name: "auth",
            description: "JWT authentication cookie",
          },
        },
      },
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
