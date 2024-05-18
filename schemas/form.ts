import { ZodType, z } from 'zod';

export const GiftFormSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre del regalo no puede estar vacío' })
    .max(60, { message: 'El nombre del regalo es demasiado largo' }),
  categoryId: z.string().min(1, { message: 'Debes seleccionar una categoría' }),
  price: z
    .string()
    .min(4, { message: 'Precio tiene que ser mayor a 999 guaranies' })
    .max(10, {
      message: 'El precio no puede ser mayor de PYG 99,999,999',
    }),
  isDefault: z.boolean().default(false),
  sourceGiftId: z.string(),
  isEditedVersion: z.boolean().default(false),
  eventId: z.string().min(1, { message: 'No se encontro un event ID' }),

  imageUrl: z.any().optional() as ZodType<File>,

  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }), // WishListGiftPostSchema
  isFavoriteGift: z.boolean().default(false), // WishListGiftPostSchema
  isGroupGift: z.boolean().default(false), // WishListGiftPostSchema
});

// We want to ignore the imageUrl field when creating/editing a gift
export const GiftPostSchema = GiftFormSchema.omit({ imageUrl: true });

export const GiftEditSchema = GiftPostSchema.pick({
  name: true,
  categoryId: true,
  price: true,
});

export const GiftCreateSchema = GiftPostSchema.pick({
  name: true,
  categoryId: true,
  price: true,
  isDefault: true,
  isEditedVersion: true,
  eventId: true,
});

export const WishlistGiftCreateSchema = z.object({
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  giftId: z.string().min(1, { message: 'No se encontro un gift ID' }),
  isFavoriteGift: z.boolean().default(false),
  isGroupGift: z.boolean().default(false),
});

export const WishListGiftsCreateSchema = z.object({
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  giftIds: z.array(z.string().min(1, { message: 'No se encontro un gift ID' })),
});

export const WishListGiftEditSchema = z.object({
  wishlistGiftId: z.string().min(1, { message: 'No se encontro un ID' }),
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  isFavoriteGift: z.boolean().default(false),
  isGroupGift: z.boolean().default(false),
});

export const WishListGiftDeleteSchema = z.object({
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  giftId: z.string().min(1, { message: 'No se encontro un gift ID' }),
});

export const TransactionCreateSchema = z
  .object({
    wishListGift: z.object({
      id: z
        .string()
        .nonempty({ message: 'No se encontró un ID de WishListGift' })
        .uuid(),
      isGroupGift: z.boolean(),
      groupGiftParts: z.string().optional(),
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
  })
  .refine(
    data => {
      const totalCost = Number.parseFloat(data.wishListGift.gift.price);
      const formattedAmount = Number.parseFloat(data.amount);
      return formattedAmount === totalCost;
    },
    {
      message: 'El monto debe coincidir con el precio del regalo',
      path: ['amount'], // Set the path of the error to the `amount` field
    }
  );
