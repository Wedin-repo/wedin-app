import prisma from '@/db/client';

export async function getWishListByWeddingId(wishListId: string | null | undefined) {
  try {
    if (wishListId === null) return null;
    const wishList = await prisma.wishList.findFirst({
      where: { id: wishListId },
    });

    if (!wishList) return null;

    return wishList;
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
