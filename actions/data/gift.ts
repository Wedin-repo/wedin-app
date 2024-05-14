'use server';

import prisma from '@/db/client';
import { revalidatePath } from 'next/cache';

export type GetGiftsParams = {
  category?: string;
  giftListId?: string;
  wishListId?: string;
  itemsPerPage?: number;
  page?: string;
  name?: string;
};

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

  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const query: any = {};

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
        skip: (Number.parseInt(page) - 1) * itemsPerPage,
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

export async function updateGiftImageUrl(url: string, giftId: string) {
  try {
    await prisma.gift.update({
      where: { id: giftId },
      data: { imageUrl: url },
    });

    revalidatePath('/dashboard');
  } catch (error) {
    console.error('Error updating gift image URL:', error);
    return { error: 'Error al agregar la imagen' };
  }
}
