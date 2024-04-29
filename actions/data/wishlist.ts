'use server';

import prisma from '@/db/client';
import { revalidatePath } from 'next/cache';

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

export const editGiftInWishList = async (
  wishlistId: string,
  formData: FormData
) => {
  const giftId = formData.get('giftId') as string | null;
  const newName = formData.get('name') as string | null;
  const newCategory = formData.get('category') as string | null;
  const price = formData.get('price') as string | null;
  const isFavoriteGift = formData.get('isFavoriteGift') as boolean | null;
  const isGroupGift = formData.get('isGroupGift') as boolean | null;

  if (!giftId) {
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

  const updateData: any = {};
  if (newName) updateData.name = newName;
  if (newCategory) updateData.category = newCategory;
  if (price) updateData.price = Number(price);
  if (isFavoriteGift) updateData.isDefault = isFavoriteGift;
  if (isGroupGift) updateData.isGroupGift = isGroupGift;

  try {
    await prisma.gift.update({
      where: { id: giftId },
      data: updateData,
    });
  } catch (error: unknown) {
    return {
      status: 'Error',
      message: getErrorMessage(error),
    };
  }

  revalidatePath('/dashboard');

  return {
    status: 'Success',
    message: 'Updated gift in wishlist successfully',
  };
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
