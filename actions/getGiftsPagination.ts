import prisma from '@/db/client';

export type GetGiftsParams = {
  category?: string;
  wishListId?: string | null;
  name?: string;
  page: number;
  itemsPerPage: number;
};

export async function getGiftsPagination({
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
      wishListId,
      name,
      page = 1,
      itemsPerPage = 15,
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

    if (wishListId) {
      query.wishListIds = {
        has: wishListId,
      };
    }

    const gifts = await prisma.gift.findMany({
      where: query,
      skip: (page - 1) * itemsPerPage,
      take: itemsPerPage,
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalGiftsCount = await prisma.gift.count({ where: query });

    return {
      gifts,
      totalGiftsCount,
    };
  } catch (error: any) {
    console.error('Error retrieving gifts:', error);
    throw error;
  }
}
