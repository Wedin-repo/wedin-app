'use server';

import prisma from '@/db/client';
import type { GetGiftListsSearchParams } from '@/schemas/forms/params';
import type { Prisma } from '@prisma/client';
import type { z } from 'zod';

export async function getGiftList(giftListId: string) {
  try {
    const giftList = await prisma.giftList.findUnique({
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
  try {
    const query: Prisma.GiftListWhereInput = {};

    if (!searchParams) {
      const giftLists = await prisma.giftList.findMany({
        where: query,
      });

      if (!giftLists) return null;

      return giftLists;
    }

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

    const giftLists = await prisma.giftList.findMany({
      where: query,
    });

    if (!giftLists) return null;

    return giftLists;
  } catch (error) {
    console.error('Error retrieving gift lists:', error);
    throw error;
  }
}
