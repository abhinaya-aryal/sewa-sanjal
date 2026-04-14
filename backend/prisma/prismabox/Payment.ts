import { t } from "elysia";

import { __transformDate__ } from "./__transformDate__";

import { __nullable__ } from "./__nullable__";

export const PaymentPlain = t.Object(
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
);

export const PaymentRelations = t.Object(
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
  },
  { additionalProperties: false },
);

export const PaymentPlainInputCreate = t.Object(
  {
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
    transactionRef: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const PaymentPlainInputUpdate = t.Object(
  {
    providerAmount: t.Optional(t.Number()),
    platformAmount: t.Optional(t.Number()),
    gateway: t.Optional(t.String()),
    status: t.Optional(
      t.Union(
        [
          t.Literal("PENDING"),
          t.Literal("SUCCESS"),
          t.Literal("FAILED"),
          t.Literal("REFUNDED"),
        ],
        { additionalProperties: false },
      ),
    ),
    transactionRef: t.Optional(__nullable__(t.String())),
  },
  { additionalProperties: false },
);

export const PaymentRelationsInputCreate = t.Object(
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
  },
  { additionalProperties: false },
);

export const PaymentRelationsInputUpdate = t.Partial(
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
    },
    { additionalProperties: false },
  ),
);

export const PaymentWhere = t.Partial(
  t.Recursive(
    (Self) =>
      t.Object(
        {
          AND: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          NOT: t.Union([Self, t.Array(Self, { additionalProperties: false })]),
          OR: t.Array(Self, { additionalProperties: false }),
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
          transactionRef: t.String(),
          createdAt: t.Date(),
        },
        { additionalProperties: false },
      ),
    { $id: "Payment" },
  ),
);

export const PaymentWhereUnique = t.Recursive(
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
              transactionRef: t.String(),
              createdAt: t.Date(),
            },
            { additionalProperties: false },
          ),
        ),
      ],
      { additionalProperties: false },
    ),
  { $id: "Payment" },
);

export const PaymentSelect = t.Partial(
  t.Object(
    {
      id: t.Boolean(),
      bookingId: t.Boolean(),
      booking: t.Boolean(),
      providerAmount: t.Boolean(),
      platformAmount: t.Boolean(),
      gateway: t.Boolean(),
      status: t.Boolean(),
      transactionRef: t.Boolean(),
      createdAt: t.Boolean(),
      _count: t.Boolean(),
    },
    { additionalProperties: false },
  ),
);

export const PaymentInclude = t.Partial(
  t.Object(
    { booking: t.Boolean(), status: t.Boolean(), _count: t.Boolean() },
    { additionalProperties: false },
  ),
);

export const PaymentOrderBy = t.Partial(
  t.Object(
    {
      id: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      bookingId: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      providerAmount: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      platformAmount: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      gateway: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      transactionRef: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
      createdAt: t.Union([t.Literal("asc"), t.Literal("desc")], {
        additionalProperties: false,
      }),
    },
    { additionalProperties: false },
  ),
);

export const Payment = t.Composite([PaymentPlain, PaymentRelations], {
  additionalProperties: false,
});

export const PaymentInputCreate = t.Composite(
  [PaymentPlainInputCreate, PaymentRelationsInputCreate],
  { additionalProperties: false },
);

export const PaymentInputUpdate = t.Composite(
  [PaymentPlainInputUpdate, PaymentRelationsInputUpdate],
  { additionalProperties: false },
);
