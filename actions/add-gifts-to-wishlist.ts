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
