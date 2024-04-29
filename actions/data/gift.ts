'use server';

import { GiftPageSearchParams } from '@/app/(default)/gifts/page';
import { GiftListSearchParams } from '@/app/(default)/lists/[listId]/page';
import prisma from '@/db/client';

export type GetGiftsParams = {
  category?: string;
  giftListId?: string;
  wishListId?: string | null;
  itemsPerPage?: number;
} & Omit<GiftPageSearchParams, 'tab'>;

export async function getGifts({
  searchParams,
}: {
  searchParams?: GetGiftsParams;
}) {
  if (!searchParams) {
    try {
      return await prisma.gift.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.error('Error retrieving all gifts:', error);
      return [];
    }
  }

  let query: any = {};

  const { category, giftListId, wishListId, name, page, itemsPerPage } =
    searchParams;

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

  if (page && itemsPerPage) {
    try {
      return await prisma.gift.findMany({
        where: query,
        skip: (parseInt(page) - 1) * itemsPerPage,
        take: itemsPerPage,
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.error('Error retrieving paginated gifts', error);
      return [];
    }
  }

  try {
    return await prisma.gift.findMany({
      where: query,
      orderBy: {
        createdAt: 'desc',
      },
    });
  } catch (error) {
    console.error('Error retrieving filtered gifts:', error);
    return [];
  }
}
