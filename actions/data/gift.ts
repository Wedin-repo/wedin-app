'use server';

import prisma from '@/db/client';
import {
  GiftCreateSchema,
  GiftEditSchema,
  type GiftPostSchema,
} from '@/schemas/form';
import { GetGiftsParams } from '@/schemas/params';
import type { Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import type { z } from 'zod';
import { getErrorMessage } from '../helper';

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
  searchParams?: z.infer<typeof GetGiftsParams>;
}) {
  const validatedParams = GetGiftsParams.safeParse(searchParams);

  if (!validatedParams.success) return [];

  const { category, giftlistId, name, page, itemsPerPage } =
    validatedParams.data;
  const query: Prisma.GiftWhereInput = { isDefault: true };

  if (name) {
    query.name = {
      contains: name.trim(),
      mode: 'insensitive',
    };
  }

  if (category) {
    query.categoryId = category;
  }

  if (giftlistId) {
    query.giftlistId = giftlistId;
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

export async function editGift(
  formData: z.infer<typeof GiftPostSchema>,
  giftId: string
) {
  const validatedFields = GiftEditSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: 'Datos inválidos, por favor verifica tus datos.' };
  }

  try {
    const gift = await prisma.gift.update({
      where: { id: giftId },
      data: {
        name: validatedFields.data.name,
        categoryId: validatedFields.data.categoryId,
        price: validatedFields.data.price,
      },
    });

    if (!gift) {
      return { error: 'Error al editar el regalo' };
    }

    revalidatePath('/dashboard');
    return { giftId: gift.id };
  } catch (error) {
    console.error('Error editing gift:', error);
    return { error: 'Error al editar el regalo' };
  }
}

export async function createGift(formData: z.infer<typeof GiftPostSchema>) {
  const validatedFields = GiftCreateSchema.safeParse(formData);

  if (!validatedFields.success) {
    return { error: 'Datos inválidos, por favor verifica tus datos.' };
  }

  try {
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
      return { error: 'Error al crear regalo' };
    }

    revalidatePath('/dashboard');
    return { giftId: newGift.id };
  } catch (error) {
    console.error('Error creating gift:', error);
    return { error: getErrorMessage(error) };
  }
}
