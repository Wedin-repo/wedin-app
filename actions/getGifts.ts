import prisma from '@/db/client';

export type GetGiftsParams = {
  category?: string;
  giftListId?: string;
  wishListId?: string | null;
};

export async function getGifts({
  searchParams,
}: {
  searchParams?: GetGiftsParams;
}) {
  try {
    let query: any = {};

    if (!searchParams) {
      const gifts = await prisma.gift.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      if (!gifts) return null;

      return gifts;
    }

    const { category, giftListId, wishListId } = searchParams;

    if (category) {
      query.categoryId = category;
    }

    if (giftListId) {
      query.giftListId = giftListId;
    }

    if (wishListId) {
      query.wishListIds = {
        has: wishListId,
      };
    }

    const gifts = await prisma.gift.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!gifts) return null;

    return gifts;
  } catch (error: any) {
    console.error('Error retrieving gifts:', error);
    throw error;
  }
}
