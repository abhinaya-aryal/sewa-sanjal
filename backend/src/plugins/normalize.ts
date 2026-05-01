import Elysia from "elysia";

/**
 * Custom transformer to normalize the request body
 * Processes the body of the context and return the transformed one
 */

export const normalize = new Elysia({ name: "normalize" }).onTransform(
  { as: "global" },
  (context) => {
    if (!context.body) return;

    context.body = normalizeValue(context.body);
  },
);

/**
 * Normalizes the given value. It will trim the value.
 *
 * @param value value to normalize
 *
 * @return null  or trimmed value
 *
 */
export const normalizeValue = (value: unknown): unknown => {
  if (value instanceof File) return value;

  if (typeof value === "string") {
    const trimmed = value.trim();
    return trimmed === "" ? null : trimmed;
  }

  if (Array.isArray(value)) {
    return value.map(normalizeValue);
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, val]) => [key, normalizeValue(val)]),
    );
  }

  return value;
};
