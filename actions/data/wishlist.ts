'use server';

import prisma from '@/db/client';
import { revalidatePath } from 'next/cache';
import type * as z from 'zod';
import {
  getErrorMessage,
  validateCategory,
  validateGiftAndWishlist,
} from '../helper';
import { GiftSchema, RemoveGiftFromWishListSchema } from '@/schemas/forms';

export const addGiftToWishList = async (
  wishlistId: string,
  formData: FormData
) => {
  const giftId = formData.get('giftId') as string | null;

  if (typeof giftId !== 'string' || giftId === null) {
    return {
      status: 'Error',
      message: 'Invalid gift ID',
    };
  }

  if (!wishlistId) {
    return {
      status: 'Error',
      message: 'Wishlist not found',
    };
  }

  try {
    await prisma.wishList.update({
      where: { id: wishlistId },
      data: {
        gifts: {
          connect: { id: giftId },
        },
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
  wishlistId: string,
  formData: FormData
) => {
  const giftIds = formData.get('giftIds') as string | null;

  if (giftIds === null || !giftIds) {
    return {
      status: 'Error',
      message: 'Invalid gift Ids',
    };
  }

  const arrayGiftIds = giftIds?.split(',');

  if (arrayGiftIds === null || arrayGiftIds.length === 0) {
    return {
      status: 'Error',
      message: 'Something went wrong. Please try again.',
    };
  }

  try {
    await prisma.wishList.update({
      where: { id: wishlistId },
      data: {
        gifts: {
          connect: arrayGiftIds.map(giftId => ({ id: giftId })),
        },
      },
    });
  } catch (error: unknown) {
    return {
      status: 'Error',
      message: getErrorMessage(error),
    };
  }

  revalidatePath('/dashboard');

  return {
    status: 'Éxito! 🎁🎉',
    message: 'Regalo agregado a tu lista.',
  };
};

export const deleteGiftFromWishList = async (
  formData: z.infer<typeof RemoveGiftFromWishListSchema>
) => {
  const validatedFields = RemoveGiftFromWishListSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      status: 'Error',
      message: 'Datos requeridos no fueron encontrados',
    };
  }

  const { wishlistId, giftId } = validatedFields.data;

  try {
    await prisma.wishList.update({
      where: { id: wishlistId },
      data: {
        gifts: {
          disconnect: { id: giftId },
        },
      },
    });
  } catch (error) {
    return {
      status: 'Error',
      message: getErrorMessage(error),
    };
  }

  revalidatePath('/', 'layout');

  return {
    status: 'Éxito! 🎁🗑',
    message: 'Regalo eliminado de tu lista.',
  };
};

export const editOrCreateGift = async (
  formData: z.infer<typeof GiftSchema>
) => {
  try {
    const validatedFields = GiftSchema.safeParse(formData);

    if (!validatedFields.success) {
      return { error: 'Campos inválidos' };
    }

    await validateCategory(validatedFields.data.categoryId);

    const { gift } = await validateGiftAndWishlist(
      validatedFields.data.id,
      validatedFields.data.wishListId
    );

    const newGiftData = {
      name: validatedFields.data.name,
      categoryId: validatedFields.data.categoryId,
      price: validatedFields.data.price,
      isFavoriteGift: validatedFields.data.isFavoriteGift,
      isGroupGift: validatedFields.data.isGroupGift,
      isDefault: false,
      isEditedVersion: true,
      sourceGiftId: validatedFields.data.id,
      description: 'a new gift creater by user', // TODO: inform UX about description issue
    };

    if (gift.isDefault) {
      const response = await prisma.gift.create({
        data: { ...newGiftData },
      });
      await prisma.wishList.update({
        where: { id: validatedFields.data.wishListId },
        data: {
          gifts: {
            disconnect: { id: validatedFields.data.id },
            connect: { id: response?.id },
          },
        },
      });
    }

    if (!gift.isDefault) {
      const response = await prisma.gift.update({
        where: { id: validatedFields.data.id },
        data: newGiftData,
      });
      await prisma.wishList.update({
        where: { id: validatedFields.data.wishListId },
        data: {
          gifts: {
            connect: { id: response?.id },
          },
        },
      });
    }

    revalidatePath('/dashboard');
    return {
      status: 'Success',
      message: 'Updated gift in wishlist successfully',
    };
  } catch (error) {
    return { status: 'Error', message: getErrorMessage(error) };
  }
};

export const createGiftToWishList = async (
  formData: z.infer<typeof GiftSchema>
) => {
  try {
    const validatedFields = GiftSchema.safeParse(formData);

    if (!validatedFields.success) {
      return { error: 'Invalid fields' };
    }

    // Validate category
    await validateCategory(validatedFields.data.categoryId);

    // Create the new gift
    const newGift = await prisma.gift.create({
      data: {
        name: validatedFields.data.name,
        categoryId: validatedFields.data.categoryId,
        price: validatedFields.data.price,
        isFavoriteGift: validatedFields.data.isFavoriteGift,
        isGroupGift: validatedFields.data.isGroupGift ?? false,
        isDefault: false,
        isEditedVersion: false,
        description: 'a new gift creater by user', // TODO: inform UX about description issue
      },
    });

    // Connect the new gift to the wishlist
    await prisma.wishList.update({
      where: { id: validatedFields.data.wishListId },
      data: {
        gifts: {
          connect: { id: newGift.id },
        },
      },
    });

    // Revalidate the cache
    revalidatePath('/gifts?tab=predefinedGifts');

    return {
      status: 'Success',
      message: 'Regalo creado y agregado a tu lista.',
      gift: newGift,
    };
  } catch (error) {
    return { status: 'Error', message: getErrorMessage(error) };
  }
};

export async function getWishList(wishListId: string | null | undefined) {
  try {
    if (wishListId === null) return null;
    const wishList = await prisma.wishList.findFirst({
      where: { id: wishListId },
    });

    if (!wishList) return null;

    return wishList;
  } catch (error: unknown) {
    console.error(error);
    return null;
  }
}
