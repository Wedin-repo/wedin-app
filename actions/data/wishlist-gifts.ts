'use server';

import prisma from '@/db/client';
import {
  GiftParamSchema,
  WishListGiftSchema,
  WishListGiftsSchema,
} from '@/schemas/forms';
import { revalidatePath } from 'next/cache';
import type * as z from 'zod';
import {
  getErrorMessage,
  validateCategory,
  validateGift,
  validateWishlist,
} from '../helper';

// take into account that when we add a defualt gift to our wishlist
// when showing all gifts
// if the gift that we are about to show is a default one and was added to the wishlist as it is (no edit) => we show
export const addGiftToWishList = async (
  formData: z.infer<typeof WishListGiftSchema>
) => {
  const validatedFields = WishListGiftSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      status: 'Error',
      message: 'Invalid Data',
    };
  }

  const { giftId, wishlistId } = validatedFields.data;

  try {
    await prisma.wishListGift.create({
      data: {
        wishListId: wishlistId,
        giftId: giftId,
      },
    });
  } catch (error: unknown) {
    return {
      status: 'Error',
      message: getErrorMessage(error),
    };
  }

  revalidatePath('/', 'layout');

  return {
    status: 'Éxito! 🎁🎉',
    message: 'Regalo agregado a tu lista.',
  };
};

export const addGiftsToWishList = async (
  formData: z.infer<typeof WishListGiftsSchema>
) => {
  const validatedFields = WishListGiftsSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: 'Invalid gift Ids',
    };
  }

  const { giftIds, wishlistId } = validatedFields.data;

  const wishListGiftData = giftIds.map(giftId => ({
    wishListId: wishlistId,
    giftId: giftId,
  }));

  try {
    await prisma.wishListGift.createMany({
      data: wishListGiftData,
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }

  revalidatePath('/dashboard');
};

export const deleteGiftFromWishList = async (
  formData: z.infer<typeof WishListGiftSchema>
) => {
  const validatedFields = WishListGiftSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: 'Datos requeridos no fueron encontrados' };
  }

  const { wishlistId, giftId } = validatedFields.data;

  try {
    await prisma.wishListGift.deleteMany({
      where: {
        wishListId: wishlistId,
        giftId: giftId,
      },
    });
  } catch (error) {
    return { error: getErrorMessage(error) };
  }

  revalidatePath('/', 'layout');
};

type GetWishListGiftsParams = {
  wishlistId: string;
  name?: string;
  page?: string;
  itemsPerPage?: number;
};

export const getWishListGifts = async ({
  wishlistId,
  name,
  page,
  itemsPerPage,
}: GetWishListGiftsParams) => {
  const query: any = {
    wishListId: wishlistId,
  };

  if (name) {
    query.gift = {
      name: {
        contains: name,
        mode: 'insensitive',
      },
    };
  }

  const skip =
    page && itemsPerPage ? (Number(page) - 1) * itemsPerPage : undefined;
  const take = itemsPerPage ? Number(itemsPerPage) : undefined;

  try {
    return await prisma.wishListGift.findMany({
      where: query,
      include: {
        gift: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip,
      take,
    });
  } catch (error) {
    console.error('Error retrieving wishlist gifts:', error);
    return [];
  }
};
const editOrCreateGift = async (
  formData: z.infer<typeof GiftParamSchema>,
  giftId: string
) => {
  const validatedFields = GiftParamSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  const category = await validateCategory(validatedFields.data.categoryId);

  if (!category) return { error: 'Category not found' };

  const wishlist = await validateWishlist(validatedFields.data.wishlistId);

  if (!wishlist) return { error: 'Wishlist not found' };

  const gift = await validateGift(giftId);

  if (!gift) return { error: 'Gift not found' };

  const newGiftData = {
    name: validatedFields.data.name,
    categoryId: validatedFields.data.categoryId,
    price: validatedFields.data.price,
    isFavoriteGift: validatedFields.data.isFavoriteGift,
    isGroupGift: validatedFields.data.isGroupGift,
    isDefault: false,
    isEditedVersion: true,
    sourceGiftId: giftId,
    description: 'a new gift creater by user', // TODO: inform UX about description issue
  };

  try {
    if (gift.isDefault) {
      const response = await prisma.gift.create({
        data: { ...newGiftData },
      });
      await prisma.wishList.update({
        where: { id: validatedFields.data.wishlistId },
        data: {
          gifts: {
            disconnect: { id: giftId },
            connect: { id: response?.id },
          },
        },
      });
    }

    if (!gift.isDefault) {
      const response = await prisma.gift.update({
        where: { id: giftId },
        data: newGiftData,
      });

      await prisma.wishList.update({
        where: { id: validatedFields.data.wishlistId },
        data: {
          gifts: {
            connect: { id: response?.id },
          },
        },
      });
    }

    revalidatePath('/dashboard');
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};

const createWishListGift = async (
  formData: z.infer<typeof GiftParamSchema>
) => {
  const validatedFields = GiftParamSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: 'Invalid fields' };
  }

  const category = await validateCategory(validatedFields.data.categoryId);

  if (!category) return { error: 'Category not found' };

  const wishlist = await validateWishlist(validatedFields.data.wishlistId);

  if (!wishlist) return { error: 'Wishlist not found' };

  try {
    const newGift = await prisma.gift.create({
      data: {
        name: validatedFields.data.name,
        categoryId: validatedFields.data.categoryId,
        price: validatedFields.data.price,
        isFavoriteGift: validatedFields.data.isFavoriteGift,
        isGroupGift: validatedFields.data.isGroupGift ?? false,
        isDefault: false,
        isEditedVersion: false,
      },
    });

    await prisma.wishList.update({
      where: { id: validatedFields.data.wishlistId },
      data: {
        gifts: {
          connect: { id: newGift.id },
        },
      },
    });

    revalidatePath('/gifts?tab=predefinedGifts');

    return { giftId: newGift.id };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};
