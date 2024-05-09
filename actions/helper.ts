import prisma from '@/db/client';

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
