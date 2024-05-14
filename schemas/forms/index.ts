import { type ZodType, z } from 'zod';

export const GiftSchema = z.object({
  name: z
    .string()
    .min(1, { message: 'El nombre del regalo no puede estar vacío' })
    .max(60, { message: 'El nombre del regalo es demasiado largo' }),
  categoryId: z.string().min(1, { message: 'Debes seleccionar una categoría' }),
  price: z.string().max(8, {
    message: 'El precio no puede ser mayor de PYG 99,999,999',
  }),
  isFavoriteGift: z.boolean(),
  isGroupGift: z.boolean(),
  wishListId: z.string().min(1, { message: 'No se encontro un wishlist ID' }),
  imageUrl: z.any() as ZodType<File>,
});

export const GiftParamSchema = GiftSchema.omit({ imageUrl: true });

export const GiftWishListSchema = z.object({
  wishlistId: z.string(),
  giftId: z.string(),
});

export const GiftsWishListSchema = z.object({
  wishlistId: z.string(),
  giftIds: z.array(z.string()),
});
