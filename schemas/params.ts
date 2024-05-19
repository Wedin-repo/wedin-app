import { z } from 'zod';

export const GetwishlistGiftsParams = z
  .object({
    name: z.string().optional(),
    wishlistId: z.string().min(1, { message: 'No se encontró un wishlist ID' }),
    page: z.string().optional(),
    itemsPerPage: z.number().optional(),
    category: z.string().optional(),
  })
  .refine(
    data => {
      // Both page and itemsPerPage must be present or absent together
      const pageDefined = data.page !== undefined;
      const itemsPerPageDefined = data.itemsPerPage !== undefined;
      return pageDefined === itemsPerPageDefined;
    },
    {
      message: 'Page and itemsPerPage must be provided together',
      path: ['page'], // You can adjust the path to point to the right place
    }
  );

export const GetGiftsParams = z
  .object({
    category: z.string().optional(),
    giftlistId: z.string().optional(),
    wishlistId: z.string().optional(),
    itemsPerPage: z.number().optional(),
    page: z.string().optional(),
    name: z.string().optional(),
  })
  .refine(
    data => {
      // Both page and itemsPerPage must be present or absent together
      const pageDefined = data.page !== undefined;
      const itemsPerPageDefined = data.itemsPerPage !== undefined;
      return pageDefined === itemsPerPageDefined;
    },
    {
      message: 'Page and itemsPerPage must be provided together',
      path: ['page'], // You can adjust the path to point to the right place
    }
  );

export const GetGiftsSearchParams = z.object({
  category: z.string().optional(),
  name: z.string().optional(),
  page: z.string().optional(),
});

export const GetGiftlistsSearchParams = z.object({
  category: z.string().optional(),
  name: z.string().optional(),
});

export const WishlistGiftSearchParams = z.object({
  id: z.string().optional(),
  giftId: z.string().optional(),
  wishlistId: z.string().optional(),
});

export const CreateTransactionParams = z
  .object({
    wishlistGift: z.object({
      id: z
        .string()
        .min(1, { message: 'No se encontró un ID de wishlistGift' }),
      isGroupGift: z.boolean(),
      groupGiftParts: z.string(),
      isFullyPaid: z.boolean(),
      gift: z.object({
        price: z
          .string()
          .min(4, { message: 'El precio debe ser mayor a 999 guaraníes' })
          .max(10, {
            message: 'El precio no puede ser mayor de PYG 99,999,999',
          }),
      }),
      transactions: z
        .array(
          z.object({
            amount: z
              .number()
              .positive({ message: 'El monto debe ser un número positivo' }),
          })
        )
        .optional(),
    }),
    amount: z
      .string()
      .min(4, { message: 'El precio debe ser mayor a 999 guaraníes' })
      .max(10, {
        message: 'El precio no puede ser mayor de PYG 99,999,999',
      }),
    payerRole: z.string(),
    payeeRole: z.string(),
  })
  .refine(
    data => {
      const totalCost = Number.parseFloat(data.wishlistGift.gift.price);
      const formattedAmount = Number.parseFloat(data.amount);
      return formattedAmount === totalCost;
    },
    {
      message: 'El monto debe coincidir con el precio del regalo',
      path: ['amount'], // Set the path of the error to the `amount` field
    }
  );

export const GetTransactionsParams = z.object({
  name: z.string().optional(),
  eventId: z.string().optional(),
  userId: z.string().optional(),
  page: z.string().optional(),
  itemsPerPage: z.number().optional(),
});
