'use server';

import prismaClient from '@/prisma/client';
import type { GetGiftListsSearchParams } from '@/schemas/params';
import type { Prisma } from '@prisma/client';
import type { z } from 'zod';

export async function getGiftList(giftListId: string) {
  try {
    const giftList = await prismaClient.giftList.findUnique({
      include: {
        gifts: true,
      },
      where: {
        id: giftListId,
      },
    });

    if (!giftList) return null;

    return giftList;
  } catch (error) {
    console.error('Error retrieving gifts:', error);
    throw error;
  }
}

export async function getGiftLists({
  searchParams,
}: {
  searchParams?: z.infer<typeof GetGiftListsSearchParams>;
}) {
  const query: Prisma.GiftListWhereInput = {};

  if (searchParams) {
    const { category, name } = searchParams;

    if (name) {
      query.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (category) {
      query.categoryId = category;
    }
  }

  try {
    const giftLists = await prismaClient.giftList.findMany({
      where: query,
      include: {
        gifts: true,
      },
    });

    return giftLists;
  } catch (error) {
    console.error('Error retrieving gift lists:', error);
    throw new Error('Failed to retrieve gift lists');
  }
}
