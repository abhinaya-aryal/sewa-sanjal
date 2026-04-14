import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const AvailabilityPlain = t.Object(
  {
    id: t.String(),
    providerId: t.String(),
    dayOfWeek: t.Integer(),
    startTime: t.String(),
    endTime: t.String(),
    createdAt: t.Date(),
  },
  { additionalProperties: false },
);

export const AvailabilityRelations = t.Object(
  {
    provider: t.Object(
      {
        id: t.String(),
        userId: t.String(),
        bio: __nullable__(t.String()),
        isVerified: t.Boolean(),
        documentUrl: __nullable__(t.String()),
        location: __nullable__(t.Any()),
        createdAt: t.Date(),
        updatedAt: t.Date(),
        earnings: t.Number(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const AvailabilityPlainInputCreate = t.Object(
  { dayOfWeek: t.Integer(), startTime: t.String(), endTime: t.String() },
  { additionalProperties: false },
);

export const AvailabilityPlainInputUpdate = t.Object(
  {
    dayOfWeek: t.Optional(t.Integer()),
    startTime: t.Optional(t.String()),
    endTime: t.Optional(t.String()),
  },
  { additionalProperties: false },
);

export const AvailabilityRelationsInputCreate = t.Object(
  {
    provider: t.Object(
      {
        connect: t.Object(
          {
            id: t.String({ additionalProperties: false }),
          },
          { additionalProperties: false },
        ),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const AvailabilityRelationsInputUpdate = t.Partial(
  t.Object(
    {
      provider: t.Object(
        {
          connect: t.Object(
            {
              id: t.String({ additionalProperties: false }),
            },
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    },
    { additionalProperties: false },
  ),
);

export const AvailabilityWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          providerId: t.String(),
          dayOfWeek: t.Integer(),
          startTime: t.String(),
          endTime: t.String(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Availability" },
  ),
);

export const AvailabilityWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object({ id: t.String() }, { additionalProperties: false }),
          { additionalProperties: false },
        ),
        t.Union([t.Object({ id: t.String() })], {
          additionalProperties: false,
        }),
        t.Partial(
          t.Object({
            AND: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            NOT: t.Union([
              Self,
              t.Array(Self, { additionalProperties: false }),
            ]),
            OR: t.Array(Self, { additionalProperties: false }),
          }),
          { additionalProperties: false },
        ),
        t.Partial(
          t.Object(
            {
              id: t.String(),
              providerId: t.String(),
              dayOfWeek: t.Integer(),
              startTime: t.String(),
              endTime: t.String(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Availability" },
);

export const AvailabilitySelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      providerId: t.Boolean(),
      provider: t.Boolean(),
      dayOfWeek: t.Boolean(),
      startTime: t.Boolean(),
      endTime: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const AvailabilityInclude = t.Partial(
  t.Object(
    { provider: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const AvailabilityOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      providerId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      dayOfWeek: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      startTime: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      endTime: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Availability = t.Composite(
  [AvailabilityPlain, AvailabilityRelations],
  { additionalProperties: false },
);

export const AvailabilityInputCreate = t.Composite(
  [AvailabilityPlainInputCreate, AvailabilityRelationsInputCreate],
  { additionalProperties: false },
);

export const AvailabilityInputUpdate = t.Composite(
  [AvailabilityPlainInputUpdate, AvailabilityRelationsInputUpdate],
  { additionalProperties: false },
);
