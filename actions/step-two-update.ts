'use server';

import prisma from '@/db/client';
import { StepTwoSchema } from '@/schemas';
import * as z from 'zod';
import { getSession } from './getCurrentUser';

export const stepTwoUpdate = async (
  values: z.infer<typeof StepTwoSchema> | null = null
) => {
  if (values === undefined || values === null) {
    return { error: 'Algo salio mal! reintanta' };
  }

  const validatedFields = StepTwoSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  if (validatedFields.success) {
    const { weddingCountry, weddingCity, hasPYbankAccount } =
      validatedFields.data;

    const session = await getSession();

    if (!session?.user?.email) return { error: 'Error obteniendo tu sesión' };

    let groom;

    try {
      groom = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          hasPYbankAccount: hasPYbankAccount,
          isOnboarded: true,
        },
      });
    } catch (error) {
      return { error: 'Error al actualizar tu usuario' };
    }

    if (!groom) return { error: 'Error obteniendo tu usuario' };

    try {
      await prisma.wedding.update({
        where: {
          groomId: groom.id,
        },
        data: {
          country: weddingCountry,
          city: weddingCity,
        },
      });
    } catch (error) {
      return { error: 'Error al actualizar la boda' };
    }
  }
};
