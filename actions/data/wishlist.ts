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

async function validateGiftAndWishlist(giftId: string, wishlistId: string) {
  const gift = await prisma.gift.findUnique({ where: { id: giftId } });
  const wishlist = await prisma.wishList.findUnique({
    where: { id: wishlistId },
  });
  if (!gift || !wishlist) throw new Error('Gift or Wishlist not found');
  return { gift, wishlist };
}

async function validateCategory(categoryId: string) {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });
  if (!category) throw new Error('Invalid category ID');
}

const isValidPrice = (price: string): boolean =>
  /^\d+(\.\d{1,2})?$/.test(price);

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
  wishlistId: string,
  formData: FormData
) => {
  try {
    const {
      giftId,
      newName,
      newCategoryId,
      price,
      isFavoriteGift,
      isGroupGift,
    } = parseFormData(formData);
    if (!giftId || !wishlistId)
      throw new Error('Invalid or missing gift ID or wishlist ID');

    await validateCategory(newCategoryId ?? '');
    if (!isValidPrice(price ?? '')) throw new Error('Invalid price format');

    const { gift, wishlist } = await validateGiftAndWishlist(
      giftId,
      wishlistId
    );

    const newGiftData = {
      name: newName ?? gift.name,
      categoryId: newCategoryId ?? gift.categoryId,
      price: price ?? gift.price,
      isFavoriteGift,
      isGroupGift,
      isDefault: false,
      isEditedVersion: true,
      sourceGiftId: gift.id,
      description: 'a new gift creater by user',
      giftListId: '507f1f77bcf86cd799439011',
    };

    const response = gift.isDefault
      ? await prisma.gift.create({ data: { ...newGiftData } })
      : await prisma.gift.update({
          where: { id: giftId },
          data: newGiftData,
        });

    await prisma.wishList.update({
      where: { id: wishlistId },
      data: {
        gifts: {
          connect: { id: response.id },
        },
      },
    });

    revalidatePath('/dashboard');
    return {
      status: 'Success',
      message: 'Updated gift in wishlist successfully',
    };
  } catch (error) {
    return { status: 'Error', message: getErrorMessage(error) };
  }
};

function parseFormData(formData: FormData) {
  return {
    giftId: formData.get('giftId') as string | null,
    newName: formData.get('name') as string | null,
    newCategoryId: formData.get('categoryId') as string | null,
    price: formData.get('price') as string | null,
    isFavoriteGift: formData.get('isFavoriteGift') === 'true',
    isGroupGift: formData.get('isGroupGift') === 'true',
  };
}

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
