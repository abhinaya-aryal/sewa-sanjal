import Elysia, { ElysiaCustomStatusResponse } from "elysia";

export const error = new Elysia({ name: "error" }).onError(
  { as: "global" },
  ({ error, code, set }) => {
    if (code === "VALIDATION") {
      return error.detail(error.message, true);
    }

    if (error instanceof ElysiaCustomStatusResponse) {
      set.status = error.code;
      return {
        code,
        message: error.response,
      };
    }

    return {
      message: error instanceof Error ? error.message : "Internal Server Error",
      code,
    };
  },
);
