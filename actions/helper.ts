import prisma from '@/db/client';
import { withCoalescedInvoke } from 'next/dist/lib/coalesced-function';

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
  if (!gift || !wishlist) return null;

  return { gift, wishlist };
}

export async function validateWishlist(wishlistId: string) {
  const wishlist = await prisma.wishList.findUnique({
    where: { id: wishlistId },
  });

  if (!wishlist) return null;

  return wishlist;
}

export async function validateGift(giftId: string) {
  const gift = await prisma.gift.findUnique({ where: { id: giftId } });

  if (!gift) return null;

  return gift;
}

export async function validateCategory(categoryId: string) {
  const category = await prisma.category.findUnique({
    where: { id: categoryId },
  });

  if (!category) return null;

  return category;
}
