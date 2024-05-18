'use server';

import prismaClient from '@/prisma/client';
import {
  WishListGiftDeleteSchema,
  WishListGiftEditSchema,
  WishListGiftsCreateSchema,
  WishlistGiftCreateSchema,
} from '@/schemas/form';
import { GetWishListGiftsParams } from '@/schemas/params';
import type { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import type * as z from 'zod';
import { getErrorMessage } from '../helper';

export async function createWishlistGift(
  formData: z.infer<typeof WishlistGiftCreateSchema>
) {
  const validatedFields = WishlistGiftCreateSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: 'Invalid Data' };
  }

  const { giftId, wishlistId, isGroupGift, isFavoriteGift } =
    validatedFields.data;

  try {
    await prismaClient.wishListGift.create({
      data: {
        wishListId: wishlistId,
        giftId,
        isGroupGift,
        isFavoriteGift,
      },
    });
    revalidatePath('/dashboard');
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function addGiftsToWishList(
  formData: z.infer<typeof WishListGiftsCreateSchema>
) {
  const validatedFields = WishListGiftsCreateSchema.safeParse(formData);

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
    await prismaClient.wishListGift.createMany({
      data: wishListGiftData,
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function deleteGiftFromWishList(
  formData: z.infer<typeof WishListGiftDeleteSchema>
) {
  const validatedFields = WishListGiftDeleteSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: 'Datos requeridos no fueron encontrados' };
  }

  const { wishlistId, giftId } = validatedFields.data;

  try {
    await prismaClient.wishListGift.deleteMany({
      where: {
        wishListId: wishlistId,
        giftId: giftId,
      },
    });
  } catch (error) {
    return { error: getErrorMessage(error) };
  }

  revalidatePath('/dashboard');
}

export async function getWishlistGifts(
  searchParams: z.infer<typeof GetWishListGiftsParams>
) {
  const validatedFields = GetWishListGiftsParams.safeParse(searchParams);

  if (!validatedFields.success) {
    return [];
  }

  const { wishlistId, name, page, itemsPerPage, category } =
    validatedFields.data;

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

  if (category) {
    query.gift = {
      categoryId: category,
    };
  }

  const skip =
    page && itemsPerPage ? (Number(page) - 1) * itemsPerPage : undefined;
  const take = itemsPerPage ? Number(itemsPerPage) : undefined;

  try {
    return await prismaClient.wishListGift.findMany({
      where: query,
      include: {
        gift: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      skip,
      take,
    });
  } catch (error) {
    console.error('Error retrieving wishlist gifts:', error);
    return [];
  }
}

export async function updateWishlistGift(
  formValues: z.infer<typeof WishListGiftEditSchema>
) {
  const validatedFields = WishListGiftEditSchema.safeParse(formValues);

  if (!validatedFields.success) {
    return { error: 'Datos inválidos, por favor verifica tus datos.' };
  }

  const { isFavoriteGift, isGroupGift, wishlistGiftId } = validatedFields.data;

  try {
    await prismaClient.wishListGift.update({
      where: { id: wishlistGiftId },
      data: {
        isFavoriteGift,
        isGroupGift,
      },
    });
    revalidatePath('/dashboard');
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
}
