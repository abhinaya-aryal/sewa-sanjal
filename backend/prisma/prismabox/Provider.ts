import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const ProviderPlain = t.Object(
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
);

export const ProviderRelations = t.Object(
  {
    user: t.Object(
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
    categories: t.Array(
      t.Object(
        { id: t.String(), name: t.String(), slug: t.String() },
        { additionalProperties: false },
      ),
      { additionalProperties: false },
    ),
    services: t.Array(
      t.Object(
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
      ),
      { additionalProperties: false },
    ),
    availabilities: t.Array(
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
  },
  { additionalProperties: false },
);

export const ProviderPlainInputCreate = t.Object(
  {
    bio: t.Optional(__nullable__(t.String())),
    isVerified: t.Optional(t.Boolean()),
    documentUrl: t.Optional(__nullable__(t.String())),
    location: t.Optional(__nullable__(t.Any())),
    earnings: t.Optional(t.Number()),
  },
  { additionalProperties: false },
);

export const ProviderPlainInputUpdate = t.Object(
  {
    bio: t.Optional(__nullable__(t.String())),
    isVerified: t.Optional(t.Boolean()),
    documentUrl: t.Optional(__nullable__(t.String())),
    location: t.Optional(__nullable__(t.Any())),
    earnings: t.Optional(t.Number()),
  },
  { additionalProperties: false },
);

export const ProviderRelationsInputCreate = t.Object(
  {
    user: t.Object(
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
    categories: t.Optional(
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
    services: t.Optional(
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
    availabilities: t.Optional(
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
  },
  { additionalProperties: false },
);

export const ProviderRelationsInputUpdate = t.Partial(
  t.Object(
    {
      user: t.Object(
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
      categories: t.Partial(
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
      services: t.Partial(
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
      availabilities: t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const ProviderWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
          id: t.String(),
          userId: t.String(),
          bio: t.String(),
          isVerified: t.Boolean(),
          documentUrl: t.String(),
          location: t.Any(),
          createdAt: t.Date(),
          updatedAt: t.Date(),
          earnings: t.Number(),
        },
        { additionalProperties: false },
      ),
    { $id: "Provider" },
  ),
);

export const ProviderWhereUnique = t.Recursive(
  (Self) =>
    t.Intersect(
      [
        t.Partial(
          t.Object(
            { id: t.String(), userId: t.String() },
            { additionalProperties: false },
          ),
          { additionalProperties: false },
        ),
        t.Union(
          [t.Object({ id: t.String() }), t.Object({ userId: t.String() })],
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
              userId: t.String(),
              bio: t.String(),
              isVerified: t.Boolean(),
              documentUrl: t.String(),
              location: t.Any(),
              createdAt: t.Date(),
              updatedAt: t.Date(),
              earnings: t.Number(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Provider" },
);

export const ProviderSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      userId: t.Boolean(),
      user: t.Boolean(),
      bio: t.Boolean(),
      categories: t.Boolean(),
      services: t.Boolean(),
      availabilities: t.Boolean(),
      isVerified: t.Boolean(),
      documentUrl: t.Boolean(),
      location: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      earnings: t.Boolean(),
      bookings: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ProviderInclude = t.Partial(
  t.Object(
    {
      user: t.Boolean(),
      categories: t.Boolean(),
      services: t.Boolean(),
      availabilities: t.Boolean(),
      bookings: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const ProviderOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      userId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bio: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      isVerified: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      documentUrl: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      location: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      earnings: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Provider = t.Composite([ProviderPlain, ProviderRelations], {
  additionalProperties: false,
});

export const ProviderInputCreate = t.Composite(
  [ProviderPlainInputCreate, ProviderRelationsInputCreate],
  { additionalProperties: false },
);

export const ProviderInputUpdate = t.Composite(
  [ProviderPlainInputUpdate, ProviderRelationsInputUpdate],
  { additionalProperties: false },
);
