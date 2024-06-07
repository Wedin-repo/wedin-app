'use server';

import { auth } from '@/auth';
import type * as z from 'zod';
import type { User, Event } from '@prisma/client';
import prismaClient from '@/prisma/client';
import { getCurrentUser } from '../get-current-user';
import { BankDetailsFormSchema } from '@/schemas/form';
import { revalidatePath } from 'next/cache';

export async function getBankDetailsByEventId(url: string) {
  try {
    const event = await prismaClient.event.findFirst({
      where: { url },
      include: {
        wishlistGifts: {
          include: {
            gift: true,
            transactions: true,
          },
        },
        eventPrimaryUser: true,
        eventSecondaryUser: true,
      },
    });

    if (!event) return null;

    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateBankDetails(
  values: z.infer<typeof BankDetailsFormSchema>
) {
  const validatedField = BankDetailsFormSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: 'Campo inválido' };
  }

  try {
    // await prismaClient.event.update({
    //   where: { id: values.eventId },
    //   data: { url: values.eventUrl },
    // });
    revalidatePath('/dashboard');
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update event URL' };
  }
}
