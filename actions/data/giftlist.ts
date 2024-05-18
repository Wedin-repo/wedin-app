'use server';

import prismaClient from '@/prisma/client';
import type { GetGiftlistsSearchParams } from '@/schemas/params';
import type { Prisma } from '@prisma/client';
import type { z } from 'zod';

export async function getGiftlist(giftlistId: string) {
  try {
    const giftlist = await prismaClient.giftlist.findUnique({
      include: {
        gifts: true,
      },
      where: {
        id: giftlistId,
      },
    });

    if (!giftlist) return null;

    return giftlist;
  } catch (error) {
    console.error('Error retrieving gifts:', error);
    throw error;
  }
}

export async function getGiftlists({
  searchParams,
}: {
  searchParams?: z.infer<typeof GetGiftlistsSearchParams>;
}) {
  const query: Prisma.GiftlistWhereInput = {};

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
    const giftlists = await prismaClient.giftlist.findMany({
      where: query,
      include: {
        gifts: true,
      },
    });

    return giftlists;
  } catch (error) {
    console.error('Error retrieving gift lists:', error);
    throw new Error('Failed to retrieve gift lists');
  }
}
