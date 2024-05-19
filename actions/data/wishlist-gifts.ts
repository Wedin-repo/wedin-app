'use server';

import prismaClient from '@/prisma/client';
import {
  WishlistGiftCreateSchema,
  WishlistGiftDeleteSchema,
  WishlistGiftEditSchema,
  WishlistGiftsCreateSchema,
} from '@/schemas/form';
import {
  GetwishlistGiftsParams,
  WishlistGiftSearchParams,
} from '@/schemas/params';
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

  const { giftId, wishlistId, isGroupGift, isFavoriteGift, eventId } =
    validatedFields.data;

  try {
    const wishlistGift = await prismaClient.wishlistGift.create({
      data: {
        wishlistId,
        eventId,
        giftId,
        isGroupGift,
        isFavoriteGift,
      },
    });
    revalidatePath('/dashboard');
    return { wishlistGift };
  } catch (error: unknown) {
    return { error: getErrorMessage(error) };
  }
}

export async function createWishlistGifts(
  formData: z.infer<typeof WishlistGiftsCreateSchema>
) {
  const validatedFields = WishlistGiftsCreateSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      error: 'Invalid gift Ids',
    };
  }

  const { giftIds, wishlistId, eventId } = validatedFields.data;

  const wishlistGiftData = giftIds.map(giftId => ({
    wishlistId: wishlistId,
    giftId: giftId,
    eventId: eventId,
  }));

  try {
    await prismaClient.wishlistGift.createMany({
      data: wishlistGiftData,
    });
  } catch (error: unknown) {
    return {
      error: getErrorMessage(error),
    };
  }
}

export async function deleteGiftFromWishlist(
  formData: z.infer<typeof WishlistGiftDeleteSchema>
) {
  const validatedFields = WishlistGiftDeleteSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: 'Datos requeridos no fueron encontrados' };
  }

  const { wishlistId, giftId } = validatedFields.data;

  try {
    await prismaClient.wishlistGift.deleteMany({
      where: {
        wishlistId: wishlistId,
        giftId: giftId,
      },
    });
  } catch (error) {
    return { error: getErrorMessage(error) };
  }

  revalidatePath('/dashboard');
}

export async function getWishlistGifts(
  searchParams: z.infer<typeof GetwishlistGiftsParams>
) {
  const validatedFields = GetwishlistGiftsParams.safeParse(searchParams);

  if (!validatedFields.success) {
    return [];
  }

  const { wishlistId, name, page, itemsPerPage, category } =
    validatedFields.data;

  const query: Prisma.WishlistGiftWhereInput = {
    wishlistId: wishlistId,
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
    return await prismaClient.wishlistGift.findMany({
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
  formValues: z.infer<typeof WishlistGiftEditSchema>
) {
  const validatedFields = WishlistGiftEditSchema.safeParse(formValues);

  if (!validatedFields.success) {
    return { error: 'Datos inválidos, por favor verifica tus datos.' };
  }

  const { isFavoriteGift, isGroupGift, wishlistGiftId } = validatedFields.data;

  try {
    await prismaClient.wishlistGift.update({
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

export async function getwishlistGiftByParams(
  searchParams: z.infer<typeof WishlistGiftSearchParams>
) {
  const validatedFields = WishlistGiftSearchParams.safeParse(searchParams);

  if (!validatedFields.success) {
    return { error: 'Invalid search parameters' };
  }

  const { id, giftId, wishlistId } = validatedFields.data;

  // Build the query based on provided parameters
  const query: Prisma.WishlistGiftWhereInput = {};

  if (id) {
    query.id = id;
  }

  if (giftId) {
    query.giftId = giftId;
  }

  if (wishlistId) {
    query.wishlistId = wishlistId;
  }

  if (Object.keys(query).length === 0) {
    return { error: 'At least one search parameter must be provided' };
  }

  try {
    const wishlistGift = await prismaClient.wishlistGift.findFirst({
      where: query,
      include: {
        gift: true,
        transactions: true,
      },
    });

    if (!wishlistGift) {
      return { error: 'wishlistGift not found' };
    }

    return { wishlistGift };
  } catch (error) {
    console.error('Error retrieving wishlistGift:', error);
    return { error: 'Error retrieving wishlistGift' };
  }
}
