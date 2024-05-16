'use server';

import { auth } from '@/auth';
import prisma from '@/db/client';
import { StepTwoSchema } from '@/schemas/forms/auth';
import type { User } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import type { z } from 'zod';

export const stepTwoUpdate = async (values: z.infer<typeof StepTwoSchema>) => {
  const validatedFields = StepTwoSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  if (validatedFields.success) {
    const { eventCountry, eventCity, hasPYbankAccount } = validatedFields.data;

    const session = await auth();

    if (!session?.user?.email) return { error: 'Error obteniendo tu sesión' };

    let groom: User;

    try {
      groom = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          hasPYbankAccount: hasPYbankAccount,
          isOnboarded: true,
        },
      });
    } catch (error) {
      console.error(error);
      return { error: 'Error al actualizar tu usuario' };
    }

    if (!groom) return { error: 'Error obteniendo tu usuario' };

    try {
      await prisma.event.update({
        where: {
          secondaryUserId: groom.id,
        },
        data: {
          country: eventCountry,
          city: eventCity,
        },
      });

      revalidatePath('/');
    } catch (error) {
      console.error(error);
      return { error: 'Error al actualizar la boda' };
    }
  }
};
