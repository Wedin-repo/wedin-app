'use server';

import { auth } from '@/auth';
import prismaClient from '@/prisma/client';
import { StepTwoSchema } from '@/schemas/auth';
import type { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import type { z } from 'zod';
import { getEvent } from '../data/event';

export const stepTwoUpdate = async (values: z.infer<typeof StepTwoSchema>) => {
  const validatedFields = StepTwoSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  if (validatedFields.success) {
    const event = await getEvent();
    const { eventCountry, eventCity, hasPYbankAccount } = validatedFields.data;

    const session = await auth();

    if (!session?.user?.email) return { error: 'Error obteniendo tu sesión' };

    try {
      await prismaClient.event.update({
        where: {
          primaryUserId: event?.primaryUserId,
        },
        data: {
          country: eventCountry,
          city: eventCity,
          hasPYbankAccount: hasPYbankAccount,
        },
      });

      revalidatePath('/');
    } catch (error) {
      console.error(error);
      return { error: 'Error al actualizar la boda' };
    }

    let primaryUser: User;
    let secondaryUser: User;

    try {
      primaryUser = await prismaClient.user.update({
        where: { email: session.user.email },
        data: {
          isOnboarded: true,
        },
      });
    } catch (error) {
      console.error(error);
      return { error: 'Error al actualizar tu usuario' };
    }

    try {
      secondaryUser = await prismaClient.user.update({
        where: { id: event?.secondaryUserId },
        data: {
          isOnboarded: true,
          onboardingStep: 2,
        },
      });
    } catch (error) {
      console.error(error);
      return { error: 'Error al actualizar el usuario de tu pareja' };
    }

    if (!primaryUser) return { error: 'Error obteniendo tu usuario' };
  }
};
