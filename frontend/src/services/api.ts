import { treaty } from "@elysiajs/eden";
import type { Api } from "../../../backend/src/index";

const BASE_URL = process.env.API_URL;

export const api = treaty<Api>(BASE_URL, {
  fetch: {
    credentials: "include",
  },
});

export async function edenHandler<T, E = unknown>(
  promise: Promise<{ data: T | null; error: E }>,
): Promise<T> {
  const { data, error } = await promise;
  if (error) throw error;
  return data;
}
