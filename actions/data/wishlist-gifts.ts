'use server';

import prisma from '@/db/client';
import {
  WishListGiftPostSchema,
  WishListGiftPostsSchema,
} from '@/schemas/forms';
import { GetWishListGiftsParams } from '@/schemas/forms/params';
import type { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import type * as z from 'zod';
import { getErrorMessage } from '../helper';

// take into account that when we add a defualt gift to our wishlist
// when showing all gifts
// if the gift that we are about to show is a default one and was added to the wishlist as it is (no edit) => we show
export const addGiftToWishList = async (
  formData: z.infer<typeof WishListGiftPostSchema>
) => {
  const validatedFields = WishListGiftPostSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: 'Invalid Data' };
  }

  const { giftId, wishlistId, isGroupGift, isFavoriteGift } =
    validatedFields.data;

  try {
    await prisma.wishListGift.create({
      data: {
        wishListId: wishlistId,
        giftId,
        isGroupGift,
        isFavoriteGift,
      },
    });
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
};

export const addGiftsToWishList = async (
  formData: z.infer<typeof WishListGiftPostsSchema>
) => {
  const validatedFields = WishListGiftPostsSchema.safeParse(formData);

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
  formData: z.infer<typeof WishListGiftPostSchema>
) => {
  const validatedFields = WishListGiftPostSchema.safeParse(formData);

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

export const getWishListGifts = async (
  searchParams: z.infer<typeof GetWishListGiftsParams>
) => {
  const validatedFields = GetWishListGiftsParams.safeParse(searchParams);

  if (!validatedFields.success) {
    return [];
  }

  const { wishlistId, name, page, itemsPerPage } = validatedFields.data;

  const query: Prisma.WishListGiftWhereInput = {
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
