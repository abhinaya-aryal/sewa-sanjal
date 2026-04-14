import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ServicePlain = t.Object(
  {
    id: t.String(),
    providerId: t.String(),
    title: t.String(),
    description: __nullable__(t.String()),
    price: t.Number(),
    currency: t.String(),
    durationMin: t.Integer(),
    createdAt: t.Date(),
    updatedAt: t.Date(),
    categoryId: __nullable__(t.String()),
  },
  { additionalProperties: false },
);

export const ServiceRelations = t.Object(
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
    bookings: t.Array(
      t.Object(
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
      { additionalProperties: false },
    ),
    categories: __nullable__(
      t.Object(
        { id: t.String(), name: t.String(), slug: t.String() },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const ServicePlainInputCreate = t.Object(
  {
    title: t.String(),
    description: t.Optional(__nullable__(t.String())),
    price: t.Number(),
    currency: t.Optional(t.String()),
    durationMin: t.Integer(),
  },
  { additionalProperties: false },
);

export const ServicePlainInputUpdate = t.Object(
  {
    title: t.Optional(t.String()),
    description: t.Optional(__nullable__(t.String())),
    price: t.Optional(t.Number()),
    currency: t.Optional(t.String()),
    durationMin: t.Optional(t.Integer()),
  },
  { additionalProperties: false },
);

export const ServiceRelationsInputCreate = t.Object(
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
    bookings: t.Optional(
      t.Object(
        {
          connect: t.Array(
            t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            { additionalProperties: false },
          ),
        },
        { additionalProperties: false },
      ),
    ),
    categories: t.Optional(
      t.Object(
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
    ),
  },
  { additionalProperties: false },
);

export const ServiceRelationsInputUpdate = t.Partial(
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
      bookings: t.Partial(
        t.Object(
          {
            connect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
            disconnect: t.Array(
              t.Object(
                {
                  id: t.String({ additionalProperties: false }),
                },
                { additionalProperties: false },
              ),
              { additionalProperties: false },
            ),
          },
          { additionalProperties: false },
        ),
      ),
      categories: t.Partial(
        t.Object(
          {
            connect: t.Object(
              {
                id: t.String({ additionalProperties: false }),
              },
              { additionalProperties: false },
            ),
            disconnect: t.Boolean(),
          },
          { additionalProperties: false },
        ),
      ),
    },
    { additionalProperties: false },
  ),
);

export const ServiceWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          providerId: t.String(),
          title: t.String(),
          description: t.String(),
          price: t.Number(),
          currency: t.String(),
          durationMin: t.Integer(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          categoryId: t.String(),
        },
        { additionalProperties: false },
      ),
    { $id: "Service" },
  ),
);

export const ServiceWhereUnique = t.Recursive(
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
              title: t.String(),
              description: t.String(),
              price: t.Number(),
              currency: t.String(),
              durationMin: t.Integer(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
              categoryId: t.String(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Service" },
);

export const ServiceSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      providerId: t.Boolean(),
      provider: t.Boolean(),
      title: t.Boolean(),
      description: t.Boolean(),
      price: t.Boolean(),
      currency: t.Boolean(),
      durationMin: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      bookings: t.Boolean(),
      categories: t.Boolean(),
      categoryId: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ServiceInclude = t.Partial(
  t.Object(
    {
      provider: t.Boolean(),
      bookings: t.Boolean(),
      categories: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ServiceOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      providerId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      title: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      description: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      price: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      currency: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      durationMin: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      categoryId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Service = t.Composite([ServicePlain, ServiceRelations], {
  additionalProperties: false,
});

export const ServiceInputCreate = t.Composite(
  [ServicePlainInputCreate, ServiceRelationsInputCreate],
  { additionalProperties: false },
);

export const ServiceInputUpdate = t.Composite(
  [ServicePlainInputUpdate, ServiceRelationsInputUpdate],
  { additionalProperties: false },
);
