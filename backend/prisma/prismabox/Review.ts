import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ReviewPlain = t.Object(
  {
    id: t.String(),
    bookingId: t.String(),
    authorId: t.String(),
    rating: t.Integer(),
    comment: __nullable__(t.String()),
    createdAt: t.Date(),
  },
  { additionalProperties: false },
);

export const ReviewRelations = t.Object(
  {
    booking: t.Object(
      {
        id: t.String(),
        customerId: t.String(),
        providerId: t.String(),
        serviceId: t.String(),
        scheduledAt: t.Date(),
        durationMin: t.Integer(),
        price: t.Number(),
        currency: t.String(),
        status: t.Union(
          [
            t.Literal("PENDING"),
            t.Literal("ACCEPTED"),
            t.Literal("REJECTED"),
            t.Literal("IN_PROGRESS"),
            t.Literal("COMPLETED"),
            t.Literal("CANCELLED"),
          ],
          { additionalProperties: false },
        ),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
    author: t.Object(
      {
        id: t.String(),
        email: t.String(),
        phone: __nullable__(t.String()),
        password: t.String(),
        role: t.Union(
          [t.Literal("CUSTOMER"), t.Literal("PROVIDER"), t.Literal("ADMIN")],
          { additionalProperties: false },
        ),
        name: t.String(),
        avatarUrl: __nullable__(t.String()),
        createdAt: t.Date(),
        updatedAt: t.Date(),
      },
      { additionalProperties: false },
    ),
  },
  { additionalProperties: false },
);

export const ReviewPlainInputCreate = t.Object(
  { rating: t.Integer(), comment: t.Optional(__nullable__(t.String())) },
  { additionalProperties: false },
);

export const ReviewPlainInputUpdate = t.Object(
  {
    rating: t.Optional(t.Integer()),
    comment: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const ReviewRelationsInputCreate = t.Object(
  {
    booking: t.Object(
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
    author: t.Object(
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

export const ReviewRelationsInputUpdate = t.Partial(
  t.Object(
    {
      booking: t.Object(
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
      author: t.Object(
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

export const ReviewWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          bookingId: t.String(),
          authorId: t.String(),
          rating: t.Integer(),
          comment: t.String(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Review" },
  ),
);

export const ReviewWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), bookingId: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ bookingId: t.String() })],
          { additionalProperties: false },
        ),
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
              bookingId: t.String(),
              authorId: t.String(),
              rating: t.Integer(),
              comment: t.String(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Review" },
);

export const ReviewSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      bookingId: t.Boolean(),
      booking: t.Boolean(),
      authorId: t.Boolean(),
      author: t.Boolean(),
      rating: t.Boolean(),
      comment: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ReviewInclude = t.Partial(
  t.Object(
    { booking: t.Boolean(), author: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const ReviewOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bookingId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      authorId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      rating: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      comment: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Review = t.Composite([ReviewPlain, ReviewRelations], {
  additionalProperties: false,
});

export const ReviewInputCreate = t.Composite(
  [ReviewPlainInputCreate, ReviewRelationsInputCreate],
  { additionalProperties: false },
);

export const ReviewInputUpdate = t.Composite(
  [ReviewPlainInputUpdate, ReviewRelationsInputUpdate],
  { additionalProperties: false },
);
