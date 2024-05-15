'use server';

import prisma from '@/db/client';
import { revalidatePath } from 'next/cache';
import { getEvent } from './event';

export type GetGiftsParams = {
  category?: string;
  giftlistId?: string;
  wishlistId?: string;
  itemsPerPage?: number;
  page?: string;
  name?: string;
};

export async function getGifts({
  searchParams,
}: {
  searchParams?: GetGiftsParams;
} = {}) {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const query: any = {};

  // Handle default gifts if no search parameters are provided
  if (!searchParams) {
    query.isDefault = true;
  } else {
    const { category, giftlistId, name, page, itemsPerPage } = searchParams;

    if (name) {
      query.name = {
        contains: name,
        mode: 'insensitive',
      };
    }

    if (category) {
      query.categoryId = category;
    }

    if (giftlistId) {
      query.giftlistId = giftlistId;
    }

    const event = await getEvent();

    if (event?.id) {
      query.OR = [{ eventId: event.id }, { isDefault: true }];
    } else {
      query.isDefault = true;
    }

    if (page && itemsPerPage) {
      query.skip = (Number.parseInt(page) - 1) * itemsPerPage;
      query.take = itemsPerPage;
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
    console.error('Error retrieving gifts:', error);
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
