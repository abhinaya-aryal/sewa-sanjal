import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const BookingPlain = t.Object(
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
);

export const BookingRelations = t.Object(
  {
    customer: t.Object(
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
    service: t.Object(
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
    review: __nullable__(
      t.Object(
        {
          id: t.String(),
          bookingId: t.String(),
          authorId: t.String(),
          rating: t.Integer(),
          comment: __nullable__(t.String()),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    ),
    payment: __nullable__(
      t.Object(
        {
          id: t.String(),
          bookingId: t.String(),
          providerAmount: t.Number(),
          platformAmount: t.Number(),
          gateway: t.String(),
          status: t.Union(
            [
              t.Literal("PENDING"),
              t.Literal("SUCCESS"),
              t.Literal("FAILED"),
              t.Literal("REFUNDED"),
            ],
            { additionalProperties: false },
          ),
          transactionRef: __nullable__(t.String()),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    ),
  },
  { additionalProperties: false },
);

export const BookingPlainInputCreate = t.Object(
  {
    scheduledAt: t.Date(),
    durationMin: t.Integer(),
    price: t.Number(),
    currency: t.String(),
    status: t.Optional(
      t.Union(
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
    ),
  },
  { additionalProperties: false },
);

export const BookingPlainInputUpdate = t.Object(
  {
    scheduledAt: t.Optional(t.Date()),
    durationMin: t.Optional(t.Integer()),
    price: t.Optional(t.Number()),
    currency: t.Optional(t.String()),
    status: t.Optional(
      t.Union(
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
    ),
  },
  { additionalProperties: false },
);

export const BookingRelationsInputCreate = t.Object(
  {
    customer: t.Object(
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
    service: t.Object(
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
    review: t.Optional(
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
    payment: t.Optional(
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

export const BookingRelationsInputUpdate = t.Partial(
  t.Object(
    {
      customer: t.Object(
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
      service: t.Object(
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
      review: t.Partial(
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
      payment: t.Partial(
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

export const BookingWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
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
    { $id: "Booking" },
  ),
);

export const BookingWhereUnique = t.Recursive(
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
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Booking" },
);

export const BookingSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      customerId: t.Boolean(),
      customer: t.Boolean(),
      providerId: t.Boolean(),
      provider: t.Boolean(),
      serviceId: t.Boolean(),
      service: t.Boolean(),
      scheduledAt: t.Boolean(),
      durationMin: t.Boolean(),
      price: t.Boolean(),
      currency: t.Boolean(),
      status: t.Boolean(),
      createdAt: t.Boolean(),
      updatedAt: t.Boolean(),
      review: t.Boolean(),
      payment: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const BookingInclude = t.Partial(
  t.Object(
    {
      customer: t.Boolean(),
      provider: t.Boolean(),
      service: t.Boolean(),
      status: t.Boolean(),
      review: t.Boolean(),
      payment: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const BookingOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      customerId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      providerId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      serviceId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      scheduledAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      durationMin: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      price: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      currency: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      updatedAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Booking = t.Composite([BookingPlain, BookingRelations], {
  additionalProperties: false,
});

export const BookingInputCreate = t.Composite(
  [BookingPlainInputCreate, BookingRelationsInputCreate],
  { additionalProperties: false },
);

export const BookingInputUpdate = t.Composite(
  [BookingPlainInputUpdate, BookingRelationsInputUpdate],
  { additionalProperties: false },
);
