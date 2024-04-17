'use server';

import prisma from '@/db/client';
import { revalidatePath } from 'next/cache';

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'object' && error && 'message' in error)
    return String(error.message);
  return 'Something went wrong';
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
