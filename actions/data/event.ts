'use server';

import type * as z from 'zod';
import prismaClient from '@/prisma/client';
import { getCurrentUser } from '../get-current-user';
import {
  EventUrlFormSchema,
  EventCoverMessageFormSchema,
  EventDateFormSchema,
  EventCoverImageFormSchema,
} from '@/schemas/form';
import { revalidatePath } from 'next/cache';

export async function getEvent() {
  const user = await getCurrentUser();

  if (!user) return null;

  const userId = user.id;

  try {
    const event = await prismaClient.event.findFirst({
      where: {
        OR: [{ primaryUserId: userId }, { secondaryUserId: userId }],
      },
    });

    if (!event) return null;

    return event;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getEventByUrl(url: string) {
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

export async function updateEventUrl(
  values: z.infer<typeof EventUrlFormSchema>
) {
  const validatedField = EventUrlFormSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: 'Campo inválido' };
  }

  try {
    await prismaClient.event.update({
      where: { id: values.eventId },
      data: { url: values.eventUrl },
    });
    revalidatePath('/dashboard');
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update event URL' };
  }
}

export async function updateEventCoverMessage(
  values: z.infer<typeof EventCoverMessageFormSchema>
) {
  const validatedField = EventCoverMessageFormSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: 'Campo inválido' };
  }

  try {
    await prismaClient.event.update({
      where: { id: values.eventId },
      data: { coverMessage: values.eventCoverMessage },
    });
    revalidatePath('/dashboard');
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update event cover message' };
  }
}

export async function updateEventDate(
  values: z.infer<typeof EventDateFormSchema>
) {
  const validatedField = EventDateFormSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: 'Campo inválido' };
  }

  try {
    await prismaClient.event.update({
      where: { id: values.eventId },
      data: { date: values.eventDate ?? null },
    });
    revalidatePath('/dashboard');
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update event date' };
  }
}

export async function updateEventCoverImage(
  values: z.infer<typeof EventCoverImageFormSchema>
) {
  const validatedField = EventCoverImageFormSchema.safeParse(values);

  if (!validatedField.success) {
    return { error: 'Campo inválido' };
  }

  try {
    await prismaClient.event.update({
      where: { id: values.eventId },
      data: { coverImageUrl: values.eventCoverImageUrl },
    });
    revalidatePath('/dashboard');
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update event cover image url' };
  }
}
