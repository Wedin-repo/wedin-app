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
    status: 'Success',
    message: 'Added gift to wishlist successfully',
  };
};
