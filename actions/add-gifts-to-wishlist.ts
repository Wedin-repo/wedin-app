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
  const giftIds = formData.get('giftIds') as string[] | null;

  if (giftIds === null || giftIds.length === 0) {
    return {
      status: 'Error',
      message: 'Invalid gift IDs',
    };
  }

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

  revalidatePath('/', 'layout');

  return {
    status: 'Éxito! 🎁🎉',
    message: 'Regalo agregado a tu lista.',
  };
};
