import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const BookingStatus = t.Union(
  [
    t.Literal("PENDING"),
    t.Literal("ACCEPTED"),
    t.Literal("REJECTED"),
    t.Literal("IN_PROGRESS"),
    t.Literal("COMPLETED"),
    t.Literal("CANCELLED"),
  ],
  { additionalProperties: false },
);
