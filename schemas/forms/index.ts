import { type ZodType, z } from 'zod';

export const GiftFormPostSchema = z.object({
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

export const GiftPostSchema = GiftFormPostSchema.omit({ imageUrl: true });

export const WishListGiftPostSchema = z.object({
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  giftId: z.string().min(1, { message: 'No se encontro un gift ID' }),
  isFavoriteGift: z.boolean().default(false),
  isGroupGift: z.boolean().default(false),
});

export const WishListGiftsPostSchema = z.object({
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  giftIds: z.array(z.string().min(1, { message: 'No se encontro un gift ID' })),
});

export const WishListGiftEditSchema = z.object({
  id: z.string().min(1, { message: 'No se encontro un ID' }),
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  isFavoriteGift: z.boolean().default(false),
  isGroupGift: z.boolean().default(false),
});
