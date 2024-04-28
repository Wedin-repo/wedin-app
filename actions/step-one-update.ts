'use server';

import prisma from '@/db/client';
import { StepOneSchema } from '@/schemas';
import * as z from 'zod';
import { getSession } from './getCurrentUser';

export const stepOneUpdate = async (
  values: z.infer<typeof StepOneSchema> | null = null
) => {
  if (values === undefined || values === null) {
    return { error: 'Algo salio mal! reintanta' };
  }

  const validatedFields = StepOneSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: 'Campos inválidos' };
  }

  if (validatedFields.success) {
    const {
      partnerName,
      partnerEmail,
      partnerLastName,
      name,
      lastName,
      weddingUrl,
      weddingDate,
    } = validatedFields.data;

    let bride, groom, wishlist;

    try {
      bride = await prisma.user.upsert({
        where: {
          email: partnerEmail, // The unique identifier to search for
        },
        update: {
          name: partnerName,
          lastName: partnerLastName,
          isMagicLinkLogin: true,
          isOnboarded: true,
        },
        create: {
          email: partnerEmail,
          name: partnerName,
          lastName: partnerLastName,
          isMagicLinkLogin: true,
          isOnboarded: true,
        },
      });
    } catch (error) {
      return { error: 'Error creado el usuario de tu pareja' };
    }

    const session = await getSession();

    if (!session?.user?.email) return { error: 'Error obteniendo tu sesión' };

    console.log(!session?.user?.email);
    console.log(session.user.email);

    try {
      groom = await prisma.user.update({
        where: {
          email: session.user.email,
        },
        data: {
          name: name,
          lastName: lastName,
          onboardingStep: 2,
        },
      });
      console.log(groom);
    } catch (error) {
      console.error(error);
      return { error: 'Error actualizando tu perfil' };
    }

    try {
      wishlist = await prisma.wishList.create({
        data: {
          description: 'My first wish list',
        },
      });
      await prisma.wedding.create({
        data: {
          groomId: groom.id,
          brideId: bride.id,
          date: weddingDate ? new Date(weddingDate) : undefined,
          url: weddingUrl,
          wishListId: wishlist.id,
        },
      });
    } catch (error) {
      return { error: 'Error actualizando tu perfil' };
    }
  }
};
