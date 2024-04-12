import prisma from '@/db/client';

export type GiftParams = {
  category?: string;
  giftListId?: string;
  wishListId?: string | null;
};

export async function getGifts({ searchParams }: { searchParams?: GiftParams }) {
  try {
    let query: any = {};
    const { category, giftListId, wishListId } = searchParams ?? {};

    if (category) {
      query.categoryId = category;
    }

    if (giftListId) {
      query.giftListId = giftListId;
    }

    if (wishListId) {
      query.wishListIds = {
        has: wishListId
      };
    }

    const gifts = await prisma.gift.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
      // Include relational data if needed
      /* include: {
        giftList: true,
        wishList: true,
      }, */
    });

    if (!gifts) return null;

    return gifts;
  } catch (error: any) {
    console.error('Error retrieving gifts:', error);
    throw error;
  }
}
