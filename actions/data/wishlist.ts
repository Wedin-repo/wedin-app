'use server';

import prisma from '@/db/client';
import {
  GiftSchema,
  GiftWishListSchema,
  GiftsWishListSchema,
} from '@/schemas/forms';
import { revalidatePath } from 'next/cache';
import type * as z from 'zod';
import {
  getErrorMessage,
  validateCategory,
  validateGiftAndWishlist,
} from '../helper';

export const addGiftToWishList = async (
  formData: z.infer<typeof GiftWishListSchema>
) => {
  const validatedFields = GiftWishListSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      status: 'Error',
      message: 'Invalid Data',
    };
  }

  const { giftId, wishlistId } = validatedFields.data;

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
  formData: z.infer<typeof GiftsWishListSchema>
) => {
  const validatedFields = GiftsWishListSchema.safeParse(formData);

  if (!validatedFields.success) {
    return {
      status: 'Error',
      message: 'Invalid gift Ids',
    };
  }

  const { giftIds, wishlistId } = validatedFields.data;

  try {
    await prisma.wishList.update({
      where: { id: wishlistId },
      data: {
        gifts: {
          connect: giftIds.map(giftId => ({ id: giftId })),
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
  formData: z.infer<typeof GiftWishListSchema>
) => {
  const validatedFields = GiftWishListSchema.safeParse(formData);

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
  } catch (error) {
    return { error: getErrorMessage(error) };
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
      success: 'Regalo creado y agregado a tu lista.',
      gift: newGift,
    };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};
