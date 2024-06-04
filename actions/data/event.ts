'use server';

import { auth } from '@/auth';
import type * as z from 'zod';
import type { User, Event } from '@prisma/client';
import prismaClient from '@/prisma/client';
import { getCurrentUser } from '../get-current-user';
import {
  EventUrlFormSchema,
  EventCoverMessageFormSchema,
  EventDateFormSchema,
  EventCoverImageFormSchema,
  EventDetailsFormSchema,
} from '@/schemas/form';
import { revalidatePath } from 'next/cache';

export async function getEvent() {
  const user = await getCurrentUser();

  if (!user) return null;

  const userId = user.id;

  try {
    const event = await prismaClient.event.findFirst({
      include: {
        eventPrimaryUser: true,
        eventSecondaryUser: true,
      },
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

export async function updateEventCoverImageUrl(
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
    return { success: true };
  } catch (error) {
    console.error('Error updating event cover image URL:', error);
    return { error: 'Error updating event cover image URL' };
  }
}

export type EventType = 'WEDDING' | 'BIRTHDAY' | 'BABY_SHOWER' | 'OTHER';

export async function updateEventDetails(
  values: z.infer<typeof EventDetailsFormSchema>
) {
  const validatedFields = EventDetailsFormSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: 'Campo inválido' };
  }

  const {
    eventId,
    eventType,
    eventCity,
    eventCountry,
    eventGuests,
    name,
    lastName,
    partnerName,
    partnerLastName,
    partnerEmail,
  } = validatedFields.data;

  let event: Event;
  let primaryUser: User;
  let secondaryUser: User;

  try {
    secondaryUser = await prismaClient.user.update({
      where: {
        email: partnerEmail,
      },
      data: {
        name: partnerName,
        lastName: partnerLastName,
      },
    });
  } catch (error) {
    return { error: 'Error actualizando los datos de tu pareja' };
  }

  const session = await auth();

  if (!session?.user?.email) return { error: 'Error obteniendo tu sesión' };

  try {
    primaryUser = await prismaClient.user.update({
      where: {
        email: session.user.email, // This checks if a user exists with this email
      },
      data: {
        name: name,
        lastName: lastName,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: 'Error actualizando tu perfil' };
  }

  try {
    event = await prismaClient.event.update({
      where: {
        id: eventId,
      },
      data: {
        country: eventCountry,
        city: eventCity,
        eventType: eventType as EventType,
        guests: eventGuests,
      },
    });
  } catch (error) {
    console.error(error);
    return { error: 'Error actualizando los detalles de tu evento' };
  }
}
