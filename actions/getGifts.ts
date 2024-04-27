import prisma from '@/db/client';

export type GetGiftsParams = {
  category?: string;
  giftListId?: string;
  wishListId?: string | null;
  name?: string;
  page?: number;
  itemsPerPage?: number;
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

    const {
      category,
      giftListId,
      wishListId,
      name,
      page,
      itemsPerPage = 15 /* default items per page */,
    } = searchParams;

    if (name) {
      query.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

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

    const skip = page && itemsPerPage ? (page - 1) * itemsPerPage : undefined;
    const take = itemsPerPage || undefined;

    const gifts = await prisma.gift.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
      /* skip,
      take, */
    });

    //const totalGiftsCount = page && itemsPerPage ? await prisma.gift.count({ where: query }) : undefined;

    if (!gifts) return null;

    return gifts;
  } catch (error: any) {
    console.error('Error retrieving gifts:', error);
    throw error;
  }
}
