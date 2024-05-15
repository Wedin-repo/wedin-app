import { z } from 'zod';
import { GiftPostSchema } from '.';

export const GetWishListGiftsParams = z
  .object({
    name: z.string().optional(),
    wishlistId: z.string().min(1, { message: 'No se encontró un wishlist ID' }),
    page: z.string().optional(),
    itemsPerPage: z.number().optional(),
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

export const GiftParamSchema = GiftPostSchema.omit({ imageUrl: true });
