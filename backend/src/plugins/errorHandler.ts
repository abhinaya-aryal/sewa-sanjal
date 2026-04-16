import Elysia from "elysia";

export const errorHandler = new Elysia().onError(({ error, code }) => {
  return {
    error: error instanceof Error ? error.message : "Internal Server Error",
    code,
  };
});
