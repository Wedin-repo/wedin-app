'use server';

import type * as z from 'zod';
import prismaClient from '@/prisma/client';
import { getCurrentUser } from '../get-current-user';
import { EventUrlFormSchema } from '@/schemas/form';

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
    const updatedEventUrl = await prismaClient.event.update({
      where: { id: values.eventId },
      data: { url: values.eventUrl },
    });

    return {
      status: 'Exito! 🔗🎉',
      description:
        'La dirección de tu evento ha sido actualizada correctamente.',
    };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to update event URL' };
  }
}
