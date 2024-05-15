'use server';

import prisma from '@/db/client';
import type { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { getEvent } from './event';
import { GiftParamSchema } from '@/schemas/forms';
import type { z } from 'zod';
import {
  validateCategory,
  validateWishlist,
  validateGift,
  getErrorMessage,
} from '../helper';

export type GetGiftsParams = {
  category?: string;
  giftlistId?: string;
  wishlistId?: string;
  itemsPerPage?: number;
  page?: string;
  name?: string;
};

export async function getGift(giftId: string) {
  try {
    return await prisma.gift.findUnique({
      where: { id: giftId },
    });
  } catch (error) {
    console.error('Error retrieving gift:', error);
    return null;
  }
}

export async function getGifts({
  searchParams,
}: {
  searchParams?: GetGiftsParams;
} = {}) {
  const query: Prisma.GiftWhereInput = {};

  if (!searchParams) {
    query.isDefault = true;
  } else {
    const { category, giftlistId, name, page, itemsPerPage } = searchParams;

    if (name) {
      query.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (category) {
      query.categoryId = category;
    }

    if (giftlistId) {
      query.giftlistId = giftlistId;
    }

    // if (wishlistId) {
    //   query.wishlistId = wishlistId;
    // }

    const event = await getEvent();

    if (event?.id) {
      query.OR = [{ eventId: event.id }, { isDefault: true }];
    } else {
      query.isDefault = true;
    }

    const skip =
      page && itemsPerPage ? (Number(page) - 1) * itemsPerPage : undefined;
    const take = itemsPerPage ? Number(itemsPerPage) : undefined;

    try {
      return await prisma.gift.findMany({
        where: query,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take,
      });
    } catch (error) {
      console.error('Error retrieving gifts:', error);
      return [];
    }
  }

  try {
    return await prisma.gift.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error retrieving gifts:', error);
    return [];
  }
}

export async function updateGiftImageUrl(url: string, giftId: string) {
  try {
    await prisma.gift.update({
      where: { id: giftId },
      data: { imageUrl: url },
    });

    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Error updating gift image URL:', error);
    return { error: 'Error al agregar la imagen' };
  }
}

export const editOrCreateGift = async (
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

export const createWishListGift = async (
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
