import { type ZodType, z } from 'zod';

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

  image: z.any().optional() as ZodType<File>,
  imageUrl: z.string(),

  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }), // wishlistGiftPostSchema
  isFavoriteGift: z.boolean().default(false), // wishlistGiftPostSchema
  isGroupGift: z.boolean().default(false), // wishlistGiftPostSchema
});

// We want to ignore the imageUrl field when creating/editing a gift
export const GiftPostSchema = GiftFormSchema.omit({ image: true });

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
  imageUrl: true,
});

export const WishlistGiftCreateSchema = z.object({
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  eventId: z.string().min(1, { message: 'No se encontro un event ID' }),
  giftId: z.string().min(1, { message: 'No se encontro un gift ID' }),
  isFavoriteGift: z.boolean().default(false),
  isGroupGift: z.boolean().default(false),
});

export const WishlistGiftsCreateSchema = z.object({
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  giftIds: z.array(z.string().min(1, { message: 'No se encontro un gift ID' })),
  eventId: z.string().min(1, { message: 'No se encontro un event ID' }),
});

export const WishlistGiftEditSchema = z.object({
  wishlistGiftId: z.string().min(1, { message: 'No se encontro un ID' }),
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  giftId: z.string().min(1, { message: 'No se encontro un gift ID' }),
  isFavoriteGift: z.boolean().default(false),
  isGroupGift: z.boolean().default(false),
});

export const WishlistGiftDeleteSchema = z.object({
  wishlistId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  giftId: z.string().min(1, { message: 'No se encontro un gift ID' }),
});

export const TransactionCreateSchema = z.object({
  amount: z
    .string()
    .min(4, { message: 'El precio debe ser mayor a 999 guaraníes' })
    .max(10, {
      message: 'El precio no puede ser mayor de PYG 99,999,999',
    }),
});
