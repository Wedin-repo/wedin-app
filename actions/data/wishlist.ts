'use server';

import prisma from '@/db/client';
import { revalidatePath } from 'next/cache';
import { GiftSchema } from '@/schemas';
import * as z from 'zod';

export const getErrorMessage = (error: unknown): string => {
  let message: string;

  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === 'object' && 'message' in error) {
    message = String(error.message);
  } else if (typeof error === 'string') {
    message = error;
  } else {
    message = 'Something went wrong';
  }

  return message;
};

export async function validateGiftAndWishlist(
  giftId: string,
  wishlistId: string
) {
  const gift = await prisma.gift.findUnique({ where: { id: giftId } });
  const wishlist = await prisma.wishList.findUnique({
    where: { id: wishlistId },
  });
  if (!gift || !wishlist) throw new Error('Gift or Wishlist not found');
  return { gift, wishlist };
}

export async function validateCategory(categoryId: string) {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) throw new Error('Invalid category ID');
}

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
  wishlistId: string,
  formData: FormData
) => {
  const giftId = formData.get('content') as string | null;

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
          disconnect: { id: giftId },
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
    status: 'Éxito! 🎁🗑️',
    message: 'Regalo eliminado de tu lista.',
  };
};

export const editOrCreateGift = async (
  formData: z.infer<typeof GiftSchema> | null = null
) => {
  try {
    const validatedFields = GiftSchema.safeParse(formData);

    if (!validatedFields.success) {
      return { error: 'Campos inválidos' };
    }

    await validateCategory(validatedFields.data.categoryId);

    const { gift, wishlist } = await validateGiftAndWishlist(
      validatedFields.data.id,
      validatedFields.data.wishListId
    );

    const newGiftData = {
      name: validatedFields.data.name ?? gift.name,
      categoryId: validatedFields.data.categoryId ?? gift.categoryId,
      price: validatedFields.data.price ?? gift.price,
      isFavoriteGift: validatedFields.data.isFavoriteGift,
      isGroupGift: validatedFields.data.isGroupGift,
      isDefault: false,
      isEditedVersion: true,
      sourceGiftId: validatedFields.data.id,
      description: 'a new gift creater by user', // TODO: inform UX about description issue
    };

    let response;

    if (gift.isDefault) {
      response = await prisma.gift.create({
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
      response = await prisma.gift.update({
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
  formData: z.infer<typeof GiftSchema> | null = null
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
        isGroupGift: validatedFields.data.isGroupGift,
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
  } catch (error: any) {
    console.error(error);
    return null;
  }
}
