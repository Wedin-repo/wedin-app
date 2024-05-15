'use server';

import prisma from '@/db/client';
import { GiftPostSchema } from '@/schemas/forms';
import type { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import type { z } from 'zod';
import {
  getErrorMessage,
  validateCategory,
  validateGift,
  validateWishlist,
} from '../helper';
import { getEvent } from './event';

export type GetGiftsParams = {
  category?: string;
  giftlistId?: string;
  wishlistId?: string;
  itemsPerPage?: number;
  page?: string;
  name?: string;
};

export async function getGift(giftId: string) {
  try {
    return await prisma.gift.findUnique({
      where: { id: giftId },
    });
  } catch (error) {
    console.error('Error retrieving gift:', error);
    return null;
  }
}

export async function getGifts({
  searchParams,
}: {
  searchParams?: GetGiftsParams;
} = {}) {
  const query: Prisma.GiftWhereInput = {};

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

    const skip =
      page && itemsPerPage ? (Number(page) - 1) * itemsPerPage : undefined;
    const take = itemsPerPage ? Number(itemsPerPage) : undefined;

    try {
      return await prisma.gift.findMany({
        where: query,
        orderBy: {
          createdAt: 'desc',
        },
        skip,
        take,
      });
    } catch (error) {
      console.error('Error retrieving gifts:', error);
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

export const editGift = async (
  formData: z.infer<typeof GiftPostSchema>,
  giftId: string
) => {
  const validatedFields = GiftPostSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: 'Datos inválidos, por favor verifica tus datos.' };
  }

  try {
    await prisma.gift.update({
      where: { id: giftId },
      data: {
        name: validatedFields.data.name,
        categoryId: validatedFields.data.categoryId,
        price: validatedFields.data.price,
      },
    });
  } catch (error) {
    return { error: 'Error al editar el regalo' };
  }

  revalidatePath('/dashboard');
};

export const createGift = async (formData: z.infer<typeof GiftPostSchema>) => {
  const validatedFields = GiftPostSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: 'Datos inválidos, por favor verifica tus datos.' };
  }

  const newGift = await prisma.gift.create({
    data: {
      name: validatedFields.data.name,
      categoryId: validatedFields.data.categoryId,
      price: validatedFields.data.price,
      isDefault: validatedFields.data.isDefault,
      isEditedVersion: validatedFields.data.isEditedVersion,
      eventId: validatedFields.data.eventId,
    },
  });

  if (!newGift) {
    return { error: 'Error creating gift' };
  }

  revalidatePath('/gifts?tab=predefinedGifts');

  try {
    return { giftId: newGift.id };
  } catch (error) {
    return { error: getErrorMessage(error) };
  }
};
