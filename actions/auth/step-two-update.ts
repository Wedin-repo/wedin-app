'use server';

import { auth } from '@/auth';
import prisma from '@/db/client';
import { StepTwoSchema } from '@/schemas';
import { revalidatePath } from 'next/cache';
import * as z from 'zod';

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

    const session = await auth();

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
      console.error(error);
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

      revalidatePath('/');
    } catch (error) {
      console.error(error);
      return { error: 'Error al actualizar la boda' };
    }
  }
};
